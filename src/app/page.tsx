import React from 'react';
import { getArticles, getArtists, getVideos } from '@/lib/db';
import HeroBanner from '@/components/home/HeroBanner';
import LatestNewsGrid from '@/components/home/LatestNewsGrid';
import RapIvoireSection from '@/components/home/RapIvoireSection';
import NewReleases from '@/components/home/NewReleases';
import VideoGallerySection from '@/components/home/VideoGallerySection';
import ArtistSpotlight from '@/components/home/ArtistSpotlight';
import InterviewsSection from '@/components/home/InterviewsSection';
import TrendingSection from '@/components/home/TrendingSection';
import NewsletterBanner from '@/components/home/NewsletterBanner';

export const revalidate = 0; // Always fresh content

export default function HomePage() {
  const allArticles = getArticles({ status: 'published' });
  const artists = getArtists();
  const videos = getVideos();

  const featuredArticle = allArticles.find((a) => a.isFeatured) || allArticles[0];
  const subFeatured = allArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);
  const remainingArticles = allArticles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Section */}
      <HeroBanner featuredArticle={featuredArticle} subFeatured={subFeatured} />

      {/* 2. Asymmetric Latest News Grid */}
      <LatestNewsGrid articles={remainingArticles} />

      {/* 3. Rap Ivoire Focus Section */}
      <RapIvoireSection articles={allArticles} />

      {/* 4. New Releases & Projects */}
      <NewReleases artists={artists} />

      {/* 5. Clips & Videos Gallery */}
      <VideoGallerySection videos={videos} />

      {/* 6. Artists Spotlight */}
      <ArtistSpotlight artists={artists} />

      {/* 7. Long-form Interviews & Quotes */}
      <InterviewsSection articles={allArticles} />

      {/* 8. Top Trends */}
      <TrendingSection articles={allArticles} />

      {/* 9. Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
}
