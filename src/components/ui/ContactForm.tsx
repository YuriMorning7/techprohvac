"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Upload, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SCHEMA                                                             */
/* ------------------------------------------------------------------ */

const serviceOptions = ["Repair", "New system", "Tune-up"] as const;
type Service = (typeof serviceOptions)[number];

const formSchema = z.object({
  // Step 1
  fullName: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[\d+\-()\s.]+$/, "Enter a valid phone number"),
  service: z.enum(serviceOptions, {
    message: "Choose the service you need",
  }),
  // Step 2 — all optional
  street: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  zip: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{5}(-\d{4})?$/.test(v), {
      message: "Enter a 5-digit ZIP",
    }),
  email: z
    .string()
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "Enter a valid email",
    }),
  details: z.string().optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please agree to be contacted",
  }),
});

type FormData = z.infer<typeof formSchema>;

const step1Fields: FieldPath<FormData>[] = ["fullName", "phone", "service"];

const TOTAL_STEPS = 2;

/* ------------------------------------------------------------------ */
/*  SHARED FIELD STYLES                                                */
/* ------------------------------------------------------------------ */

const inputBase =
  "w-full h-[52px] px-4 rounded-[12px] border bg-white text-[15px] text-text-dark placeholder:text-text-muted/70 focus:outline-none transition-colors";
const inputIdle = "border-input-border focus:border-orange";
const inputError = "border-orange focus:border-orange";

function fieldClass(hasError: boolean) {
  return `${inputBase} ${hasError ? inputError : inputIdle}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[12.5px] text-orange mt-1.5">{message}</p>;
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[14px] font-[700] text-navy mb-2"
    >
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  FORM                                                               */
/* ------------------------------------------------------------------ */

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    shouldUnregister: false, // preserve values across step changes
    defaultValues: {
      fullName: "",
      phone: "",
      service: undefined,
      street: "",
      city: "",
      zip: "",
      email: "",
      details: "",
      consent: undefined,
    },
  });

  const selectedService = watch("service");

  async function goNext() {
    const valid = await trigger(step1Fields, { shouldFocus: true });
    if (valid) setStep(2);
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    // Placeholder — production would post to /api/contact
    await new Promise((r) => setTimeout(r, 700));
    console.log("Contact submission:", { ...data, photo });
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 8 * 1024 * 1024) {
      alert("Photo must be under 8 MB");
      return;
    }
    setPhoto(file);
  }

  function resetForm() {
    reset();
    setPhoto(null);
    setStep(1);
    setSubmitted(false);
  }

  /* ---------------- Success State ---------------- */
  if (submitted) {
    return (
      <div className="bg-white rounded-[18px] border border-border-light p-8 sm:p-10 lg:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-success-bg border-2 border-success-border flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-[26px] sm:text-[28px] font-[800] text-navy mb-3 tracking-tight">
          Request received
        </h3>
        <p className="text-[15px] sm:text-[16px] text-text-muted max-w-md mx-auto leading-relaxed">
          Thanks for reaching out. A team member will call you within one
          business day to confirm the details and schedule your visit.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-8 h-[48px] px-6 bg-navy text-white font-[700] text-[14.5px] rounded-[12px] hover:bg-navy/90 transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const progressPct = (step / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white rounded-[18px] border border-border-light p-6 sm:p-8 lg:p-10">
      {/* Progress Header */}
      <div className="mb-7 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[12px] font-[800] text-orange tracking-[.16em] uppercase">
            Step {step} of {TOTAL_STEPS}
          </span>
          <div className="flex-1 h-[3px] bg-progress-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-orange rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ============================================================ */}
        {/* STEP 1                                                        */}
        {/* ============================================================ */}
        <div hidden={step !== 1} aria-hidden={step !== 1}>
          <h2 className="text-[26px] sm:text-[30px] font-[800] text-navy leading-[1.15] tracking-tight mb-7">
            Let&apos;s start with the basics
          </h2>

          <div className="space-y-5">
            <div>
              <FieldLabel htmlFor="fullName">Your name</FieldLabel>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="First and last name"
                className={fieldClass(!!errors.fullName)}
                {...register("fullName")}
              />
              <FieldError message={errors.fullName?.message} />
            </div>

            <div>
              <FieldLabel htmlFor="phone">Phone number</FieldLabel>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(650) 555-0143"
                className={fieldClass(!!errors.phone)}
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            <div>
              <FieldLabel>What do you need?</FieldLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup">
                {serviceOptions.map((opt) => {
                  const active = selectedService === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() =>
                        setValue("service", opt as Service, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={`h-[54px] px-3 rounded-[12px] border-[1.5px] text-[15px] font-[700] transition-colors cursor-pointer ${
                        active
                          ? "border-orange bg-badge-bg text-orange"
                          : "border-input-border bg-white text-navy hover:border-text-muted/50"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.service?.message} />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={goNext}
              className="w-full h-[54px] bg-orange text-white font-[700] text-[15.5px] rounded-[12px] hover:bg-orange-hover transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 2                                                        */}
        {/* ============================================================ */}
        <div hidden={step !== 2} aria-hidden={step !== 2}>
          <h2 className="text-[26px] sm:text-[30px] font-[800] text-navy leading-[1.15] tracking-tight mb-2">
            A few optional details
          </h2>
          <p className="text-[15px] text-text-muted mb-7">
            Skip any of these — we can sort it out on the phone.
          </p>

          <div className="space-y-6">
            {/* Service address */}
            <div>
              <FieldLabel htmlFor="street">Service address</FieldLabel>
              <div className="space-y-3">
                <input
                  id="street"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Street address"
                  className={fieldClass(false)}
                  {...register("street")}
                />
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">
                  <input
                    type="text"
                    autoComplete="address-level2"
                    placeholder="City"
                    className={fieldClass(false)}
                    {...register("city")}
                  />
                  <div>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="ZIP"
                      className={fieldClass(!!errors.zip)}
                      {...register("zip")}
                    />
                    <FieldError message={errors.zip?.message} />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass(!!errors.email)}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Details */}
            <div>
              <FieldLabel htmlFor="details">Tell us what is going on</FieldLabel>
              <textarea
                id="details"
                rows={4}
                placeholder="Age of the system, what it is doing, anything a technician should know."
                className="w-full px-4 py-3.5 rounded-[12px] border border-input-border bg-white text-[15px] text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:border-orange transition-colors resize-none leading-relaxed"
                {...register("details")}
              />
            </div>

            {/* Photo upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                aria-label="Add a photo of your system"
              />
              {photo ? (
                <div className="flex items-center gap-3 rounded-[12px] border border-border-light bg-light-bg px-4 py-3">
                  <div className="w-10 h-10 rounded-[10px] bg-badge-bg flex items-center justify-center shrink-0">
                    <Upload className="w-4 h-4 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-[600] text-navy truncate">
                      {photo.name}
                    </p>
                    <p className="text-[12px] text-text-muted">
                      {(photo.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-white hover:text-navy transition-colors cursor-pointer"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2.5 rounded-[12px] border-[1.5px] border-dashed border-input-border bg-white px-4 py-4 text-text-dark hover:border-orange hover:bg-badge-bg/40 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-text-muted" />
                  <span className="text-[14.5px] font-[600]">
                    Add a photo of your system{" "}
                    <span className="text-text-muted font-[500]">
                      (optional)
                    </span>
                  </span>
                </button>
              )}
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 w-[18px] h-[18px] rounded border-input-border accent-orange cursor-pointer shrink-0"
                  {...register("consent")}
                />
                <span className="text-[14px] text-text-dark leading-relaxed">
                  I agree to be contacted about my request and accept the{" "}
                  <Link href="/privacy" className="text-orange font-[700] underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <FieldError message={errors.consent?.message} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="h-[54px] px-6 border-[1.5px] border-border-light text-navy font-[700] text-[15px] rounded-[12px] hover:bg-light-bg transition-colors flex items-center justify-center gap-2 cursor-pointer sm:w-[140px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 h-[54px] bg-orange text-white font-[700] text-[15.5px] rounded-[12px] hover:bg-orange-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {submitting ? "Sending…" : "Send request"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
