"use client";

import { useState } from "react";
import { CalendarCheck, Phone, Check, Shield } from "lucide-react";
import Modal from "./Modal";
import { BOOKING_URL, PHONE, PHONE_HREF } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Props = {
  open: boolean;
  onClose: () => void;
  // Project context — surfaced in the modal copy so the visitor sees "We'll
  // scope a <type> install in <city> for you" rather than a generic form.
  installationType?: string;
  city?: string;
  equipment?: string;
};

// Lightweight 3-field request form. Not a quote engine — collects name +
// email + phone, then hands the visitor off to Housecall Pro's native
// booking with the project context pre-filled in the description so the
// dispatcher opens the right conversation on first contact.
export default function QuickRequestModal({
  open,
  onClose,
  installationType,
  city,
  equipment,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const contextSummary = [
    installationType && `Service: ${installationType} installation`,
    city && `City: ${city}`,
    equipment && `Equipment of interest: ${equipment}`,
  ]
    .filter(Boolean)
    .join(" | ");

  function goToBooking() {
    setSubmitting(true);
    trackEvent("booking_click", { source: "quick_request_modal" });

    const parts = [
      contextSummary,
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
    ].filter(Boolean);

    const q = encodeURIComponent(parts.join(" | "));
    const sep = BOOKING_URL.includes("?") ? "&" : "?";
    const url = parts.length > 0 ? `${BOOKING_URL}${sep}description=${q}` : BOOKING_URL;

    window.open(url, "_blank", "noopener,noreferrer");
    // leave the modal open so the user sees the confirmation copy
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Free In-Home Estimate"
      title={
        installationType && city
          ? `Want a ${installationType} install in ${city}?`
          : "Request a similar install"
      }
    >
      <p className="text-[14.5px] text-text-muted leading-relaxed mb-6">
        Tell us how to reach you and we&apos;ll scope the job on a free
        in-home visit. Takes about 30 seconds.
      </p>

      {contextSummary && (
        <div className="mb-6 rounded-[14px] bg-light-bg border border-border-light p-4">
          <p className="text-[11px] font-[800] text-text-muted tracking-[.14em] uppercase mb-2">
            Project context
          </p>
          <p className="text-[13.5px] text-navy leading-snug">{contextSummary}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="block">
          <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-[12.5px] font-[700] text-navy mb-1.5">Phone (optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(650) 555-0100"
            className="w-full h-12 px-4 rounded-[12px] border-2 border-border-light focus:border-orange outline-none text-[15px] text-navy transition-colors"
          />
        </label>
      </div>

      <ul className="mb-7 space-y-2">
        <li className="flex items-center gap-2 text-[13px] text-text-muted">
          <Check className="w-4 h-4 text-emerald-600" />
          Free in-home scoping visit — no obligation
        </li>
        <li className="flex items-center gap-2 text-[13px] text-text-muted">
          <Shield className="w-4 h-4 text-emerald-600" />
          We handle PCE, BayREN and federal rebate paperwork
        </li>
      </ul>

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={goToBooking}
          disabled={!canSubmit || submitting}
          className="inline-flex items-center justify-center gap-2 h-[52px] rounded-full bg-orange hover:bg-orange-hover text-white font-[800] text-[14.5px] transition-colors shadow-[0_12px_30px_-12px_rgba(241,90,41,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <CalendarCheck className="w-4 h-4" />
          Book my free visit
        </button>
        <a
          href={PHONE_HREF}
          onClick={() =>
            trackEvent("call_click", { source: "quick_request_modal" })
          }
          className="inline-flex items-center justify-center gap-2 h-[52px] rounded-full bg-navy hover:bg-navy/90 text-white font-[700] text-[14.5px] transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call {PHONE}
        </a>
      </div>

      <p className="text-[11.5px] text-text-muted/80 text-center mt-5 leading-relaxed">
        By submitting you agree we may contact you about your project. We
        don&apos;t share your details with third parties.
      </p>
    </Modal>
  );
}
