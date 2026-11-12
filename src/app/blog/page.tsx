import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Calendar, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { formatDate } from "@/lib/content-helpers";
import { imageForInstallationType, tintForInstallationType } from "@/lib/project-image";

export const metadata: Metadata = {
  title: "HVAC Installation Projects & Case Studies",
  description:
    "Recent heat pump, mini-split, furnace, and air conditioner installations completed by TechPro Heating & Cooling across San Mateo County. Real project details, equipment, and scope.",
  alternates: { canonical: "/blog" },
};

// The 2026 installation database is static — safe to pre-render fully.
export const dynamic = "force-static";

const installationTypes = [
  "All",
  "Heat Pump",
  "Mini Split",
  "Furnace",
  "Air Conditioner",
  "Ductwork",
] as const;

export default function BlogIndexPage() {
  // Not interactive on purpose: list is already sorted by newest completion,
  // and 72 items is small enough to render static without pagination or
  // client-side filtering. Filter chips are visual anchors only.
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Projects &amp; Blog</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Recent HVAC Installations
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed">
              Real installation projects completed across San Mateo County in 2026 —
              heat pumps, mini-splits, furnaces, and more. Every post documents the
              equipment installed and the scope of work, pulled from the service
              record and lightly edited for clarity.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {installationTypes.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center h-[32px] px-3.5 rounded-full bg-white/10 border border-white/15 text-[12.5px] font-[700] text-white/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white rounded-[20px] border border-border-light overflow-hidden flex flex-col hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300"
              >
                {/* Hero image (placeholder — typed equipment photo) */}
                <div className={`relative aspect-[4/3] ${tintForInstallationType(p.installationType)} overflow-hidden`}>
                  <Image
                    src={imageForInstallationType(p.installationType)}
                    alt={`${p.installationType} installation in ${p.city}, CA by TechPro Heating & Cooling`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center h-[26px] px-2.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-[800] text-orange tracking-[.08em] uppercase shadow-sm">
                    {p.installationType}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h2 className="text-[17px] sm:text-[18px] font-[800] text-navy leading-[1.3] tracking-tight mb-2 group-hover:text-orange transition-colors">
                    {p.installationType} Installation in {p.city}
                  </h2>
                  {p.equipment && (
                    <p className="text-[13.5px] text-text-muted leading-relaxed mb-4 flex-1">
                      <span className="font-[700] text-text-dark">
                        {p.equipment.brand.charAt(0) + p.equipment.brand.slice(1).toLowerCase()}
                      </span>
                      {" "}
                      {p.equipment.capacity}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[12px] text-text-muted pt-3 border-t border-border-lighter">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange" />
                      {p.city}, CA
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-orange" />
                      {formatDate(p.completionDate)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-orange font-[700] text-[13px] mt-4 group-hover:gap-2 transition-all">
                    See project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
