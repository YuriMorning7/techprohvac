import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Check,
  Phone,
  ArrowRight,
  Shield,
  ShieldCheck,
  Clock,
  Award,
  BadgeCheck,
  Star,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE_NAME, PHONE, PHONE_HREF } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  SERVICE DATA                                                       */
/* ------------------------------------------------------------------ */

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceData {
  title: string;
  slug: string;
  heroDescription: string;
  longDescription: string;
  image: string;
  included: string[];
  benefits: string[];
  howItGoes: ProcessStep[];
  faqs: { question: string; answer: string }[];
  estimatePitch: {
    title: string;
    subtitle: string;
  };
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
    howItGoes: [
      {
        title: "Free estimate",
        description: "About an hour at your house. No charge, no pressure.",
      },
      {
        title: "Written quote",
        description:
          "Usually within two business days, with two or three options.",
      },
      {
        title: "Install",
        description:
          "One to three days depending on ductwork and electrical.",
      },
      {
        title: "Inspection",
        description:
          "We meet the city inspector so you do not have to take the day off.",
      },
    ],
    faqs: [
      {
        question: "How long does a heat pump install take?",
        answer:
          "Most installs run one to three days, depending on ductwork and electrical work. Simple swaps can finish in a day; new ductwork or a panel upgrade adds time. We give you a firm schedule with the written quote.",
      },
      {
        question: "Do I need to upgrade my electrical panel?",
        answer:
          "Sometimes. Heat pumps need dedicated 240V circuits and older panels may not have the capacity. We include a panel check in the free estimate and price any upgrade transparently in the quote.",
      },
      {
        question: "Are there rebates available?",
        answer:
          "Yes — federal tax credits, state incentives, and PG&E rebates can cover thousands of dollars. We handle the paperwork for BayREN and TECH Clean California rebates so you do not have to chase them yourself.",
      },
      {
        question: "What warranty comes with the equipment?",
        answer:
          "Standard equipment warranties run 10 years on parts when registered, and we add a 2-year labor warranty on top. Extended coverage is available for the equipment you choose.",
      },
      {
        question: "Do you offer financing?",
        answer:
          "Yes. We partner with lenders that offer 0% and low-APR plans for qualified customers. We will lay out the monthly numbers next to the cash price so you can compare.",
      },
    ],
    estimatePitch: {
      title: "Find out what your house actually needs",
      subtitle:
        "An hour at your house, a written quote, and no obligation.",
    },
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
    howItGoes: [
      {
        title: "Diagnose",
        description:
          "On-site inspection, usually within an hour of the tech arriving.",
      },
      {
        title: "Quote",
        description:
          "Upfront pricing before any work starts — no surprises on the invoice.",
      },
      {
        title: "Repair",
        description:
          "Most repairs finished the same day; common parts are on the truck.",
      },
      {
        title: "Verify",
        description:
          "System retested end-to-end so you know it is truly fixed before we leave.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you come out?",
        answer:
          "We aim for same-day service on repair calls placed before noon, and priority booking the next morning for late-day calls. After-hours emergency service is answered 24/7.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer:
          "There is a standard service call fee that covers the visit and diagnostic. If you approve the repair, that fee is applied to the total — you are not paying twice.",
      },
      {
        question: "Should I repair or replace my AC?",
        answer:
          "Honest rule of thumb: if the unit is over 15 years old and the repair is more than half the cost of a new system, replacement usually pays back inside three seasons. We will lay out both numbers so you can decide.",
      },
      {
        question: "Is the repair warrantied?",
        answer:
          "Yes — 90 days on the labor and the manufacturer's warranty on any parts we install. We will note the terms on your invoice.",
      },
      {
        question: "What brands do you repair?",
        answer:
          "All the major residential brands — Carrier, Lennox, Trane, Rheem, Goodman, York, Daikin, Mitsubishi, and more.",
      },
    ],
    estimatePitch: {
      title: "Cool air, fast — with a written repair quote",
      subtitle:
        "Same-day diagnostic, upfront price, and a 90-day repair warranty.",
    },
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
    howItGoes: [
      {
        title: "Inspect",
        description:
          "Full safety and performance check across every burner, motor, and control.",
      },
      {
        title: "Clean",
        description:
          "Burners, coils, and blower cleaned back to factory spec.",
      },
      {
        title: "Test",
        description:
          "Combustion analysis, thermostat calibration, and a carbon monoxide check.",
      },
      {
        title: "Report",
        description:
          "Written summary of what we found and anything we recommend before winter.",
      },
    ],
    faqs: [
      {
        question: "How often should I service my furnace?",
        answer:
          "Once a year, ideally in the fall before you rely on it every night. Annual tune-ups keep the manufacturer warranty valid and catch small issues before they become no-heat calls.",
      },
      {
        question: "How long does a tune-up take?",
        answer:
          "Plan on 60 to 90 minutes. We text a heads-up when we are 20 minutes out and leave a written report before we go.",
      },
      {
        question: "Do you offer maintenance plans?",
        answer:
          "Yes — annual plans include a tune-up, priority scheduling, and discounts on any repairs. Multi-system plans cover the AC too.",
      },
      {
        question: "Will a tune-up lower my heating bill?",
        answer:
          "Usually yes. Dirty filters, worn parts, and mis-set gas pressure can add 10-25% to your bill. A tune-up brings the system back to its rated efficiency.",
      },
      {
        question: "Is my furnace safe to run?",
        answer:
          "The tune-up includes a heat exchanger inspection and a CO check. If we find anything unsafe we will explain it, show you the reading, and lay out options before doing any work.",
      },
    ],
    estimatePitch: {
      title: "Book your annual tune-up before winter",
      subtitle:
        "One visit, one written report, and a clear picture of your system's health.",
    },
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
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <details className="group">
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none">
        <span className="text-[16px] sm:text-[17px] font-[700] text-navy leading-snug">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="relative flex-none w-5 h-5 text-orange"
        >
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-current" />
          <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-current transition-transform duration-200 group-open:rotate-90 group-open:scale-0" />
        </span>
      </summary>
      <div className="pb-5 pr-6 -mt-1 text-text-muted text-[14.5px] leading-relaxed">
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

      {/* ========== BODY: CONTENT + STICKY ESTIMATE ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-14 items-start">
            {/* Left: content stack */}
            <div className="space-y-14 lg:space-y-16 min-w-0">
              {/* Overview */}
              <div>
                <p className="text-text-muted text-[16px] leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              {/* What is included */}
              <div>
                <h2 className="text-[clamp(28px,3vw,36px)] font-[800] text-navy tracking-tight leading-[1.1] mb-6">
                  What is included
                </h2>
                <ul className="space-y-4">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="flex-none w-6 h-6 flex items-center justify-center mt-0.5">
                        <Check className="w-5 h-5 text-orange" strokeWidth={2.5} />
                      </span>
                      <span className="text-[15.5px] text-text-dark leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it goes */}
              <div>
                <h2 className="text-[clamp(28px,3vw,36px)] font-[800] text-navy tracking-tight leading-[1.1] mb-6">
                  How it goes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.howItGoes.map((step, i) => (
                    <div
                      key={step.title}
                      className="bg-light-bg rounded-[16px] border border-border-light p-6"
                    >
                      <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
                        Step {i + 1}
                      </p>
                      <h3 className="text-[18px] font-[800] text-navy mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[14.5px] text-text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common questions */}
              <div>
                <h2 className="text-[clamp(28px,3vw,36px)] font-[800] text-navy tracking-tight leading-[1.1] mb-6">
                  Common questions
                </h2>
                <div className="divide-y divide-border-light border-y border-border-light">
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
            </div>

            {/* Right: sticky Free Estimate sidebar */}
            <aside className="lg:sticky lg:top-24">
              <div className="bg-light-bg rounded-[18px] border border-border-light p-6 sm:p-8">
                <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
                  Free Estimate
                </p>
                <h3 className="text-[22px] sm:text-[24px] font-[800] text-navy leading-[1.2] tracking-tight mb-3">
                  {service.estimatePitch.title}
                </h3>
                <p className="text-[14.5px] text-text-muted leading-relaxed mb-6">
                  {service.estimatePitch.subtitle}
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center h-[54px] bg-orange hover:bg-orange-hover text-white font-[700] text-[15.5px] rounded-[12px] transition-colors"
                  >
                    Schedule Online
                  </Link>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center h-[54px] bg-white border border-border-light hover:border-navy/30 text-navy font-[700] text-[15.5px] rounded-[12px] transition-colors"
                  >
                    {PHONE}
                  </a>
                </div>
                <div className="mt-7 pt-6 border-t border-border-light space-y-3">
                  <div className="flex items-center gap-3 text-[13.5px] text-text-dark">
                    <ShieldCheck className="w-[18px] h-[18px] text-text-muted shrink-0" />
                    <span>Licensed &amp; insured · CSLB #860715</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13.5px] text-text-dark">
                    <BadgeCheck className="w-[18px] h-[18px] text-text-muted shrink-0" />
                    <span>NATE-certified technicians</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13.5px] text-text-dark">
                    <Clock className="w-[18px] h-[18px] text-text-muted shrink-0" />
                    <span>Family owned since 2005</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
