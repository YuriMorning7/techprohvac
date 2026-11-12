import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, Hammer, MapPin, CalendarCheck } from "lucide-react";
import { projects } from "@/content/projects";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "HVAC Installation Projects & Case Studies",
  description:
    "Recent heat pump, mini-split, furnace, and air conditioner installations completed by TechPro Heating & Cooling across San Mateo County. Real project details, equipment, and scope.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-static";

const installationTypes = [
  "All",
  "Heat Pump",
  "Mini Split",
  "Furnace",
  "Air Conditioner",
  "Ductwork",
] as const;

// Quick homepage stats surfaced inline so the hero doesn't read empty-handed.
function stats() {
  const totalProjects = projects.length;
  const cities = new Set(projects.map((p) => p.city));
  const latest = projects
    .map((p) => p.completionDate)
    .sort()
    .at(-1);
  const latestYear = latest ? new Date(latest).getFullYear() : new Date().getFullYear();
  return {
    totalProjects,
    cityCount: cities.size,
    latestYear,
  };
}

export default function BlogIndexPage() {
  const { totalProjects, cityCount, latestYear } = stats();

  return (
    <>
      <section className="bg-navy text-white relative overflow-hidden">
        {/* Soft orange glow in the corner — subtle hero accent */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.18),transparent_60%)] pointer-events-none"
        />
        <div className="container-site relative py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Recent Projects</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-5">
              <Hammer className="w-3.5 h-3.5" />
              Real {latestYear} installs
            </span>
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.06] mb-5">
              Every installation we&apos;ve shipped this year —{" "}
              <span className="text-orange">searchable, filterable, documented.</span>
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed max-w-2xl">
              Each entry pulls from the service record: equipment make, model,
              capacity, city, and scope of work. No marketing copy, no stock
              case studies — just what we actually did.
            </p>

            {/* Stat strip */}
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Projects
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {totalProjects}
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Cities
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {cityCount}
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1 flex items-center gap-1">
                  <CalendarCheck className="w-3 h-3" /> Year
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {latestYear}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-light-bg">
        <Suspense
          fallback={
            <div className="container-site py-16">
              <div className="h-[48px] rounded-full bg-white border border-border-light animate-pulse mb-10" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[20px] border border-border-light h-[360px] animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <ProjectsExplorer projects={projects} installationTypes={installationTypes} />
        </Suspense>
      </section>
    </>
  );
}
