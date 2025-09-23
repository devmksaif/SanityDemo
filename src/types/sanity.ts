import type { Image } from 'sanity';

export type HomePageData = {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBackgroundImage?: Image;
};

export type DivisionData = {
  _id: string;
  title: string;
  description: string;
  logo?: Image;
  coverImage: Image;
};