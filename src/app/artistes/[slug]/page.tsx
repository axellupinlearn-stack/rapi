import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Music2,
  Disc3,
  Calendar,
  Share2,
  ArrowLeft,
  Play,
  Instagram,
  Facebook,
  ExternalLink,
  Radio
} from 'lucide-react';
import { getArtistBySlug, getArticles, getVideos } from '@/lib/db';
import ArticleCard from '@/components/articles/ArticleCard';

interface ArtistPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) return { title: 'Artiste non trouvé — RAP IVOIRE' };

  return {
    title: `${artist.name} — RAP IVOIRE`,
    description: artist.bio,
    openGraph: {
      title: `${artist.name} — RAP IVOIRE`,
      description: artist.bio,
      images: [artist.photo],
    },
  };
}

export default function SingleArtistPage({ params }: ArtistPageProps) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) notFound();

  const allArticles = getArticles({ status: 'published' });
  const relatedArticles = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(artist.name.toLowerCase()) ||
      a.summary.toLowerCase().includes(artist.name.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(artist.name.toLowerCase()))
  );

  const allVideos = getVideos();
  const artistVideos = allVideos.filter(
    (v) =>
      v.artist.toLowerCase().includes(artist.name.toLowerCase()) ||
      v.title.toLowerCase().includes(artist.name.toLowerCase())
  );

  return (
    <div className="pb-20">
      {/* Banner / Cover */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 overflow-hidden">
        {artist.coverImage && (
          <Image
            src={artist.coverImage}
            alt={artist.name}
            fill
            priority
            className="object-cover opacity-60 brightness-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            href="/artistes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-xs font-bold text-slate-900 shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue" />
            <span>Tous les artistes</span>
          </Link>
        </div>
      </div>

      {/* Profile Header Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10 space-y-10">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl shrink-0">
              <Image
                src={artist.photo}
                alt={artist.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-blue text-white shadow-xs">
                  {artist.genre}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  {artist.commune}
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
                {artist.name}
              </h1>

              {artist.realName && (
                <p className="text-sm text-slate-500 italic">
                  Nom civil : <span className="text-slate-800 font-semibold">{artist.realName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Socials & Streaming */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
            {artist.socialLinks?.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {artist.socialLinks?.facebook && (
              <a
                href={artist.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {/* Spotify */}
            <a
              href={artist.streamingLinks?.spotify || `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#18A246] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Music2 className="w-4 h-4 fill-current" />
              <span>Spotify</span>
            </a>
            {/* Deezer */}
            <a
              href={`https://www.deezer.com/search/${encodeURIComponent(artist.name)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#A238FF] hover:bg-[#8F23EF] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Radio className="w-4 h-4" />
              <span>Deezer</span>
            </a>
            {/* Apple Music */}
            <a
              href={artist.streamingLinks?.appleMusic || `https://music.apple.com/search?term=${encodeURIComponent(artist.name)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FA243C] hover:bg-[#E01E35] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Disc3 className="w-4 h-4" />
              <span>Apple</span>
            </a>
          </div>
        </div>

        {/* 2-Columns: Bio & Popular Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bio (Col 7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
            <h2 className="font-editorial text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-brand-blue rounded-full"></span>
              Biographie & Parcours
            </h2>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>

          {/* Popular Tracks (Col 5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
            <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-brand-blue" />
              Hits & Morceaux Emblématiques
            </h2>
            <div className="space-y-2.5">
              {artist.popularTracks.map((track, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between group hover:border-brand-blue/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-editorial font-bold text-sm text-brand-blue w-6">
                      0{idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors">
                      {track}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-brand-blue group-hover:text-white transition-colors shadow-xs">
                    <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Discography */}
        <div className="space-y-6">
          <h2 className="font-editorial text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Disc3 className="w-6 h-6 text-brand-blue" />
            Discographie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artist.discography.map((album, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:border-brand-blue/50 transition-all shadow-xs hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-blue shrink-0">
                  <Disc3 className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-200">
                    {album.type}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mt-1">{album.title}</h4>
                  <p className="text-xs text-slate-500">Année de sortie : {album.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Associated News */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h2 className="font-editorial text-2xl font-bold text-slate-900">
              Actualités & Interviews de {artist.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
