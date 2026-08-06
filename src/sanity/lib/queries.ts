import { groq } from 'next-sanity'

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const getAllServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    image,
    features,
    order
  }
`

export const getServiceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    icon,
    image,
    gallery,
    features,
    faqs,
    seo,
    order
  }
`

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const getAllProductsQuery = groq`
  *[_type == "product" && status == "active"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    price,
    description,
    image,
    brands,
    features,
    status,
    order
  }
`

export const getProductsByCategoryQuery = groq`
  *[_type == "product" && category == $category && status == "active"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    price,
    description,
    image,
    brands,
    features,
    status,
    order
  }
`

export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    price,
    description,
    content,
    specifications,
    image,
    gallery,
    brands,
    features,
    status,
    seo,
    order
  }
`

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(completionDate desc) {
    _id,
    title,
    slug,
    client,
    location,
    completionDate,
    industry,
    category,
    description,
    image,
    services,
    technologies
  }
`

export const getProjectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(completionDate desc) {
    _id,
    title,
    slug,
    client,
    location,
    completionDate,
    industry,
    category,
    description,
    image,
    services,
    technologies
  }
`

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    location,
    completionDate,
    industry,
    category,
    description,
    challenges,
    solutions,
    content,
    image,
    gallery,
    technologies,
    services,
    testimonial->{
      _id,
      clientName,
      company,
      location,
      rating,
      review,
      initials
    },
    seo
  }
`

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const getAllTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    clientName,
    company,
    location,
    rating,
    review,
    service,
    source,
    date,
    initials,
    order
  }
`

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export const getAllFaqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

export const getFaqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export const getTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    bio,
    photo,
    certifications,
    socialLinks,
    order
  }
`

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logo,
    favicon,
    siteName,
    siteDescription,
    siteUrl,
    phone,
    email,
    address,
    city,
    state,
    zip,
    googleMapsUrl,
    license,
    officeHours,
    emergencyHours,
    socialLinks,
    defaultSeo,
    bookingUrl,
    bookingButtonLabel,
    bookingEnabled,
    navigation,
    footerText,
    copyright,
    googleRating,
    yearsInBusiness,
    citiesServed,
    analyticsId
  }
`

// ---------------------------------------------------------------------------
// Contact Info (singleton)
// ---------------------------------------------------------------------------

export const getContactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    phone,
    phoneHref,
    email,
    address,
    city,
    state,
    zip,
    googleMapsEmbed,
    officeHours,
    emergencyHours,
    license
  }
`

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export const getAllBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    categories,
    tags,
    author->{
      _id,
      name,
      position,
      photo
    }
  }
`

export const getBlogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    categories,
    tags,
    author->{
      _id,
      name,
      position,
      bio,
      photo
    },
    seo
  }
`

export const getBlogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && $category in categories] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    categories,
    tags,
    author->{
      _id,
      name,
      position,
      photo
    }
  }
`
