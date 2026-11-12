"use client";

import { useState } from "react";
import { CalendarCheck, Phone, Sparkles } from "lucide-react";
import QuickRequestModal from "@/components/ui/QuickRequestModal";
import { PHONE, PHONE_HREF } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Props = {
  installationType: string;
  city: string;
  equipment?: string;
};

// Sidebar CTA card on the project detail page. Primary action opens a
// focused 3-field modal that pre-fills the project context into the
// Housecall Pro handoff, so the follow-up call starts with the dispatcher
// already knowing what the visitor was reading.
export default function ProjectCtaCard({
  installationType,
  city,
  equipment,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-navy rounded-[20px] p-6 sm:p-7 text-white relative overflow-hidden">
        {/* soft orange corner glow */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-[180px] h-[180px] rounded-full bg-[radial-gradient(ellipse,rgba(241,90,41,0.28),transparent_60%)] pointer-events-none"
        />
        <div className="relative">
          <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
            Free In-Home Estimate
          </p>
          <h3 className="text-[20px] sm:text-[22px] font-[800] leading-[1.2] tracking-tight mb-3">
            Want a {installationType.toLowerCase()} install like this in your home?
          </h3>
          <p className="text-[14px] text-white/70 leading-relaxed mb-5">
            Tell us the basics and we&apos;ll scope the job onsite. Free
            estimate, no sales call, same crew that did this {city} project.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                trackEvent("estimate_start", {
                  source: "project_cta",
                  service: installationType,
                  city,
                });
              }}
              className="w-full flex items-center justify-center gap-2 h-[48px] bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] rounded-full transition-colors shadow-[0_8px_24px_-10px_rgba(241,90,41,0.6)]"
            >
              <Sparkles className="w-4 h-4" />
              Request a similar install
            </button>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 h-[48px] bg-white/10 hover:bg-white/15 border border-white/20 text-white font-[700] text-[14.5px] rounded-full transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book free visit
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 h-[44px] text-white/80 hover:text-white font-[600] text-[13.5px] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              or call {PHONE}
            </a>
          </div>
        </div>
      </div>

      <QuickRequestModal
        open={open}
        onClose={() => setOpen(false)}
        installationType={installationType}
        city={city}
        equipment={equipment}
      />
    </>
  );
}
