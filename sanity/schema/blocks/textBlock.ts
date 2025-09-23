import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }], // This enables the rich text editor
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const text = content?.[0]?.children?.[0]?.text || 'No text content';
      return {
        title: 'Text Block',
        subtitle: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
      };
    },
  },
})