'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Video, Eye, ArrowRight } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import VideoModal from '../ui/VideoModal';

interface VideoGallerySectionProps {
  videos: VideoItem[];
}

export default function VideoGallerySection({ videos }: VideoGallerySectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  if (!videos || videos.length === 0) return null;

  const featuredVideo = videos[0];
  const sideVideos = videos.slice(1, 4);

  return (
    <section className="py-14 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                CLIPS, FREESTYLES & VIDÉOS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Les productions visuelles les plus percutantes d’Abidjan
              </p>
            </div>
          </div>

          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
          >
            <span>Toute la vidéothèque</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Huge Video Spotlight (Col 7) */}
          <div
            onClick={() => setActiveVideo(featuredVideo)}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/90 hover:border-brand-blue/50 cursor-pointer transition-all duration-300 aspect-video lg:aspect-auto lg:min-h-[420px] flex flex-col justify-end shadow-lg"
          >
            <Image
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Play Button Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-xl shadow-brand-blue/40 group-hover:scale-110 transition-all duration-300">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>
            </div>

            {/* Badge & Duration */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-md">
                {featuredVideo.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 text-slate-300 backdrop-blur-md">
                {featuredVideo.duration}
              </span>
            </div>

            {/* Title & Artist */}
            <div className="relative z-10 p-6 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {featuredVideo.artist}
              </p>
              <h3 className="font-editorial text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors line-clamp-2">
                {featuredVideo.title}
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>{formatNumber(featuredVideo.views)} vues sur YouTube</span>
              </p>
            </div>
          </div>

          {/* Right Column with 3 video cards (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="group bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-brand-blue/50 rounded-2xl p-3.5 transition-all duration-300 flex items-center gap-4 cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="relative w-36 aspect-video rounded-xl overflow-hidden shrink-0 shadow-xs">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/15 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white">
                    {vid.duration}
                  </span>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                    {vid.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate font-semibold">{vid.artist}</span>
                    <span className="shrink-0">{formatNumber(vid.views)} vues</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.youtubeUrl}
          title={activeVideo.title}
        />
      )}
    </section>
  );
}
