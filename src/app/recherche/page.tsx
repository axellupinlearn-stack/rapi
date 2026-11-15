'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Newspaper, Mic2, Video, ArrowRight, Eye, Clock } from 'lucide-react';
import { Article, Artist, VideoItem } from '@/lib/types';
import { formatNumber, formatDate } from '@/lib/utils';
import VideoModal from '@/components/ui/VideoModal';

export default function RecherchePage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'artists' | 'videos'>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    // Load all data
    Promise.all([
      fetch('/api/articles?status=published').then((r) => r.json()),
      fetch('/api/artistes').then((r) => r.json()),
      fetch('/api/videos').then((r) => r.json()),
    ]).then(([artData, artistData, vidData]) => {
      if (artData.success) setArticles(artData.articles);
      if (artistData.success) setArtists(artistData.artists);
      if (vidData.success) setVideos(vidData.videos);
    });
  }, []);

  const q = query.toLowerCase().trim();

  const matchingArticles = articles.filter(
    (a) =>
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );

  const matchingArtists = artists.filter(
    (art) =>
      !q ||
      art.name.toLowerCase().includes(q) ||
      (art.realName && art.realName.toLowerCase().includes(q)) ||
      art.commune.toLowerCase().includes(q) ||
      art.genre.toLowerCase().includes(q)
  );

  const matchingVideos = videos.filter(
    (v) =>
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.artist.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
  );

  const totalResults = matchingArticles.length + matchingArtists.length + matchingVideos.length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          RECHERCHE RAP IVOIRE
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Trouvez un article, un artiste, un clip, un freestyle ou une interview en temps réel.
        </p>

        {/* Big Search Input */}
        <div className="relative pt-2">
          <Search className="w-5 h-5 absolute left-4.5 top-1/2 translate-y-[-20%] text-brand-blue" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : Didi B, Drill, Marcory, Tala, Suspect 95..."
            className="w-full bg-white border-2 border-slate-200 focus:border-brand-blue rounded-2xl pl-12 pr-4 py-4 text-slate-900 text-base placeholder-slate-400 shadow-sm focus:outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Entity Tabs */}
        <div className="flex justify-center flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tous les résultats ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'articles'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Articles ({matchingArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'artists'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Artistes ({matchingArtists.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Vidéos ({matchingVideos.length})
          </button>
        </div>
      </div>

      {/* Results Content */}
      <div className="space-y-12">
        {/* Section 1: Artists Results */}
        {(activeTab === 'all' || activeTab === 'artists') && matchingArtists.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Mic2 className="w-5 h-5 text-brand-blue" />
              <span>Artistes ({matchingArtists.length})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {matchingArtists.map((art) => (
                <Link
                  key={art.id}
                  href={`/artistes/${art.slug}`}
                  className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-blue/50 text-center transition-all shadow-xs hover:shadow-md"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 ring-2 ring-blue-100 group-hover:ring-brand-blue">
                    <Image src={art.photo} alt={art.name} fill className="object-cover" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-blue truncate">
                    {art.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-semibold">{art.commune}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Articles Results */}
        {(activeTab === 'all' || activeTab === 'articles') && matchingArticles.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Newspaper className="w-5 h-5 text-brand-blue" />
              <span>Articles & Interviews ({matchingArticles.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingArticles.map((art) => (
                <div
                  key={art.id}
                  className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-blue/50 rounded-2xl p-4 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                    <Image src={art.coverImage} alt={art.title} fill className="object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-blue text-white shadow-xs">
                      {art.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      <Link href={`/actualites/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{art.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-3">
                    <span>{formatDate(art.publishedAt)}</span>
                    <Link href={`/actualites/${art.slug}`} className="text-brand-blue font-bold hover:underline">
                      Lire →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Videos Results */}
        {(activeTab === 'all' || activeTab === 'videos') && matchingVideos.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Video className="w-5 h-5 text-brand-blue" />
              <span>Vidéos & Clips ({matchingVideos.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className="group bg-white border border-slate-200 hover:border-brand-blue/50 rounded-2xl overflow-hidden cursor-pointer p-3 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                    <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover" />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-blue line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-brand-blue font-semibold">{vid.artist}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3 shadow-xs">
            <p className="text-lg font-bold text-slate-900">Aucun résultat trouvé pour "{query}"</p>
            <p className="text-xs text-slate-500">Vérifiez l’orthographe ou essayez un terme plus général (ex: "rap", "clip", "Abidjan").</p>
          </div>
        )}
      </div>

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.youtubeUrl}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
