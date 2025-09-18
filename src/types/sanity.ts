import type { Image } from 'sanity';

export type HomePageData = {
  heroHeadline: string;
  heroSubheadline: string;
};

export type CaseStudyData = {
  _id: string;
  title: string;
  tag: string;
  image: Image;
};