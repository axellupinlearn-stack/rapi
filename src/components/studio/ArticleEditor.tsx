'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Save,
  Send,
  Eye,
  Image as ImageIcon,
  Youtube,
  Quote,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Upload,
  CheckCircle2,
  Video,
  Trash2,
  X,
  ArrowLeft,
  FileVideo
} from 'lucide-react';
import { Article } from '@/lib/types';
import { getStoredUser } from '@/lib/auth';
import { getYouTubeEmbedUrl } from '@/lib/utils';

interface ArticleEditorProps {
  initialArticle?: Article;
  isEditing?: boolean;
}

export default function ArticleEditor({ initialArticle, isEditing = false }: ArticleEditorProps) {
  const router = useRouter();
  const currentUser = getStoredUser();

  // Form states
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || '');
  const [category, setCategory] = useState(initialArticle?.category || 'Rap Ivoire');
  const [summary, setSummary] = useState(initialArticle?.summary || '');
  const [coverImage, setCoverImage] = useState(initialArticle?.coverImage || '/images/logo-rap-ivoire.jpg');
  const [content, setContent] = useState(initialArticle?.content || '');

  // Video Source Choice (Upload Local vs YouTube)
  const [videoSourceType, setVideoSourceType] = useState<'upload' | 'youtube'>(
    initialArticle?.localVideoUrl ? 'upload' : 'youtube'
  );
  const [localVideoUrl, setLocalVideoUrl] = useState(initialArticle?.localVideoUrl || '');
  const [youtubeUrl, setYoutubeUrl] = useState(initialArticle?.youtubeUrl || '');
  const [videoUploading, setVideoUploading] = useState(false);

  const [quoteText, setQuoteText] = useState(initialArticle?.quote?.text || '');
  const [quoteAuthor, setQuoteAuthor] = useState(initialArticle?.quote?.author || '');
  const [tags, setTags] = useState(initialArticle?.tags?.join(', ') || 'Rap Ivoire, Abidjan');
  const [relatedArtists, setRelatedArtists] = useState(initialArticle?.relatedArtists?.join(', ') || 'Didi B, Himra');
  const [authorName, setAuthorName] = useState(initialArticle?.author?.name || currentUser.name);

  // Status & notifications
  const [saving, setSaving] = useState(false);
  const [autoSavedTime, setAutoSavedTime] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save draft every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (title.trim() && !isEditing) {
        localStorage.setItem(
          'rapivoire_article_draft',
          JSON.stringify({
            title,
            subtitle,
            category,
            summary,
            coverImage,
            content,
            youtubeUrl,
            localVideoUrl,
            videoSourceType,
            tags,
          })
        );
        setAutoSavedTime(
          new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      }
    }, 20000);
    return () => clearInterval(timer);
  }, [title, subtitle, category, summary, coverImage, content, youtubeUrl, localVideoUrl, videoSourceType, tags, isEditing]);

  // Load from draft if creating new
  useEffect(() => {
    if (!isEditing) {
      try {
        const saved = localStorage.getItem('rapivoire_article_draft');
        if (saved && !title) {
          const parsed = JSON.parse(saved);
          if (parsed.title) {
            setTitle(parsed.title || '');
            setSubtitle(parsed.subtitle || '');
            setCategory(parsed.category || 'Rap Ivoire');
            setSummary(parsed.summary || '');
            setCoverImage(parsed.coverImage || '/images/logo-rap-ivoire.jpg');
            setContent(parsed.content || '');
            setYoutubeUrl(parsed.youtubeUrl || '');
            setLocalVideoUrl(parsed.localVideoUrl || '');
            if (parsed.videoSourceType) setVideoSourceType(parsed.videoSourceType);
            setTags(parsed.tags || 'Rap Ivoire');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isEditing]);

  // Insert formatting helpers
  const insertFormatting = (tagOpen: string, tagClose: string = '') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'Texte ici';
    const replacement = `${tagOpen}${selectedText}${tagClose}`;

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selectedText.length);
    }, 50);
  };

  const insertQuote = () => {
    insertFormatting(
      '\n<blockquote class="editorial-quote">\n  « ',
      ' »\n  <span>— Auteur de la citation</span>\n</blockquote>\n'
    );
  };

  const insertImagePrompt = () => {
    const url = prompt("Entrez l'URL de l'image :", 'https://images.unsplash.com/...');
    if (url) {
      const caption = prompt('Légende de l’image :', 'Concert Abidjan') || '';
      insertFormatting(
        `\n<figure class="my-6">\n  <img src="${url}" alt="${caption}" class="w-full rounded-2xl shadow-lg" />\n  <figcaption class="text-xs text-slate-400 mt-2 text-center">${caption}</figcaption>\n</figure>\n`
      );
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setCoverImage(data.url);
        setNotification({ type: 'success', message: 'Image de couverture téléversée avec succès !' });
      } else {
        alert(data.error || 'Erreur lors du téléversement.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de l’envoi de l’image.');
    }
  };

  // Video Upload directly from local files (MP4, WebM, MOV)
  const handleLocalVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setLocalVideoUrl(data.url);
        setVideoSourceType('upload');
        setNotification({
          type: 'success',
          message: `Vidéo locale "${file.name}" importée avec succès !`,
        });
      } else {
        alert(data.error || 'Erreur lors du téléversement de la vidéo.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de l’envoi du fichier vidéo.');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (targetStatus: 'draft' | 'pending' | 'published') => {
    if (!title.trim()) {
      setNotification({ type: 'error', message: 'Le titre de l’article est obligatoire.' });
      return;
    }
    if (!summary.trim()) {
      setNotification({ type: 'error', message: 'Le résumé ou chapeau de l’article est obligatoire.' });
      return;
    }

    setSaving(true);
    setNotification(null);

    const payload = {
      id: initialArticle?.id,
      title: title.trim(),
      subtitle: subtitle.trim(),
      category,
      summary: summary.trim(),
      content: content.trim() || `<p>${summary.trim()}</p>`,
      coverImage: coverImage.trim() || '/images/logo-rap-ivoire.jpg',
      videoType: videoSourceType,
      youtubeUrl: videoSourceType === 'youtube' ? youtubeUrl.trim() : '',
      localVideoUrl: videoSourceType === 'upload' ? localVideoUrl.trim() : '',
      quote: quoteText ? { text: quoteText.trim(), author: quoteAuthor.trim() || authorName } : undefined,
      author: {
        name: authorName.trim() || currentUser.name,
        role: currentUser.role === 'admin' ? 'Directeur de la Rédaction' : 'Journaliste Culture',
        avatar: currentUser.avatar,
      },
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      relatedArtists: relatedArtists.split(',').map((a) => a.trim()).filter(Boolean),
      status: targetStatus,
    };

    try {
      const endpoint = isEditing ? `/api/articles/${initialArticle?.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem('rapivoire_article_draft');
        setNotification({
          type: 'success',
          message:
            targetStatus === 'published'
              ? 'Félicitations ! L’article a été publié en ligne.'
              : targetStatus === 'pending'
              ? 'L’article a été soumis avec succès à l’équipe éditoriale pour relecture !'
              : 'Brouillon enregistré avec succès.',
        });

        setTimeout(() => {
          router.push('/studio/articles');
        }, 1500);
      } else {
        setNotification({ type: 'error', message: data.error || 'Erreur lors de l’enregistrement.' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Erreur de connexion.' });
    } finally {
      setSaving(false);
    }
  };

  const categoriesList = ['Rap Ivoire', 'Interviews', 'Culture Urbaine', 'Musique', 'Clips'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
              {isEditing ? 'Modifier l’Article' : 'Rédiger un Nouvel Article'}
            </h1>
            <p className="text-xs text-slate-400">
              {autoSavedTime ? `Brouillon auto-sauvegardé à ${autoSavedTime}` : 'Éditeur de publication RAP IVOIRE'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4 text-brand-cyan" />
            <span>Aperçu Live</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Brouillon</span>
          </button>

          {/* Submit or Direct Publish */}
          {currentUser.role === 'admin' ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('published')}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-blue/30"
            >
              <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
              <span>Publier Directement</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('pending')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <Send className="w-4 h-4" />
              <span>Soumettre pour Validation</span>
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
              : 'bg-rose-950 border border-rose-500/50 text-rose-300'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Form */}
      <div className="space-y-6">
        {/* Title & Category */}
        <div className="bg-brand-dark-surface border border-brand-dark-border p-5 sm:p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Titre Principal de l’Article *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Didi B enflamme le Palais de la Culture avec une scénographie grandiose..."
              className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-lg font-bold text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Sous-titre / Chapeau d'accroche
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Retour en images sur le concert événement du Shogun..."
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Rubrique / Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-cyan"
              >
                {categoriesList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Résumé synthétique (Affiché sur les cartes et pour le SEO) *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deux à trois phrases courtes pour résumer l’essentiel de l’actualité..."
              className="w-full bg-[#080B11] border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>

        {/* Cover Image Upload / Selection */}
        <div className="bg-brand-dark-surface border border-brand-dark-border p-5 sm:p-6 rounded-2xl space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Image Principale / Couverture de l’Article
          </label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Image Preview */}
            <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-[#080B11]">
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
            </div>

            {/* Upload or URL Controls */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Téléverser depuis votre appareil (Mobile ou Ordinateur) :
                </label>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-cyan border border-brand-cyan/30 text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Choisir une photo locale</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Ou saisir l'URL directe d’une image :
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="bg-brand-dark-surface border border-brand-dark-border p-5 sm:p-6 rounded-2xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Corps de l’Article & Mise en Page
            </span>

            {/* Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1 bg-[#080B11] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => insertFormatting('<b>', '</b>')}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Gras"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<i>', '</i>')}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Italique"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n<h2>', '</h2>\n')}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Titre de section H2"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n<h3>', '</h3>\n')}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Sous-titre H3"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={insertQuote}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Insérer une citation mise en valeur"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={insertImagePrompt}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                title="Insérer une image dans le texte"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            ref={contentTextareaRef}
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Rédigez votre article ici..."
            className="w-full bg-[#080B11] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-cyan font-mono leading-relaxed"
          />
        </div>

        {/* Video Integration Section: LOCAL UPLOAD OR YOUTUBE */}
        <div className="bg-brand-dark-surface border border-brand-dark-border p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Video className="w-4 h-4 text-brand-cyan" />
                <span>Vidéo Associée à l'Article</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Vous pouvez soit téléverser un fichier vidéo directement depuis vos dossiers, soit renseigner un lien YouTube.
              </p>
            </div>

            {/* Toggle Source Choice */}
            <div className="flex items-center gap-1.5 bg-[#080B11] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setVideoSourceType('upload')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  videoSourceType === 'upload'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Fichier Vidéo Local</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoSourceType('youtube')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  videoSourceType === 'youtube'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Lien YouTube</span>
              </button>
            </div>
          </div>

          {/* Option A: Local Video File Upload */}
          {videoSourceType === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-800 hover:border-brand-cyan/50 bg-[#080B11]/60 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center mx-auto">
                  <FileVideo className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">
                    {videoUploading
                      ? 'Téléversement de la vidéo en cours...'
                      : 'Sélectionnez une vidéo sur votre ordinateur ou smartphone'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Formats supportés : MP4, WebM, MOV (Fichiers volumineux acceptés jusqu’à 100 Mo)
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold cursor-pointer transition-colors shadow-md">
                  <Upload className="w-4 h-4 text-brand-cyan" />
                  <span>{videoUploading ? 'Téléversement...' : 'Parcourir mes dossiers...'}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/ogg"
                    onChange={handleLocalVideoUpload}
                    disabled={videoUploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Local Video Player Live Preview */}
              {localVideoUrl && (
                <div className="p-4 rounded-2xl bg-[#080B11] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Vidéo locale prête pour l’article</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setLocalVideoUrl('')}
                      className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer cette vidéo</span>
                    </button>
                  </div>
                  <video
                    src={localVideoUrl}
                    controls
                    className="w-full rounded-xl aspect-video bg-black shadow-lg"
                  />
                </div>
              )}
            </div>
          )}

          {/* Option B: YouTube Link */}
          {videoSourceType === 'youtube' && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8">
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="sm:col-span-4">
                {youtubeUrl && getYouTubeEmbedUrl(youtubeUrl) ? (
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lien YouTube valide reconnu</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">Intégration automatique dans l'article</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tags, Artists & Author Metadata */}
        <div className="bg-brand-dark-surface border border-brand-dark-border p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Mots-clés / Tags (séparés par virgules)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Didi B, Trap, Yopougon, CAN 2024"
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Artistes Associés
              </label>
              <input
                type="text"
                value={relatedArtists}
                onChange={(e) => setRelatedArtists(e.target.value)}
                placeholder="Didi B, Himra, Suspect 95"
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Nom de l’Auteur / Journaliste
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Votre nom ou signature"
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto p-4 sm:p-8 animate-in fade-in">
          <div className="max-w-4xl mx-auto bg-[#080B11] border border-brand-dark-border rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-blue/20 text-brand-cyan border border-brand-cyan/30">
                Aperçu Fidèle en Direct (Rendu Public)
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-blue text-white">
                {category}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-black text-white">
                {title || 'Titre de l’article'}
              </h1>
              {subtitle && (
                <p className="text-base text-slate-300 italic border-l-2 border-brand-cyan pl-3">
                  {subtitle}
                </p>
              )}
              <div className="text-xs text-slate-400">
                Par <span className="text-white font-bold">{authorName}</span>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
            </div>

            {/* Video preview in modal */}
            {localVideoUrl ? (
              <video src={localVideoUrl} controls className="w-full rounded-2xl aspect-video bg-black shadow-xl" />
            ) : youtubeUrl && getYouTubeEmbedUrl(youtubeUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(youtubeUrl)!}
                className="w-full aspect-video rounded-2xl border-0 shadow-xl"
                allowFullScreen
              />
            ) : null}

            <div
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4
              [&>.editorial-quote]:p-4 [&>.editorial-quote]:bg-[#0E1528] [&>.editorial-quote]:border-l-4 [&>.editorial-quote]:border-brand-cyan [&>.editorial-quote]:font-bold [&>.editorial-quote]:text-white"
              dangerouslySetInnerHTML={{ __html: content || `<p>${summary}</p>` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
