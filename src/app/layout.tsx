import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopProgressBar from "@/components/layout/TopProgressBar";
import StickyActionBar from "@/components/layout/StickyActionBar";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import GtmNoScript from "@/components/layout/GtmNoScript";
import AnalyticsAutoTracker from "@/components/layout/AnalyticsAutoTracker";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

const SITE_TITLE = "TechPro Heating & Cooling | San Carlos, CA HVAC";
const SITE_DESCRIPTION =
  "Family-owned heating and cooling for San Mateo County since 2005. Professional HVAC installation, repair, and maintenance services.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://techprohvac.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | TechPro Heating & Cooling",
  },
  description: SITE_DESCRIPTION,
  applicationName: "TechPro Heating & Cooling",
  keywords: [
    "HVAC San Carlos",
    "heating and cooling San Mateo County",
    "AC repair",
    "heat pump installation",
    "furnace maintenance",
    "water heater services",
    "ductless mini-split",
    "indoor air quality",
    "Bay Area HVAC contractor",
  ],
  authors: [{ name: "TechPro Heating & Cooling" }],
  creator: "TechPro Heating & Cooling",
  publisher: "TechPro Heating & Cooling",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "TechPro Heating & Cooling",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} antialiased`}>
      <head>
        {/* Preconnect to origins we fetch from early in the page life so DNS /
            TLS handshakes complete in parallel with HTML parsing — meaningful
            for Housecall Pro (booking iframe + chat bubble), Google Fonts,
            and OpenFreeMap tiles used by the projects map. */}
        <link rel="preconnect" href="https://book.housecallpro.com" />
        <link rel="dns-prefetch" href="https://book.housecallpro.com" />
        <link rel="preconnect" href="https://chat.housecallpro.com" />
        <link rel="dns-prefetch" href="https://chat.housecallpro.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://tiles.openfreemap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tiles.openfreemap.org" />
      </head>
      <body
        className="min-h-screen flex flex-col pb-[84px] lg:pb-0"
        suppressHydrationWarning
      >
        <GtmNoScript />
        <GoogleAnalytics />
        <AnalyticsAutoTracker />
        <TopProgressBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyActionBar />
        <Script
          id="housecall-pro-chat-bubble"
          src="https://chat.housecallpro.com/proChat.js"
          data-color="#F15A29"
          data-organization="419e6050-bc8f-4dc9-9053-e6abd3bc5229"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
