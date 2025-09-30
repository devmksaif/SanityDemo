import type { Image } from 'sanity';

export type HomePageData = {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBackgroundImage?: Image;
};

export type DivisionData = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  logo?: Image;
  coverImage: Image;
};

export type PortfolioProjectData = {
  author: any;
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  division?: {
    title: string;
  };
  thumbnailImage: Image;
  releaseDate?: string;
  body?: any[]; // Portable Text
};

export type NewsArticleData = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  coverImage: Image;
  excerpt: string;
  body?: any[]; // Portable Text
};

export type TeamMemberData = {
  _id: string;
  name: string;
  role: string;
  image?: {
    _type: 'cloudinary.asset' | 'image' | 'sanity.imageAsset';
    public_id?: string; // For Cloudinary
    _id?: string; // For Sanity
    url?: string; // Raw URL (Cloudinary secure_url)
    asset?: any; // Sanity asset reference
    secure_url?: string; // Cloudinary secure URL
  };
  bio?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  socialLinks?: Array<{
    platform?: string;
    url: string;
  }>;
};