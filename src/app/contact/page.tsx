"use client";

import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Clock,
  MapPin,
  Headphones,
} from "lucide-react";
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

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    primary: PHONE,
    secondary: "Call for service or estimates",
    href: PHONE_HREF,
  },
  {
    icon: Clock,
    title: "Office Hours",
    primary: OFFICE_HOURS,
    secondary: "Walk-ins welcome",
    href: null,
  },
  {
    icon: Headphones,
    title: "Emergency Service",
    primary: EMERGENCY_HOURS,
    secondary: "After-hours emergency line",
    href: PHONE_HREF,
  },
  {
    icon: MapPin,
    title: "Address",
    primary: ADDRESS,
    secondary: CITY_STATE_ZIP,
    href: `https://maps.google.com/?q=${encodeURIComponent(`${ADDRESS}, ${CITY_STATE_ZIP}`)}`,
  },
];

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
          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-10 items-start">
            <ContactForm />

            <div className="space-y-4">
              {contactCards.map((card) => {
                const content = (
                  <div className="bg-white rounded-[18px] p-5 sm:p-6 border border-border-light hover:border-orange/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[14px] bg-badge-bg flex items-center justify-center shrink-0">
                        <card.icon className="w-5 h-5 text-orange" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[14px] font-[700] text-text-dark mb-1">
                          {card.title}
                        </h3>
                        <p className="text-[15px] font-[600] text-navy break-words">
                          {card.primary}
                        </p>
                        <p className="text-[13px] text-text-muted mt-0.5">
                          {card.secondary}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                if (card.href) {
                  return (
                    <a
                      key={card.title}
                      href={card.href}
                      target={
                        card.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={card.title}>{content}</div>;
              })}

              <div className="bg-white rounded-[18px] overflow-hidden border border-border-light aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-text-muted px-6">
                  <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-[600]">Google Maps</p>
                  <p className="text-xs text-text-muted mt-1">
                    {ADDRESS}, {CITY_STATE_ZIP}
                  </p>
                </div>
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
