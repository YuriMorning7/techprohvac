import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // --- Branding ---
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'TechPro Heating & Cooling',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Square image used as the browser tab icon.',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'TechPro Heating & Cooling',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'The canonical URL of the website (e.g. https://techprohvac.com).',
    }),

    // --- Contact ---
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'license',
      title: 'License Number',
      type: 'string',
      description: 'Contractor license (e.g. CSLB #860715).',
    }),

    // --- Hours ---
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      initialValue: 'Monday-Friday, 8:00 AM - 4:00 PM',
    }),
    defineField({
      name: 'emergencyHours',
      title: 'Emergency Hours',
      type: 'string',
      initialValue: 'Answering service 24/7',
    }),

    // --- Social Links ---
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'yelp',
          title: 'Yelp URL',
          type: 'url',
        }),
        defineField({
          name: 'google',
          title: 'Google Business URL',
          type: 'url',
        }),
        defineField({
          name: 'nextdoor',
          title: 'Nextdoor URL',
          type: 'url',
        }),
      ],
    }),

    // --- SEO Defaults ---
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      description: 'Fallback SEO values used when a page does not define its own.',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
        }),
      ],
    }),

    // --- Booking ---
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'External booking / scheduling link.',
    }),
    defineField({
      name: 'bookingButtonLabel',
      title: 'Booking Button Label',
      type: 'string',
      initialValue: 'Book Online',
    }),
    defineField({
      name: 'bookingEnabled',
      title: 'Booking Enabled',
      type: 'boolean',
      initialValue: true,
    }),

    // --- Navigation ---
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),

    // --- Footer ---
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description: 'Copyright notice shown in the footer.',
    }),

    // --- Metrics ---
    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'string',
    }),
    defineField({
      name: 'yearsInBusiness',
      title: 'Years in Business',
      type: 'string',
    }),
    defineField({
      name: 'citiesServed',
      title: 'Cities Served',
      type: 'string',
    }),

    // --- Analytics ---
    defineField({
      name: 'analyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'GA4 Measurement ID (e.g. G-XXXXXXXXXX).',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
