import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  Clock,
  Users,
  Wrench,
  Settings,
  ThermometerSun,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Gauge,
  Layers,
  Fan,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
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
import { placeholderImage } from "@/lib/placeholder";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  CITY_STATE_ZIP,
  LICENSE,
  OFFICE_HOURS,
  EMERGENCY_HOURS,
  GOOGLE_RATING,
  YEARS_IN_BUSINESS,
  CITIES_SERVED,
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
  { icon: Shield, label: "Licensed & Insured", sublabel: LICENSE },
  { icon: Award, label: "EPA Certified", sublabel: "Certified Technicians" },
  { icon: Clock, label: "24/7 Service", sublabel: "Emergency Available" },
];

const services = [
  {
    icon: Settings,
    title: "Installation",
    description:
      "Expert installation of heating and cooling systems, sized and configured for maximum comfort and efficiency.",
    slug: "installation",
  },
  {
    icon: Wrench,
    title: "Repairs",
    description:
      "Fast, reliable repairs for all HVAC brands. Same-day service available with upfront pricing and no hidden fees.",
    slug: "repairs",
  },
  {
    icon: CalendarCheck,
    title: "Maintenance",
    description:
      "Preventive maintenance plans that extend equipment life, improve efficiency, and prevent costly breakdowns.",
    slug: "maintenance",
  },
];

const productCategories = [
  { icon: ThermometerSun, title: "Heat Pumps", slug: "heat-pumps" },
  { icon: Flame, title: "Furnaces", slug: "furnaces" },
  { icon: Snowflake, title: "Air Conditioners", slug: "air-conditioners" },
  { icon: Droplets, title: "Water Heaters", slug: "water-heaters" },
  { icon: Gauge, title: "Thermostats", slug: "thermostats" },
  { icon: Fan, title: "Ductless Systems", slug: "ductless-systems" },
  { icon: Wind, title: "Indoor Air Quality", slug: "indoor-air-quality" },
  { icon: Layers, title: "Zoning Systems", slug: "zoning-systems" },
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
        <div className="container-site relative z-10 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
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
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] border border-white/20"
                >
                  Get Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:flex items-center justify-center lg:justify-end lg:-mr-6 xl:-mr-12">
              {/* Soft radial glow behind the van */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,90,41,0.18),transparent_60%)] pointer-events-none"
              />
              <Image
                src="/images/van-cut.png"
                alt="TechPro Heating & Cooling service van"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="relative w-full max-w-[720px] xl:max-w-[820px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="bg-white border-b border-border-light">
        <div className="container-site py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="w-11 h-11 rounded-[14px] bg-badge-bg flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <p className="text-[14px] font-[800] text-text-dark leading-tight">
                    {badge.label}
                  </p>
                  <p className="text-[14px] font-[800] text-text-dark leading-tight mt-0.5">
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
            <SectionLabel>Our Services</SectionLabel>
            <SectionTitle className="mt-3">
              Comprehensive HVAC Solutions
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              From installation to maintenance, we provide complete heating and
              cooling services for residential and commercial properties.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-[18px] p-8 border border-border-light hover:border-orange/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-[14px] bg-badge-bg flex items-center justify-center mb-5 group-hover:bg-orange/10 transition-colors">
                  <service.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-xl font-[700] text-text-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-[15px]">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-orange font-[600] text-[14px] mt-4 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
          {/* CTA Banner */}
          <div className="mt-10 bg-navy rounded-[18px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-[700] text-white mb-1">
                Need emergency HVAC service?
              </h3>
              <p className="text-white/70 text-[15px]">
                Our 24/7 answering service ensures you are never left without
                help.
              </p>
            </div>
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] shrink-0"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionLabel>Equipment We Install</SectionLabel>
            <SectionTitle className="mt-3">
              Quality Products, Expert Installation
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              We install and service all major HVAC brands. Browse our product
              categories to find the right solution for your home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productCategories.map((product) => (
              <Link
                key={product.slug}
                href={`/products?category=${product.slug}`}
                className="group bg-light-bg rounded-[18px] p-6 text-center hover:bg-white hover:shadow-lg hover:border-orange/20 border border-transparent transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-[14px] bg-white flex items-center justify-center mx-auto mb-4 group-hover:bg-badge-bg transition-colors shadow-sm">
                  <product.icon className="w-6 h-6 text-navy group-hover:text-orange transition-colors" />
                </div>
                <h3 className="text-[15px] font-[700] text-text-dark">
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

      {/* ========== WHY TECHPRO ========== */}
      <section className="bg-navy section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-[700] tracking-[.13em] uppercase text-orange">
              Why Choose Us
            </span>
            <h2 className="text-[clamp(30px,3.2vw,44px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mt-3">
              The TechPro Difference
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              We are more than an HVAC company. We are your neighbors, committed
              to keeping San Mateo County comfortable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyTechPro.map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.06] rounded-[18px] p-7 border border-white/10 hover:bg-white/[0.1] transition-colors"
              >
                <div className="w-12 h-12 rounded-[14px] bg-orange/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-orange" />
                </div>
                <h3 className="text-lg font-[700] text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RECENT PROJECTS ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>Recent Projects</SectionLabel>
              <SectionTitle className="mt-3">Our Latest Work</SectionTitle>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-orange font-[600] text-[15px] hover:gap-3 transition-all"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-light-bg rounded-[18px] overflow-hidden border border-border-light hover:shadow-lg hover:border-orange/20 transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-border-light relative overflow-hidden">
                  <Image
                    src={placeholderImage(project.imageTags, {
                      w: 800,
                      h: 500,
                      seed: `home-proj-${project.slug}`,
                    })}
                    alt={`${project.title} (placeholder)`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-[700] bg-white/95 backdrop-blur text-navy px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-text-muted text-[13px] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </div>
                  <h3 className="text-lg font-[700] text-text-dark mb-2 group-hover:text-orange transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-[14px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-12">
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
              <p className="text-text-muted text-[14px] mb-4">
                Based on 200+ Google reviews
              </p>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange font-[600] text-[14px]"
              >
                View on Google <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-5">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[18px] p-7 border border-border-light"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-orange text-orange"
                      />
                    ))}
                  </div>
                  <p className="text-text-dark text-[15px] leading-relaxed mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-[700] text-text-dark text-[14px]">
                        {testimonial.name}
                      </p>
                      <p className="text-text-muted text-[13px]">
                        {testimonial.location}
                      </p>
                    </div>
                    <span className="text-[12px] font-[600] text-text-muted bg-light-bg px-3 py-1 rounded-full">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
              <SectionLabel>Service Areas</SectionLabel>
              <SectionTitle className="mt-3">
                Serving San Mateo County
              </SectionTitle>
              <p className="text-text-muted text-lg mt-4 mb-8">
                We proudly serve {CITIES_SERVED} cities across San Mateo County
                and surrounding areas.
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
        </div>
      </section>

      {/* ========== ABOUT / STATS ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>About TechPro</SectionLabel>
              <SectionTitle className="mt-3">
                {YEARS_IN_BUSINESS} Years of Trusted Service
              </SectionTitle>
              <p className="text-text-muted text-lg mt-4 mb-8 leading-relaxed">
                Since 2005, TechPro Heating &amp; Cooling has been the trusted
                choice for HVAC services in San Mateo County. As a
                family-owned business, we bring a personal touch to every
                job, large or small.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-[800] text-navy">
                      {stat.value}
                    </p>
                    <p className="text-text-muted text-[13px] mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-orange font-[600] text-[15px] hover:gap-3 transition-all"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] bg-light-bg">
              <Image
                src={placeholderImage("hvac,technician,workshop", {
                  w: 960,
                  h: 720,
                  seed: "techpro-crew",
                })}
                alt="TechPro Heating & Cooling crew (placeholder)"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
                Ready for Reliable HVAC Service?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Get a free estimate or schedule a service call today. Our team is
                ready to help.
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
