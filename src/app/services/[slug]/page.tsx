import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  CheckCircle,
  Phone,
  ArrowRight,
  ChevronDown,
  Shield,
  Clock,
  Award,
  Star,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE_NAME, PHONE, PHONE_HREF } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  SERVICE DATA                                                       */
/* ------------------------------------------------------------------ */

interface ServiceData {
  title: string;
  slug: string;
  heroDescription: string;
  longDescription: string;
  image: string;
  included: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

const servicesData: Record<string, ServiceData> = {
  "heat-pump-installation": {
    title: "Heat Pump Installation",
    slug: "heat-pump-installation",
    heroDescription:
      "Energy-efficient heat pump systems that provide both heating and cooling for year-round comfort. Ideal for the Bay Area climate with significant energy savings.",
    longDescription:
      "Heat pumps are one of the most energy-efficient ways to heat and cool your home. By transferring heat rather than generating it, heat pumps use significantly less energy than traditional HVAC systems. Our certified technicians will help you choose the right system, handle professional installation, and ensure optimal performance.",
    image: "/images/team.png",
    included: [
      "Free in-home consultation and load calculation",
      "Equipment selection based on home size and needs",
      "Professional installation by certified technicians",
      "Electrical and ductwork modifications as needed",
      "System testing and performance verification",
      "Thermostat setup and programming",
      "Homeowner orientation and system walkthrough",
      "Manufacturer warranty registration",
      "Post-installation follow-up inspection",
      "Maintenance plan recommendations",
    ],
    benefits: [
      "Up to 50% energy savings compared to traditional systems",
      "Both heating and cooling from a single system",
      "Eligible for federal tax credits and rebates",
      "Quieter operation than conventional HVAC",
      "Improved indoor air quality",
      "Longer equipment lifespan with proper maintenance",
    ],
    faqs: [
      {
        question: "How much does a heat pump installation cost?",
        answer:
          "Heat pump installation costs vary based on the system size, type, and your home's specific requirements. We offer free in-home estimates so we can assess your needs and provide an accurate quote. Most installations range from $5,000 to $15,000, and many qualify for rebates and tax credits that can significantly reduce the cost.",
      },
      {
        question: "How long does installation take?",
        answer:
          "A typical heat pump installation takes 1-2 days, depending on the complexity of the project. This includes removing the old equipment, installing the new system, running any necessary electrical or ductwork, and thorough testing.",
      },
      {
        question: "Are heat pumps effective in colder weather?",
        answer:
          "Modern heat pumps are highly efficient even in cold temperatures. The Bay Area's mild climate is ideal for heat pump performance. For the occasional very cold night, many systems include auxiliary heating to ensure consistent comfort.",
      },
      {
        question: "What brands do you install?",
        answer:
          "We install all major heat pump brands including Carrier, Lennox, Trane, Daikin, Mitsubishi, and more. We will recommend the best brand and model based on your specific needs and budget.",
      },
      {
        question:
          "What maintenance does a heat pump need?",
        answer:
          "Heat pumps benefit from annual maintenance including filter changes, coil cleaning, refrigerant checks, and system inspections. We offer maintenance plans that keep your system running efficiently and extend its lifespan.",
      },
    ],
  },
  "ac-repair": {
    title: "AC Repair & Service",
    slug: "ac-repair",
    heroDescription:
      "Fast, reliable air conditioning repair by certified technicians. Same-day service available with upfront pricing and no hidden fees.",
    longDescription:
      "When your air conditioning breaks down, you need fast and reliable service. Our certified technicians diagnose and repair all AC brands and models. We provide upfront pricing before any work begins, so there are no surprises.",
    image: "/images/team.png",
    included: [
      "Thorough system diagnostic and inspection",
      "Upfront pricing before any work begins",
      "Repair or replacement of failed components",
      "Refrigerant level check and recharge if needed",
      "Electrical connection inspection",
      "Thermostat calibration and testing",
      "Condensate drain cleaning",
      "System performance verification",
      "Written report of findings and recommendations",
      "90-day warranty on all repairs",
    ],
    benefits: [
      "Same-day emergency service available",
      "All major brands serviced",
      "Upfront, transparent pricing",
      "Background-checked technicians",
      "90-day repair warranty",
      "No overtime charges for regular hours",
    ],
    faqs: [
      {
        question: "How quickly can you come for an AC repair?",
        answer:
          "We offer same-day service for most AC repairs. For emergencies, we prioritize getting a technician to your home as quickly as possible, often within a few hours of your call.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer:
          "We charge a standard service call fee that includes the diagnostic. If you proceed with the repair, the diagnostic fee is typically applied toward the cost of the repair.",
      },
      {
        question: "Should I repair or replace my AC unit?",
        answer:
          "We will provide an honest assessment. As a general rule, if your AC is over 15 years old and the repair costs more than half the price of a new system, replacement may be the better investment. We always explain both options so you can make an informed decision.",
      },
      {
        question: "What brands do you repair?",
        answer:
          "We repair all major AC brands including Carrier, Lennox, Trane, Rheem, Goodman, York, Daikin, and many more. Our technicians are trained and certified to work on all systems.",
      },
    ],
  },
  "furnace-maintenance": {
    title: "Furnace Maintenance & Tune-Up",
    slug: "furnace-maintenance",
    heroDescription:
      "Professional furnace maintenance that extends equipment life, improves efficiency, and prevents costly winter breakdowns.",
    longDescription:
      "Regular furnace maintenance is essential for safe, efficient operation. Our comprehensive tune-up service includes a thorough inspection, cleaning, and adjustment of your furnace to ensure peak performance throughout the heating season.",
    image: "/images/team.png",
    included: [
      "Complete safety inspection",
      "Heat exchanger inspection for cracks",
      "Burner cleaning and adjustment",
      "Ignition system inspection and cleaning",
      "Blower motor lubrication and inspection",
      "Air filter replacement",
      "Thermostat calibration",
      "Gas pressure and combustion analysis",
      "Electrical connections tightening",
      "Carbon monoxide safety check",
    ],
    benefits: [
      "Prevents unexpected breakdowns",
      "Extends furnace lifespan",
      "Improves energy efficiency",
      "Ensures safe operation",
      "Maintains manufacturer warranty",
      "Improves indoor air quality",
    ],
    faqs: [
      {
        question: "How often should I have my furnace maintained?",
        answer:
          "We recommend annual furnace maintenance, ideally in the fall before the heating season begins. Regular maintenance can extend your furnace's lifespan by several years and prevent costly emergency repairs.",
      },
      {
        question: "How long does a furnace tune-up take?",
        answer:
          "A standard furnace tune-up takes approximately 60 to 90 minutes. Our technician will thoroughly inspect, clean, and adjust your system and provide a detailed report of their findings.",
      },
      {
        question: "Do you offer maintenance plans?",
        answer:
          "Yes, we offer annual maintenance plans that include priority scheduling, discounts on repairs, and peace of mind. Plans typically include one or two tune-ups per year depending on the level you choose.",
      },
      {
        question: "Will maintenance help lower my energy bills?",
        answer:
          "Yes. A well-maintained furnace operates more efficiently, which translates to lower energy bills. Dirty filters, worn parts, and misaligned components can increase energy consumption by 10-25%.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  METADATA + STATIC PARAMS                                           */
/* ------------------------------------------------------------------ */

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [
    { slug: "heat-pump-installation" },
    { slug: "ac-repair" },
    { slug: "furnace-maintenance" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: `Service Not Found | ${SITE_NAME}`,
    };
  }

  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.heroDescription,
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: service.heroDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${SITE_NAME}`,
      description: service.heroDescription,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION (Client Component inline)                            */
/* ------------------------------------------------------------------ */

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <details className="group border border-border-light rounded-[14px] overflow-hidden">
      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-light-bg transition-colors">
        <span className="text-[15px] font-[600] text-text-dark">
          {question}
        </span>
        <ChevronDown className="w-5 h-5 text-text-muted shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 text-text-muted text-[14px] leading-relaxed border-t border-border-light pt-4">
        {answer}
      </div>
    </details>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return (
      <section className="bg-white section-padding">
        <div className="container-site text-center">
          <h1 className="text-3xl font-[800] text-navy mb-4">
            Service Not Found
          </h1>
          <p className="text-text-muted mb-6">
            The service you are looking for does not exist.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-orange font-[600]"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDescription,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    serviceType: "HVAC",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== HERO ========== */}
      <section className="bg-navy text-white">
        <div className="container-site py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/services"
              className="hover:text-white/80 transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{service.title}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <SectionLabel>Our Services</SectionLabel>
              <h1 className="text-[clamp(34px,4.5vw,52px)] font-[800] tracking-[-.02em] leading-[1.1] mt-3 mb-5">
                {service.title}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {service.heroDescription}
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
            <div className="relative hidden lg:block">
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST INDICATORS ========== */}
      <section className="bg-white border-b border-border-light">
        <div className="container-site py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-[14px] text-text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange" />
              <span>Certified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange" />
              <span>4.9 Star Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DESCRIPTION + BENEFITS ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel>About This Service</SectionLabel>
              <SectionTitle className="mt-3">Overview</SectionTitle>
              <p className="text-text-muted text-[15px] leading-relaxed mt-4">
                {service.longDescription}
              </p>
              {/* Benefits */}
              <div className="mt-8">
                <h3 className="text-lg font-[700] text-text-dark mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-[15px] text-text-dark">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <div className="bg-light-bg rounded-[18px] p-8 border border-border-light">
                <h3 className="text-xl font-[700] text-text-dark mb-6">
                  What Is Included
                </h3>
                <ul className="space-y-3">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                      <span className="text-[15px] text-text-dark">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle className="mt-3">
              Frequently Asked Questions
            </SectionTitle>
          </div>
          <div className="space-y-3">
            {service.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="bg-orange section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Ready to Schedule Your {service.title}?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Contact us today for a free consultation and estimate. Our certified
            technicians are ready to help.
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
              Request Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
