import { client } from '@/lib/sanity/client'
import type { QueryParams } from 'next-sanity'

/**
 * Typed wrapper around the Sanity client fetch with error handling
 * and Next.js revalidation support.
 *
 * @param query  - GROQ query string
 * @param params - Query parameters (e.g. { slug: "ac-repair" })
 * @param options - Caching / revalidation config
 * @returns The query result typed as T
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: QueryParams = {},
  options: {
    /** Next.js revalidation interval in seconds. Set to 0 to disable caching. */
    revalidate?: number | false
    /** Next.js cache tags for on-demand revalidation via revalidateTag(). */
    tags?: string[]
  } = {}
): Promise<T> {
  const { revalidate = 60, tags = [] } = options

  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate === false ? 0 : revalidate,
        tags,
      },
    })

    return result
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown Sanity fetch error'

    console.error(`[sanityFetch] ${message}`, { query, params })
    throw new Error(`Failed to fetch data from Sanity: ${message}`)
  }
}

/**
 * Convenience helper for fetching a single document by slug.
 * Returns null instead of throwing when the document is not found.
 */
export async function sanityFetchBySlug<T = unknown>(
  query: string,
  slug: string,
  options: {
    revalidate?: number | false
    tags?: string[]
  } = {}
): Promise<T | null> {
  const result = await sanityFetch<T | null>(query, { slug }, options)
  return result ?? null
}
