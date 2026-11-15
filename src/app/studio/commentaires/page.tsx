'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Check, X, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { CommentItem } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';

export default function StudioCommentairesPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadComments = () => {
    fetch('/api/commentaires?all=true')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setComments(d.comments);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/commentaires', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`Statut du commentaire mis à jour (${status})`);
        loadComments();
        setTimeout(() => setFeedback(null), 3000);
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
            Modération des Commentaires
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {comments.length} réactions laissées par les lecteurs
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Chargement...</div>
        ) : comments.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">Aucun commentaire à modérer.</div>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-white">{comm.authorName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{formatTimeAgo(comm.createdAt)}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      comm.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {comm.status === 'approved' ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{comm.content}</p>
                <p className="text-[11px] text-slate-500">
                  Article associé : <span className="text-brand-cyan">{comm.articleSlug}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {comm.status !== 'approved' && (
                  <button
                    onClick={() => handleStatus(comm.id, 'approved')}
                    className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                    title="Approuver"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {comm.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatus(comm.id, 'rejected')}
                    className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors"
                    title="Rejeter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
