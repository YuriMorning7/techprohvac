"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Clock,
  MapPin,
  Headphones,
  ChevronDown,
  ArrowRight,
  Send,
  CheckCircle,
  User,
  Mail,
  MessageSquare,
  Home,
} from "lucide-react";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  CITY_STATE_ZIP,
  OFFICE_HOURS,
  EMERGENCY_HOURS,
} from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  CONTACT INFO CARDS DATA                                            */
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
/*  MULTI-STEP FORM                                                    */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  "Heat Pump Installation",
  "AC Repair",
  "AC Installation",
  "Furnace Repair",
  "Furnace Maintenance",
  "Ductless Mini-Split",
  "Water Heater",
  "Thermostat Installation",
  "Indoor Air Quality",
  "Maintenance Plan",
  "Free Estimate",
  "Other",
];

const timePreferences = [
  "Morning (8am - 12pm)",
  "Afternoon (12pm - 4pm)",
  "Evening (4pm - 7pm)",
  "Weekend",
  "As soon as possible",
];

function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    timePreference: "",
    address: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 =
    formData.firstName && formData.lastName && formData.phone;
  const canProceedStep2 = formData.service;

  return (
    <div className="bg-white rounded-[18px] p-8 border border-border-light">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-[700] shrink-0 ${
                step >= s
                  ? "bg-orange text-white"
                  : "bg-light-bg text-text-muted"
              }`}
            >
              {step > s ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                s
              )}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 rounded ${
                  step > s ? "bg-orange" : "bg-border-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Contact Info */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-[700] text-text-dark mb-1">
            Contact Information
          </h3>
          <p className="text-text-muted text-[14px] mb-6">
            Tell us how to reach you.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="(650) 000-0000"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="w-full bg-orange hover:bg-orange-hover disabled:bg-border-light disabled:text-text-muted text-white font-[700] py-3 rounded-[12px] transition-colors text-[15px]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Service Details */}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-[700] text-text-dark mb-1">
            Service Details
          </h3>
          <p className="text-text-muted text-[14px] mb-6">
            Tell us what you need help with.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Service Needed *
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 bg-white text-text-dark appearance-none"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Preferred Time
              </label>
              <div className="relative">
                <select
                  value={formData.timePreference}
                  onChange={(e) =>
                    updateField("timePreference", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 bg-white text-text-dark appearance-none"
                >
                  <option value="">Select preferred time</option>
                  {timePreferences.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Service Address
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="123 Main St, San Carlos, CA"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-light-bg hover:bg-border-light text-text-dark font-[600] py-3 rounded-[12px] transition-colors text-[15px]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 bg-orange hover:bg-orange-hover disabled:bg-border-light disabled:text-text-muted text-white font-[700] py-3 rounded-[12px] transition-colors text-[15px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Additional Info + Submit */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-[700] text-text-dark mb-1">
            Additional Details
          </h3>
          <p className="text-text-muted text-[14px] mb-6">
            Any additional information that will help us serve you better.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-[600] text-text-dark mb-1.5">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={5}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-input-border text-[14px] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 resize-none"
                  placeholder="Describe your HVAC issue or what you need help with..."
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-light-bg rounded-[14px] p-5 border border-border-light">
              <h4 className="text-[13px] font-[700] text-text-dark mb-3 uppercase tracking-wider">
                Summary
              </h4>
              <div className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-text-muted">Name</span>
                  <span className="text-text-dark font-[600]">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Phone</span>
                  <span className="text-text-dark font-[600]">
                    {formData.phone}
                  </span>
                </div>
                {formData.email && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Email</span>
                    <span className="text-text-dark font-[600]">
                      {formData.email}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted">Service</span>
                  <span className="text-text-dark font-[600]">
                    {formData.service}
                  </span>
                </div>
                {formData.timePreference && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Preferred Time</span>
                    <span className="text-text-dark font-[600]">
                      {formData.timePreference}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-light-bg hover:bg-border-light text-text-dark font-[600] py-3 rounded-[12px] transition-colors text-[15px]"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange hover:bg-orange-hover text-white font-[700] py-3 rounded-[12px] transition-colors text-[15px] inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-navy text-white">
        <div className="container-site py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Contact</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Get in touch with our team for a free estimate, to schedule
              service, or for any questions about your heating and cooling needs.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FORM + INFO ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactCards.map((card) => {
                const content = (
                  <div className="bg-light-bg rounded-[18px] p-6 border border-border-light hover:border-orange/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[14px] bg-badge-bg flex items-center justify-center shrink-0">
                        <card.icon className="w-5 h-5 text-orange" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-[700] text-text-dark mb-1">
                          {card.title}
                        </h3>
                        <p className="text-[15px] font-[600] text-navy">
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
                      target={card.href.startsWith("http") ? "_blank" : undefined}
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

              {/* Google Maps Placeholder */}
              <div className="bg-light-bg rounded-[18px] overflow-hidden border border-border-light aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-text-muted">
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
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Our friendly team is standing by to help with all your heating and
            cooling needs.
          </p>
          <Link
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-8 py-4 rounded-[12px] transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            {PHONE}
          </Link>
        </div>
      </section>
    </>
  );
}
