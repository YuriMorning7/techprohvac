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
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";
import ServiceAreaMap from "@/components/ui/ServiceAreaMap";
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
  { icon: CalendarCheck, label: "Established in", sublabel: "2005" },
  { icon: Users, label: "Father & Son", sublabel: "Owned" },
  { icon: MapPin, label: "Based in", sublabel: "San Carlos" },
  { icon: Wind, label: "Serving San", sublabel: "Mateo County" },
  { icon: BadgeCheck, label: "Licensed &", sublabel: "Insured" },
  { icon: Award, label: "Residential &", sublabel: "Light Commercial" },
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

const productCategories = [
  { image: "/images/Heat pumps.jpeg", title: "Heat Pumps", slug: "heat-pumps" },
  { image: "/images/Mini Split System.jpeg", title: "Mini-Split Systems", slug: "mini-split-systems" },
  { image: "/images/Water Heaters.jpeg", title: "Water Heaters", slug: "water-heaters" },
  { image: "/images/Ductwork.jpeg", title: "Ductwork", slug: "ductwork" },
  { image: "/images/Gas furnaces.jpeg", title: "Gas Furnaces", slug: "gas-furnaces" },
  { image: "/images/Air conditioners.jpeg", title: "Air Conditioners", slug: "air-conditioners" },
  { image: "/images/Indoor air quality.jpeg", title: "Indoor Air Quality", slug: "indoor-air-quality" },
  { image: "/images/Packaged units.jpeg", title: "Packaged Units", slug: "packaged-units" },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://techprohvac.com/#business",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: "https://techprohvac.com",
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS,
        addressLocality: "San Carlos",
        addressRegion: "CA",
        postalCode: "94070",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.5072,
        longitude: -122.2605,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_RATING,
        reviewCount: "200",
        bestRating: "5",
      },
      priceRange: "$$",
      image: "https://techprohvac.com/images/team.png",
      sameAs: [],
    },
    {
      "@type": "Organization",
      "@id": "https://techprohvac.com/#organization",
      name: SITE_NAME,
      url: "https://techprohvac.com",
      logo: "https://techprohvac.com/images/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
      areaServed: serviceAreas.map((city) => ({
        "@type": "City",
        name: city,
        "@id": `https://techprohvac.com/#area-${city.toLowerCase().replace(/\s+/g, "-")}`,
      })),
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
                <span className="block">Heat Pump Specialists</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-md">
              Learn more about switching from gas to electric heating & cooling ...
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
                >
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </Link>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] border border-white/20"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Schedule Online
                </a>
              </div>
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
                {/* Mirrored floor reflection — desktop only, keeps mobile lean */}
                <Image
                  src="/images/techprovan.png"
                  alt=""
                  aria-hidden="true"
                  width={894}
                  height={416}
                  sizes="60vw"
                  className="hidden lg:block absolute inset-x-0 top-full -mt-16 w-full h-auto scale-y-[-1] opacity-25 blur-[3px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_55%)] pointer-events-none"
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
        <div className="container-site py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-[10px] bg-badge-bg flex items-center justify-center shrink-0">
                  <badge.icon className="w-[18px] h-[18px] text-orange" />
                </div>
                <div className="min-w-0 pt-[2px]">
                  <p className="text-[13.5px] sm:text-[14px] font-[800] text-text-dark leading-[1.25]">
                    {badge.label}
                  </p>
                  <p className="text-[13.5px] sm:text-[14px] font-[800] text-text-dark leading-[1.25]">
                    {badge.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionTitle className="mt-3">
              Our Services
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              Complete Heating & Cooling Services for Your Home or Business.
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
                Ready to schedule?
              </h3>
              <p className="text-white/70 text-[15px]">
              Book your appointment anytime with our 24/7 online scheduling.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] shrink-0"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Online
            </a>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionTitle className="mt-3">
              Our Products
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              HVAC Products & Equipment We install, Repair or Maintain.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productCategories.map((product) => (
              <Link
                key={product.slug}
                href={`/products?category=${product.slug}`}
                className="group bg-light-bg rounded-[18px] p-4 sm:p-5 text-center hover:bg-white hover:shadow-lg hover:border-orange/20 border border-transparent transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square w-full rounded-[14px] bg-white overflow-hidden mb-4 shadow-sm">
                  <Image
                    src={product.image}
                    alt={`${product.title} — TechPro HVAC product`}
                    fill
                    sizes="(max-width: 768px) 40vw, 22vw"
                    className="object-contain p-3 group-hover:scale-[1.04] transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[15px] font-[700] text-text-dark mt-auto">
                  {product.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-orange font-[600] text-[15px] hover:gap-3 transition-all"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
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
                Serving San Mateo County
              </SectionTitle>
              <p className="text-text-muted text-lg mt-4 mb-8">
                Based in San Carlos,  We keep our service area local for faster & more reliable HVAC service.
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
            <ServiceAreaMap
              defaultQuery="San Mateo County, CA"
              defaultLabel="San Mateo County"
            />
          </div>
                    {/* CTA Banner */}
          <div className="mt-10 bg-navy rounded-[18px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-[700] text-white mb-1 uppercase tracking-wide">
                CHECK YOUR SERVICE AREA
              </h3>
              <p className="text-white/70 text-[15px]">
                Enter your ZIP code to confirm availability & schedule online.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] shrink-0"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Online
            </a>
          </div>
        </div>
      </section>



      {/* ========== REVIEWS ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12">
            {/* Rating Summary */}
            <div className="bg-white rounded-[18px] p-8 border border-border-light text-center lg:text-left self-start">
              <SectionLabel>Reviews</SectionLabel>
              <div className="mt-3 mb-2">
                <span className="text-5xl font-[800] text-navy">
                  {GOOGLE_RATING}
                </span>
              </div>
              <div className="flex items-center gap-1 justify-center lg:justify-start mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-orange text-orange"
                  />
                ))}
              </div>
              <p className="text-text-muted text-[14px] mb-5">
                Real reviews from happy neighbors across San Mateo County.
              </p>
              <a
                href="https://share.google/g7zNtg0V0XtDAKYCA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange font-[700] text-[14px] hover:gap-3 transition-all"
              >
                Read all on Google <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Housecall Pro Reviews Widget — wrapped in brand chrome */}
            <div className="bg-white rounded-[18px] border border-border-light overflow-hidden">
              <div className="relative w-full" style={{ height: "620px" }}>
                <iframe
                  src="https://client.housecallpro.com/reviews/widget/419e6050-bc8f-4dc9-9053-e6abd3bc5229"
                  title="Verified customer reviews for TechPro Heating & Cooling"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========== CONTACT CTA ========== */}
      <section className="bg-orange section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-[clamp(30px,3.2vw,44px)] font-[800] tracking-[-.02em] leading-[1.15] mb-4">
                Ready to contact Techpro?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Send a message to the Techpro team by filling out the form or call/text directly.
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
