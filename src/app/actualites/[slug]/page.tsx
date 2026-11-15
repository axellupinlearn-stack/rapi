import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Tag,
  Share2,
  Disc3,
  Flame,
  Volume2
} from 'lucide-react';
import { getArticleBySlug, getArticles, incrementArticleViews } from '@/lib/db';
import { formatDate, formatNumber } from '@/lib/utils';
import ArticleCard from '@/components/articles/ArticleCard';
import ShareButtons from '@/components/articles/ShareButtons';
import CommentsSection from '@/components/articles/CommentsSection';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article non trouvé — RAP IVOIRE' };

  return {
    title: `${article.title} — RAP IVOIRE`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.coverImage],
    },
  };
}

export default function SingleArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  // Increment views
  incrementArticleViews(article.id);

  // Get related articles
  const allArticles = getArticles({ status: 'published' });
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Helper for YouTube embed
  const getYoutubeEmbed = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbed = getYoutubeEmbed(article.youtubeUrl);

  return (
    <article className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue" />
            <span>← Retour aux actualités</span>
          </Link>
        </div>

        {/* Category & Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-blue text-white shadow-xs">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-blue" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-blue" />
              {article.readTime} de lecture
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Eye className="w-3.5 h-3.5 text-brand-blue" />
              {formatNumber(article.views)} consultations
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          {/* Subtitle / Chapeau */}
          {article.subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed border-l-4 border-brand-blue pl-4 italic">
              {article.subtitle}
            </p>
          )}

          {/* Author Badge & Share Row */}
          <div className="py-4 border-y border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-blue/30 shadow-xs">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold shadow-xs">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold text-sm text-slate-900">{article.author.name}</p>
                <p className="text-xs text-brand-blue font-semibold">{article.author.role}</p>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons title={article.title} />
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-6 pt-4
          [&>h2]:font-editorial [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4
          [&>p]:text-base [&>p]:sm:text-lg [&>p]:leading-relaxed
          [&>.editorial-quote]:p-6 [&>.editorial-quote]:my-8 [&>.editorial-quote]:bg-blue-50/70 [&>.editorial-quote]:border-l-4 [&>.editorial-quote]:border-brand-blue [&>.editorial-quote]:rounded-r-2xl [&>.editorial-quote]:text-xl [&>.editorial-quote]:font-bold [&>.editorial-quote]:text-slate-900
          [&>.editorial-quote>span]:block [&>.editorial-quote>span]:text-xs [&>.editorial-quote>span]:font-semibold [&>.editorial-quote>span]:text-brand-blue [&>.editorial-quote>span]:mt-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Embedded Video (Local Upload OR YouTube) */}
        {article.localVideoUrl ? (
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 aspect-video shadow-lg bg-black">
            <video
              src={article.localVideoUrl}
              controls
              className="w-full h-full object-contain"
            />
          </div>
        ) : youtubeEmbed ? (
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 aspect-video shadow-lg bg-black">
            <iframe
              src={youtubeEmbed}
              title={article.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}

        {/* Additional Images Gallery if present */}
        {article.images && article.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {article.images.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-2xl overflow-hidden shadow-xs border border-slate-200">
                <Image src={img} alt={`${article.title} image ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Related Artists Tags */}
        {article.relatedArtists && article.relatedArtists.length > 0 && (
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Disc3 className="w-4 h-4 text-brand-blue" />
              <span>Artistes mentionnés dans cet article :</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.relatedArtists.map((artistName) => (
                <Link
                  key={artistName}
                  href={`/artistes`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 hover:text-brand-blue transition-colors"
                >
                  {artistName}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/actualites?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md border border-slate-200 font-medium transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Second Share Bar at the bottom */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/90 to-slate-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Vous avez aimé cet article ?</h4>
            <p className="text-xs text-slate-600">Partagez-le avec votre communauté rap sur WhatsApp et les réseaux.</p>
          </div>
          <ShareButtons title={article.title} />
        </div>

        {/* Comments Section */}
        <CommentsSection articleId={article.id} articleSlug={article.slug} />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <h3 className="font-editorial text-2xl font-bold text-slate-900">
              DANS LA MÊME THÉMATIQUE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
