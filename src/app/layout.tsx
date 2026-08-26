import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopProgressBar from "@/components/layout/TopProgressBar";
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
    icon: "/images/Techpro_logo.png",
    apple: "/images/Techpro_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <TopProgressBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
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
