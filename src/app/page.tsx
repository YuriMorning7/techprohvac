import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Clock,
  Users,
  Wind,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  ArrowRight,
  Headphones,
  BadgeCheck,
  Zap,
  Heart,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";
import ProjectsMap from "@/components/ui/ProjectsMap";
import ReviewsSection from "@/components/ui/ReviewsSection";
import FaqSection from "@/components/ui/FaqSection";
import { faqs } from "@/content/faqs";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  CITY_STATE_ZIP,
  OFFICE_HOURS,
  GOOGLE_RATING,
  YEARS_IN_BUSINESS,
  CITIES_SERVED,
  BOOKING_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | San Carlos, CA HVAC Services`,
  description:
    "Family-owned heating and cooling for San Mateo County since 2005. Professional HVAC installation, repair, and maintenance. Call (650) 275-6357.",
  openGraph: {
    title: `${SITE_NAME} | San Carlos, CA HVAC Services`,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | San Carlos, CA HVAC Services`,
    description: SITE_DESCRIPTION,
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: CalendarCheck, label: "Since 2005", sublabel: "20+ years local" },
  { icon: Users, label: "Family-owned", sublabel: "Father & son team" },
  { icon: MapPin, label: "San Carlos HQ", sublabel: "Short drive to you" },
  { icon: Wind, label: "San Mateo County", sublabel: "22 cities served" },
  { icon: BadgeCheck, label: "CSLB #860715", sublabel: "Bonded & insured" },
  { icon: Award, label: "Residential + Commercial", sublabel: "Light commercial too" },
];

const services = [
  {
    image: "/images/Estimates.jpeg",
    tint: "bg-green-50",
    title: "Estimates",
    description: "Replace or install a new system.",
    slug: "installation",
  },
  {
    image: "/images/Repairs.jpeg",
    tint: "bg-red-50",
    title: "Repairs",
    description: "Troubleshoot & diagnose your existing system.",
    slug: "repairs",
  },
  {
    image: "/images/Maintenance.jpeg",
    tint: "bg-blue-50",
    title: "Maintenance",
    description: "Tune-up & protect your existing system.",
    slug: "maintenance",
  },
];

// Each tile links into the Instant Estimate wizard (prefilled when the
// product maps to a priced service) or /contact when the service is a
// scope-of-work consultation we quote on site rather than from a wizard.
const productCategories = [
  { image: "/images/Heat pumps.jpeg", title: "Heat Pumps", slug: "heat-pumps", estimate: "heat-pump" },
  { image: "/images/Mini Split System.jpeg", title: "Mini-Split Systems", slug: "mini-split-systems", estimate: "mini-split" },
  { image: "/images/Water Heaters.jpeg", title: "Water Heaters", slug: "water-heaters", estimate: "water-heater-tank" },
  { image: "/images/Ductwork.jpeg", title: "Ductwork", slug: "ductwork", estimate: "ductwork" },
  { image: "/images/Gas furnaces.jpeg", title: "Gas Furnaces", slug: "gas-furnaces", estimate: "furnace" },
  { image: "/images/Air conditioners.jpeg", title: "Air Conditioners", slug: "air-conditioners", estimate: "ac" },
  { image: "/images/Indoor air quality.jpeg", title: "Indoor Air Quality", slug: "indoor-air-quality", estimate: null },
  { image: "/images/Packaged units.jpeg", title: "Packaged Units", slug: "packaged-units", estimate: null },
];

const whyTechPro = [
  {
    icon: Users,
    title: "Family Owned & Operated",
    description:
      "Locally owned since 2005, we treat every customer like family and every home like our own.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Insured",
    description:
      "Fully licensed, bonded, and insured. Our technicians are background-checked and drug-tested.",
  },
  {
    icon: Zap,
    title: "Same-Day Service",
    description:
      "We understand HVAC emergencies. Same-day service available for urgent heating and cooling needs.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "4.9-star rating with hundreds of 5-star reviews. We are not done until you are comfortable.",
  },
  {
    icon: TrendingUp,
    title: "Energy Efficiency Experts",
    description:
      "We help you save money with high-efficiency equipment recommendations and expert installation.",
  },
  {
    icon: Headphones,
    title: "24/7 Emergency Support",
    description:
      "Round-the-clock answering service ensures you are never left in the cold or the heat.",
  },
];

const recentProjects = [
  {
    title: "Complete HVAC System Replacement",
    location: "San Carlos, CA",
    description:
      "Replaced aging furnace and AC with a high-efficiency heat pump system, improving comfort and reducing energy costs by 35%.",
    slug: "hvac-system-replacement-san-carlos",
    category: "Heat Pumps",
    imageTags: "heat-pump",
  },
  {
    title: "Ductless Mini-Split Installation",
    location: "Belmont, CA",
    description:
      "Installed a 3-zone ductless system in a home addition, providing precise temperature control without ductwork.",
    slug: "ductless-mini-split-belmont",
    category: "Air Conditioning",
    imageTags: "ductless-mini-split",
  },
  {
    title: "Tankless Water Heater Upgrade",
    location: "Redwood City, CA",
    description:
      "Upgraded from a 50-gallon tank to a high-efficiency tankless unit, delivering endless hot water with lower energy bills.",
    slug: "tankless-water-heater-redwood-city",
    category: "Water Heaters",
    imageTags: "plumbing",
  },
];

const testimonials = [
  {
    name: "Michael T.",
    location: "San Carlos, CA",
    rating: 5,
    text: "TechPro installed a new heat pump system in our home. From the initial consultation to the final walkthrough, everything was professional and thorough. Our energy bills dropped significantly.",
    service: "Heat Pump Installation",
  },
  {
    name: "Sarah L.",
    location: "Belmont, CA",
    rating: 5,
    text: "When our AC broke down on the hottest day of summer, TechPro came out the same day and had it running by evening. Fair pricing, great communication, and excellent work.",
    service: "AC Repair",
  },
  {
    name: "David & Karen R.",
    location: "Redwood City, CA",
    rating: 5,
    text: "We have used TechPro for maintenance for three years. They always show up on time, explain everything clearly, and keep our system running perfectly. Highly recommend!",
    service: "Maintenance Plan",
  },
];

const serviceAreas = [
  "San Carlos",
  "Belmont",
  "Redwood City",
  "San Mateo",
  "Foster City",
  "Burlingame",
  "Hillsborough",
  "Menlo Park",
  "Atherton",
  "Woodside",
  "Portola Valley",
  "Half Moon Bay",
  "Pacifica",
  "Daly City",
  "South San Francisco",
  "San Bruno",
  "Millbrae",
  "Brisbane",
];

const stats = [
  { value: YEARS_IN_BUSINESS, label: "Years in Business" },
  { value: "5,000+", label: "Completed Jobs" },
  { value: GOOGLE_RATING, label: "Google Rating" },
  { value: CITIES_SERVED, label: "Cities Served" },
];

/* ------------------------------------------------------------------ */
/*  JSON-LD STRUCTURED DATA                                           */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://www.techprohvac.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // HVACBusiness is a more specific LocalBusiness subtype — better local SEO.
      "@type": "HVACBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: PHONE,
      email: "info@techprohvac.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS,
        addressLocality: "San Carlos",
        addressRegion: "CA",
        postalCode: "94070",
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: 37.5072, longitude: -122.2605 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
      // Keep these aligned with ReviewsSection platform stats.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_RATING,
        reviewCount: "140",
        bestRating: "5",
        worstRating: "1",
      },
      priceRange: "$$",
      image: `${SITE_URL}/images/Techpro_logo.png`,
      logo: `${SITE_URL}/images/Techpro_logo.png`,
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Check, Credit Card, Financing",
      sameAs: [
        "https://maps.app.goo.gl/SuPQZ6RdxRUCr3Yx5",
        "https://www.yelp.com/biz/techpro-heating-and-cooling-san-carlos-2",
        "https://www.facebook.com/techproheatingcooling/",
        "https://www.instagram.com/techproheatingcooling/",
        "https://nextdoor.com/pages/techpro-builders-belmont-ca/",
      ],
      areaServed: serviceAreas.map((city) => ({ "@type": "City", name: city })),
    },
    {
      // Services offered — gives Google a structured list for rich results.
      "@type": "ItemList",
      "@id": `${SITE_URL}/#services`,
      name: "HVAC Services",
      itemListElement: [
        "Heat Pump Installation",
        "Mini-Split Installation",
        "Furnace Installation & Repair",
        "Air Conditioner Installation & Repair",
        "Ductwork",
        "Water Heater Installation",
        "Indoor Air Quality",
        "Maintenance & Tune-ups",
      ].map((name, i) => ({
        "@type": "Service",
        position: i + 1,
        name,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: "San Mateo County, CA",
      })),
    },
    {
      // FAQPage — enables the FAQ rich result in Google search.
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      // Breadcrumb for Google — even a 1-item breadcrumb helps on home.
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== HERO ========== */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="container-site relative z-10 py-6 md:py-10 lg:py-0 lg:min-h-[calc(100vh-var(--header-height))] flex items-center">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-12 items-center w-full">
            <div className="max-w-xl order-2 lg:order-1">
              <span className="inline-block text-[13px] font-[700] tracking-[.13em] uppercase text-orange mb-4">
                Local father & son HVAC Company 
              </span>
              <h1 className="text-[clamp(32px,4.4vw,52px)] font-[800] tracking-[-.02em] leading-[1.1] mb-6">
                <span className="block">San Mateo County’s</span>
                <span className="block text-orange">Heat Pump Specialists</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-md">
                Family-owned since 2005. We install heat pumps, mini-splits,
                furnaces and AC across San Mateo County — and handle the
                rebate paperwork for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[15px] transition-colors shadow-[0_10px_30px_-10px_rgba(241,90,41,0.6)]"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Schedule Online
                </a>
                <Link
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 h-[54px] px-7 rounded-full bg-white/10 hover:bg-white/15 text-white font-[700] text-[15px] border border-white/25 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </Link>
              </div>

              {/* Trust signal row */}
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-7 text-[13px] text-white/75">
                <li className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-orange" />
                  Licensed &amp; Insured
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange" />
                  20+ years
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-orange" fill="currentColor" strokeWidth={0} />
                  {GOOGLE_RATING}★ · 140+ Google reviews
                </li>
              </ul>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:-mr-6 xl:-mr-12">
              {/* Warm orange spotlight behind the van */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,90,41,0.28),transparent_60%)] pointer-events-none"
              />
              {/* Van + floor reflection stack */}
              <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[760px] xl:max-w-[880px]">
                <Image
                  src="/images/techprovan.png"
                  alt="TechPro Heating & Cooling service van with technician at the wheel"
                  width={894}
                  height={416}
                  priority
                  quality={92}
                  sizes="(max-width: 640px) 360px, (max-width: 1024px) 440px, 60vw"
                  className="relative w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)] lg:drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="bg-white border-b border-border-light">
        <div className="container-site py-9 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-5">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[10px] bg-badge-bg flex items-center justify-center shrink-0">
                  <badge.icon className="w-[18px] h-[18px] text-orange" />
                </div>
                <div className="min-w-0 pt-[1px]">
                  <p className="text-[13.5px] sm:text-[14px] font-[800] text-text-dark leading-[1.25]">
                    {badge.label}
                  </p>
                  <p className="text-[11.5px] sm:text-[12px] font-[500] text-text-muted leading-[1.3] mt-[3px]">
                    {badge.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="bg-light-bg section-padding scroll-mt-[100px]">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionTitle className="mt-3">
              How We Help
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              Install, repair, maintain — one local crew handling heating,
              cooling and water heating from first visit to final invoice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-[18px] p-8 border border-border-light"
              >
                <div className={`w-20 h-20 rounded-[18px] ${service.tint} flex items-center justify-center mb-5 overflow-hidden`}>
                  <Image
                    src={service.image}
                    alt={`${service.title} icon`}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain mix-blend-multiply"
                  />
                </div>
                <h3 className="text-xl font-[700] text-text-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-[15px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-10 bg-navy rounded-[18px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-[700] text-white mb-1 uppercase tracking-wide">
                Ready to upgrade your comfort?
              </h3>
              <p className="text-white/70 text-[15px]">
                Free in-home estimates — book a time that works for you, day
                or night, through our online scheduler.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] transition-colors shrink-0"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Online
            </a>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS ========== */}
      <section id="products" className="bg-white section-padding scroll-mt-[100px]">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionTitle className="mt-3">
              Equipment We Install
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              High-efficiency heat pumps, mini-splits, furnaces, AC and water
              heaters — matched to your home and the rebates you qualify for.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productCategories.map((product) => {
              const href = product.estimate
                ? `/estimate?service=${product.estimate}`
                : "/contact";
              return (
                <Link
                  key={product.slug}
                  href={href}
                  aria-label={
                    product.estimate
                      ? `Get an instant estimate for ${product.title}`
                      : `Ask us about ${product.title}`
                  }
                  className="group bg-light-bg rounded-[18px] p-4 sm:p-5 text-center border border-transparent hover:border-orange/30 hover:shadow-[0_18px_40px_-18px_rgba(10,19,41,0.18)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-square w-full rounded-[14px] bg-white overflow-hidden mb-4 shadow-sm">
                    <Image
                      src={product.image}
                      alt={`${product.title} — TechPro HVAC product`}
                      fill
                      sizes="(max-width: 768px) 40vw, 22vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[15px] font-[700] text-text-dark mt-auto group-hover:text-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[11.5px] font-[700] text-text-muted/70 tracking-[.08em] uppercase mt-1.5 group-hover:text-orange transition-colors">
                    {product.estimate ? "Get estimate →" : "Ask us →"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SERVICE AREAS ========== */}
      <section
        id="service-areas"
        className="bg-white section-padding scroll-mt-[100px]"
      >
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle className="mt-3">
                Where We Work
              </SectionTitle>
              <p className="text-text-muted text-lg mt-4 mb-8">
                Based in San Carlos, we stay local on purpose — shorter drives
                mean faster response and lower trip overhead. Every orange pin
                on the map is a real 2026 install. Click one to read what we
                did.
              </p>
              <h3 className="text-lg font-[700] text-text-dark mb-5">
                Cities We Serve
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {serviceAreas.map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    <span className="text-[15px] text-text-dark">{city}</span>
                  </div>
                ))}
              </div>
            </div>
            <ProjectsMap />
          </div>
                    {/* CTA Banner */}
          <div className="mt-10 bg-navy rounded-[18px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-[700] text-white mb-1 uppercase tracking-wide">
                Not sure we cover you?
              </h3>
              <p className="text-white/70 text-[15px]">
                Start booking online — enter your ZIP code and we&apos;ll
                confirm availability on the next screen.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] transition-colors shrink-0"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Online
            </a>
          </div>
        </div>
      </section>



      {/* ========== REVIEWS ========== */}
      <ReviewsSection />

      {/* ========== FAQ ========== */}
      <FaqSection />


      {/* ========== CONTACT CTA ========== */}
      <section className="bg-orange section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-[clamp(30px,3.2vw,44px)] font-[800] tracking-[-.02em] leading-[1.15] mb-4">
                Let&apos;s talk about your home.
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Send a quick note, call, or text — a real person on our team
                replies the same business day.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-[14px] bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[13px]">Call us</p>
                    <a
                      href={PHONE_HREF}
                      className="text-white font-[700] text-lg hover:text-white/90"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-[14px] bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[13px]">Visit us</p>
                    <p className="text-white font-[700]">
                      {ADDRESS}, {CITY_STATE_ZIP}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-[14px] bg-white/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[13px]">Office hours</p>
                    <p className="text-white font-[700]">{OFFICE_HOURS}</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
