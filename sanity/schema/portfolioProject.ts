import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',   // <- important
      to: [{ type: 'author' }],  // points to your author schema
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: (Rule) => Rule.required().error('Slug is required for SEO'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Film, App, Music',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Division',
      type: 'reference',
      to: [{ type: 'division' }],
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'cloudinary.asset',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Project Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'thumbnailImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : '⚠️ Missing slug',
        media,
      }
    },
  },
})