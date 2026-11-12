import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  ArrowRight,
  Trophy,
  Navigation,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { cities } from "@/content/cities";
import { projects } from "@/content/projects";
import { PHONE, PHONE_HREF, BOOKING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "HVAC Service Areas Across San Mateo County",
  description:
    "TechPro Heating & Cooling serves 22 cities across San Mateo County — San Carlos, Belmont, San Mateo, Redwood City, Menlo Park, and more. See recent installations in each area.",
  alternates: { canonical: "/service-areas" },
};

export const dynamic = "force-static";

// Precompute per-city installation-type breakdowns so each card shows what
// we actually do there — not just a blank count. Cached once at build time.
function buildCityBreakdowns() {
  const map = new Map<string, Map<string, number>>();
  for (const p of projects) {
    const byType = map.get(p.city) ?? new Map<string, number>();
    byType.set(p.installationType, (byType.get(p.installationType) ?? 0) + 1);
    map.set(p.city, byType);
  }
  // Return as a plain record { city: [{type, count}, ...] } ordered by count desc.
  const out: Record<string, { type: string; count: number }[]> = {};
  for (const [city, byType] of map.entries()) {
    out[city] = [...byType.entries()]
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  }
  return out;
}

export default function ServiceAreasIndexPage() {
  const breakdowns = buildCityBreakdowns();

  const withProjects = cities
    .filter((c) => c.projectCount > 0)
    .sort((a, b) => b.projectCount - a.projectCount);
  const additionalAreas = cities.filter((c) => c.projectCount === 0);

  const [feature1, feature2, feature3, ...rest] = withProjects;
  const featured = [feature1, feature2, feature3].filter(Boolean);

  const totalProjects = projects.length;
  const totalCities = cities.length;
  const typeVariety = new Set(projects.map((p) => p.installationType)).size;

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-28 -right-28 w-[460px] h-[460px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.2),transparent_60%)] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-20 w-[320px] h-[320px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.1),transparent_65%)] pointer-events-none"
        />
        <div className="container-site relative py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Service Areas</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-5">
              <Navigation className="w-3.5 h-3.5" />
              San Mateo County · Peninsula
            </span>
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.06] mb-5">
              Local HVAC crew across{" "}
              <span className="text-orange">San Mateo County.</span>
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed max-w-2xl">
              We dispatch from San Carlos and work the Peninsula every day —
              from Daly City down through Palo Alto and out to the coast. Pick
              your city to see the installs we&rsquo;ve shipped nearby.
            </p>

            {/* Stat strip */}
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Cities
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {totalCities}
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Installs
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {totalProjects}
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Systems
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {typeVariety}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ============================ FEATURED ============================ */}
      {featured.length > 0 && (
        <section className="bg-light-bg pt-14 lg:pt-20">
          <div className="container-site">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
              <div>
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
                  Where we work most
                </p>
                <h2 className="text-[26px] sm:text-[32px] font-[800] text-navy tracking-tight leading-[1.1]">
                  Our busiest cities this year
                </h2>
              </div>
              <p className="text-[14px] text-text-muted max-w-sm">
                Ranked by number of installs completed in 2026. Click through
                for the project list, local tips, and dispatcher notes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {featured.map((c, i) => {
                const types = breakdowns[c.name] ?? [];
                const topTypes = types.slice(0, 3);
                const rank = i + 1;
                return (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="group relative bg-navy text-white rounded-[22px] p-7 overflow-hidden hover:shadow-[0_24px_60px_-20px_rgba(10,19,41,0.45)] transition-shadow duration-300"
                  >
                    {/* Orange glow accent */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.35),transparent_65%)] pointer-events-none"
                    />
                    {/* Rank chip */}
                    <div className="relative flex items-start justify-between mb-6">
                      <span className="inline-flex items-center gap-1.5 h-[26px] px-2.5 rounded-full bg-orange/20 border border-orange/40 text-[11px] font-[800] text-orange tracking-[.12em] uppercase">
                        <Trophy className="w-3 h-3" />
                        #{rank} city
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-orange group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="relative">
                      <h3 className="text-[26px] sm:text-[28px] font-[800] leading-[1.05] tracking-tight mb-1 group-hover:text-orange transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-[12.5px] text-white/50 tracking-wider uppercase mb-5">
                        California · Peninsula
                      </p>

                      <div className="flex items-baseline gap-2 mb-5">
                        <span className="text-[44px] font-[800] leading-none tracking-tight text-white">
                          {c.projectCount}
                        </span>
                        <span className="text-[13px] text-white/55">
                          installs this year
                        </span>
                      </div>

                      {topTypes.length > 0 && (
                        <ul className="space-y-2 pt-5 border-t border-white/10">
                          {topTypes.map((t) => (
                            <li
                              key={t.type}
                              className="flex items-center justify-between text-[13.5px]"
                            >
                              <span className="text-white/85 font-[600]">
                                {t.type}
                              </span>
                              <span className="text-white/50 font-mono text-[12.5px]">
                                × {t.count}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================ ALL CITIES ============================ */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          {rest.length > 0 && (
            <>
              <div className="flex items-end justify-between gap-6 flex-wrap mb-8 mt-6">
                <div>
                  <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
                    Everywhere else we show up
                  </p>
                  <h2 className="text-[22px] sm:text-[28px] font-[800] text-navy tracking-tight leading-[1.15]">
                    More cities we&rsquo;ve installed in this year
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {rest.map((c) => {
                  const types = breakdowns[c.name] ?? [];
                  const topTypes = types.slice(0, 2);
                  return (
                    <Link
                      key={c.slug}
                      href={`/service-areas/${c.slug}`}
                      className="group relative bg-white rounded-[18px] border border-border-light p-5 sm:p-6 hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300 overflow-hidden"
                    >
                      {/* Soft hover glow */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-orange/0 to-orange/0 group-hover:from-orange/[0.03] group-hover:to-transparent transition-colors duration-500 pointer-events-none"
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Pin circle */}
                        <div className="shrink-0 w-11 h-11 rounded-[12px] bg-badge-bg flex items-center justify-center group-hover:bg-orange/10 transition-colors">
                          <MapPin
                            className="w-5 h-5 text-orange"
                            strokeWidth={2.2}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-[16.5px] sm:text-[17px] font-[800] text-navy leading-tight tracking-tight group-hover:text-orange transition-colors">
                              {c.name}
                              <span className="text-text-muted font-[600]">
                                , CA
                              </span>
                            </h3>
                            <ArrowRight className="w-4 h-4 text-orange shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                          </div>

                          <p className="text-[12.5px] text-text-muted mt-1 mb-3 flex items-center gap-1.5">
                            <span className="inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 rounded-full bg-orange/10 text-orange text-[11px] font-[800]">
                              {c.projectCount}
                            </span>
                            {c.projectCount === 1 ? "project" : "projects"}{" "}
                            completed
                          </p>

                          {topTypes.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {topTypes.map((t) => (
                                <span
                                  key={t.type}
                                  className="inline-flex items-center gap-1 h-[22px] px-2 rounded-full bg-light-bg border border-border-lighter text-[11px] font-[700] text-text-dark"
                                >
                                  {t.type}
                                  <span className="text-text-muted font-mono text-[10.5px]">
                                    {t.count}
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {additionalAreas.length > 0 && (
            <div className="mt-14 lg:mt-20">
              <div className="mb-6">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
                  Also within our radius
                </p>
                <h2 className="text-[20px] sm:text-[24px] font-[800] text-navy tracking-tight leading-[1.15]">
                  Don&rsquo;t see your city?
                </h2>
                <p className="text-[14px] text-text-muted mt-2 max-w-xl">
                  We cover these neighboring areas too — no 2026 install
                  documented yet, but we dispatch there regularly.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {additionalAreas.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="inline-flex items-center gap-1.5 h-[40px] px-4 rounded-full bg-white border border-border-light text-[13.5px] font-[700] text-navy hover:border-orange/40 hover:text-orange hover:shadow-[0_6px_20px_-10px_rgba(10,19,41,0.2)] transition-all"
                  >
                    <MapPin
                      className="w-3.5 h-3.5 text-orange"
                      strokeWidth={2.5}
                    />
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="bg-white">
        <div className="container-site py-14 lg:py-20">
          <div className="relative overflow-hidden rounded-[24px] bg-navy text-white p-8 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.3),transparent_60%)] pointer-events-none"
            />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
              <div className="max-w-xl">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
                  Free in-home scope
                </p>
                <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-[800] tracking-tight leading-[1.1] mb-4">
                  Not sure if we cover your street?
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed">
                  Give us your address and we&rsquo;ll tell you honestly. If
                  we&rsquo;re in the neighborhood, a free scoping visit gets you
                  a real quote — no sales pitch.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[54px] px-7 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[15px] transition-colors shadow-[0_10px_28px_-10px_rgba(241,90,41,0.6)]"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book a free visit
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 h-[54px] px-7 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-[700] text-[15px] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
