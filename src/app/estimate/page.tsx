import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, Shield, Clock, Receipt } from "lucide-react";
import EstimateWizard from "@/components/estimate/EstimateWizard";
import { SITE_NAME } from "@/lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

export const metadata: Metadata = {
  title: "Get Your Instant HVAC Estimate",
  description:
    "60-second instant price range for heat pump, mini-split, furnace, AC, water heater, ductwork and maintenance in San Mateo County. No sign-up, no spam.",
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: `Instant HVAC Estimate | ${SITE_NAME}`,
    description:
      "Get a typical install price range in under 60 seconds — then book a free in-home visit for the real quote.",
    type: "website",
    url: "/estimate",
  },
};

export default function EstimatePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Instant Estimate",
        item: `${SITE_URL}/estimate`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-navy text-white">
        <div className="container-site py-12 md:py-16">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Instant Estimate</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-5">
              Instant Estimate · 60 seconds
            </span>
            <h1 className="text-[clamp(30px,4.6vw,52px)] font-[800] tracking-[-.02em] leading-[1.08] mb-5">
              See a real price range in{" "}
              <span className="text-orange">under a minute</span>.
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed max-w-2xl">
              No sign-up, no sales call. Answer four quick questions and
              we&apos;ll show you the typical installed cost for your service
              and home size in San Mateo County.
            </p>
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-white/75">
              <li className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-orange" />
                No spam — one follow-up only
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange" />
                Takes about 60 seconds
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-orange" />
                Rebate hints included
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="max-w-4xl mx-auto -mt-20 md:-mt-24 relative z-10">
            <Suspense
              fallback={
                <div className="bg-white rounded-[24px] border border-border-light shadow-[0_24px_60px_-28px_rgba(10,19,41,0.22)] p-10 min-h-[460px] animate-pulse" />
              }
            >
              <EstimateWizard />
            </Suspense>
            <p className="text-[12.5px] text-text-muted text-center mt-5 max-w-2xl mx-auto leading-relaxed">
              Price ranges are typical San Mateo County installed costs for
              2026 and are not a binding quote. Your exact price depends on
              load calculation, panel capacity, permits, venting, and the
              rebates you qualify for. A free in-home estimate confirms the
              real number.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
