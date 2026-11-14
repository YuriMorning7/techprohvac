"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Star,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { Review, ReviewSource } from "@/content/reviews";

type Props = {
  reviews: Review[];
  platformTotals: Record<ReviewSource, number>; // real counts from each platform
  platformUrls: Record<ReviewSource, string>;
};

const PAGE_SIZE = 12;

const SORTS = [
  { key: "recent", label: "Most recent" },
  { key: "top-rated", label: "Highest rated" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

const RATING_FILTERS = [
  { key: "all", label: "All ratings" },
  { key: "5", label: "5 stars only" },
  { key: "4plus", label: "4 stars & up" },
] as const;
type RatingKey = (typeof RATING_FILTERS)[number]["key"];

// Deterministic avatar background color from the reviewer's name initial.
// Keeps the same reviewer the same color across reloads.
function avatarColor(name: string): string {
  const palette = [
    "bg-orange text-white",
    "bg-navy text-white",
    "bg-emerald-600 text-white",
    "bg-sky-600 text-white",
    "bg-purple-600 text-white",
    "bg-pink-600 text-white",
    "bg-amber-500 text-white",
    "bg-teal-600 text-white",
  ];
  const code = name.charCodeAt(0) || 0;
  return palette[code % palette.length];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  return first.toUpperCase();
}

// Convert "Oct 2026" or similar human date → sortable yyyy-mm number.
// Handles the two formats present in the content file.
function sortKeyForDate(humanDate: string): number {
  const months: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const match = humanDate.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!match) return 0;
  const month = months[match[1]] ?? 0;
  const year = parseInt(match[2], 10);
  return year * 100 + month;
}

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.8V14.4h6.12c-.27 1.44-1.98 4.2-6.12 4.2-3.69 0-6.69-3.06-6.69-6.84s3-6.84 6.69-6.84c2.1 0 3.5.9 4.3 1.67l2.93-2.82C17.37 2 14.9.9 12 .9 5.98.9 1.08 5.8 1.08 11.82s4.9 10.92 10.92 10.92c6.3 0 10.47-4.43 10.47-10.66 0-.72-.08-1.27-.18-1.82H12z" />
    </svg>
  );
}

function YelpIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#D32323" aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 011.88 2.791 1.072 1.072 0 01-.21 1.92zM14.229 15.39l3.252 3.967c.58.703-.104 1.736-.978 1.472a9.196 9.196 0 01-3.072-1.635 1.072 1.072 0 01-.118-1.602l.916-2.202zM12.142 9.862L6.852 2.544c-.48-.665.188-1.552.988-1.31 2.375.717 4.404 2.143 5.776 4.08.372.526.106 1.256-.488 1.492l-1.986 1.056v2zM10.834 14.168l-1.834 4.768c-.325.843-1.52.838-1.778-.026a9.192 9.192 0 01-.244-3.468 1.072 1.072 0 01.965-.944l2.891.33v-.66zM9.73 11.516l-5.194-.748c-.94-.136-1.142-1.408-.288-1.882a9.19 9.19 0 013.24-1.272 1.072 1.072 0 011.17.754l1.072 3.148z" />
    </svg>
  );
}

function Stars({ value, className = "w-3.5 h-3.5" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < value ? "text-orange fill-orange" : "text-border-light"}`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export default function ReviewsExplorer({ reviews, platformTotals, platformUrls }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [source, setSource] = useState<"all" | ReviewSource>("all");
  const [rating, setRating] = useState<RatingKey>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Honor URL state on mount (deep-linking from /brands, Google rich snippets, etc.)
  useEffect(() => {
    const s = searchParams.get("source");
    const r = searchParams.get("rating");
    const q = searchParams.get("q");
    if (s === "google" || s === "yelp") setSource(s);
    if (r === "5" || r === "4plus") setRating(r);
    if (q) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push state to URL — shallow replace, no history spam.
  useEffect(() => {
    const p = new URLSearchParams();
    if (source !== "all") p.set("source", source);
    if (rating !== "all") p.set("rating", rating);
    if (query.trim()) p.set("q", query.trim());
    const qs = p.toString();
    router.replace(qs ? `/reviews?${qs}` : "/reviews", { scroll: false });
  }, [source, rating, query, router]);

  useEffect(() => setVisible(PAGE_SIZE), [source, rating, query, sort]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = reviews.filter((r) => {
      if (source !== "all" && r.source !== source) return false;
      if (rating === "5" && r.rating !== 5) return false;
      if (rating === "4plus" && r.rating < 4) return false;
      if (!q) return true;
      return (
        r.text.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.city ?? "").toLowerCase().includes(q)
      );
    });
    if (sort === "recent") {
      return [...list].sort((a, b) => sortKeyForDate(b.date) - sortKeyForDate(a.date));
    }
    // top-rated — stable sort by rating desc, then recent
    return [...list].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return sortKeyForDate(b.date) - sortKeyForDate(a.date);
    });
  }, [reviews, source, rating, sort, query]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const counts = useMemo(
    () => ({
      all: reviews.length,
      google: reviews.filter((r) => r.source === "google").length,
      yelp: reviews.filter((r) => r.source === "yelp").length,
    }),
    [reviews],
  );

  const activeFilterCount =
    (source !== "all" ? 1 : 0) + (rating !== "all" ? 1 : 0) + (query.trim() ? 1 : 0);

  function reset() {
    setSource("all");
    setRating("all");
    setQuery("");
    setSort("recent");
  }

  return (
    <>
      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] xl:top-[88px] z-30 bg-light-bg/92 backdrop-blur-md border-b border-border-light">
        <div className="container-site py-4 lg:py-5 space-y-3">
          {/* Row 1 — Platform tabs + search */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
            <div className="flex-1 overflow-x-auto scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
              <ul className="flex items-center gap-2 min-w-max">
                {(
                  [
                    { key: "all" as const, label: "All", count: counts.all, icon: null },
                    { key: "google" as const, label: "Google", count: counts.google, icon: <GoogleIcon /> },
                    { key: "yelp" as const, label: "Yelp", count: counts.yelp, icon: <YelpIcon /> },
                  ]
                ).map((tab) => {
                  const active = tab.key === source;
                  return (
                    <li key={tab.key} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setSource(tab.key)}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-2 h-[38px] px-4 rounded-full border text-[13.5px] font-[700] whitespace-nowrap transition-all ${
                          active
                            ? "bg-navy text-white border-navy shadow-[0_8px_20px_-10px_rgba(10,19,41,0.5)]"
                            : "bg-white text-navy border-border-light hover:border-orange/40 hover:text-orange"
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                        <span
                          className={`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1.5 rounded-full text-[11px] font-[800] tracking-tight ${
                            active ? "bg-white/20 text-white" : "bg-light-bg text-text-muted"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative lg:w-[300px] shrink-0">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reviews by name, city, text…"
                aria-label="Search reviews"
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

          {/* Row 2 — Rating + sort selectors */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {RATING_FILTERS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRating(r.key)}
                  aria-pressed={rating === r.key}
                  className={`inline-flex items-center gap-1.5 h-[32px] px-3 rounded-full border text-[12.5px] font-[700] transition-all ${
                    rating === r.key
                      ? "bg-orange text-white border-orange shadow-[0_6px_16px_-8px_rgba(241,90,41,0.55)]"
                      : "bg-white text-text-dark border-border-light hover:border-orange/40 hover:text-orange"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="h-6 w-px bg-border-light hidden sm:block" />
            <label className="inline-flex items-center gap-2 text-[12.5px] font-[700] text-text-muted">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-[32px] rounded-full bg-white border border-border-light px-3 pr-7 text-navy font-[700] focus:outline-none focus:border-orange cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-[700] text-orange hover:text-orange-hover transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results header ────────────────────────────────────────────── */}
      <div className="container-site pt-8 pb-5">
        <p className="text-[14px] text-text-muted">
          Showing{" "}
          <span className="font-[800] text-navy">{shown.length}</span> of{" "}
          <span className="font-[800] text-navy">{filtered.length}</span>{" "}
          reviews sourced from Google &amp; Yelp
          {platformTotals && (
            <>
              {" "}
              <span className="text-text-muted">
                · {platformTotals.google + platformTotals.yelp} total ratings across
                platforms
              </span>
            </>
          )}
        </p>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div className="container-site pb-16">
        {shown.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {shown.map((r) => {
                const isLong = r.text.length > 320;
                const isExpanded = !!expanded[r.id];
                const displayText = !isLong || isExpanded ? r.text : r.text.slice(0, 320).trimEnd() + "…";
                const platformLabel = r.source === "google" ? "Google" : "Yelp";

                return (
                  <article
                    key={r.id}
                    className="bg-white rounded-[20px] border border-border-light p-6 sm:p-7 shadow-[0_2px_10px_-6px_rgba(10,19,41,0.06)] hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.14)] transition-shadow"
                  >
                    {/* Header: avatar + name + source tag */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-[800] ${avatarColor(r.name)}`}
                          aria-hidden="true"
                        >
                          {initials(r.name)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[15.5px] font-[800] text-navy leading-tight tracking-tight truncate">
                            {r.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Stars value={r.rating} />
                            <span className="text-[12px] text-text-muted font-[600]">
                              {r.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1.5 h-[26px] px-2.5 rounded-full bg-light-bg border border-border-lighter text-[11.5px] font-[700] text-text-dark whitespace-nowrap">
                        {r.source === "google" ? <GoogleIcon className="w-3 h-3" /> : <YelpIcon className="w-3 h-3" />}
                        {platformLabel}
                        {r.city && (
                          <>
                            <span className="text-text-muted/60">·</span>
                            <span className="inline-flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-orange" />
                              {r.city}
                            </span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Review body */}
                    <p className="text-[14.5px] text-text-dark leading-[1.65] whitespace-pre-line">
                      {displayText}
                    </p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setExpanded((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                        className="mt-2 text-orange hover:text-orange-hover font-[700] text-[13px]"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}

                    {/* Optional owner response */}
                    {r.response && (
                      <div className="mt-5 pt-4 border-t border-border-lighter">
                        <p className="text-[11px] font-[800] text-orange tracking-[.14em] uppercase mb-2">
                          Response from TechPro
                        </p>
                        <p className="text-[13.5px] text-text-muted leading-relaxed whitespace-pre-line">
                          {r.response}
                        </p>
                      </div>
                    )}

                    {/* Source link */}
                    {r.url && (
                      <div className="mt-5 pt-4 border-t border-border-lighter">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-orange hover:text-orange-hover font-[700] text-[13px] transition-colors"
                        >
                          View on {platformLabel}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((n) => n + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-full bg-white border border-border-light text-navy font-[700] text-[14.5px] hover:border-orange hover:text-orange transition-colors"
                >
                  Show {Math.min(PAGE_SIZE, filtered.length - visible)} more
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* ── Empty state ──────────────────────────────────────────────
             If a specific platform tab is selected but we haven't sourced
             any reviews from it yet, route the visitor directly to that
             platform (where they can read all the real reviews) rather
             than leaving them staring at an empty card. */
          (() => {
            const specificSourceEmpty =
              source !== "all" && counts[source] === 0;
            const platformLabel = source === "google" ? "Google" : "Yelp";
            const platformTotal = source !== "all" ? platformTotals[source] : 0;
            const platformUrl =
              source !== "all" ? platformUrls[source] : undefined;

            return (
              <div className="bg-white rounded-[20px] border border-border-light p-10 sm:p-14 text-center">
                <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-6 h-6 text-orange" />
                </div>
                {specificSourceEmpty ? (
                  <>
                    <h3 className="text-[20px] sm:text-[24px] font-[800] text-navy tracking-tight mb-2">
                      {platformTotal}+ {platformLabel} reviews live on{" "}
                      {platformLabel}
                    </h3>
                    <p className="text-[14.5px] text-text-muted leading-relaxed max-w-md mx-auto mb-6">
                      We&rsquo;re gradually sourcing our {platformLabel}{" "}
                      reviews onto this page. Until then, the full archive —
                      including photos and owner responses — is a tap away.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {platformUrl && (
                        <a
                          href={platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14px] transition-colors"
                        >
                          Read on {platformLabel}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-white border border-border-light text-navy hover:border-orange hover:text-orange font-[700] text-[14px] transition-colors"
                      >
                        See all reviews here
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-[20px] sm:text-[24px] font-[800] text-navy tracking-tight mb-2">
                      No reviews match those filters.
                    </h3>
                    <p className="text-[14.5px] text-text-muted leading-relaxed max-w-md mx-auto mb-6">
                      Try broadening the rating or clearing your search. All
                      of our reviews are verbatim from Google and Yelp.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14px] transition-colors"
                    >
                      Reset filters
                    </button>
                  </>
                )}
              </div>
            );
          })()
        )}
      </div>
    </>
  );
}
