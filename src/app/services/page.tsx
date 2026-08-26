import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Settings,
  Wrench,
  CalendarCheck,
  ThermometerSun,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Fan,
  ArrowRight,
  Phone,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE_NAME, PHONE, PHONE_HREF, BOOKING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_NAME}`,
  description:
    "Professional HVAC services including installation, repairs, and maintenance. Heat pumps, AC, furnaces, water heaters, and more. Serving San Mateo County.",
  openGraph: {
    title: `Our Services | ${SITE_NAME}`,
    description:
      "Professional HVAC services including installation, repairs, and maintenance for San Mateo County.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Services | ${SITE_NAME}`,
    description:
      "Professional HVAC services including installation, repairs, and maintenance for San Mateo County.",
  },
};

const serviceCategories = [
  {
    icon: Settings,
    title: "Installation",
    description:
      "Expert installation of heating and cooling systems, sized and configured for maximum comfort and efficiency in your home.",
    slug: "installation",
    items: [
      "Heat Pump Installation",
      "AC Installation",
      "Furnace Installation",
      "Ductless Mini-Split Installation",
      "Thermostat Installation",
      "Zoning System Installation",
    ],
  },
  {
    icon: Wrench,
    title: "Repairs",
    description:
      "Fast, reliable repairs for all HVAC brands. Same-day service available with upfront pricing and no hidden fees.",
    slug: "repairs",
    items: [
      "AC Repair",
      "Furnace Repair",
      "Heat Pump Repair",
      "Ductless System Repair",
      "Thermostat Repair",
      "Emergency HVAC Repair",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Maintenance",
    description:
      "Preventive maintenance plans that extend equipment life, improve efficiency, and prevent costly breakdowns.",
    slug: "maintenance",
    items: [
      "Annual Tune-Ups",
      "Filter Replacement",
      "System Inspections",
      "Coil Cleaning",
      "Refrigerant Check",
      "Maintenance Agreements",
    ],
  },
];

const specificServices = [
  {
    icon: ThermometerSun,
    title: "Heat Pump Installation",
    description:
      "Energy-efficient heat pump systems that provide both heating and cooling. Ideal for the Bay Area climate with year-round comfort.",
    slug: "heat-pump-installation",
  },
  {
    icon: Snowflake,
    title: "AC Repair & Installation",
    description:
      "Professional air conditioning repair and new system installation. We service all major brands and offer same-day emergency repair.",
    slug: "ac-repair",
  },
  {
    icon: Flame,
    title: "Furnace Services",
    description:
      "Complete furnace installation, repair, and maintenance. Gas, electric, and oil furnaces serviced by certified technicians.",
    slug: "furnace-maintenance",
  },
  {
    icon: Droplets,
    title: "Water Heater Services",
    description:
      "Tank and tankless water heater installation and repair. Energy-efficient upgrades that save money on utility bills.",
    slug: "water-heater-services",
  },
  {
    icon: Fan,
    title: "Ductless Mini-Splits",
    description:
      "Flexible ductless solutions for room additions, garages, and homes without ductwork. Efficient zone-based temperature control.",
    slug: "ductless-mini-splits",
  },
  {
    icon: Wind,
    title: "Indoor Air Quality",
    description:
      "Air purifiers, humidifiers, dehumidifiers, and ventilation systems to improve the air quality in your home.",
    slug: "indoor-air-quality",
  },
];

export default function ServicesPage() {
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
            <span className="text-white/90">Services</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Our Services
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              From installation to emergency repairs, TechPro Heating &amp;
              Cooling provides comprehensive HVAC solutions for residential and
              commercial properties across San Mateo County.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SERVICE CATEGORIES ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionLabel>What We Do</SectionLabel>
            <SectionTitle className="mt-3">
              Complete HVAC Service Categories
            </SectionTitle>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <div
                key={category.slug}
                className="bg-light-bg rounded-[18px] p-8 border border-border-light"
              >
                <div className="w-14 h-14 rounded-[14px] bg-badge-bg flex items-center justify-center mb-5">
                  <category.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-xl font-[700] text-text-dark mb-3">
                  {category.title}
                </h3>
                <p className="text-text-muted text-[14px] leading-relaxed mb-5">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[14px] text-text-dark"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-orange shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPECIFIC SERVICES ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionLabel>Specialized Services</SectionLabel>
            <SectionTitle className="mt-3">
              Expert Solutions for Every Need
            </SectionTitle>
            <p className="text-text-muted text-lg mt-4 max-w-2xl mx-auto">
              Explore our specialized HVAC services. Each is backed by certified
              technicians and our satisfaction guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specificServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-[18px] p-7 border border-border-light hover:border-orange/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-[14px] bg-badge-bg flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors">
                  <service.icon className="w-5 h-5 text-orange" />
                </div>
                <h3 className="text-lg font-[700] text-text-dark mb-2 group-hover:text-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-muted text-[14px] leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-orange font-[600] text-[14px] group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="bg-navy section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Call us today for a free consultation and estimate. Our team is ready
            to help with all your HVAC needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
      </section>
    </>
  );
}
