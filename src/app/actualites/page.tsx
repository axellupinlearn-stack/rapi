'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, Newspaper, Clock } from 'lucide-react';
import { Article } from '@/lib/types';
import ArticleCard from '@/components/articles/ArticleCard';

function ActualitesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Tous';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  useEffect(() => {
    fetch('/api/articles?status=published')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticles(data.articles);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'Tous',
    'Rap Ivoire',
    'Interviews',
    'Culture Urbaine',
    'Musique',
    'Clips',
  ];

  // Filtering
  const filtered = articles
    .filter((a) => {
      const matchCat =
        selectedCategory === 'Tous' ||
        a.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Newspaper className="w-4 h-4" />
          <span>LE MAGAZINE DIGITAL</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          TOUTES LES ACTUALITÉS
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
          Retrouvez l’intégralité des reportages, analyses, interviews et chroniques consacrés à la scène rap et hip-hop en Côte d’Ivoire.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par titre, rappeur, mot-clé..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-blue" />
              Trier par :
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="recent">Plus récents</option>
              <option value="popular">Plus populaires (Vues)</option>
            </select>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200/80 border border-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Chargement des actualités...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-xs">
          <p className="text-base font-bold text-slate-900">Aucun article ne correspond à votre recherche</p>
          <p className="text-xs text-slate-500">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          <button
            onClick={() => {
              setSelectedCategory('Tous');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ActualitesPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-sm text-slate-500">Chargement des actualités...</p>
        </div>
      }
    >
      <ActualitesContent />
    </Suspense>
  );
}
