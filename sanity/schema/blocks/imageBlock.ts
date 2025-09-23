import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'caption',
    },
    prepare({ media, title }) {
      return {
        title: 'Image Block',
        subtitle: title || 'No caption',
        media,
      };
    },
  },
})