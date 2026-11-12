import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { cities } from "@/content/cities";

export const metadata: Metadata = {
  title: "HVAC Service Areas Across San Mateo County",
  description:
    "TechPro Heating & Cooling serves 20+ cities across San Mateo County — San Carlos, Belmont, San Mateo, Redwood City, Menlo Park, and more. See recent installations in each area.",
  alternates: { canonical: "/service-areas" },
};

export const dynamic = "force-static";

export default function ServiceAreasIndexPage() {
  const withProjects = cities.filter((c) => c.projectCount > 0);
  const additionalAreas = cities.filter((c) => c.projectCount === 0);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Service Areas</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              HVAC Services Across San Mateo County
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed">
              TechPro Heating &amp; Cooling installs, repairs, and maintains
              heating and cooling systems across San Mateo County. Pick your
              city below to see recent projects and the installation types we
              handle locally.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <h2 className="text-[22px] sm:text-[26px] font-[800] text-navy tracking-tight mb-6">
            Cities we actively serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {withProjects.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="group bg-white rounded-[20px] border border-border-light p-6 hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[18px] sm:text-[19px] font-[800] text-navy leading-tight tracking-tight group-hover:text-orange transition-colors">
                      {c.name}, CA
                    </h3>
                    <p className="text-[13.5px] text-text-muted mt-1.5">
                      {c.projectCount} recent {c.projectCount === 1 ? "project" : "projects"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange shrink-0 mt-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {additionalAreas.length > 0 && (
            <>
              <h2 className="text-[20px] sm:text-[22px] font-[800] text-navy tracking-tight mt-14 mb-5">
                Also serving
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {additionalAreas.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="inline-flex items-center gap-1.5 h-[38px] px-4 rounded-full bg-white border border-border-light text-[13.5px] font-[700] text-navy hover:border-orange/40 hover:text-orange transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-orange" />
                    {c.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
