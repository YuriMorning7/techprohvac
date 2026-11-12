"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Thermometer,
  Wind,
  Flame,
  Snowflake,
  GitBranch,
  Droplets,
  Wrench,
  Home,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Phone as PhoneIcon,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import {
  SERVICES,
  HOME_SIZE_MULT,
  SYSTEM_MULT,
  estimateRange,
  formatRange,
  type ServiceKey,
  type ServiceOption,
  type HomeSize,
  type CurrentSystem,
} from "@/content/estimate-pricing";
import { BOOKING_URL, PHONE_HREF, PHONE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const ICONS: Record<string, LucideIcon> = {
  Thermometer,
  Wind,
  Flame,
  Snowflake,
  GitBranch,
  Droplets,
  Wrench,
};

const HOME_SIZES: { value: HomeSize; label: string; sub: string }[] = [
  { value: "under-1500", label: "Under 1,500 sq ft", sub: "Condo / small home" },
  { value: "1500-2500", label: "1,500 – 2,500 sq ft", sub: "Typical Bay Area home" },
  { value: "2500-3500", label: "2,500 – 3,500 sq ft", sub: "Larger single family" },
  { value: "over-3500", label: "Over 3,500 sq ft", sub: "Multi-zone or luxury" },
];

const SYSTEMS: { value: CurrentSystem; label: string; sub: string }[] = [
  { value: "existing", label: "Replacing like-for-like", sub: "Same fuel + ducting" },
  { value: "replacement", label: "Switching system type", sub: "Gas → heat pump, etc." },
  { value: "new-home", label: "New construction / addition", sub: "No system yet" },
  { value: "unsure", label: "Not sure yet", sub: "We'll figure it out onsite" },
];

type Step = 0 | 1 | 2 | 3 | 4;

type Lead = {
  service?: ServiceKey;
  size?: HomeSize;
  system?: CurrentSystem;
  zip: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const INITIAL: Lead = {
  zip: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const STORAGE_KEY = "techpro.estimate.v1";

export default function EstimateWizard() {
  const [step, setStep] = useState<Step>(0);
  const [lead, setLead] = useState<Lead>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();

  // Restore an in-progress draft on mount — never crash if storage is blocked.
  // A `?service=` param on the URL (from a homepage equipment tile, say) wins
  // over the saved draft so the wizard always reflects the user's latest
  // intent and jumps them straight to step 2 (home size).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Lead> & { step?: Step };
        setLead({ ...INITIAL, ...saved });
        if (typeof saved.step === "number") {
          setStep(Math.min(saved.step, 4) as Step);
        }
      }
    } catch {
      /* storage not available — fine */
    }

    const param = searchParams.get("service");
    if (param) {
      const match = SERVICES.find((s) => s.key === param);
      if (match) {
        setLead((l) => ({ ...l, service: match.key }));
        // Skip the user past step 1 since they already told us what they want.
        setStep(1);
      }
    }
  }, [searchParams]);

  // Persist after every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...lead, step }));
    } catch {
      /* fine */
    }
  }, [lead, step]);

  const service: ServiceOption | undefined = useMemo(
    () => SERVICES.find((s) => s.key === lead.service),
    [lead.service]
  );

  const range = useMemo(() => {
    if (!service || !lead.size || !lead.system) return null;
    return estimateRange(service, lead.size, lead.system);
  }, [service, lead.size, lead.system]);

  function go(next: Step) {
    setStep(next);
    trackEvent("estimate_step", { step: next });
  }

  function reset() {
    setLead(INITIAL);
    setStep(0);
    setSubmitted(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* fine */
    }
  }

  function submit() {
    trackEvent("estimate_submit", {
      service: lead.service ?? "unknown",
      size: lead.size ?? "unknown",
      system: lead.system ?? "unknown",
      zip: lead.zip,
    });
    setSubmitted(true);
  }

  // Housecall Pro booking URL — pass the wizard summary as a readable
  // description so the dispatcher sees context when the customer books.
  const bookingUrlWithContext = useMemo(() => {
    const parts = [
      service && `Service: ${service.label}`,
      lead.size && `Home size: ${HOME_SIZES.find((h) => h.value === lead.size)?.label}`,
      lead.system && `Current system: ${SYSTEMS.find((s) => s.value === lead.system)?.label}`,
      lead.zip && `ZIP: ${lead.zip}`,
      range && `Instant-estimate range: ${formatRange(range)}`,
      lead.notes && `Notes: ${lead.notes}`,
    ].filter(Boolean);
    if (parts.length === 0) return BOOKING_URL;
    const q = encodeURIComponent(parts.join(" | "));
    const sep = BOOKING_URL.includes("?") ? "&" : "?";
    return `${BOOKING_URL}${sep}description=${q}`;
  }, [service, lead.size, lead.system, lead.zip, lead.notes, range]);

  const canAdvance: boolean =
    (step === 0 && !!lead.service) ||
    (step === 1 && !!lead.size) ||
    (step === 2 && !!lead.system) ||
    (step === 3 && /^\d{5}$/.test(lead.zip)) ||
    (step === 4 && lead.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email));

  return (
    <div className="bg-white rounded-[24px] border border-border-light shadow-[0_24px_60px_-28px_rgba(10,19,41,0.22)] overflow-hidden">
      {/* Progress rail */}
      <div className="h-1.5 bg-light-bg">
        <div
          className="h-full bg-orange transition-all duration-500 ease-out"
          style={{ width: `${((step + (submitted ? 1 : 0)) / 5) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {!submitted ? (
          <>
            <div className="flex items-center gap-3 text-[11.5px] font-[800] text-text-muted tracking-[.14em] uppercase mb-5">
              <span>Step {step + 1} of 5</span>
              <span className="w-1 h-1 rounded-full bg-text-muted/40" />
              <span>About 60 seconds</span>
            </div>

            {step === 0 && (
              <>
                <h2 className="text-[clamp(22px,2.8vw,32px)] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
                  What do you need help with?
                </h2>
                <p className="text-[14.5px] text-text-muted mb-7">
                  Pick the one that fits best — we handle everything from
                  single-room comfort to whole-home retrofits.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SERVICES.map((svc) => {
                    const Icon = ICONS[svc.icon] ?? Thermometer;
                    const active = lead.service === svc.key;
                    return (
                      <li key={svc.key}>
                        <button
                          type="button"
                          onClick={() => {
                            setLead((l) => ({ ...l, service: svc.key }));
                            trackEvent("estimate_step", { step: 0, service: svc.key });
                          }}
                          className={`w-full text-left p-4 rounded-[16px] border-2 transition-all min-h-[96px] ${
                            active
                              ? "border-orange bg-orange/5 shadow-[0_10px_28px_-16px_rgba(241,90,41,0.5)]"
                              : "border-border-light hover:border-orange/40 bg-white"
                          }`}
                          aria-pressed={active}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-orange text-white" : "bg-orange/10 text-orange"}`}>
                              <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[14.5px] font-[800] text-navy leading-tight">
                                {svc.label}
                              </p>
                              <p className="text-[12px] text-text-muted mt-1 leading-snug">
                                {svc.tagline}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-[clamp(22px,2.8vw,32px)] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
                  How big is your home?
                </h2>
                <p className="text-[14.5px] text-text-muted mb-7">
                  Rough square footage is enough — we&apos;ll confirm with a
                  load calc during the free in-home visit.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {HOME_SIZES.map((opt) => {
                    const active = lead.size === opt.value;
                    return (
                      <li key={opt.value}>
                        <button
                          type="button"
                          onClick={() => setLead((l) => ({ ...l, size: opt.value }))}
                          className={`w-full flex items-center gap-3 text-left p-4 rounded-[16px] border-2 transition-all ${
                            active
                              ? "border-orange bg-orange/5"
                              : "border-border-light hover:border-orange/40 bg-white"
                          }`}
                          aria-pressed={active}
                        >
                          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-orange text-white" : "bg-orange/10 text-orange"}`}>
                            <Home className="w-4.5 h-4.5" strokeWidth={2.2} />
                          </span>
                          <div>
                            <p className="text-[14.5px] font-[800] text-navy leading-tight">
                              {opt.label}
                            </p>
                            <p className="text-[12.5px] text-text-muted mt-0.5">
                              {opt.sub}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-[clamp(22px,2.8vw,32px)] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
                  What&apos;s there now?
                </h2>
                <p className="text-[14.5px] text-text-muted mb-7">
                  This tells us how much electrical / sheet-metal work is
                  likely — a straight swap costs less than a fuel switch.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {SYSTEMS.map((opt) => {
                    const active = lead.system === opt.value;
                    return (
                      <li key={opt.value}>
                        <button
                          type="button"
                          onClick={() => setLead((l) => ({ ...l, system: opt.value }))}
                          className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                            active
                              ? "border-orange bg-orange/5"
                              : "border-border-light hover:border-orange/40 bg-white"
                          }`}
                          aria-pressed={active}
                        >
                          <p className="text-[14.5px] font-[800] text-navy leading-tight">
                            {opt.label}
                          </p>
                          <p className="text-[12.5px] text-text-muted mt-1">
                            {opt.sub}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-[clamp(22px,2.8vw,32px)] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
                  What&apos;s your ZIP code?
                </h2>
                <p className="text-[14.5px] text-text-muted mb-7">
                  We serve all of San Mateo County. ZIP helps us check local
                  rebates and estimate travel.
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  pattern="\d{5}"
                  autoFocus
                  value={lead.zip}
                  onChange={(e) =>
                    setLead((l) => ({
                      ...l,
                      zip: e.target.value.replace(/[^\d]/g, "").slice(0, 5),
                    }))
                  }
                  placeholder="94070"
                  aria-label="ZIP code"
                  className="w-full max-w-xs h-14 px-5 rounded-[14px] border-2 border-border-light focus:border-orange outline-none text-[22px] font-[700] text-navy tracking-wider placeholder:text-text-muted/40 transition-colors"
                />
                {lead.zip.length === 5 && (
                  <p className="text-[13px] text-emerald-600 font-[600] mt-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Looks like San Mateo County — we serve this area.
                  </p>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-[clamp(22px,2.8vw,32px)] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
                  Where should we send your estimate?
                </h2>
                <p className="text-[14.5px] text-text-muted mb-7">
                  You&apos;ll see a price range on the next screen. No spam —
                  we only follow up once to book the free in-home visit.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Name</span>
                    <input
                      type="text"
                      value={lead.name}
                      onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Email</span>
                    <input
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Phone (optional)</span>
                    <input
                      type="tel"
                      value={lead.phone}
                      onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                      placeholder="(650) 555-0100"
                      className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Notes (optional)</span>
                    <input
                      type="text"
                      value={lead.notes}
                      onChange={(e) => setLead((l) => ({ ...l, notes: e.target.value }))}
                      placeholder="Anything we should know?"
                      className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
                    />
                  </label>
                </div>
              </>
            )}

            {/* Nav row */}
            <div className="mt-8 pt-6 border-t border-border-lighter flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => step > 0 && go((step - 1) as Step)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 h-[44px] px-4 rounded-full text-[14px] font-[700] text-text-muted hover:text-navy disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => canAdvance && go((step + 1) as Step)}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-orange hover:bg-orange-hover text-white font-[700] text-[14.5px] transition-colors shadow-[0_10px_28px_-14px_rgba(241,90,41,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => canAdvance && submit()}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-orange hover:bg-orange-hover text-white font-[800] text-[14.5px] transition-colors shadow-[0_10px_28px_-14px_rgba(241,90,41,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <Sparkles className="w-4 h-4" />
                  Show my estimate
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              Your Instant Estimate
            </div>
            <h2 className="text-[clamp(26px,3.6vw,40px)] font-[800] text-navy leading-[1.1] tracking-tight mb-2">
              {service?.label} Installation
              {lead.zip && <span className="text-text-muted font-[700]"> · {lead.zip}</span>}
            </h2>
            <p className="text-[14.5px] text-text-muted mb-6 max-w-xl">
              Typical installed price in San Mateo County, based on home size
              and what&apos;s there now. Your actual quote depends on load
              calc, electrical panel, permits and venting.
            </p>

            <div className="rounded-[20px] bg-light-bg border border-border-light p-6 sm:p-8 mb-6">
              <p className="text-[12.5px] font-[700] text-text-muted tracking-[.1em] uppercase mb-2">
                Typical range
              </p>
              <p className="text-[clamp(32px,5vw,56px)] font-[800] text-navy leading-none tracking-tight">
                {range ? formatRange(range) : "—"}
              </p>
              {service?.rebateHint && (
                <p className="text-[13.5px] text-emerald-700 font-[600] mt-4 flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  {service.rebateHint}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={bookingUrlWithContext}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("booking_click", { source: "estimate_result" })
                }
                className="inline-flex items-center justify-center gap-2 h-[54px] rounded-full bg-orange hover:bg-orange-hover text-white font-[800] text-[15px] transition-colors shadow-[0_12px_30px_-12px_rgba(241,90,41,0.6)]"
              >
                <CalendarCheck className="w-4.5 h-4.5" />
                Book free in-home estimate
              </a>
              <a
                href={PHONE_HREF}
                onClick={() =>
                  trackEvent("call_click", { source: "estimate_result" })
                }
                className="inline-flex items-center justify-center gap-2 h-[54px] rounded-full bg-navy hover:bg-navy/90 text-white font-[700] text-[15px] transition-colors"
              >
                <PhoneIcon className="w-4.5 h-4.5" />
                Call {PHONE}
              </a>
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-6 text-[13px] text-text-muted hover:text-orange underline underline-offset-2 transition-colors"
            >
              Start a new estimate
            </button>
          </>
        )}
      </div>
    </div>
  );
}
