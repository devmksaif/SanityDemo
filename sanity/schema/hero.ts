// schemas/hero.ts
import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "Main headline text for the hero section",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      description: "Subheadline or tagline under the main headline",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video (Cloudinary)",
      type: "cloudinary.asset",
      description: "Upload video for hero background from Cloudinary",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image (Cloudinary)",
      type: "cloudinary.asset",
      description: "Fallback image if video is not provided, hosted on Cloudinary",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      media: "heroImage",
    },
  },
});
