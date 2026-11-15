import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Quote, ArrowRight, Clock, Mic2 } from 'lucide-react';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface InterviewsSectionProps {
  articles: Article[];
}

export default function InterviewsSection({ articles }: InterviewsSectionProps) {
  const interviewArticles = articles.filter(
    (a) => a.category.toLowerCase().includes('interview') || a.tags.some((t) => t.toLowerCase().includes('interview'))
  );

  const featured = interviewArticles[0] || articles[2];
  if (!featured) return null;

  return (
    <section className="py-14 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-brand-blue border border-blue-200">
              <Mic2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                INTERVIEWS & PORTRAITS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Paroles d’artistes, vérités sans filtre et grands récits
              </p>
            </div>
          </div>

          <Link
            href="/actualites?category=Interviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>Toutes les interviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Interview Card with Pull Quote */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-50/90 border border-slate-200/90 p-6 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Col 5 */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200 flex items-center justify-between">
                <span className="font-bold text-white">{featured.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
              </div>
            </div>

            {/* Quote & Text Col 7 */}
            <div className="lg:col-span-7 space-y-5">
              <Quote className="w-12 h-12 text-brand-blue opacity-80" />

              <blockquote className="font-editorial text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                « Le rap ivoirien a une âme unique parce qu'il puise dans notre réalité, notre argot, nos souffrances et nos joies. »
              </blockquote>

              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  <Link href={`/actualites/${featured.slug}`} className="hover:text-brand-blue transition-colors">
                    {featured.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Interview menée par </span>
                  <span className="font-bold text-slate-800">{featured.author.name}</span>
                </div>

                <Link
                  href={`/actualites/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Lire l’entretien</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
