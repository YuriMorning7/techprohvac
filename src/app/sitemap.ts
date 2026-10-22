import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://techprohvac.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only pages that should be indexed by search engines.
  // /services, /services/*, /products, /products/*, /projects, /about are
  // all 308-redirected to the home page in next.config.ts, so they are
  // deliberately omitted here. Service detail files still exist in the
  // repo but the redirect short-circuits them.
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
