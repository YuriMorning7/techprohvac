import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Check,
  ArrowRight,
  CalendarCheck,
  Phone,
  BadgeCheck,
} from "lucide-react";
import { BRANDS } from "@/content/brands";
import { projects } from "@/content/projects";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  BOOKING_URL,
} from "@/lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

export const metadata: Metadata = {
  title: "HVAC Brands We Install",
  description:
    "TechPro Heating & Cooling is an authorized installer for Mitsubishi, Bryant, Carrier, Daikin, Rheem, Lennox and Trane across San Mateo County. See what each brand is best for.",
  alternates: { canonical: "/brands" },
  openGraph: {
    title: `HVAC Brands We Install | ${SITE_NAME}`,
    description:
      "Mitsubishi, Bryant, Carrier, Daikin, Rheem, Lennox and Trane — installed across San Mateo County since 2005.",
    type: "website",
    url: "/brands",
  },
};

// Project counts by brand drive the "X local installs" line beside each
// card. Computed at module load from the static content; no runtime cost.
const PROJECT_COUNT_BY_BRAND = projects.reduce<Record<string, number>>(
  (acc, p) => {
    const all = p.allEquipment ?? (p.equipment ? [p.equipment] : []);
    const seen = new Set<string>();
    all.forEach((e) => {
      if (!e?.brand) return;
      const key = e.brand.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      acc[key] = (acc[key] ?? 0) + 1;
    });
    return acc;
  },
  {}
);

export default function BrandsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Brands",
        item: `${SITE_URL}/brands`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HVAC brands TechPro Heating & Cooling installs",
    itemListElement: BRANDS.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Brand",
        name: b.name,
        description: b.about,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Brands</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-5">
              <BadgeCheck className="w-3.5 h-3.5" />
              Authorized Installer
            </span>
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-5">
              Brands we install, serviced by one{" "}
              <span className="text-orange">local crew</span>
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed max-w-2xl">
              We are an authorized installer for the seven brands below. We
              pick the brand that matches your home, your budget, and the
              rebates you qualify for — not the one with the biggest
              commission.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <ul className="grid lg:grid-cols-2 gap-6">
            {BRANDS.map((brand) => {
              const count = PROJECT_COUNT_BY_BRAND[brand.slug.toLowerCase()] ?? 0;
              return (
                <li
                  key={brand.slug}
                  className="bg-white rounded-[20px] border border-border-light overflow-hidden shadow-[0_2px_10px_-6px_rgba(10,19,41,0.06)] hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-shadow duration-300 flex flex-col"
                >
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-1.5">
                          {brand.tagline}
                        </p>
                        <h2 className="text-[24px] sm:text-[28px] font-[800] text-navy leading-tight tracking-tight">
                          {brand.name}
                        </h2>
                      </div>
                      {count > 0 && (
                        <span className="shrink-0 inline-flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-light-bg border border-border-light text-[12px] font-[700] text-navy">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                          {count} local install{count === 1 ? "" : "s"}
                        </span>
                      )}
                    </div>

                    <p className="text-[14.5px] text-text-dark leading-relaxed mb-5">
                      {brand.about}
                    </p>

                    <div className="mt-auto">
                      <p className="text-[12px] font-[800] text-text-muted tracking-[.1em] uppercase mb-3">
                        Best For
                      </p>
                      <ul className="space-y-2 mb-6">
                        {brand.bestFor.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[13.5px] text-text-dark"
                          >
                            <Check className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Deep-link into the Projects explorer pre-filtered to
                          this brand. Count-less brands still show the link so
                          visitors who click Rheem / Carrier / Trane land on
                          an empty state we control, not a dead end. */}
                      <Link
                        href={`/blog?brand=${encodeURIComponent(brand.slug)}`}
                        className="group/cta inline-flex items-center gap-2 text-orange hover:text-orange-hover font-[700] text-[13.5px] transition-colors"
                      >
                        {count > 0 ? (
                          <>
                            View {count} {brand.name} install
                            {count === 1 ? "" : "s"}
                          </>
                        ) : (
                          <>Browse {brand.name} projects</>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 bg-white rounded-[20px] border border-border-light p-6 sm:p-8 shadow-[0_2px_10px_-6px_rgba(10,19,41,0.06)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
                  Don&apos;t see your brand?
                </p>
                <h2 className="text-[22px] sm:text-[26px] font-[800] text-navy leading-tight tracking-tight">
                  We service most major brands too.
                </h2>
                <p className="text-[14px] text-text-muted mt-2 max-w-xl">
                  If you already have a system we don&apos;t install new, we
                  can still maintain and repair it. Call us to confirm
                  parts availability for your specific model.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] transition-colors shadow-[0_10px_28px_-14px_rgba(241,90,41,0.6)]"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Schedule Service
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-navy hover:bg-navy/90 text-white font-[700] text-[14.5px] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-orange font-[700] text-[14px] hover:gap-2 transition-all"
            >
              See 72 real local installs by brand <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
