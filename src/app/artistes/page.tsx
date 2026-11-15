'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Music2, Disc3, Mic2, ArrowRight } from 'lucide-react';
import { Artist } from '@/lib/types';

export default function ArtistesPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('Toutes');
  const [selectedGenre, setSelectedGenre] = useState('Tous');

  useEffect(() => {
    fetch('/api/artistes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArtists(data.artists);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const communes = ['Toutes', 'Cocody', 'Marcory', 'Yopougon', 'Treichville', 'Abobo'];
  const genres = ['Tous', 'Trap Nouchi', 'Drill Ivoire', 'Rap Conscient', 'Afro-Rap'];

  const filtered = artists.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.commune.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCommune = selectedCommune === 'Toutes' || a.commune === selectedCommune;
    const matchGenre =
      selectedGenre === 'Tous' ||
      a.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return matchSearch && matchCommune && matchGenre;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Mic2 className="w-4 h-4" />
          <span>LE PANTHÉON DE LA SCÈNE</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          LES ARTISTES DU RAP IVOIRE
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
          Découvrez les figures emblématiques, les têtes d’affiche et les talents émergents qui font battre le cœur de la musique urbaine ivoirienne.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un rappeur ou un collectif..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 font-bold shrink-0">Commune :</span>
            <div className="flex gap-1.5">
              {communes.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCommune(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedCommune === c
                      ? 'bg-brand-blue text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200/80 border border-slate-200/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 font-bold shrink-0">Style :</span>
            <div className="flex gap-1.5">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedGenre === g
                      ? 'bg-brand-blue text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200/80 border border-slate-200/70'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artists Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Chargement des fiches artistes...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-xs">
          <p className="text-base font-bold text-slate-900">Aucun artiste trouvé</p>
          <button
            onClick={() => {
              setSelectedCommune('Toutes');
              setSelectedGenre('Tous');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artist) => (
            <Link
              key={artist.id}
              href={`/artistes/${artist.slug}`}
              className="group bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-brand-blue/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
            >
              {/* Cover & Avatar Header */}
              <div className="relative h-36 bg-gradient-to-r from-blue-100 via-slate-100 to-blue-50 overflow-hidden">
                {artist.coverImage && (
                  <Image
                    src={artist.coverImage}
                    alt={artist.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                  />
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                    {artist.genre.split('&')[0]}
                  </span>
                </div>
              </div>

              {/* Profile details */}
              <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col justify-between">
                <div className="-mt-12 mb-4 flex items-end justify-between">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-md">
                    <Image
                      src={artist.photo}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{artist.commune}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-editorial text-2xl font-black text-slate-900 group-hover:text-brand-blue transition-colors">
                    {artist.name}
                  </h3>
                  {artist.realName && (
                    <p className="text-xs text-slate-500 italic">
                      {artist.realName}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {artist.bio}
                  </p>
                </div>

                {/* Tracks preview */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Morceaux phares :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {artist.popularTracks.slice(0, 3).map((track, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-slate-100 px-2.5 py-0.5 rounded text-slate-700 border border-slate-200"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
