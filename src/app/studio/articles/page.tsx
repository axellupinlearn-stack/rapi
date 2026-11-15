'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileEdit,
  Trash2,
  ExternalLink,
  Eye
} from 'lucide-react';
import { Article, User } from '@/lib/types';
import { getStoredUser } from '@/lib/auth';
import { formatDate, formatNumber } from '@/lib/utils';

export default function StudioArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'pending' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<User>(getStoredUser());
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchArticles = () => {
    fetch('/api/articles')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setArticles(data.articles);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
    const handleUserChange = () => setCurrentUser(getStoredUser());
    window.addEventListener('rapivoire_user_changed', handleUserChange);
    return () => window.removeEventListener('rapivoire_user_changed', handleUserChange);
  }, []);

  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback('Article publié !');
        fetchArticles();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Confirmer la suppression de "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFeedback('Article supprimé.');
        fetchArticles();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = articles.filter((a) => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-dark-border">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Gestion des Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {articles.length} articles répertoriés dans le média
          </p>
        </div>

        <Link
          href="/studio/articles/nouveau"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30"
        >
          <PlusCircle className="w-4 h-4 text-brand-cyan" />
          <span>Nouvel Article</span>
        </Link>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-semibold">
          {feedback}
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all' ? 'bg-brand-blue text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Tous ({articles.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'published' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Publiés ({articles.filter((a) => a.status === 'published').length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            En Attente ({articles.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'draft' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Brouillons ({articles.filter((a) => a.status === 'draft').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrer par titre, auteur..."
            className="w-full bg-[#080B11] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
          />
        </div>
      </div>

      {/* Articles List / Table */}
      <div className="bg-brand-dark-surface border border-brand-dark-border rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">Aucun article ne correspond aux filtres.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080B11] text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Titre</th>
                  <th className="py-3 px-3">Catégorie</th>
                  <th className="py-3 px-3">Auteur</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Statut</th>
                  <th className="py-3 px-3">Vues</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((art) => {
                  const statusBadge = {
                    published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                    draft: 'bg-slate-700/40 text-slate-300 border-slate-600/30',
                  }[art.status];

                  const statusText = {
                    published: 'Publié',
                    pending: 'En attente',
                    draft: 'Brouillon',
                  }[art.status];

                  return (
                    <tr key={art.id} className="hover:bg-[#0A0E1A]/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white max-w-sm">
                        <Link href={`/studio/articles/${art.id}/edit`} className="hover:text-brand-cyan block truncate">
                          {art.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300">{art.category}</td>
                      <td className="py-3.5 px-3 text-slate-400">{art.author.name}</td>
                      <td className="py-3.5 px-3 text-slate-400">{formatDate(art.publishedAt)}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusBadge}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-brand-cyan">{formatNumber(art.views)}</td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {currentUser.role === 'admin' && art.status === 'pending' && (
                          <button
                            onClick={() => handlePublish(art.id)}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                          >
                            Publier
                          </button>
                        )}
                        {art.status === 'published' && (
                          <Link
                            href={`/actualites/${art.slug}`}
                            target="_blank"
                            className="p-1 inline-block text-slate-400 hover:text-white"
                            title="Voir"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/studio/articles/${art.id}/edit`}
                          className="p-1 inline-block text-slate-400 hover:text-brand-cyan"
                          title="Éditer"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </Link>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => handleDelete(art.id, art.title)}
                            className="p-1 inline-block text-slate-400 hover:text-red-400"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
