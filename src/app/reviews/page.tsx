import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ChevronRight,
  Star,
  MessageCircle,
  CalendarCheck,
  Phone,
  ExternalLink,
} from "lucide-react";
import { reviews, platformStats } from "@/content/reviews";
import ReviewsExplorer from "@/components/reviews/ReviewsExplorer";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  BOOKING_URL,
  GOOGLE_REVIEWS_URL,
  YELP_REVIEWS_URL,
} from "@/lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techprohvac.com";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Real customer reviews for TechPro Heating & Cooling, pulled verbatim from Google and Yelp. 449+ verified reviews across the Peninsula.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: `Customer Reviews | ${SITE_NAME}`,
    description:
      "449+ verified reviews across Google and Yelp, averaging 4.9 stars.",
    type: "website",
    url: "/reviews",
  },
};

export const dynamic = "force-static";

export default function ReviewsPage() {
  const google = platformStats.find((s) => s.source === "google");
  const yelp = platformStats.find((s) => s.source === "yelp");
  const totalPlatformReviews =
    (google?.reviewCount ?? 0) + (yelp?.reviewCount ?? 0);

  // Weighted average (113 × 4.9 + 336 × 5.0) / 449 ≈ 4.97. We round to 1 dp.
  const weightedAverage =
    google && yelp
      ? Math.round(
          ((google.rating * google.reviewCount +
            yelp.rating * yelp.reviewCount) /
            (google.reviewCount + yelp.reviewCount)) *
            10,
        ) / 10
      : 5.0;

  const platformTotals = {
    google: google?.reviewCount ?? 0,
    yelp: yelp?.reviewCount ?? 0,
  };
  const platformUrls = {
    google: GOOGLE_REVIEWS_URL,
    yelp: YELP_REVIEWS_URL,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE_URL}/reviews` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
            <span className="text-white/90">Reviews</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full bg-orange/15 border border-orange/30 text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-5">
              <MessageCircle className="w-3.5 h-3.5" />
              Verified reviews
            </span>
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.06] mb-5">
              Trusted by{" "}
              <span className="text-orange">{totalPlatformReviews}+ neighbors</span>{" "}
              across the Peninsula.
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed max-w-2xl">
              Every review below is verbatim from Google or Yelp — nothing
              edited, nothing paraphrased. Filter by platform, rating, or
              search the text to find the experience that sounds like yours.
            </p>

            {/* Stat strip */}
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Average
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight flex items-center gap-1">
                  {weightedAverage.toFixed(1)}
                  <Star
                    className="w-5 h-5 text-orange"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Google
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {google?.reviewCount}
                </dd>
              </div>
              <div className="rounded-[14px] bg-white/[0.06] border border-white/10 px-4 py-4">
                <dt className="text-[11px] font-[700] text-white/55 tracking-[.12em] uppercase mb-1">
                  Yelp
                </dt>
                <dd className="text-[26px] font-[800] text-white leading-none tracking-tight">
                  {yelp?.reviewCount}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ============================ EXPLORER ============================ */}
      <section className="bg-light-bg">
        <Suspense
          fallback={
            <div className="container-site py-16">
              <div className="h-[48px] rounded-full bg-white border border-border-light animate-pulse mb-6" />
              <div className="grid md:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[20px] border border-border-light h-[240px] animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <ReviewsExplorer
            reviews={reviews}
            platformTotals={platformTotals}
            platformUrls={platformUrls}
          />
        </Suspense>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="bg-white">
        <div className="container-site py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-5 mb-8">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-[20px] border border-border-light p-7 hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all flex items-start gap-5"
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-light-bg flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M12 10.8V14.4h6.12c-.27 1.44-1.98 4.2-6.12 4.2-3.69 0-6.69-3.06-6.69-6.84s3-6.84 6.69-6.84c2.1 0 3.5.9 4.3 1.67l2.93-2.82C17.37 2 14.9.9 12 .9 5.98.9 1.08 5.8 1.08 11.82s4.9 10.92 10.92 10.92c6.3 0 10.47-4.43 10.47-10.66 0-.72-.08-1.27-.18-1.82H12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-1">
                  See all on Google
                </p>
                <h3 className="text-[19px] font-[800] text-navy leading-tight tracking-tight mb-1 group-hover:text-orange transition-colors">
                  {google?.rating.toFixed(1)}★ · {google?.reviewCount} Google reviews
                </h3>
                <p className="text-[13.5px] text-text-muted leading-relaxed">
                  Written by customers on Google — clickable, sortable, and
                  dated by Google itself.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted shrink-0 mt-1 group-hover:text-orange transition-colors" />
            </a>
            <a
              href={YELP_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-[20px] border border-border-light p-7 hover:border-orange/40 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] transition-all flex items-start gap-5"
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-light-bg flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#D32323" aria-hidden="true">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 011.88 2.791 1.072 1.072 0 01-.21 1.92zM14.229 15.39l3.252 3.967c.58.703-.104 1.736-.978 1.472a9.196 9.196 0 01-3.072-1.635 1.072 1.072 0 01-.118-1.602l.916-2.202zM12.142 9.862L6.852 2.544c-.48-.665.188-1.552.988-1.31 2.375.717 4.404 2.143 5.776 4.08.372.526.106 1.256-.488 1.492l-1.986 1.056v2zM10.834 14.168l-1.834 4.768c-.325.843-1.52.838-1.778-.026a9.192 9.192 0 01-.244-3.468 1.072 1.072 0 01.965-.944l2.891.33v-.66zM9.73 11.516l-5.194-.748c-.94-.136-1.142-1.408-.288-1.882a9.19 9.19 0 013.24-1.272 1.072 1.072 0 011.17.754l1.072 3.148z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.14em] uppercase mb-1">
                  See all on Yelp
                </p>
                <h3 className="text-[19px] font-[800] text-navy leading-tight tracking-tight mb-1 group-hover:text-orange transition-colors">
                  {yelp?.rating.toFixed(1)}★ · {yelp?.reviewCount} Yelp reviews
                </h3>
                <p className="text-[13.5px] text-text-muted leading-relaxed">
                  Yelp&rsquo;s full archive goes back years — tap through for
                  the long version, photos, and owner responses.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted shrink-0 mt-1 group-hover:text-orange transition-colors" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[24px] bg-navy text-white p-8 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.3),transparent_60%)] pointer-events-none"
            />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
              <div className="max-w-xl">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
                  Add yours to the list
                </p>
                <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-[800] tracking-tight leading-[1.1] mb-4">
                  Ready to become one of these neighbors?
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed">
                  Book a free in-home scoping visit. If we&rsquo;re the right
                  fit, our next review might be yours.
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
