'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Play,
  Pause,
  Disc3,
  ExternalLink,
  Music2,
  Clock,
  ArrowLeft,
  Volume2,
  Radio
} from 'lucide-react';

export interface AlbumData {
  title: string;
  artist: string;
  type: string;
  year: string;
  tracks: string;
  cover: string;
  artistSlug: string;
  description?: string;
  trackList?: { number: string; title: string; duration: string; feat?: string }[];
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    deezer?: string;
    boomplay?: string;
    youtube?: string;
  };
}

interface AlbumModalProps {
  album: AlbumData | null;
  onClose: () => void;
}

export default function AlbumModal({ album, onClose }: AlbumModalProps) {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (album) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [album, onClose]);

  if (!album) return null;

  const defaultTracklist = album.trackList || [
    { number: '01', title: 'Intro (Abidjan Vibe)', duration: '2:14' },
    { number: '02', title: `${album.title} (Titre Phare)`, duration: '3:32' },
    { number: '03', title: 'Nouchi Wave', duration: '3:10', feat: 'ft. Himra' },
    { number: '04', title: 'Marcory to Paris', duration: '2:55' },
    { number: '05', title: 'Paiya dans la Cité', duration: '3:40', feat: 'ft. Team Paiya' },
    { number: '06', title: 'Outro (Légende Vivante)', duration: '3:05' },
  ];

  const toggleTrack = (trackTitle: string) => {
    if (playingTrack === trackTitle && isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingTrack(trackTitle);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col text-slate-900">
        {/* Top bar with prominent RETOUR / FERMER button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue" />
            <span>← Retour à la page précédente</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Écoute & Plateformes Musicales
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7 flex-1">
          {/* Album Hero Info */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            {/* Spinning Cover */}
            <div className="relative group shrink-0">
              <div
                className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-2 ring-brand-blue/30 shadow-lg ${
                  isPlaying ? 'ring-brand-blue' : ''
                }`}
              >
                <Image src={album.cover} alt={album.title} fill className="object-cover" />
              </div>

              {/* Vinyl disk accent */}
              <div
                className={`hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-slate-900 border-4 border-slate-800 -z-10 items-center justify-center shadow-xl transition-transform ${
                  isPlaying ? 'translate-x-8 animate-spin' : 'group-hover:translate-x-4'
                }`}
                style={{ animationDuration: '6s' }}
              >
                <Disc3 className="w-16 h-16 text-slate-600" />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-blue text-white shadow-xs">
                  {album.type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {album.year}
                </span>
                <span className="text-xs text-slate-500 font-medium">{album.tracks}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {album.title}
              </h2>

              <Link
                href={`/artistes/${album.artistSlug}`}
                onClick={onClose}
                className="inline-block text-base font-bold text-brand-blue hover:underline"
              >
                Par {album.artist}
              </Link>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                {album.description ||
                  `Découvrez l’univers sonore, les titres inédits et les collaborations majeures du projet de ${album.artist}, disponible en écoute sur toutes les plateformes.`}
              </p>

              {/* Audio Player Active Ticker */}
              {playingTrack && (
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-xs text-brand-blue animate-in fade-in">
                  <div className="flex items-center gap-2 truncate font-semibold">
                    <Volume2 className="w-4 h-4 animate-pulse shrink-0" />
                    <span className="truncate">
                      Extrait en lecture : <strong>{playingTrack}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-2.5 py-1 rounded-lg bg-brand-blue text-white font-bold text-[10px] shadow-xs"
                  >
                    {isPlaying ? 'Pause' : 'Reprendre'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* External Streaming Buttons (Spotify, Apple Music, Deezer, Boomplay, YouTube) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-brand-blue" />
                <span>Écouter l'album complet sur votre plateforme :</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">
                (S’ouvre dans un nouvel onglet sans fermer Rap Ivoire)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
              {/* 1. SPOTIFY */}
              <a
                href={album.streamingLinks?.spotify || 'https://open.spotify.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 rounded-xl bg-[#1DB954] hover:bg-[#18A246] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Music2 className="w-4 h-4 fill-current" />
                <span>Spotify</span>
              </a>

              {/* 2. APPLE MUSIC */}
              <a
                href={album.streamingLinks?.appleMusic || 'https://music.apple.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 rounded-xl bg-[#FA243C] hover:bg-[#E01E35] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Disc3 className="w-4 h-4" />
                <span>Apple Music</span>
              </a>

              {/* 3. DEEZER */}
              <a
                href={album.streamingLinks?.deezer || 'https://www.deezer.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 rounded-xl bg-[#A238FF] hover:bg-[#8F23EF] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Radio className="w-4 h-4" />
                <span>Deezer</span>
              </a>

              {/* 4. BOOMPLAY */}
              <a
                href={album.streamingLinks?.boomplay || 'https://www.boomplay.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 rounded-xl bg-[#0084FF] hover:bg-[#0070DB] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Music2 className="w-4 h-4" />
                <span>Boomplay</span>
              </a>

              {/* 5. YOUTUBE */}
              <a
                href={album.streamingLinks?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 sm:col-span-1 px-3.5 py-3 rounded-xl bg-[#FF0000] hover:bg-[#D90000] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Interactive Tracklist */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
              <Disc3 className="w-5 h-5 text-brand-blue" />
              <span>Tracklist & Extraits Officiels</span>
            </h3>

            <div className="divide-y divide-slate-200 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              {defaultTracklist.map((track, i) => {
                const isThisPlaying = playingTrack === track.title && isPlaying;
                return (
                  <div
                    key={i}
                    onClick={() => toggleTrack(track.title)}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isThisPlaying
                        ? 'bg-blue-50 text-brand-blue'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs text-slate-400 w-6">
                        {track.number}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isThisPlaying ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isThisPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{track.title}</p>
                        {track.feat && <p className="text-[11px] text-slate-500">{track.feat}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span>{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar with Close */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            RAP IVOIRE • Lecteur Multimédia Officiel
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
          >
            ← Retourner sur Rap Ivoire
          </button>
        </div>
      </div>
    </div>
  );
}
