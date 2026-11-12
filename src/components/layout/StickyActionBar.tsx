"use client";

import Link from "next/link";
import { Phone, MessageSquareText, CalendarCheck, Calculator } from "lucide-react";
import { PHONE_HREF, SMS_HREF, BOOKING_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

// Fixed bottom bar with the four highest-intent actions, rendered on mobile
// and tablet only — the desktop header already carries the same actions.
// Safe-area inset padding keeps it clear of iOS home indicators.
export default function StickyActionBar() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick actions"
    >
      <div className="mx-3 mb-3 rounded-full bg-navy/95 backdrop-blur-sm shadow-[0_14px_40px_-10px_rgba(10,19,41,0.45)] border border-white/10 flex items-center overflow-hidden">
        <a
          href={PHONE_HREF}
          onClick={() => trackEvent("call_click", { source: "sticky_bar" })}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-white text-[10.5px] font-[700] tracking-[.04em] uppercase hover:bg-white/5 transition-colors min-h-[56px]"
          aria-label="Call TechPro"
        >
          <Phone className="w-5 h-5 text-orange" strokeWidth={2.2} />
          Call
        </a>
        <span className="w-px h-8 bg-white/10" aria-hidden="true" />
        <a
          href={SMS_HREF}
          onClick={() => trackEvent("sms_click", { source: "sticky_bar" })}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-white text-[10.5px] font-[700] tracking-[.04em] uppercase hover:bg-white/5 transition-colors min-h-[56px]"
          aria-label="Text TechPro"
        >
          <MessageSquareText className="w-5 h-5 text-orange" strokeWidth={2.2} />
          Text
        </a>
        <span className="w-px h-8 bg-white/10" aria-hidden="true" />
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { source: "sticky_bar" })}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-white text-[10.5px] font-[700] tracking-[.04em] uppercase hover:bg-white/5 transition-colors min-h-[56px]"
          aria-label="Book an appointment online"
        >
          <CalendarCheck className="w-5 h-5 text-orange" strokeWidth={2.2} />
          Book
        </a>
        <span className="w-px h-8 bg-white/10" aria-hidden="true" />
        <Link
          href="/estimate"
          onClick={() => trackEvent("estimate_start", { source: "sticky_bar" })}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 bg-orange hover:bg-orange-hover text-white text-[10.5px] font-[800] tracking-[.04em] uppercase transition-colors min-h-[56px]"
          aria-label="Get an instant price estimate"
        >
          <Calculator className="w-5 h-5" strokeWidth={2.2} />
          Estimate
        </Link>
      </div>
    </div>
  );
}
