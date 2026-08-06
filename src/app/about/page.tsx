import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  ArrowRight,
  Users,
  Shield,
  Heart,
  Award,
  Clock,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  LICENSE,
  GOOGLE_RATING,
  YEARS_IN_BUSINESS,
  CITIES_SERVED,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Family-owned HVAC company serving San Mateo County since 2005. Learn about our team, values, and commitment to quality heating and cooling services.",
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Family-owned HVAC company serving San Mateo County since 2005.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Family-owned HVAC company serving San Mateo County since 2005.",
  },
};

const stats = [
  { value: YEARS_IN_BUSINESS, label: "Years in Business" },
  { value: "5,000+", label: "Completed Jobs" },
  { value: GOOGLE_RATING, label: "Google Rating" },
  { value: CITIES_SERVED, label: "Cities Served" },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make starts with what is best for the customer. We listen, advise honestly, and deliver on our promises.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We provide upfront pricing, honest recommendations, and stand behind our work with comprehensive warranties.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Our technicians are continuously trained and certified. We install only quality equipment and follow industry best practices.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "As a local, family-owned business, we are invested in the communities we serve. Our neighbors are our customers.",
  },
];

const certifications = [
  "EPA Section 608 Certified",
  "NATE Certified Technicians",
  "CSLB Licensed (" + LICENSE + ")",
  "Bonded & Insured",
  "BPI Certified",
  "Factory Authorized Dealer",
];

const timeline = [
  {
    year: "2005",
    title: "Founded",
    description:
      "TechPro Heating & Cooling was founded with a commitment to providing honest, quality HVAC services to San Mateo County.",
  },
  {
    year: "2010",
    title: "Growing Team",
    description:
      "Expanded to a team of 10 certified technicians to serve the growing demand across the county.",
  },
  {
    year: "2015",
    title: "Fleet Expansion",
    description:
      "Added fully equipped service vehicles for faster response times and same-day service capability.",
  },
  {
    year: "2020",
    title: "1,000th Heat Pump",
    description:
      "Installed our 1,000th heat pump system, becoming one of the region's leading heat pump specialists.",
  },
  {
    year: "2024",
    title: "20 Years Strong",
    description:
      "Celebrating 20 years of trusted service with over 5,000 completed jobs and a 4.9-star rating.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-navy text-white">
        <div className="container-site py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">About</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              About TechPro
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Family-owned and operated since 2005, TechPro Heating &amp;
              Cooling is San Mateo County&apos;s trusted choice for professional HVAC
              services.
            </p>
          </div>
        </div>
      </section>

      {/* ========== ABOUT CONTENT ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <SectionTitle className="mt-3">
                {YEARS_IN_BUSINESS} Years of Keeping
                <br />
                San Mateo County Comfortable
              </SectionTitle>
              <div className="mt-6 space-y-4 text-text-muted text-[15px] leading-relaxed">
                <p>
                  TechPro Heating &amp; Cooling was founded in 2005 with a simple
                  mission: provide honest, high-quality HVAC services to our
                  neighbors in San Mateo County. What started as a small
                  operation has grown into one of the county&apos;s most trusted
                  heating and cooling companies.
                </p>
                <p>
                  As a family-owned business, we bring a personal touch to
                  everything we do. We treat every home like our own and every
                  customer like family. Our team of certified technicians is
                  dedicated to delivering exceptional service, from the initial
                  consultation through installation and ongoing maintenance.
                </p>
                <p>
                  Over the past two decades, we have completed more than 5,000
                  jobs, installed over 1,000 heat pump systems, and maintained a
                  4.9-star Google rating. We are proud of the trust our community
                  has placed in us and work every day to earn it.
                </p>
              </div>
            </div>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3]">
              <Image
                src="/images/team.png"
                alt="TechPro Heating & Cooling team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border-light">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-[800] text-navy">{stat.value}</p>
                <p className="text-text-muted text-[14px] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION & VALUES ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white rounded-[18px] p-8 border border-border-light">
              <div className="w-12 h-12 rounded-[14px] bg-badge-bg flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-orange" />
              </div>
              <h3 className="text-xl font-[700] text-text-dark mb-3">
                Our Mission
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                To provide San Mateo County with the highest quality heating and
                cooling services, combining expert craftsmanship with honest,
                transparent business practices. We aim to keep every home and
                business comfortable while building lasting relationships with
                our customers.
              </p>
            </div>
            <div className="bg-white rounded-[18px] p-8 border border-border-light">
              <div className="w-12 h-12 rounded-[14px] bg-badge-bg flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-orange" />
              </div>
              <h3 className="text-xl font-[700] text-text-dark mb-3">
                Our Vision
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                To be the most trusted HVAC company in the Bay Area, known for
                exceptional service, energy-efficient solutions, and a genuine
                commitment to our community. We envision a future where every
                home is comfortable, efficient, and safe.
              </p>
            </div>
          </div>

          <div className="text-center mb-10">
            <SectionLabel>What Drives Us</SectionLabel>
            <SectionTitle className="mt-3">Our Core Values</SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-[18px] p-7 border border-border-light text-center"
              >
                <div className="w-14 h-14 rounded-[14px] bg-badge-bg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-lg font-[700] text-text-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-text-muted text-[14px] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="bg-white section-padding">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-12">
            <SectionLabel>Our Journey</SectionLabel>
            <SectionTitle className="mt-3">Company Timeline</SectionTitle>
          </div>
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-[12px] font-[800] shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border-light min-h-[40px]" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10">
                  <p className="text-[13px] font-[700] text-orange mb-1">
                    {item.year}
                  </p>
                  <h3 className="text-lg font-[700] text-text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-[14px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATIONS ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Credentials</SectionLabel>
              <SectionTitle className="mt-3">
                Licensed, Certified & Insured
              </SectionTitle>
              <p className="text-text-muted text-[15px] leading-relaxed mt-4 mb-8">
                Our technicians hold industry-leading certifications and undergo
                continuous training. We are fully licensed, bonded, and insured
                for your protection.
              </p>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    <span className="text-[15px] text-text-dark font-[500]">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3]">
              <Image
                src="/images/vans-lot.png"
                alt="TechPro fleet of service vehicles"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEAM PLACEHOLDER ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionLabel>Our Team</SectionLabel>
            <SectionTitle className="mt-3">
              Meet the People Behind TechPro
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              Our team of certified technicians and friendly staff is dedicated
              to providing the best HVAC experience in San Mateo County.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Team Member", role: "HVAC Technician" },
              { name: "Team Member", role: "Service Manager" },
              { name: "Team Member", role: "Installation Lead" },
              { name: "Team Member", role: "Office Manager" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-light-bg rounded-[18px] overflow-hidden border border-border-light"
              >
                <div className="aspect-square bg-border-lighter flex items-center justify-center">
                  <Users className="w-12 h-12 text-text-muted/20" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-[700] text-text-dark">{member.name}</h3>
                  <p className="text-text-muted text-[13px] mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-orange section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Experience the TechPro difference. Contact us today for a free
            consultation and estimate.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] border border-white/30"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
