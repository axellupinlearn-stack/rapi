'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Clock } from 'lucide-react';
import { CommentItem } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';

interface CommentsSectionProps {
  articleId: string;
  articleSlug: string;
}

export default function CommentsSection({ articleId, articleSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/commentaires?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments);
        }
      })
      .catch((err) => console.error('Failed to load comments:', err));
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/commentaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          articleSlug,
          authorName: authorName.trim(),
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setContent('');
        setAuthorName('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-brand-blue" />
          <span>Réactions & Commentaires</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-50 text-brand-blue font-bold border border-blue-200">
            {comments.length}
          </span>
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-800">Rejoindre la discussion</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Votre pseudo ou nom</label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ex: Kouamé d'Abobo"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Votre avis</label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partagez votre point de vue sur ce morceau, cet artiste ou cette actualité..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {submitted ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Commentaire publié avec succès !
            </span>
          ) : <span />}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Envoi...' : 'Publier'}</span>
          </button>
        </div>
      </form>

      {/* List of comments */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6 italic bg-slate-50 rounded-2xl border border-slate-200">
            Soyez le premier à commenter cette actualité Rap Ivoire !
          </p>
        ) : (
          comments.map((comm) => (
            <div key={comm.id} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-xs">
                    {comm.authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-slate-900">{comm.authorName}</span>
                </div>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {formatTimeAgo(comm.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed pl-9">
                {comm.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
