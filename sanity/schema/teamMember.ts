import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'cloudinary.asset', // Use the type provided by the plugin
      description: 'Upload or select an image from Cloudinary.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'A number to sort the team members (e.g., 1 for CEO). Lower numbers appear first.',
      validation: (Rule) => Rule.unique(),
    }),
    // Note: The other fields like bio, email, etc., were in the frontend component but not the schema.
    // You can add them here if you want them to be editable in Sanity.
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})