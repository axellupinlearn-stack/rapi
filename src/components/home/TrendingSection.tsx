import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Eye, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface TrendingSectionProps {
  articles: Article[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  // Sort by views descending
  const topArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                TOP TENDANCES DU MOMENT
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Les sujets et articles les plus consultés de la semaine
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topArticles.map((article, index) => {
            const rank = `0${index + 1}`;
            return (
              <article
                key={article.id}
                className="group relative bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-brand-blue/50 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-editorial text-3xl font-black text-brand-blue group-hover:text-blue-700 transition-colors">
                    {rank}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {article.category}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-3 leading-snug">
                    <Link href={`/actualites/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-brand-blue font-medium">
                    <Eye className="w-3 h-3" />
                    {formatNumber(article.views)}
                  </span>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="text-brand-blue font-semibold hover:underline"
                  >
                    Lire →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
