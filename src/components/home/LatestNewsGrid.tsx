import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Article } from '@/lib/types';
import ArticleCard from '../articles/ArticleCard';

interface LatestNewsGridProps {
  articles: Article[];
}

export default function LatestNewsGrid({ articles }: LatestNewsGridProps) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);
  const bottomArticles = articles.slice(3, 7);

  return (
    <section className="py-12 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-8 bg-brand-blue rounded-full"></span>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                DERNIÈRES ACTUALITÉS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Le fil continu des informations du hip-hop abidjanais
              </p>
            </div>
          </div>

          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>Toutes les actus</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Asymmetric Card (Col 7) */}
          {mainArticle && (
            <div className="lg:col-span-7">
              <ArticleCard article={mainArticle} variant="featured" />
            </div>
          )}

          {/* Side 2 Horizontal / Stacked Cards (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {sideArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Bottom 4 Grid Columns */}
        {bottomArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {bottomArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="standard" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
