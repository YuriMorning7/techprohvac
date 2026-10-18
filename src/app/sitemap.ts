import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://techprohvac.com";

// Keep this list in sync with generateStaticParams in
// src/app/services/[slug]/page.tsx — every slug here must resolve.
const serviceSlugs = [
  "heat-pump-installation",
  "ac-repair",
  "furnace-maintenance",
  "heating-repair",
  "installation",
  "maintenance",
  "duct-services",
  "indoor-air-quality",
  "repairs",
  "water-heater-services",
  "ductless-mini-splits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // /services, /products, /projects, /about index pages hidden from nav for
    // now — kept out of the sitemap so they aren't indexed while hidden. The
    // underlying files still exist and the routes still resolve.
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

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
