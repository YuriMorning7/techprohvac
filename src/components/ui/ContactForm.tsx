"use client";

import Script from "next/script";

export default function ContactForm() {
  return (
    <div className="w-full bg-white rounded-[18px] border border-border-light overflow-hidden relative">
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
        className="relative w-full border-none bg-white"
        style={{ minHeight: "1100px" }}
        loading="lazy"
        title="Schedule a service with TechPro Heating & Cooling"
      />
    </div>
  );
}
