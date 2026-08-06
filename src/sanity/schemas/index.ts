import { service } from './service'
import { product } from './product'
import { project } from './project'
import { blogPost } from './blogPost'
import { teamMember } from './teamMember'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { siteSettings } from './siteSettings'
import { contactInfo } from './contactInfo'

export const schemaTypes = [
  // Documents
  service,
  product,
  project,
  blogPost,
  teamMember,
  testimonial,
  faq,

  // Singletons
  siteSettings,
  contactInfo,
]
