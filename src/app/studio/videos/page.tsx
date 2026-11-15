'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlusCircle, Video, CheckCircle2, Play, Upload, Youtube, Trash2, FileVideo, X } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

export default function StudioVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [videoSourceType, setVideoSourceType] = useState<'upload' | 'youtube'>('upload');
  const [videoUploading, setVideoUploading] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    artist: '',
    category: 'Clip Officiel' as VideoItem['category'],
    youtubeUrl: '',
    localVideoUrl: '',
    duration: '3:30',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  });
  const [success, setSuccess] = useState(false);

  const loadVideos = () => {
    fetch('/api/videos')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setVideos(d.videos);
      });
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setNewVideo((prev) => ({
          ...prev,
          localVideoUrl: data.url,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
        }));
      } else {
        alert(data.error || 'Erreur lors du téléversement.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de l’envoi de la vidéo.');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title) return;
    if (videoSourceType === 'upload' && !newVideo.localVideoUrl) {
      alert('Veuillez téléverser un fichier vidéo.');
      return;
    }
    if (videoSourceType === 'youtube' && !newVideo.youtubeUrl) {
      alert('Veuillez saisir un lien YouTube valide.');
      return;
    }

    const payload = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      artist: newVideo.artist || 'Artiste Rap Ivoire',
      category: newVideo.category,
      videoType: videoSourceType,
      youtubeUrl: videoSourceType === 'youtube' ? newVideo.youtubeUrl : '',
      localVideoUrl: videoSourceType === 'upload' ? newVideo.localVideoUrl : '',
      thumbnail: newVideo.thumbnail,
      duration: newVideo.duration,
      views: 1200,
      publishedAt: new Date().toISOString().split('T')[0],
      isTrending: true,
    };

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setSuccess(true);
        setNewVideo({
          title: '',
          artist: '',
          category: 'Clip Officiel',
          youtubeUrl: '',
          localVideoUrl: '',
          duration: '3:30',
          thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        });
        loadVideos();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-dark-border">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Gestion de la Vidéothèque
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {videos.length} clips et sessions répertoriés
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30"
        >
          <PlusCircle className="w-4 h-4 text-brand-cyan" />
          <span>Ajouter une Vidéo</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Vidéo ajoutée avec succès à la plateforme !</span>
        </div>
      )}

      {/* Grid of videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-brand-dark-surface border border-brand-dark-border rounded-2xl overflow-hidden p-3 space-y-2">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              {vid.localVideoUrl ? (
                <video src={vid.localVideoUrl} className="w-full h-full object-cover" />
              ) : (
                <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover" />
              )}
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] bg-black/80 text-white">
                {vid.duration}
              </span>
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-bold bg-brand-blue/80 text-white uppercase">
                {vid.localVideoUrl ? 'Fichier Local' : 'YouTube'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-brand-cyan">{vid.category}</span>
              <h4 className="font-bold text-sm text-white truncate">{vid.title}</h4>
              <p className="text-xs text-slate-400">{vid.artist} • {formatNumber(vid.views)} vues</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Video with Local Upload or YouTube */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F19] border border-slate-700 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-brand-cyan" />
                <span>Ajouter un Clip / Vidéo</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle Source */}
            <div className="grid grid-cols-2 gap-2 bg-[#080B11] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setVideoSourceType('upload')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  videoSourceType === 'upload'
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Depuis mes Dossiers</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoSourceType('youtube')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  videoSourceType === 'youtube'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Lien YouTube</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Titre de la vidéo *</label>
                <input
                  type="text"
                  required
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Ex : Himra - Nouveau Freestyle Marcory"
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Artiste</label>
                  <input
                    type="text"
                    required
                    value={newVideo.artist}
                    onChange={(e) => setNewVideo({ ...newVideo, artist: e.target.value })}
                    placeholder="Ex : Himra"
                    className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value as any })}
                    className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="Clip Officiel">Clip Officiel</option>
                    <option value="Freestyle">Freestyle</option>
                    <option value="Interview">Interview</option>
                    <option value="Performance">Performance Live</option>
                    <option value="Documentaire">Documentaire</option>
                  </select>
                </div>
              </div>

              {/* Source Inputs */}
              {videoSourceType === 'upload' ? (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">
                    Fichier Vidéo (MP4, WebM, MOV) *
                  </label>
                  <div className="border-2 border-dashed border-slate-800 p-5 rounded-2xl text-center bg-[#080B11]/60 space-y-2">
                    <FileVideo className="w-8 h-8 text-brand-cyan mx-auto" />
                    <p className="text-xs text-slate-300 font-bold">
                      {videoUploading ? 'Téléversement en cours...' : 'Sélectionnez un fichier vidéo sur votre appareil'}
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{videoUploading ? 'Patientez...' : 'Choisir le fichier vidéo'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/ogg"
                        onChange={handleVideoFileUpload}
                        disabled={videoUploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {newVideo.localVideoUrl && (
                    <div className="p-3 bg-[#080B11] border border-slate-800 rounded-xl space-y-1">
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Fichier prêt : {newVideo.localVideoUrl}</span>
                      </span>
                      <video src={newVideo.localVideoUrl} controls className="w-full rounded-lg aspect-video mt-2" />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lien Vidéo YouTube *</label>
                  <input
                    type="url"
                    required
                    value={newVideo.youtubeUrl}
                    onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={videoUploading}
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-xs font-bold text-white shadow-md disabled:opacity-50"
                >
                  {videoUploading ? 'Téléversement...' : 'Ajouter la Vidéo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
