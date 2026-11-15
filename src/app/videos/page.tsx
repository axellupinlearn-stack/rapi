'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Video, Eye, Filter, Sparkles } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import VideoModal from '@/components/ui/VideoModal';

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('Tous');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVideos(data.videos);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['Tous', 'Clip Officiel', 'Freestyle', 'Interview', 'Documentaire'];

  const filtered = selectedCat === 'Tous'
    ? videos
    : videos.filter((v) => v.category === selectedCat);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Video className="w-4 h-4 text-brand-blue" />
          <span>VIDÉOTHÈQUE & SESSIONS</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          CLIPS, FREESTYLES & SESSIONS
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
          Visionnez les clips officiels, les performances en live, les freestyles de rue et les documentaires immersifs au cœur du hip-hop ivoirien.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCat === cat
                ? 'bg-brand-blue text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200 shadow-xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Chargement des vidéos...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-xs">
          <p className="text-base font-bold text-slate-900">Aucune vidéo dans cette catégorie pour l’instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-blue/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute inset-0 bg-slate-950/35 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                    {vid.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
                    {vid.duration}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                  {vid.artist}
                </p>

                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                  {vid.title}
                </h3>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Eye className="w-3.5 h-3.5 text-brand-blue" />
                    {formatNumber(vid.views)} vues
                  </span>
                  <span className="text-brand-blue font-bold group-hover:underline">
                    Regarder →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.youtubeUrl}
          title={activeVideo.title}
        />
      )}
    </div>
  );
}
