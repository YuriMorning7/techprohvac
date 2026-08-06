export interface Service {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  icon?: string
  image?: SanityImage
  features?: string[]
  order?: number
}

export interface Product {
  _id: string
  title: string
  slug: string
  brand: string
  model?: string
  description: string
  image?: SanityImage
  category: 'heating' | 'cooling' | 'air-quality' | 'other'
  features?: string[]
  specifications?: Record<string, string>
}

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  images?: SanityImage[]
  services?: string[]
  location?: string
  completedAt?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  body: any[]
  coverImage?: SanityImage
  author?: TeamMember
  publishedAt: string
  categories?: string[]
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio?: string
  image?: SanityImage
  certifications?: string[]
  order?: number
}

export interface Testimonial {
  _id: string
  name: string
  location?: string
  rating: number
  text: string
  service?: string
  date?: string
  source?: 'google' | 'yelp' | 'manual'
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface ContactInfo {
  phone: string
  phoneHref: string
  address: string
  cityStateZip: string
  email?: string
  officeHours: string
  emergencyHours: string
  license: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  logo?: SanityImage
  contactInfo: ContactInfo
  socialLinks?: {
    google?: string
    yelp?: string
    facebook?: string
    nextdoor?: string
  }
  googleRating?: string
  yearsInBusiness?: string
  citiesServed?: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}
