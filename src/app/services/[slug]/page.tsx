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
  CalendarCheck,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE_NAME, PHONE, PHONE_HREF, BOOKING_URL } from "@/lib/constants";
import { placeholderImage } from "@/lib/placeholder";

const serviceImageTags: Record<string, string> = {
  "heat-pump-installation": "heat-pump,hvac,installation",
  "ac-repair": "air-conditioner,technician,repair",
  "furnace-maintenance": "furnace,technician,heater",
  "heating-repair": "heater,technician,repair",
  installation: "hvac,installation,contractor",
  maintenance: "hvac,maintenance,tune-up",
  "duct-services": "ductwork,ventilation,duct",
  "indoor-air-quality": "air-purifier,filter,clean-air",
  repairs: "hvac,repair,tools",
  "water-heater-services": "water-heater,tankless,plumbing",
  "ductless-mini-splits": "mini-split,ductless,indoor-unit",
};

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
  "heating-repair": {
    title: "Heating Repair",
    slug: "heating-repair",
    heroDescription:
      "Fast, honest heating repair when your furnace or heat pump quits. Same-day service, upfront pricing, and after-hours emergency response.",
    longDescription:
      "When the heat drops out on a cold night, you want a tech who can diagnose it fast and fix it right. We repair every major brand of furnace, heat pump, and hydronic system across San Mateo County — usually the same day, with upfront pricing before we touch a wrench.",
    image: "/images/team.png",
    included: [
      "Full system diagnostic and safety check",
      "Upfront written quote before any repair",
      "Repair or replacement of failed parts (common parts on the truck)",
      "Gas pressure and combustion analysis",
      "Carbon monoxide safety test",
      "Thermostat calibration and testing",
      "Blower motor and control-board diagnostics",
      "Ductwork airflow verification",
      "90-day repair warranty on labor",
    ],
    benefits: [
      "Same-day repairs in most cases",
      "After-hours emergency response",
      "Upfront, no-surprise pricing",
      "All major brands serviced",
      "90-day workmanship warranty",
      "Background-checked, certified technicians",
    ],
    howItGoes: [
      {
        title: "Diagnose",
        description:
          "On-site inspection to isolate the exact failure — not a guess.",
      },
      {
        title: "Quote",
        description:
          "Upfront price for the repair before any parts come off the shelf.",
      },
      {
        title: "Repair",
        description:
          "Same-day fix on most calls; common parts stay stocked on the truck.",
      },
      {
        title: "Verify",
        description:
          "Full-cycle retest and a CO safety check before we leave.",
      },
    ],
    faqs: [
      {
        question: "Do you offer emergency service?",
        answer:
          "Yes. Our line is answered 24/7. Same-day dispatch on repair calls during business hours; after-hours we prioritize no-heat and safety calls.",
      },
      {
        question: "Should I repair or replace an older furnace?",
        answer:
          "Rule of thumb: if the unit is over 15 years old and the repair is more than half the cost of a new system, replacement usually pays back in a few seasons. We show you both numbers so you can decide.",
      },
      {
        question: "How do I know if it's the thermostat or the furnace?",
        answer:
          "Sometimes the fix is a $12 battery or a dead thermostat, not a broken furnace. We check the simple stuff first — you never pay for a repair you didn't need.",
      },
      {
        question: "What if you can't get the part today?",
        answer:
          "We keep the common failure parts stocked on every truck. If your unit needs something special-order, we tell you upfront and get you a firm ETA.",
      },
      {
        question: "Is the repair warrantied?",
        answer:
          "Yes — 90 days on labor and the manufacturer's warranty on any parts we install. Terms are on your invoice.",
      },
    ],
    estimatePitch: {
      title: "Heat back on today — with a clear repair price",
      subtitle:
        "Same-day diagnostic, upfront quote, and a 90-day repair warranty.",
    },
  },
  installation: {
    title: "HVAC Installation",
    slug: "installation",
    heroDescription:
      "Whole-system replacements and new installs sized to your house, not a generic table. Written quote, city permits, and a clean install every time.",
    longDescription:
      "Replacing an aging system is one of the biggest comfort upgrades you can make. We start with an in-home load calculation so the system is sized to your house, not a rule of thumb. Then a written quote with real equipment models, city permits pulled by us, a professional install, and a walkthrough before we leave.",
    image: "/images/team.png",
    included: [
      "In-home load calculation — we measure the house, not the square footage",
      "Written quote with equipment models and full pricing, no line items hidden",
      "City permit pulled and inspection scheduled by us",
      "Refrigerant lines, electrical, and condensate handled to code",
      "Old equipment hauled away and disposed of properly",
      "Commissioning, thermostat setup, and a walkthrough before we leave",
      "Manufacturer warranty registration handled on your behalf",
      "Post-installation follow-up inspection",
      "Two-year labor warranty on top of manufacturer coverage",
    ],
    benefits: [
      "Correctly sized systems that actually run efficiently",
      "Rebate and financing paperwork handled for you",
      "Two-year labor warranty",
      "Certified installers on every crew",
      "Written price — no bait-and-switch",
      "Clean-site guarantee: we leave it better than we found it",
    ],
    howItGoes: [
      {
        title: "Free estimate",
        description: "About an hour at your house. No charge, no pressure.",
      },
      {
        title: "Written quote",
        description:
          "Two or three equipment options with real pricing, usually within two business days.",
      },
      {
        title: "Install",
        description:
          "One to three days depending on ductwork and electrical.",
      },
      {
        title: "Inspection",
        description:
          "We meet the city inspector so you don't have to take the day off.",
      },
    ],
    faqs: [
      {
        question: "How long does a full system install take?",
        answer:
          "Most residential installs finish in one to three days. Straight equipment swaps can go in a day; new ductwork, electrical upgrades, or full system changes add time. Your quote will list a firm schedule.",
      },
      {
        question: "Do I need to be home the whole time?",
        answer:
          "You need to let us in and be available for the final walkthrough. In between, most homeowners go about their day — we protect the work area and keep it clean.",
      },
      {
        question: "Do you handle the city permit?",
        answer:
          "Yes. Every install includes the city permit pulled by us and the final inspection scheduled with the city inspector. You never chase paperwork.",
      },
      {
        question: "What if my ductwork is undersized?",
        answer:
          "We test static pressure during the estimate. If your ducts can't support the new system, we tell you before the quote and lay out options — repair, seal, or replace — so you're not surprised later.",
      },
      {
        question: "Do you offer financing?",
        answer:
          "Yes. We partner with lenders that offer 0% and low-APR plans for qualified customers. We show monthly numbers next to cash pricing so you can compare.",
      },
    ],
    estimatePitch: {
      title: "A quote that reflects your actual house",
      subtitle:
        "In-home load calculation, written pricing, and no obligation.",
    },
  },
  maintenance: {
    title: "Maintenance Plans & Tune-Ups",
    slug: "maintenance",
    heroDescription:
      "Annual tune-ups that keep your system efficient, safe, and under warranty. Plans include priority scheduling and repair discounts.",
    longDescription:
      "Manufacturers require annual maintenance to keep the warranty valid, and a well-tuned system uses noticeably less energy than one that's been ignored. Our plans include a full tune-up on your AC and heating each year, priority scheduling year-round, and discounts on any repair we do.",
    image: "/images/team.png",
    included: [
      "Complete AC and heating tune-up each year",
      "Refrigerant level and pressure check",
      "Coil cleaning — indoor and outdoor",
      "Blower and motor inspection with lubrication",
      "Electrical connection tightening",
      "Thermostat calibration",
      "Combustion analysis and CO check on gas systems",
      "Filter replacement each visit",
      "Written report of findings and recommendations",
      "Priority scheduling and repair discounts for plan members",
    ],
    benefits: [
      "Manufacturer warranty stays valid",
      "Fewer breakdowns and lower energy bills",
      "Priority booking during heat waves and cold snaps",
      "Discount on any repair we do",
      "Multi-system plans available",
      "Reminders sent — you don't need to remember",
    ],
    howItGoes: [
      {
        title: "Schedule",
        description:
          "Pick a spring window for AC and a fall window for heat. We send the reminders.",
      },
      {
        title: "Tune-up",
        description:
          "Full inspect-clean-test on each system, roughly 90 minutes each.",
      },
      {
        title: "Report",
        description:
          "Written summary with photos of anything we recommend.",
      },
      {
        title: "Follow-up",
        description:
          "Priority booking and member discounts on any repair we do.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my system serviced?",
        answer:
          "Once a year at minimum — twice for combined AC and heating (once each in spring and fall). Our plans schedule this for you automatically.",
      },
      {
        question: "What's included in a plan versus a single tune-up?",
        answer:
          "A single tune-up covers one visit. A plan adds priority scheduling year-round, repair discounts, and reminders so you never lapse on maintenance.",
      },
      {
        question: "Can you service what you didn't install?",
        answer:
          "Yes. We service every major brand, whether we installed it or not. First visit includes a baseline inspection so we know what we're working with.",
      },
      {
        question: "Do plans cover repairs?",
        answer:
          "Plans include the tune-up, not repairs. Members get a discount on any repair labor and priority booking — repairs are quoted separately with upfront pricing.",
      },
      {
        question: "Can I add more than one system?",
        answer:
          "Yes. Multi-system plans are available at a discount per system. Common for homes with separate upstairs/downstairs units or a mini-split addition.",
      },
    ],
    estimatePitch: {
      title: "Two visits a year, one plan, zero worry",
      subtitle:
        "Priority scheduling, repair discounts, and written reports each visit.",
    },
  },
  "duct-services": {
    title: "Ductwork Services",
    slug: "duct-services",
    heroDescription:
      "Duct repair, sealing, and full replacement — because leaky ducts quietly waste 20-30% of what your system produces.",
    longDescription:
      "Even a great HVAC system can't overcome bad ductwork. Leaks, kinks, and undersized runs mean the air never makes it where you actually live. We inspect, seal, repair, and replace ductwork across San Mateo County — usually with the same crew that services your equipment.",
    image: "/images/team.png",
    included: [
      "Full duct system inspection and static pressure test",
      "Leak testing at joints, boots, and plenums",
      "Aeroseal or manual mastic sealing where appropriate",
      "Repair or replacement of damaged sections",
      "Insulation upgrade on attic and crawlspace runs",
      "Return-air sizing and balancing",
      "Register and grille cleaning",
      "Written report with before/after airflow numbers",
    ],
    benefits: [
      "Rooms that finally get the airflow you're paying for",
      "Meaningful energy savings from sealed ducts",
      "Better indoor air quality from clean, sealed systems",
      "Extends the life of your HVAC equipment",
      "Available with any equipment install",
      "No-mess process — we protect finished surfaces",
    ],
    howItGoes: [
      {
        title: "Inspect",
        description:
          "Static pressure test and a visual scan of every accessible run.",
      },
      {
        title: "Diagnose",
        description:
          "Report on where you're losing air and why airflow is uneven.",
      },
      {
        title: "Repair",
        description:
          "Seal, patch, or replace the sections that are actually the problem.",
      },
      {
        title: "Verify",
        description:
          "Retest room by room — you see the before/after airflow numbers.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my ducts are the problem?",
        answer:
          "Rooms that are always too hot or cold, high energy bills, dusty registers, or a system that runs constantly are all signs. A static pressure test tells us for sure.",
      },
      {
        question: "Do you clean ducts?",
        answer:
          "Yes — we clean registers and accessible ductwork, but honest talk: most homes don't need a full duct cleaning. We'll tell you if yours actually does.",
      },
      {
        question: "How much of my ductwork usually needs work?",
        answer:
          "Varies a lot. Many homes just need sealing at a few key joints; others have crushed or disconnected sections that need replacement. The inspection tells us exactly what.",
      },
      {
        question: "Will this improve my energy bill?",
        answer:
          "Usually yes. Sealed ducts can reduce energy waste by 20-30%. Bill impact depends on how leaky your ducts are today and how you use the system.",
      },
      {
        question: "Can you do this without opening walls?",
        answer:
          "In most cases yes. We work through attic and crawlspace access. When wall access is required, we tell you before the work — no surprises.",
      },
    ],
    estimatePitch: {
      title: "Find out where your airflow is really going",
      subtitle:
        "Static pressure test, room-by-room airflow, and a written report.",
    },
  },
  "indoor-air-quality": {
    title: "Indoor Air Quality",
    slug: "indoor-air-quality",
    heroDescription:
      "Whole-home air purifiers, filtration upgrades, and ventilation that actually work — no gadgets, no false claims.",
    longDescription:
      "Bay Area homes deal with wildfire smoke, allergens, and tight construction that traps pollutants inside. We install proven indoor air quality solutions — MERV-rated filtration, whole-home purifiers, humidity control, and fresh-air ventilation — matched to your home's specific problems, not a one-size-fits-all package.",
    image: "/images/team.png",
    included: [
      "Indoor air quality assessment and testing",
      "MERV filter upgrade compatible with your equipment",
      "Whole-home air purifier installation (UV, PCO, or media)",
      "Humidification and dehumidification systems",
      "Fresh-air ventilation (ERV/HRV) options",
      "Ductwork sealing to prevent contamination",
      "Post-install air quality retest",
      "Filter replacement schedule and reminders",
    ],
    benefits: [
      "Real reduction in allergens, VOCs, and smoke particles",
      "Whole-home coverage vs. one-room purifiers",
      "Works while your HVAC runs — no counter-top device",
      "Sized to your system, not a generic recommendation",
      "Options for every budget",
      "Ideal for allergy sufferers and wildfire smoke season",
    ],
    howItGoes: [
      {
        title: "Assess",
        description:
          "Test the air, look at your equipment, and identify the actual problem.",
      },
      {
        title: "Recommend",
        description:
          "One or two options with honest pros and cons — no gadget upsells.",
      },
      {
        title: "Install",
        description:
          "Half-day install for most upgrades; larger systems take a day.",
      },
      {
        title: "Retest",
        description:
          "Verify the numbers improved and set up filter reminders.",
      },
    ],
    faqs: [
      {
        question: "Do those little UV wands actually work?",
        answer:
          "Whole-home UV systems installed on the coil can help with mold and some pathogens. The clip-on wands sold online? Not really. We only recommend what's been shown to work.",
      },
      {
        question: "What MERV rating should I use?",
        answer:
          "Depends on your equipment. MERV 11-13 is a great balance for most residential systems; higher ratings can restrict airflow and hurt performance. We check your blower before recommending.",
      },
      {
        question: "Is a humidifier worth it in the Bay Area?",
        answer:
          "Usually not, unless you have hardwood floors that are cracking in winter or a family member with respiratory issues. We'll be honest — we don't push these when they aren't needed.",
      },
      {
        question: "Will an air purifier help during wildfire smoke?",
        answer:
          "A whole-home purifier plus a high-MERV filter can make a real difference indoors during smoke events. We can also add a fresh-air ventilator that stops pulling outside air when air quality drops.",
      },
      {
        question: "How often do filters need to change?",
        answer:
          "Standard filters every 1-3 months. Higher-MERV media filters typically 6-12 months. We include a reminder schedule after install.",
      },
    ],
    estimatePitch: {
      title: "Air you can actually breathe better",
      subtitle:
        "Whole-home solutions matched to your equipment and your problem.",
    },
  },
  repairs: {
    title: "HVAC Repairs",
    slug: "repairs",
    heroDescription:
      "Fast, reliable repairs for every major HVAC brand — AC, heating, mini-splits, and more. Same-day service with upfront pricing.",
    longDescription:
      "When your system quits, you need a tech who can diagnose fast and fix it right the first time. We repair every major residential HVAC brand across San Mateo County — usually the same day, with upfront pricing before we touch a wrench.",
    image: "/images/team.png",
    included: [
      "Full system diagnostic and inspection",
      "Upfront written quote before any repair",
      "AC, furnace, heat pump, and mini-split repairs",
      "Refrigerant leak testing and recharge",
      "Electrical, control-board, and thermostat repairs",
      "Same-day service on common failures",
      "Common parts stocked on every truck",
      "Carbon monoxide safety check on gas systems",
      "90-day labor warranty",
    ],
    benefits: [
      "Same-day service in most cases",
      "After-hours emergency response",
      "Upfront, no-surprise pricing",
      "All major brands serviced",
      "Certified, background-checked technicians",
      "90-day workmanship warranty",
    ],
    howItGoes: [
      {
        title: "Diagnose",
        description:
          "On-site inspection to isolate the exact failure — not a guess.",
      },
      {
        title: "Quote",
        description:
          "Upfront price for the repair before any parts come off the shelf.",
      },
      {
        title: "Repair",
        description:
          "Same-day fix on most calls; common parts stay stocked on the truck.",
      },
      {
        title: "Verify",
        description:
          "Full-cycle retest and safety check before we leave.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you come out?",
        answer:
          "Same-day service on repair calls placed before noon, and priority booking the next morning for late-day calls. After-hours emergency line is answered 24/7.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer:
          "There's a standard service call fee that covers the visit and diagnostic. If you approve the repair, that fee is applied to the total — no double-charging.",
      },
      {
        question: "What brands do you repair?",
        answer:
          "All major residential brands — Carrier, Lennox, Trane, Rheem, Goodman, York, Daikin, Mitsubishi, and more. Our techs are trained on every current platform.",
      },
      {
        question: "What if you can't finish today?",
        answer:
          "If the repair needs a special-order part, we tell you upfront with a firm ETA. In most cases we'll have you back up the same day.",
      },
      {
        question: "Is the repair warrantied?",
        answer:
          "Yes — 90 days on labor and the manufacturer's warranty on any parts we install. Terms are on your invoice.",
      },
    ],
    estimatePitch: {
      title: "Get it running again — with an honest quote",
      subtitle:
        "Same-day diagnostic, upfront price, and a 90-day repair warranty.",
    },
  },
  "water-heater-services": {
    title: "Water Heater Services",
    slug: "water-heater-services",
    heroDescription:
      "Tank and tankless water heater installation and repair. Energy-efficient upgrades that save money on utility bills.",
    longDescription:
      "Whether you need a quick repair on a leaking tank or a full tankless upgrade, we handle every part of the water heater job — sizing, permits, install, and inspection. Gas, electric, and hybrid heat-pump water heaters across San Mateo County.",
    image: "/images/team.png",
    included: [
      "Free in-home consultation and sizing",
      "Written quote with equipment models and full pricing",
      "City permit pulled and inspection handled by us",
      "Tank, tankless, and heat pump water heater install",
      "Removal and proper disposal of the old unit",
      "Gas line, venting, and electrical brought to code",
      "Temperature and pressure test before we leave",
      "Manufacturer warranty registration",
      "Two-year labor warranty",
    ],
    benefits: [
      "Never-run-out hot water with tankless upgrades",
      "Rebates available on heat pump water heaters",
      "All major brands installed and serviced",
      "Emergency service for leaks and no-hot-water calls",
      "Two-year labor warranty",
      "Rebate paperwork handled for you",
    ],
    howItGoes: [
      {
        title: "Free estimate",
        description:
          "Sizing, venting, and space walkthrough at your house. No charge.",
      },
      {
        title: "Written quote",
        description:
          "Two or three options — tank, tankless, or heat pump — with real pricing.",
      },
      {
        title: "Install",
        description:
          "Most jobs finish in a day, including permit prep and haul-away.",
      },
      {
        title: "Inspection",
        description:
          "City sign-off scheduled and coordinated by us.",
      },
    ],
    faqs: [
      {
        question: "Should I go tankless or stay with a tank?",
        answer:
          "Tankless costs more up front but never runs out of hot water and uses less energy long-term. Tanks are cheaper to install and simpler to replace. We lay out both numbers so you can decide.",
      },
      {
        question: "How long does a water heater install take?",
        answer:
          "Straight tank swaps run 3-4 hours. Tankless installs typically take a full day because of gas line, venting, and electrical work.",
      },
      {
        question: "Are there rebates for heat pump water heaters?",
        answer:
          "Yes — significant federal tax credits plus BayREN and TECH Clean California rebates can cover thousands. We handle the paperwork.",
      },
      {
        question: "Can I get hot water back today?",
        answer:
          "For repairs, usually yes — common parts are on the truck. For full replacements we can often do same-day if you approve the quote by mid-morning.",
      },
      {
        question: "Do you handle the city permit?",
        answer:
          "Yes. Every install includes the permit pulled by us and the final inspection scheduled. You never chase paperwork.",
      },
    ],
    estimatePitch: {
      title: "Hot water on demand, sized to your house",
      subtitle:
        "Free in-home sizing, written quote, and no obligation.",
    },
  },
  "ductless-mini-splits": {
    title: "Ductless Mini-Splits",
    slug: "ductless-mini-splits",
    heroDescription:
      "Flexible ductless solutions for room additions, garages, and homes without ductwork. Efficient zone-based comfort you can dial in.",
    longDescription:
      "Mini-splits are the right answer when adding central ductwork isn't practical — new additions, converted garages, ADUs, or older homes without existing ducts. Each indoor unit runs on its own thermostat, so every room gets exactly the temperature you want with much lower energy use than window units or portable heaters.",
    image: "/images/team.png",
    included: [
      "Free in-home consultation and load calculation",
      "Written quote with equipment models and full pricing",
      "Single-zone or multi-zone system design",
      "Professional install by certified mini-split technicians",
      "Line-set routing planned to minimize visible runs",
      "Electrical, condensate, and refrigerant handled to code",
      "Thermostat and controls setup on each zone",
      "Manufacturer warranty registration",
      "Two-year labor warranty",
    ],
    benefits: [
      "No ductwork required — perfect for older homes and additions",
      "Room-by-room temperature control",
      "Rebates and tax credits available on many systems",
      "Much quieter than window units or portable ACs",
      "Both heating and cooling from a single system",
      "Often the lowest energy-cost option per room",
    ],
    howItGoes: [
      {
        title: "Free estimate",
        description:
          "About an hour on site to plan zones and line-set routing.",
      },
      {
        title: "Written quote",
        description:
          "Single-zone or multi-zone options with real pricing per zone.",
      },
      {
        title: "Install",
        description:
          "One to two days depending on the number of zones.",
      },
      {
        title: "Walkthrough",
        description:
          "Thermostat setup and a full demo on each zone before we leave.",
      },
    ],
    faqs: [
      {
        question: "How many zones do I need?",
        answer:
          "Depends on the number of rooms and how independently you want them controlled. Common setups: 1 zone for an addition or garage, 2-3 for a small home, 4+ for whole-home retrofits.",
      },
      {
        question: "Can mini-splits heat and cool?",
        answer:
          "Yes — modern mini-splits are heat pumps that do both. They're highly efficient in the Bay Area climate.",
      },
      {
        question: "Where do you route the line-sets?",
        answer:
          "We plan the routing to keep runs as short and hidden as possible. Line-set covers match the wall color, and we walk you through the plan before install day.",
      },
      {
        question: "Are they hard to maintain?",
        answer:
          "Filters need cleaning every couple of months (rinse in the sink), and an annual professional tune-up covers the rest. We include mini-splits in our maintenance plans.",
      },
      {
        question: "Do they qualify for rebates?",
        answer:
          "Many models qualify for federal tax credits, PG&E rebates, and TECH Clean California incentives. We handle the paperwork for the rebates you qualify for.",
      },
    ],
    estimatePitch: {
      title: "Add zones without adding ductwork",
      subtitle:
        "In-home walkthrough, real pricing per zone, and no obligation.",
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
    { slug: "heating-repair" },
    { slug: "installation" },
    { slug: "maintenance" },
    { slug: "duct-services" },
    { slug: "indoor-air-quality" },
    { slug: "repairs" },
    { slug: "water-heater-services" },
    { slug: "ductless-mini-splits" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
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
            <div className="relative hidden lg:block">
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/3]">
                <Image
                  src={
                    service.image.startsWith("http")
                      ? service.image
                      : placeholderImage(
                          serviceImageTags[service.slug] ?? "hvac,service",
                          { w: 960, h: 720, seed: `svc-${service.slug}` }
                        )
                  }
                  alt={`${service.title} (placeholder)`}
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
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[54px] bg-orange hover:bg-orange-hover text-white font-[700] text-[15.5px] rounded-[12px] transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Schedule Online
                  </a>
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
