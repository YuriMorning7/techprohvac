"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  serviceType: z.string().min(1, "Please select a service"),
  address: z.string().min(3, "Address is required"),
  details: z.string().optional(),
  preferredDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  "AC Repair",
  "Heating Repair",
  "Installation",
  "Maintenance",
  "Duct Services",
  "Other",
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  const goToStep2 = async () => {
    const valid = await trigger(["name", "email", "phone", "serviceType"]);
    if (valid) setStep(2);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-success-bg border-2 border-success-border flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-[24px] font-[800] text-navy mb-2">
          Request Submitted!
        </h3>
        <p className="text-[16px] text-text-muted max-w-sm mx-auto">
          Thank you for reaching out. Our team will contact you within one
          business day to confirm your appointment.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full h-[56px] px-4 rounded-[--radius-button] border border-input-border text-[15px] text-text-dark bg-white placeholder:text-text-muted/60 focus:outline-none focus:border-orange transition-colors";

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-[600] text-text-muted">
            Step {step} of 2
          </span>
          <span className="text-[13px] font-[600] text-text-muted">
            {step === 1 ? "Contact Info" : "Service Details"}
          </span>
        </div>
        <div className="h-[5px] bg-progress-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-orange rounded-full transition-all duration-500"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <input
                {...register("name")}
                placeholder="Full name"
                className={inputClasses}
              />
              {errors.name && (
                <p className="text-[13px] text-orange mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className={inputClasses}
              />
              {errors.email && (
                <p className="text-[13px] text-orange mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone number"
                className={inputClasses}
              />
              {errors.phone && (
                <p className="text-[13px] text-orange mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <p className="text-[14px] font-[600] text-navy mb-3">
                Service type
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {serviceOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 p-3.5 rounded-[--radius-button] border border-input-border cursor-pointer has-[:checked]:border-orange has-[:checked]:bg-badge-bg transition-all"
                  >
                    <input
                      {...register("serviceType")}
                      type="radio"
                      value={option}
                      className="w-4 h-4 accent-orange"
                    />
                    <span className="text-[14px] font-[500] text-text-dark">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <p className="text-[13px] text-orange mt-1">
                  {errors.serviceType.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={goToStep2}
              className="w-full h-[56px] bg-orange text-white font-[700] text-[15.5px] rounded-[--radius-button] hover:bg-orange-hover transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <input
                {...register("address")}
                placeholder="Street address"
                className={inputClasses}
              />
              {errors.address && (
                <p className="text-[13px] text-orange mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                {...register("details")}
                placeholder="Describe the issue or service needed (optional)"
                rows={4}
                className="w-full px-4 py-3.5 rounded-[--radius-button] border border-input-border text-[15px] text-text-dark bg-white placeholder:text-text-muted/60 focus:outline-none focus:border-orange transition-colors resize-none"
              />
            </div>

            <div>
              <input
                {...register("preferredDate")}
                type="date"
                placeholder="Preferred date"
                className={inputClasses}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-[56px] px-6 border-[1.5px] border-border-light text-navy font-[700] text-[15px] rounded-[--radius-button] hover:bg-light-bg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-[56px] bg-orange text-white font-[700] text-[15.5px] rounded-[--radius-button] hover:bg-orange-hover transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
