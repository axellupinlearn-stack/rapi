'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Radio, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import ArticleCard from '../articles/ArticleCard';

interface RapIvoireSectionProps {
  articles: Article[];
}

export default function RapIvoireSection({ articles }: RapIvoireSectionProps) {
  const [selectedTag, setSelectedTag] = useState<string>('Tous');

  const tags = ['Tous', 'Drill', 'Trap Nouchi', 'Abidjan', 'Mojaveli', 'Paiya'];

  const filtered = selectedTag === 'Tous'
    ? articles
    : articles.filter((a) =>
        a.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
        a.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
        a.summary.toLowerCase().includes(selectedTag.toLowerCase())
      );

  return (
    <section className="py-14 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Subgenre filter tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue mb-2">
              <Flame className="w-4 h-4 fill-current" />
              <span>LE CŒUR DU MOUVEMENT</span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              ACTUALITÉS DU RAP IVOIRIEN
            </h2>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedTag === tag
                    ? 'bg-brand-blue text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200/90 shadow-xs'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/actualites?category=Rap Ivoire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-brand-blue border border-slate-200/90 font-bold text-xs uppercase tracking-wider hover:border-brand-blue/50 shadow-xs transition-all"
          >
            <span>Explorer tous les dossiers Rap Ivoire</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
