"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react";
import { reviews, platformStats, type Review } from "@/content/reviews";
import { GOOGLE_REVIEWS_URL, YELP_REVIEWS_URL } from "@/lib/constants";

/* ---------- Brand marks (inline SVG, colored) ---------- */

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.273c0-.851-.076-1.669-.218-2.455H12v4.643h6.456c-.278 1.5-1.123 2.77-2.393 3.62v3.012h3.878c2.27-2.09 3.58-5.168 3.58-8.82z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.956-1.075 7.94-2.907l-3.877-3.013c-1.075.72-2.45 1.147-4.063 1.147-3.125 0-5.77-2.11-6.715-4.947H1.28v3.11C3.254 21.302 7.312 24 12 24z"/>
      <path fill="#FBBC05" d="M5.285 14.28a7.18 7.18 0 01-.376-2.28c0-.79.136-1.558.376-2.28V6.61H1.28A11.995 11.995 0 000 12c0 1.936.465 3.768 1.28 5.39l4.005-3.11z"/>
      <path fill="#EA4335" d="M12 4.773c1.764 0 3.345.606 4.59 1.797l3.44-3.44C17.95 1.19 15.237 0 12 0 7.312 0 3.254 2.698 1.28 6.61l4.005 3.11C6.23 6.883 8.875 4.773 12 4.773z"/>
    </svg>
  );
}

function YelpLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#D32323" aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 011.88 2.791 1.072 1.072 0 01-.21 1.92zM14.229 15.39l3.252 3.967c.58.703-.104 1.736-.978 1.472a9.196 9.196 0 01-3.072-1.635 1.072 1.072 0 01-.118-1.602l.916-2.202zM12.142 9.862L6.852 2.544c-.48-.665.188-1.552.988-1.31 2.375.717 4.404 2.143 5.776 4.08.372.526.106 1.256-.488 1.492l-1.986 1.056v2zM10.834 14.168l-1.834 4.768c-.325.843-1.52.838-1.778-.026a9.192 9.192 0 01-.244-3.468 1.072 1.072 0 01.965-.944l2.891.33v-.66zM9.73 11.516l-5.194-.748c-.94-.136-1.142-1.408-.288-1.882a9.19 9.19 0 013.24-1.272 1.072 1.072 0 011.17.754l1.072 3.148z"/>
    </svg>
  );
}

/* ---------- Helpers ---------- */

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

// Deterministic warm color per reviewer for the avatar background.
function avatarColor(name: string): string {
  const palette = ["#F15A29", "#13294B", "#4285F4", "#D32323", "#1F7A45", "#B2560D", "#6B2FA6"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(h) % palette.length];
}

/* ---------- Pieces ---------- */

function PlatformStatCard({ s }: { s: (typeof platformStats)[number] }) {
  const isYelp = s.source === "yelp";
  const starColor = isYelp ? "#D32323" : "#F6B800";
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-border-light rounded-[16px] p-5 lg:p-6 hover:border-orange/40 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        {isYelp ? <YelpLogo className="w-6 h-6" /> : <GoogleLogo className="w-6 h-6" />}
        <span className="text-[16px] font-[800] text-navy">
          {isYelp ? "Yelp" : "Google"}
        </span>
      </div>
      <p className="text-[13.5px] text-text-muted mb-3">{s.label}</p>
      <div className="flex items-baseline gap-2.5 mb-2">
        <span className="text-[30px] font-[800] text-navy leading-none tracking-tight">
          {s.rating.toFixed(1)}
        </span>
        <div className="flex items-center gap-[2px]" aria-label={`${s.rating} stars`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className="w-[14px] h-[14px]"
              style={{ color: starColor, fill: starColor }}
              strokeWidth={0}
            />
          ))}
        </div>
      </div>
      <p className="text-[13.5px] font-[700] text-text-muted inline-flex items-center gap-1.5 group-hover:text-orange transition-colors">
        {s.reviewCount} reviews
        <ArrowRight className="w-3.5 h-3.5" />
      </p>
    </a>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const isYelp = r.source === "yelp";
  const starColor = isYelp ? "#D32323" : "#F6B800";
  const platformUrl = isYelp ? YELP_REVIEWS_URL : GOOGLE_REVIEWS_URL;
  // Clamp long reviews so cards stay roughly equal height — full text is a
  // click-through away on the source platform.
  const snippet = r.text.length > 280 ? r.text.slice(0, 280).trimEnd() + "…" : r.text;
  return (
    <article className="shrink-0 w-[300px] sm:w-[340px] bg-white border border-border-light rounded-[16px] p-5 sm:p-6 flex flex-col">
      {/* Head: avatar + name + platform mark */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-[800] text-[16px]"
            style={{ background: avatarColor(r.name) }}
          >
            {initial(r.name)}
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] font-[800] text-navy truncate">{r.name}</p>
            <p className="text-[12.5px] text-text-muted">{r.date}</p>
          </div>
        </div>
        {isYelp ? <YelpLogo className="w-5 h-5 shrink-0" /> : <GoogleLogo className="w-5 h-5 shrink-0" />}
      </div>
      {/* Rating */}
      <div className="flex items-center gap-[2px] mb-3" aria-label={`${r.rating} stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className="w-4 h-4"
            style={{ color: n <= r.rating ? starColor : "#E4E7EC", fill: n <= r.rating ? starColor : "transparent" }}
            strokeWidth={0}
          />
        ))}
      </div>
      {/* Text */}
      <p className="text-[14px] text-text-dark leading-relaxed mb-5 flex-1">
        &ldquo;{snippet}&rdquo;
      </p>
      {/* Read more link */}
      <a
        href={r.url || platformUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-orange font-[700] text-[13.5px] hover:gap-2 transition-all"
      >
        Read more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </article>
  );
}

/* ---------- Main section ---------- */

export default function ReviewsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by roughly one card width.
    const delta = (el.clientWidth > 640 ? 360 : el.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="bg-white section-padding">
      <div className="container-site">
        {/* Header */}
        <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
          Reviews
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-[800] text-navy leading-[1.1] tracking-tight mb-8 sm:mb-10">
          Trusted by your neighbors
        </h2>

        {/* Platform stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12 lg:mb-14 max-w-[900px]">
          {platformStats.map((s) => (
            <PlatformStatCard key={s.source + s.label} s={s} />
          ))}
        </div>

        {/* Carousel header: arrows aligned right */}
        <div className="flex items-center justify-end gap-2 mb-5">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canLeft}
            aria-label="Previous reviews"
            className="w-10 h-10 rounded-full border border-border-light bg-white flex items-center justify-center text-navy hover:border-orange/40 hover:text-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canRight}
            aria-label="Next reviews"
            className="w-10 h-10 rounded-full border border-border-light bg-white flex items-center justify-center text-navy hover:border-orange/40 hover:text-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Review cards — horizontal scroll */}
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((r) => (
            <div key={r.id} className="snap-start">
              <ReviewCard r={r} />
            </div>
          ))}
        </div>

        {/* Read all CTA */}
        <div className="flex justify-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[52px] px-7 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] transition-colors"
          >
            Read all our reviews
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hide the horizontal scrollbar visually while keeping scroll behaviour. */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
