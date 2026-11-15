'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Disc3, Play, ArrowRight, Music2, ExternalLink, Radio } from 'lucide-react';
import { Artist } from '@/lib/types';
import AlbumModal, { AlbumData } from './AlbumModal';

interface NewReleasesProps {
  artists: Artist[];
}

export default function NewReleases({ artists }: NewReleasesProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);

  const releases: AlbumData[] = [
    {
      title: 'History (Mojaveli)',
      artist: 'Didi B',
      type: 'Album',
      year: '2024',
      tracks: '16 titres',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      artistSlug: 'didi-b',
      description: 'L’album monumental qui a consacré Didi B comme le Shogun de la trap nouchi à l’échelle internationale. Comprend les tubes Tala, Yeye et En Haut.',
      trackList: [
        { number: '01', title: 'History Intro', duration: '2:10' },
        { number: '02', title: 'Tala', duration: '3:45' },
        { number: '03', title: 'Yeye', duration: '3:12' },
        { number: '04', title: 'En Haut', duration: '3:50', feat: 'ft. JR La Melo & Tchaikabo' },
        { number: '05', title: 'Chérie Coco', duration: '3:20' },
        { number: '06', title: 'On a pris balle', duration: '3:05' },
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/search/Didi%20B%20History',
        appleMusic: 'https://music.apple.com/search?term=Didi%20B%20History',
        deezer: 'https://www.deezer.com/search/Didi%20B%20History',
        boomplay: 'https://www.boomplay.com/search/Didi%20B',
        youtube: 'https://youtube.com/results?search_query=Didi+B+History+album',
      },
    },
    {
      title: 'NFTR The Album',
      artist: 'Himra',
      type: 'Album',
      year: '2024',
      tracks: '14 titres',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      artistSlug: 'himra',
      description: 'La référence absolue de la Drill ivoirienne. Himra déploie toute la fureur scénique et l’authenticité des rues de Marcory.',
      trackList: [
        { number: '01', title: 'NFTR (Le Crédo)', duration: '2:30' },
        { number: '02', title: 'Marcory Gang', duration: '3:15' },
        { number: '03', title: 'Grille Pain', duration: '2:50' },
        { number: '04', title: 'Bâtard', duration: '3:02' },
        { number: '05', title: 'Dans le Viseur', duration: '3:40' },
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/search/Himra%20NFTR',
        appleMusic: 'https://music.apple.com/search?term=Himra%20NFTR',
        deezer: 'https://www.deezer.com/search/Himra%20NFTR',
        boomplay: 'https://www.boomplay.com/search/Himra',
        youtube: 'https://youtube.com/results?search_query=Himra+NFTR+album',
      },
    },
    {
      title: 'Société Suspecte',
      artist: 'Suspect 95',
      type: 'Album',
      year: '2024',
      tracks: '15 titres',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      artistSlug: 'suspect-95',
      description: 'Chef-d’œuvre d’écriture satirique et de conscience sociale. Le Président du Syndicat signe des featurings de haut vol avec Youssoupha.',
      trackList: [
        { number: '01', title: 'Allocution Présidentielle', duration: '1:50' },
        { number: '02', title: 'Société Suspecte', duration: '4:15', feat: 'ft. Youssoupha' },
        { number: '03', title: 'Enfant de Boss', duration: '3:30' },
        { number: '04', title: 'C’est dans télé', duration: '3:08' },
        { number: '05', title: 'Dis-lui', duration: '3:22' },
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/search/Suspect%2095%20Societe%20Suspecte',
        appleMusic: 'https://music.apple.com/search?term=Suspect%2095%20Societe%20Suspecte',
        deezer: 'https://www.deezer.com/search/Suspect%2095%20Societe%20Suspecte',
        boomplay: 'https://www.boomplay.com/search/Suspect%2095',
        youtube: 'https://youtube.com/results?search_query=Suspect+95+Societe+Suspecte+album',
      },
    },
    {
      title: 'Paiya Universel',
      artist: 'Team Paiya',
      type: 'Album',
      year: '2024',
      tracks: '12 titres',
      cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      artistSlug: 'team-paiya',
      description: 'L’album de fête et de célébration abidjanaise qui a fait chanter toute l’Afrique durant la CAN. Mené par Zagba le Requin.',
      trackList: [
        { number: '01', title: 'Coup du Marteau', duration: '3:30', feat: 'ft. Tam Sir & Ste Milano' },
        { number: '02', title: 'Fimbu', duration: '3:10' },
        { number: '03', title: 'On Veut Paiya', duration: '3:40' },
        { number: '04', title: 'C’est pas ma faute', duration: '2:58' },
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/search/Team%20Paiya',
        appleMusic: 'https://music.apple.com/search?term=Team%20Paiya',
        deezer: 'https://www.deezer.com/search/Team%20Paiya',
        boomplay: 'https://www.boomplay.com/search/Team%20Paiya',
        youtube: 'https://youtube.com/results?search_query=Team+Paiya+album',
      },
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-brand-blue border border-blue-200 shadow-xs">
              <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                NOUVELLES SORTIES & PROJETS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Écoutez les albums complets directement sur Spotify, Apple Music, Deezer ou découvrez la tracklist
              </p>
            </div>
          </div>

          <Link
            href="/artistes"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>Voir discographies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {releases.map((rel, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedAlbum(rel)}
              className="group bg-white hover:bg-slate-50/70 border border-slate-200 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-brand-blue/50 cursor-pointer"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-xs">
                  <Image
                    src={rel.cover}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-3.5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold flex items-center gap-2 shadow-lg">
                      <Play className="w-4 h-4 fill-current" />
                      <span>Écouter le projet</span>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                    {rel.type}
                  </span>
                </div>

                {/* Artist & Title */}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-brand-blue truncate">
                    {rel.artist}
                  </p>

                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-blue transition-colors truncate">
                    {rel.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium">
                    {rel.year} • {rel.tracks}
                  </p>
                </div>
              </div>

              {/* Direct Streaming 1-Click Platform Buttons */}
              <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Écoute directe :
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Spotify */}
                  <a
                    href={rel.streamingLinks?.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Écouter sur Spotify (s'ouvre dans un nouvel onglet)"
                    className="px-2.5 py-1 rounded-lg bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Music2 className="w-3 h-3 fill-current" />
                    <span>Spotify</span>
                  </a>

                  {/* Deezer */}
                  <a
                    href={rel.streamingLinks?.deezer}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Écouter sur Deezer (s'ouvre dans un nouvel onglet)"
                    className="px-2.5 py-1 rounded-lg bg-[#A238FF]/10 hover:bg-[#A238FF] text-[#A238FF] hover:text-white border border-[#A238FF]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Radio className="w-3 h-3" />
                    <span>Deezer</span>
                  </a>

                  {/* Apple Music */}
                  <a
                    href={rel.streamingLinks?.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Écouter sur Apple Music (s'ouvre dans un nouvel onglet)"
                    className="px-2.5 py-1 rounded-lg bg-[#FA243C]/10 hover:bg-[#FA243C] text-[#FA243C] hover:text-white border border-[#FA243C]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Disc3 className="w-3 h-3" />
                    <span>Apple</span>
                  </a>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-brand-blue font-bold flex items-center gap-1 group-hover:underline">
                    Tracklist complète →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Album Modal Detail & Player with clear Retour button */}
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </section>
  );
}
