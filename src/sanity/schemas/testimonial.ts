import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Optional company name for commercial clients.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or neighborhood (e.g. "San Carlos, CA").',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      description: 'Which service the review relates to.',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Yelp', value: 'yelp' },
          { title: 'Manual', value: 'manual' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'Displayed in the avatar if no photo is provided.',
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Rating (Highest)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'location',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unnamed Client',
        subtitle: subtitle || '',
      }
    },
  },
})
