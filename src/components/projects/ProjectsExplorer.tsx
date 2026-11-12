"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { formatDate } from "@/lib/content-helpers";
import {
  imageForInstallationType,
  tintForInstallationType,
} from "@/lib/project-image";

export type BrandOption = {
  key: string; // lowercase canonical key — what we store in URL and state
  label: string; // Title Case display label (e.g. "Mitsubishi")
  count: number;
};

type Props = {
  projects: Project[];
  installationTypes: readonly string[];
  brands: BrandOption[];
};

const PAGE_SIZE = 24;
const ALL_BRAND_KEY = "all";

// A project is considered a match for a brand filter when ANY of its
// equipment entries (primary or secondary) is from that brand. This
// matches customer intent — "show me Mitsubishi jobs" should include a
// Bryant furnace + Mitsubishi mini-split project.
function projectMatchesBrand(p: Project, brandKey: string): boolean {
  if (brandKey === ALL_BRAND_KEY) return true;
  const list =
    p.allEquipment && p.allEquipment.length > 0
      ? p.allEquipment
      : p.equipment
        ? [p.equipment]
        : [];
  return list.some((e) => (e?.brand ?? "").toLowerCase() === brandKey);
}

export default function ProjectsExplorer({
  projects,
  installationTypes,
  brands,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState<string>("All");
  const [brand, setBrand] = useState<string>(ALL_BRAND_KEY);
  const [query, setQuery] = useState<string>("");
  const [visible, setVisible] = useState<number>(PAGE_SIZE);

  // Pick up initial filter state from URL (?type=Heat Pump&brand=mitsubishi&q=…).
  // Homepage equipment tiles deep-link with ?type=…; /brands cards deep-link
  // with ?brand=…. We honor both.
  useEffect(() => {
    const t = searchParams.get("type");
    const b = searchParams.get("brand");
    const q = searchParams.get("q");
    if (t && installationTypes.includes(t)) setType(t);
    if (b) {
      const normalized = b.toLowerCase();
      if (brands.some((br) => br.key === normalized)) setBrand(normalized);
    }
    if (q) setQuery(q);
    // Intentionally dependency-free to run once on mount — subsequent filter
    // changes come from user interaction, which pushes back to the URL below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push filter state back to the URL (shallow replace, no history spam).
  useEffect(() => {
    const params = new URLSearchParams();
    if (type !== "All") params.set("type", type);
    if (brand !== ALL_BRAND_KEY) params.set("brand", brand);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  }, [type, brand, query, router]);

  // Reset visible-count when filters change so pagination doesn't skip rows.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [type, brand, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (type !== "All" && p.installationType !== type) return false;
      if (!projectMatchesBrand(p, brand)) return false;
      if (!q) return true;
      return (
        p.city.toLowerCase().includes(q) ||
        p.installationType.toLowerCase().includes(q) ||
        (p.equipment?.brand ?? "").toLowerCase().includes(q) ||
        (p.zip ?? "").includes(q)
      );
    });
  }, [projects, type, brand, query]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.installationType] = (counts[p.installationType] ?? 0) + 1;
    });
    return counts;
  }, [projects]);

  // The brand option list the parent passed is already All + brands sorted
  // by count desc. Rebuild it here as a quick lookup table so the active
  // label can be shown in the result counter.
  const brandLabel = useMemo(
    () => brands.find((b) => b.key === brand)?.label ?? "",
    [brands, brand],
  );

  function resetFilters() {
    setType("All");
    setBrand(ALL_BRAND_KEY);
    setQuery("");
  }

  const activeFilterCount =
    (type !== "All" ? 1 : 0) +
    (brand !== ALL_BRAND_KEY ? 1 : 0) +
    (query.trim() ? 1 : 0);

  return (
    <>
      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] xl:top-[88px] z-30 bg-light-bg/90 backdrop-blur-md border-b border-border-light">
        <div className="container-site py-4 lg:py-5 space-y-3">
          {/* Row 1 — Type chips + search */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="hidden sm:inline-flex items-center h-[26px] px-2.5 rounded-full bg-white border border-border-light text-[10.5px] font-[800] text-text-muted tracking-[.12em] uppercase shrink-0">
                Type
              </span>
              <div className="flex-1 overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
                <ul className="flex items-center gap-2 min-w-max">
                  {installationTypes.map((t) => {
                    const active = t === type;
                    const count = typeCounts[t] ?? 0;
                    return (
                      <li key={t} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setType(t)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 h-[36px] px-3.5 rounded-full border text-[13px] font-[700] whitespace-nowrap transition-all ${
                            active
                              ? "bg-navy text-white border-navy shadow-[0_8px_20px_-10px_rgba(10,19,41,0.5)]"
                              : "bg-white text-navy border-border-light hover:border-orange/40 hover:text-orange"
                          }`}
                        >
                          {t}
                          {count > 0 && (
                            <span
                              className={`inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded-full text-[10.5px] font-[800] tracking-tight ${
                                active ? "bg-white/20 text-white" : "bg-light-bg text-text-muted"
                              }`}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Search */}
            <div className="relative lg:w-[300px] shrink-0">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, brand, ZIP…"
                aria-label="Search projects"
                className="w-full h-[40px] pl-10 pr-10 rounded-full bg-white border border-border-light focus:border-orange focus:outline-none text-[13.5px] text-navy placeholder:text-text-muted/70 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-light-bg flex items-center justify-center text-text-muted"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Row 2 — Brand chips. Uses orange active state so the two rows
              stay visually distinct from each other at a glance. */}
          {brands.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center h-[26px] px-2.5 rounded-full bg-white border border-border-light text-[10.5px] font-[800] text-text-muted tracking-[.12em] uppercase shrink-0">
                Brand
              </span>
              <div className="flex-1 overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
                <ul className="flex items-center gap-2 min-w-max">
                  {brands.map((b) => {
                    const active = b.key === brand;
                    return (
                      <li key={b.key} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setBrand(b.key)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 h-[32px] px-3 rounded-full border text-[12.5px] font-[700] whitespace-nowrap transition-all ${
                            active
                              ? "bg-orange text-white border-orange shadow-[0_8px_20px_-10px_rgba(241,90,41,0.55)]"
                              : "bg-white text-text-dark border-border-light hover:border-orange/40 hover:text-orange"
                          }`}
                        >
                          {b.label}
                          {b.count > 0 && (
                            <span
                              className={`inline-flex items-center justify-center min-w-[20px] h-[17px] px-1.5 rounded-full text-[10px] font-[800] tracking-tight ${
                                active
                                  ? "bg-white/25 text-white"
                                  : "bg-light-bg text-text-muted"
                              }`}
                            >
                              {b.count}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Result count + reset ──────────────────────────────────────── */}
      <div className="container-site pt-8 pb-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[14px] text-text-muted">
          <span className="font-[800] text-navy">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "project" : "projects"}
          {type !== "All" && (
            <>
              {" "}of type <span className="font-[700] text-navy">{type}</span>
            </>
          )}
          {brand !== ALL_BRAND_KEY && brandLabel && (
            <>
              {" "}with <span className="font-[700] text-orange">{brandLabel}</span>{" "}
              equipment
            </>
          )}
          {query && (
            <>
              {" "}matching <span className="font-[700] text-navy">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </p>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-[13px] font-[700] text-orange hover:text-orange-hover transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <div className="container-site pb-16">
        {shown.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {shown.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-[20px] border border-border-light overflow-hidden flex flex-col hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all duration-300"
                >
                  <div
                    className={`relative aspect-[4/3] ${tintForInstallationType(p.installationType)} overflow-hidden`}
                  >
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
                    {p.equipment?.brand && p.equipment.brand !== "Not documented" && (
                      <span className="absolute top-3 right-3 inline-flex items-center h-[26px] px-2.5 rounded-full bg-navy/92 backdrop-blur text-[11px] font-[800] text-white tracking-[.08em] uppercase shadow-sm">
                        {p.equipment.brand.charAt(0) +
                          p.equipment.brand.slice(1).toLowerCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h2 className="text-[17px] sm:text-[18px] font-[800] text-navy leading-[1.3] tracking-tight mb-2 group-hover:text-orange transition-colors">
                      {p.installationType} Installation in {p.city}
                    </h2>
                    {p.equipment && (
                      <p className="text-[13.5px] text-text-muted leading-relaxed mb-4 flex-1">
                        <span className="font-[700] text-text-dark">
                          {p.equipment.brand.charAt(0) +
                            p.equipment.brand.slice(1).toLowerCase()}
                        </span>{" "}
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

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((n) => n + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-full bg-white border border-border-light text-navy font-[700] text-[14.5px] hover:border-orange hover:text-orange transition-colors"
                >
                  Show {Math.min(PAGE_SIZE, filtered.length - visible)} more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* ── Empty state ─────────────────────────────────────────── */
          <div className="bg-white rounded-[20px] border border-border-light p-10 sm:p-14 text-center">
            <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-[800] text-navy tracking-tight mb-2">
              No projects match those filters.
            </h3>
            <p className="text-[14.5px] text-text-muted leading-relaxed max-w-md mx-auto mb-6">
              We&apos;ve installed {projects.length} systems across San Mateo
              County — try broadening the type or searching a different city.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14px] transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
