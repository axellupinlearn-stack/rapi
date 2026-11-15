export type UserRole = 'admin' | 'editor' | 'contributor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  createdAt: string;
}

export type ArticleStatus = 'draft' | 'pending' | 'published';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string; // HTML or structured rich text
  category: string;
  coverImage: string;
  images?: string[];
  youtubeUrl?: string;
  localVideoUrl?: string;
  videoType?: 'youtube' | 'upload';
  quote?: {
    text: string;
    author: string;
  };
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
  relatedArtists?: string[];
  status: ArticleStatus;
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  realName?: string;
  commune: string; // e.g. "Cocody", "Yopougon", "Marcory", "Treichville", "Koumassi", "Abobo"
  genre: string; // e.g. "Drill Ivoire", "Rap Hardcore", "Afrotrap", "Maimouna Wave"
  bio: string;
  photo: string;
  coverImage?: string;
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    boomplay?: string;
    audiomack?: string;
  };
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    twitter?: string;
  };
  discography: {
    title: string;
    year: string;
    type: 'Album' | 'EP' | 'Mixtape' | 'Single';
    coverUrl?: string;
  }[];
  popularTracks: string[];
  debutYear?: string;
  isTrending?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  artist: string;
  category: 'Clip Officiel' | 'Freestyle' | 'Interview' | 'Performance' | 'Documentaire';
  youtubeUrl?: string;
  localVideoUrl?: string;
  videoType?: 'youtube' | 'upload';
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  isTrending?: boolean;
}

export interface CommentItem {
  id: string;
  articleId: string;
  articleSlug: string;
  authorName: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string;
  isVideo?: boolean;
  createdAt: string;
  dimensions?: string;
}

export interface SiteStats {
  totalArticles: number;
  publishedArticles: number;
  pendingArticles: number;
  draftArticles: number;
  totalViews: number;
  activeContributors: number;
}
