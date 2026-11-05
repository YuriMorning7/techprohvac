import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { cities } from "@/content/cities";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core site pages that search engines should always index.
  // /services, /services/*, /products, /projects, /about are 308-redirected
  // to the home-page anchors (next.config.ts + src/proxy.ts), so they are
  // deliberately omitted here.
  const core: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
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

  const blogPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.completionDate + "T12:00:00Z"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE_URL}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    // Cities with real local projects rank higher — stronger priority.
    priority: c.projectCount > 0 ? 0.8 : 0.5,
  }));

  return [...core, ...blogPages, ...cityPages];
}
