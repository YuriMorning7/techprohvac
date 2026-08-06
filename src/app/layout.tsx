import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "TechPro Heating & Cooling | San Carlos, CA HVAC",
  description:
    "Family-owned heating and cooling for San Mateo County since 2005. Professional HVAC installation, repair, and maintenance services.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://techprohvac.com"
  ),
  openGraph: {
    title: "TechPro Heating & Cooling | San Carlos, CA HVAC",
    description:
      "Family-owned heating and cooling for San Mateo County since 2005.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
