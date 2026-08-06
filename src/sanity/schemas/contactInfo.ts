import { defineField, defineType } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link',
      type: 'string',
      description: 'tel: link value (e.g. tel:6502756357).',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) =>
        rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false }),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The embed URL for an iframe Google Map.',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
    }),
    defineField({
      name: 'emergencyHours',
      title: 'Emergency Hours',
      type: 'string',
    }),
    defineField({
      name: 'license',
      title: 'License Number',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Information' }
    },
  },
})
