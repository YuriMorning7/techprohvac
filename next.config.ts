import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Permanent redirects for pages hidden from the nav.
  // Keeps Google/old links from landing on dead-end pages — they bounce
  // to the matching section anchor on the home page instead.
  async redirects() {
    return [
      // beforeFiles — these fire BEFORE Next looks at files/pages, so the
      // SSG-prerendered /services/[slug] detail pages are short-circuited
      // and bounced to the home-page section anchor instead.
      {
        source: "/services/:slug*",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/products/:slug*",
        destination: "/#products",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/#products",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ].map((r) => ({ ...r })) as never;
  },
};

export default nextConfig;
