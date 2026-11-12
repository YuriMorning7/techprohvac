"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/faqs";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-light-bg section-padding">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-3 text-center">
            Good Questions
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-[800] text-navy leading-[1.1] tracking-tight text-center mb-10 lg:mb-12">
            What homeowners ask us most
          </h2>

          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.question}
                  className="bg-white rounded-[20px] border border-border-light overflow-hidden shadow-[0_2px_10px_-6px_rgba(10,19,41,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-18px_rgba(10,19,41,0.18)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="text-[15.5px] sm:text-[17px] font-[700] text-navy leading-[1.35]">
                      {f.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 w-9 h-9 rounded-full bg-light-bg flex items-center justify-center text-navy transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-orange text-white" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    hidden={!isOpen}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1"
                  >
                    <p className="text-[14.5px] sm:text-[15.5px] text-text-dark leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
