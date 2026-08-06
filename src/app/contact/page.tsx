"use client";

import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import {
  PHONE,
  PHONE_HREF,
  ADDRESS,
  CITY_STATE_ZIP,
  OFFICE_HOURS,
  EMERGENCY_HOURS,
} from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  CONTACT INFO CARDS                                                 */
/* ------------------------------------------------------------------ */

type InfoCard = {
  label: string;
  value: React.ReactNode;
  href?: string;
  featured?: boolean;
};

const infoCards: InfoCard[] = [
  {
    label: "Call or text",
    value: PHONE,
    href: PHONE_HREF,
    featured: true,
  },
  {
    label: "Office hours",
    value: OFFICE_HOURS,
  },
  {
    label: "Emergency",
    value: EMERGENCY_HOURS,
    href: PHONE_HREF,
  },
  {
    label: "Office",
    value: (
      <>
        {ADDRESS}
        <br />
        {CITY_STATE_ZIP}
      </>
    ),
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `${ADDRESS}, ${CITY_STATE_ZIP}`
    )}`,
  },
];

const MAP_QUERY = encodeURIComponent(`${ADDRESS}, ${CITY_STATE_ZIP}`);
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const MAP_DIRECTIONS_HREF = `https://maps.google.com/?q=${MAP_QUERY}`;

function InfoCardTile({ card }: { card: InfoCard }) {
  const body = (
    <div className="h-full bg-white rounded-[16px] border border-border-light p-5 sm:p-6 transition-colors hover:border-orange/40">
      <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-2">
        {card.label}
      </p>
      <p
        className={`text-navy font-[800] leading-[1.2] ${
          card.featured
            ? "text-[22px] sm:text-[26px] tracking-tight"
            : "text-[15px] sm:text-[16px]"
        }`}
      >
        {card.value}
      </p>
    </div>
  );

  if (!card.href) return body;

  const external = card.href.startsWith("http");
  return (
    <a
      href={card.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block h-full"
    >
      {body}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-navy text-white">
        <div className="container-site py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Contact</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(32px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Contact Us
            </h1>
            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed">
              Get in touch with our team for a free estimate, to schedule
              service, or for any questions about your heating and cooling
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FORM + INFO ========== */}
      <section className="bg-light-bg section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <ContactForm />

            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {infoCards.map((card) => (
                  <InfoCardTile key={card.label} card={card} />
                ))}
              </div>

              <div className="relative rounded-[18px] overflow-hidden border border-border-light bg-progress-bg">
                <div className="aspect-[4/3]">
                  <iframe
                    title="TechPro Heating & Cooling — office location"
                    src={MAP_EMBED_SRC}
                    className="w-full h-full block"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={MAP_DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 h-[36px] px-3.5 rounded-full bg-white/95 backdrop-blur border border-border-light text-[12.5px] font-[700] text-navy shadow-sm hover:bg-white transition-colors"
                >
                  Directions
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-navy section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Prefer to Call?
          </h2>
          <p className="text-white/60 text-[16px] md:text-lg max-w-xl mx-auto mb-8">
            Our friendly team is standing by to help with all your heating and
            cooling needs.
          </p>
          <Link
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 sm:px-8 py-4 rounded-[12px] transition-colors text-[16px] sm:text-lg"
          >
            <Phone className="w-5 h-5" />
            {PHONE}
          </Link>
        </div>
      </section>
    </>
  );
}
