"use client";

import Script from "next/script";
import { CalendarCheck, Phone, ShieldCheck } from "lucide-react";
import { BOOKING_URL, PHONE, PHONE_HREF } from "@/lib/constants";

// Mobile scroll-trap note:
// The Housecall Pro iframe is a cross-origin embed. Its own script resizes
// the iframe to its content (~1100px tall), which on phones fully covers
// the viewport. Touch gestures that start inside a cross-origin iframe
// cannot bubble up to scroll the parent page, so the user gets stuck.
// On mobile we replace the iframe with a direct booking CTA (the industry-
// standard pattern — Google Maps, Calendly, Stripe Checkout all do the
// same). Desktop keeps the embedded form since mouse wheels don't suffer
// from the same capture issue.
export default function ContactForm() {
  return (
    <div className="w-full">
      {/* Mobile — direct CTA card, no iframe scroll trap */}
      <div className="md:hidden bg-white rounded-[20px] border border-border-light p-6 sm:p-8 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-[220px] h-[220px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.15),transparent_60%)] pointer-events-none"
        />
        <div className="relative">
          <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
            Start your request
          </p>
          <h2 className="text-[22px] sm:text-[24px] font-[800] text-navy leading-[1.2] tracking-tight mb-3">
            Book a free in-home visit
          </h2>
          <p className="text-[14.5px] text-text-muted leading-relaxed mb-5">
            Our booking form takes about a minute — pick a time, tell us
            what&rsquo;s going on, and we&rsquo;ll follow up to confirm.
          </p>

          <ul className="space-y-2.5 mb-6">
            <li className="flex items-center gap-2.5 text-[13.5px] text-text-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
              Free estimate on installations
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-text-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
              Same-day emergency dispatch
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-text-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
              Rebate paperwork handled for you
            </li>
          </ul>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[52px] bg-orange hover:bg-orange-hover text-white font-[700] text-[15px] rounded-full transition-colors shadow-[0_10px_28px_-10px_rgba(241,90,41,0.6)]"
          >
            <CalendarCheck className="w-4 h-4" />
            Open booking form
          </a>
          <a
            href={PHONE_HREF}
            className="mt-3 w-full flex items-center justify-center gap-2 h-[48px] bg-light-bg hover:bg-border-light text-navy font-[700] text-[14.5px] rounded-full transition-colors border border-border-light"
          >
            <Phone className="w-4 h-4" />
            Or call {PHONE}
          </a>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-[11.5px] text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-orange" />
            Secure booking via Housecall Pro
          </p>
        </div>
      </div>

      {/* Desktop — embedded iframe, no trap because mouse wheel scrolls page */}
      <div className="hidden md:block w-full bg-white rounded-[20px] border border-border-light overflow-hidden relative">
        <Script
          src="https://online-booking.housecallpro.com/script.js?token=5dd2ad6590584e6aa2859d5433854c08&orgName=Techpro-Heating--Cooling"
          strategy="afterInteractive"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-text-muted text-[14px] pointer-events-none"
        >
          Loading form…
        </div>
        <iframe
          id="hcp-lead-iframe"
          src="https://book.housecallpro.com/lead-form/Techpro-Heating--Cooling/5dd2ad6590584e6aa2859d5433854c08"
          className="relative w-full border-none bg-white block"
          style={{ minHeight: "1100px" }}
          loading="lazy"
          title="Schedule a service with TechPro Heating & Cooling"
        />
      </div>
    </div>
  );
}
