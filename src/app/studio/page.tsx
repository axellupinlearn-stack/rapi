'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  CheckCircle2,
  Clock,
  FileEdit,
  Eye,
  Users,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { Article, SiteStats, User } from '@/lib/types';
import { getStoredUser } from '@/lib/auth';
import { formatDate, formatNumber } from '@/lib/utils';

export default function StudioDashboardPage() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(getStoredUser());
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = () => {
    Promise.all([
      fetch('/api/stats').then((r) => r.json()),
      fetch('/api/articles').then((r) => r.json()),
    ])
      .then(([statsData, articlesData]) => {
        if (statsData.success) setStats(statsData.stats);
        if (articlesData.success) setArticles(articlesData.articles);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const handleUserChange = () => setCurrentUser(getStoredUser());
    window.addEventListener('rapivoire_user_changed', handleUserChange);
    return () => window.removeEventListener('rapivoire_user_changed', handleUserChange);
  }, []);

  // Quick Action: Publish a pending article (for admin)
  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess('Article publié avec succès sur le site public !');
        loadData();
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Quick Action: Delete
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer définitivement l'article "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionSuccess('Article supprimé.');
        loadData();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner with Welcome & Big + NOUVEL ARTICLE button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-dark-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ESPACE DE GESTION ÉDITORIALE</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Tableau de Bord — Studio Rap Ivoire
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Connecté en tant que <span className="text-white font-bold">{currentUser.name}</span> ({currentUser.role})
          </p>
        </div>

        {/* Big "+ NOUVEL ARTICLE" Button */}
        <Link
          href="/studio/articles/nouveau"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue-light hover:to-brand-blue text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-blue/30 hover:shadow-glow-blue transition-all duration-300 border border-brand-cyan/40 scale-100 hover:scale-102"
        >
          <PlusCircle className="w-5 h-5 text-brand-cyan" />
          <span>+ NOUVEL ARTICLE</span>
        </Link>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Total Articles</span>
            <FileText className="w-4 h-4 text-brand-blue" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-white">
            {stats?.totalArticles ?? '...'}
          </p>
        </div>

        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Publiés</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-emerald-400">
            {stats?.publishedArticles ?? '...'}
          </p>
        </div>

        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">En Attente</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-amber-400">
            {stats?.pendingArticles ?? '...'}
          </p>
        </div>

        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Brouillons</span>
            <FileEdit className="w-4 h-4 text-slate-400" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-slate-300">
            {stats?.draftArticles ?? '...'}
          </p>
        </div>

        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Vues Totales</span>
            <Eye className="w-4 h-4 text-brand-cyan" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-brand-cyan">
            {stats ? formatNumber(stats.totalViews) : '...'}
          </p>
        </div>

        <div className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Rédacteurs</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-black text-white">
            {stats?.activeContributors ?? '...'}
          </p>
        </div>
      </div>

      {/* Pending Validation Alert Section if any pending (Crucial for editorial workflow) */}
      {articles.filter((a) => a.status === 'pending').length > 0 && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Articles en attente d’approbation ({articles.filter((a) => a.status === 'pending').length})</span>
            </h3>
            {currentUser.role === 'admin' && (
              <span className="text-[11px] text-amber-200 bg-amber-900/60 px-2.5 py-0.5 rounded-full border border-amber-600/40 font-semibold">
                Action requise par l’administrateur
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articles.filter((a) => a.status === 'pending').map((art) => (
              <div key={art.id} className="bg-[#080B11] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">{art.title}</h4>
                  <p className="text-xs text-slate-400">Par {art.author.name} • {art.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/studio/articles/${art.id}/edit`}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Examiner
                  </Link>
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => handlePublish(art.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      Approuver
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Publications Table */}
      <div className="bg-brand-dark-surface border border-brand-dark-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-white">
              Toutes les Publications de la Rédaction
            </h2>
            <p className="text-xs text-slate-400">Consultez l’état, modifiez ou publiez vos articles</p>
          </div>

          <Link
            href="/studio/articles"
            className="text-xs font-bold text-brand-cyan hover:underline"
          >
            Voir la liste complète →
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Chargement des données...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080B11] text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3 rounded-l-lg">Article</th>
                  <th className="py-3 px-3">Catégorie</th>
                  <th className="py-3 px-3">Auteur</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Statut</th>
                  <th className="py-3 px-3">Vues</th>
                  <th className="py-3 px-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {articles.slice(0, 8).map((art) => {
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
                      <td className="py-3.5 px-3 max-w-xs font-semibold text-white">
                        <Link href={`/studio/articles/${art.id}/edit`} className="hover:text-brand-cyan truncate block">
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
                      <td className="py-3.5 px-3 font-semibold text-brand-cyan">
                        {formatNumber(art.views)}
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-1.5">
                        {art.status === 'published' && (
                          <Link
                            href={`/actualites/${art.slug}`}
                            target="_blank"
                            className="p-1.5 inline-block text-slate-400 hover:text-white"
                            title="Voir sur le site public"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/studio/articles/${art.id}/edit`}
                          className="p-1.5 inline-block text-slate-400 hover:text-brand-cyan"
                          title="Modifier"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </Link>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => handleDelete(art.id, art.title)}
                            className="p-1.5 inline-block text-slate-400 hover:text-red-400"
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
