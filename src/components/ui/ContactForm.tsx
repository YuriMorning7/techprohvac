"use client";

import Script from "next/script";

export default function ContactForm() {
  return (
    <div className="w-full">
      <Script
        src="https://online-booking.housecallpro.com/script.js?token=5dd2ad6590584e6aa2859d5433854c08&orgName=Techpro-Heating--Cooling"
        strategy="afterInteractive"
      />
      <iframe
        id="hcp-lead-iframe"
        src="https://book.housecallpro.com/lead-form/Techpro-Heating--Cooling/5dd2ad6590584e6aa2859d5433854c08"
        className="w-full border-none rounded-[18px]"
        style={{ minHeight: "1100px" }}
        loading="lazy"
        title="Schedule a service with TechPro Heating & Cooling"
      />
    </div>
  );
}
