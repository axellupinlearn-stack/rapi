import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Clock, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <article className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-end min-h-[440px] md:min-h-[500px] shadow-sm">
        {/* Background Image with dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.coverImage || '/images/logo-rap-ivoire.jpg'}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue text-white shadow-md shadow-brand-blue/30">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-200 font-medium">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              {formatNumber(article.views)} vues
            </span>
          </div>

          <h3 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-black text-white group-hover:text-blue-200 transition-colors leading-tight">
            <Link href={`/actualites/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {article.subtitle && (
            <p className="text-slate-200 text-sm md:text-base line-clamp-2 leading-relaxed max-w-3xl">
              {article.subtitle}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              {article.author.avatar && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-brand-blue">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="font-semibold text-white">{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            <Link
              href={`/actualites/${article.slug}`}
              className="inline-flex items-center gap-1 text-white font-bold hover:underline"
            >
              <span>Lire</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-brand-blue/40 rounded-2xl p-4 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-xs hover:shadow-md">
        <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 shadow-xs">
          <Image
            src={article.coverImage || '/images/logo-rap-ivoire.jpg'}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-blue text-white shadow-xs">
            {article.category}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-blue" />
              {article.readTime}
            </span>
          </div>

          <h4 className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
            <Link href={`/actualites/${article.slug}`}>
              {article.title}
            </Link>
          </h4>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span className="text-slate-800 font-semibold">{article.author.name}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Eye className="w-3 h-3 text-brand-blue" />
              {formatNumber(article.views)}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className="group bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-brand-blue/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-xs hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={article.coverImage || '/images/logo-rap-ivoire.jpg'}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-blue text-white shadow-xs">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-red-600 text-white animate-pulse">
              EXCLU
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{formatDate(article.publishedAt)}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-blue" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-brand-blue" />
                {formatNumber(article.views)}
              </span>
            </div>
          </div>

          <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
            <Link href={`/actualites/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Author / CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {article.author.avatar ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-brand-blue/30">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-[10px]">
                {article.author.name.charAt(0)}
              </div>
            )}
            <span className="text-slate-800 font-semibold truncate max-w-[130px]">
              {article.author.name}
            </span>
          </div>

          <Link
            href={`/actualites/${article.slug}`}
            className="text-brand-blue font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Lire</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
