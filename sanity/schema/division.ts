import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'division',
  title: 'Division',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'divisionType',
      title: 'Division Type',
      type: 'string',
      description: 'A short tag for the division (e.g., Film, Music, App).',
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
      name: 'author',
      title: 'Author',
      type: 'reference',   // <- important
      to: [{ type: 'author' }],  // points to your author schema
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'A square or circular logo is recommended.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'logo',
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