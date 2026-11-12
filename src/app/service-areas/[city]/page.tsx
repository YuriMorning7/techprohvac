import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Phone,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { cities } from "@/content/cities";
import {
  getCityBySlug,
  getProjectsForCity,
  formatDate,
} from "@/lib/content-helpers";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  BOOKING_URL,
} from "@/lib/constants";
import { imageForInstallationType, tintForInstallationType } from "@/lib/project-image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

type Params = { city: string };
type PageProps = { params: Promise<Params> };

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const match = getCityBySlug(city);
  if (!match) return { title: "Service area not found" };
  const title = `HVAC Services in ${match.name}, CA`;
  return {
    title,
    description: `TechPro Heating & Cooling provides heat pump, mini-split, furnace, and air conditioner installation and repair in ${match.name}, California. See recent local projects and schedule service.`,
    alternates: { canonical: `/service-areas/${match.slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: `Licensed HVAC installation and repair across ${match.name}, CA. Heat pumps, mini-splits, furnaces, AC, and ductwork.`,
      type: "website",
      url: `/service-areas/${match.slug}`,
    },
  };
}

export const dynamic = "force-static";

export default async function ServiceAreaCityPage({ params }: PageProps) {
  const { city } = await params;
  const match = getCityBySlug(city);
  if (!match) notFound();

  const projects = getProjectsForCity(city);

  // Breakdown by installation type for the "services in this city" section.
  const byType = new Map<string, number>();
  projects.forEach((p) => {
    byType.set(p.installationType, (byType.get(p.installationType) || 0) + 1);
  });
  const typeBreakdown = Array.from(byType.entries()).sort((a, b) => b[1] - a[1]);

  // LocalBusiness + Service schema with areaServed set to this city — strong
  // local-SEO signal for "HVAC in {city}" queries.
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE_NAME,
    url: `${SITE_URL}/service-areas/${match.slug}`,
    telephone: PHONE,
    areaServed: { "@type": "City", name: match.name, addressRegion: "CA" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "71 Glenn Way Ste 6",
      addressLocality: "San Carlos",
      addressRegion: "CA",
      postalCode: "94070",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `HVAC services in ${match.name}, CA`,
      itemListElement: [
        "Heat Pump Installation",
        "Mini-Split Installation",
        "Furnace Installation",
        "Air Conditioner Installation",
        "Ductwork",
      ].map((svc) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: svc, areaServed: match.name },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE_URL}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: match.name,
        item: `${SITE_URL}/service-areas/${match.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/service-areas" className="hover:text-white/80 transition-colors">
              Service Areas
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{match.name}</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-5">
              HVAC Services in {match.name}, CA
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed mb-8">
              TechPro Heating &amp; Cooling installs, repairs, and maintains
              heating and cooling systems for homes and light commercial
              properties in {match.name} and surrounding San Mateo County. Licensed,
              insured, and based locally in San Carlos since 2005.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[15px] transition-colors shadow-[0_10px_30px_-10px_rgba(241,90,41,0.6)]"
              >
                <CalendarCheck className="w-4 h-4" />
                Schedule in {match.name}
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-[700] text-[15px] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES AVAILABLE */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <h2 className="text-[22px] sm:text-[28px] font-[800] text-navy tracking-tight mb-6">
            Services available in {match.name}
          </h2>
          {typeBreakdown.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeBreakdown.map(([type, count]) => (
                <div
                  key={type}
                  className="bg-light-bg rounded-[14px] border border-border-light px-5 py-5"
                >
                  <p className="text-[16px] font-[800] text-navy">{type} Installation</p>
                  <p className="text-[13.5px] text-text-muted mt-1.5">
                    {count} recent {count === 1 ? "project" : "projects"} documented in {match.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[15px] text-text-muted max-w-2xl leading-relaxed">
              {match.name} is in our active service area. We provide heat pump,
              mini-split, furnace, and air conditioner installation and repair.
              Call us for a free estimate.
            </p>
          )}
        </div>
      </section>

      {/* RECENT PROJECTS */}
      {projects.length > 0 && (
        <section className="bg-light-bg section-padding">
          <div className="container-site">
            <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
              <h2 className="text-[22px] sm:text-[28px] font-[800] text-navy tracking-tight">
                Recent projects in {match.name}
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-orange font-[700] text-[14px] hover:gap-2 transition-all"
              >
                All projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-[20px] border border-border-light overflow-hidden flex flex-col hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300"
                >
                  <div className={`relative aspect-[4/3] ${tintForInstallationType(p.installationType)} overflow-hidden`}>
                    <Image
                      src={imageForInstallationType(p.installationType)}
                      alt={`${p.installationType} installation in ${match.name}, CA`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center h-[24px] px-2.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-[800] text-orange tracking-[.08em] uppercase shadow-sm">
                      {p.installationType}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-[16px] sm:text-[17px] font-[800] text-navy leading-[1.3] tracking-tight mb-2 group-hover:text-orange transition-colors">
                      {p.installationType} Installation
                    </h3>
                    {p.equipment && (
                      <p className="text-[13.5px] text-text-muted leading-relaxed flex-1">
                        {p.equipment.brand.charAt(0) + p.equipment.brand.slice(1).toLowerCase()}
                        {" · "}
                        {p.equipment.capacity}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-[12.5px] text-text-muted mt-4 pt-3 border-t border-border-lighter">
                      <Calendar className="w-3.5 h-3.5 text-orange" />
                      {formatDate(p.completionDate)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-orange section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Ready for HVAC service in {match.name}?
          </h2>
          <p className="text-white/80 text-[16px] md:text-lg max-w-xl mx-auto mb-8">
            Call or book online — same-day availability for most jobs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-navy hover:bg-navy/90 text-white font-[700] text-[15px] transition-colors shadow-[0_10px_30px_-10px_rgba(10,19,41,0.4)]"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Online
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-white hover:bg-white/90 text-orange font-[700] text-[15px] transition-colors shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
