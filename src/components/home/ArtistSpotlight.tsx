import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Music2, ArrowRight, Sparkles, Flame, Crown } from 'lucide-react';
import { Artist } from '@/lib/types';

interface ArtistSpotlightProps {
  artists: Artist[];
}

export default function ArtistSpotlight({ artists }: ArtistSpotlightProps) {
  return (
    <section className="py-14 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                ARTISTES DU RAP IVOIRE
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Les porte-drapeaux, étoiles montantes et légendes des communes d’Abidjan
              </p>
            </div>
          </div>

          <Link
            href="/artistes"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>Répertoire complet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artistes/${artist.slug}`}
              className="group relative flex flex-col items-center text-center p-4 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-brand-blue/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-lg"
            >
              {/* Trending / Crown badge */}
              {artist.isTrending && (
                <div className="absolute top-3 right-3 p-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                </div>
              )}

              {/* Portrait Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 ring-3 ring-blue-100 group-hover:ring-brand-blue shadow-md transition-all duration-300">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 group-hover:text-brand-blue transition-colors truncate w-full tracking-tight">
                {artist.name}
              </h3>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <MapPin className="w-3 h-3 text-brand-blue shrink-0" />
                <span className="truncate font-semibold text-slate-700">{artist.commune}</span>
              </div>

              <span className="mt-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-brand-blue border border-blue-200/80 truncate max-w-full">
                {artist.genre.split('&')[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
