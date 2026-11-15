'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Eye,
  Flame,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  Sparkles,
  TrendingUp,
  Share2
} from 'lucide-react';
import { Article } from '@/lib/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface HeroBannerProps {
  featuredArticle: Article;
  subFeatured: Article[];
}

export default function HeroBanner({ featuredArticle, subFeatured }: HeroBannerProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const stories = [featuredArticle, ...subFeatured].filter(Boolean);
  const activeArticle = stories[selectedStoryIndex] || featuredArticle;

  if (!activeArticle) return null;

  return (
    <section className="relative w-full pt-4 pb-8 overflow-hidden">
      {/* Background Ambient Lighting Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Interactive Sound System / Live Stream Bar */}
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-slate-50/80 border border-blue-200/90 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsRadioPlaying(!isRadioPlaying)}
              className="w-10 h-10 rounded-xl bg-brand-blue hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-brand-blue/20 transition-all hover:scale-105 shrink-0"
              title={isRadioPlaying ? 'Mettre en pause' : 'Écouter le flux Rap Ivoire'}
            >
              {isRadioPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              )}
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">
                  RAP IVOIRE SOUND SYSTEM • FLUX LIVE
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">
                {isRadioPlaying ? 'En lecture : Didi B x Himra x Suspect 95 — Best of Abidjan 2026' : 'Cliquez pour écouter la sélection des meilleurs sons rap ivoire'}
              </p>
            </div>
          </div>

          {/* Sound wave equalizer graphic */}
          <div className="hidden md:flex items-center gap-1 h-5 px-3">
            {[40, 75, 100, 60, 90, 45, 80, 95, 30, 85, 60, 100, 50, 70].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isRadioPlaying ? 'bg-brand-blue animate-pulse' : 'bg-slate-300'
                }`}
                style={{
                  height: isRadioPlaying ? `${h}%` : '25%',
                  animationDelay: `${i * 80}ms`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 shrink-0">
            <span className="hidden lg:inline text-slate-500">Ambiance 100% Nouchi & Drill</span>
            <Link
              href="/videos"
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200 shadow-xs transition-colors"
            >
              Vidéothèque →
            </Link>
          </div>
        </div>

        {/* Grand Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Showcase Hero (Col 8) */}
          <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 hover:border-brand-blue/50 transition-all duration-500 min-h-[500px] md:min-h-[580px] flex flex-col justify-end shadow-lg">
            {/* Visual Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
              />
              {/* Cinematic Multilayer Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/20 to-transparent" />
            </div>

            {/* Glowing Category / Exclu Badge */}
            <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-lg shadow-brand-blue/40">
                <Flame className="w-3.5 h-3.5 text-white fill-current" />
                <span>À LA UNE NATIONALE</span>
              </span>

              <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                {activeArticle.category}
              </span>
            </div>

            {/* Story Switcher Tabs atop the image */}
            <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
              {stories.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStoryIndex(idx)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                    selectedStoryIndex === idx
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Content & Typography */}
            <div className="relative z-10 p-6 md:p-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-200 font-medium">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {activeArticle.author.name}
                </span>
                <span>•</span>
                <span>{formatDate(activeArticle.publishedAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {activeArticle.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  {formatNumber(activeArticle.views)} vues
                </span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-blue-200 transition-colors leading-[1.12] tracking-tight">
                <Link href={`/actualites/${activeArticle.slug}`}>
                  {activeArticle.title}
                </Link>
              </h1>

              {activeArticle.subtitle && (
                <p className="text-slate-200 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 max-w-3xl">
                  {activeArticle.subtitle}
                </p>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/actualites/${activeArticle.slug}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all"
                >
                  <span>Lire le grand reportage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/actualites"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-colors border border-white/20"
                >
                  <span>Toutes les actualités</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Editorial Spotlight Column (Col 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-blue" />
                <span>SÉLECTION ÉDITORIALE</span>
              </h2>
              <span className="text-[11px] text-slate-500 font-semibold">Exclusivités</span>
            </div>

            <div className="flex-1 flex flex-col gap-3.5 justify-between">
              {subFeatured.slice(0, 3).map((item, index) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedStoryIndex(index + 1)}
                  className={`group rounded-2xl p-3.5 transition-all duration-300 flex gap-3.5 items-center cursor-pointer border ${
                    selectedStoryIndex === index + 1
                      ? 'bg-blue-50/90 border-brand-blue shadow-md shadow-blue-500/5'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-brand-blue/40 shadow-xs'
                  }`}
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-xs">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-950/80 text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                      <span>{item.readTime}</span>
                      <span>•</span>
                      <span>{formatNumber(item.views)} vues</span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                      <Link href={`/actualites/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-[11px] text-brand-blue truncate font-semibold">
                      Par {item.author.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
