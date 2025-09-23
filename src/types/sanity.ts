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
  image: Image;
};