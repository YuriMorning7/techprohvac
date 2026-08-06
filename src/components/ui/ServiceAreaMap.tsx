"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  /** Default map query when no ZIP has been checked. */
  defaultQuery: string;
  /** Human-readable label for the default view. */
  defaultLabel: string;
};

const zipRegex = /^\d{5}$/;

function buildMapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
}

export default function ServiceAreaMap({ defaultQuery, defaultLabel }: Props) {
  const [zipInput, setZipInput] = useState("");
  const [checkedZip, setCheckedZip] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuery = checkedZip ? `${checkedZip}, USA` : defaultQuery;
  const mapSrc = buildMapSrc(currentQuery);
  const mapLabel = checkedZip ? `ZIP ${checkedZip}` : defaultLabel;

  function handleCheck() {
    const value = zipInput.trim();
    if (!zipRegex.test(value)) {
      setError("Enter a valid 5-digit ZIP");
      return;
    }
    setError(null);
    setCheckedZip(value);
  }

  function handleReset() {
    setCheckedZip(null);
    setZipInput("");
    setError(null);
  }

  return (
    <div className="space-y-5">
      {/* Map */}
      <div className="relative rounded-[18px] overflow-hidden border border-border-light bg-progress-bg">
        <div className="aspect-[4/3]">
          <iframe
            key={mapSrc}
            title={`Service area map — ${mapLabel}`}
            src={mapSrc}
            className="w-full h-full block"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        {checkedZip && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 h-[36px] pl-3.5 pr-1 rounded-full bg-white/95 backdrop-blur border border-border-light shadow-sm">
            <span className="text-[12.5px] font-[700] text-navy">
              Pinned to {checkedZip}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:bg-light-bg hover:text-navy transition-colors cursor-pointer"
              aria-label="Reset map"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ZIP checker */}
      <div className="bg-light-bg rounded-[18px] p-6 border border-border-light">
        <h4 className="font-[700] text-navy mb-2 text-[16px]">
          Check Your ZIP Code
        </h4>
        <p className="text-text-muted text-[14px] mb-4">
          Not sure if we serve your area? Enter your ZIP code below.
        </p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zipInput}
            onChange={(e) => {
              setZipInput(e.target.value.replace(/\D/g, ""));
              if (error) setError(null);
            }}
            placeholder="Enter ZIP code"
            aria-label="ZIP code"
            aria-invalid={!!error}
            className={`flex-1 h-[48px] px-4 rounded-[12px] border bg-white text-[15px] text-text-dark placeholder:text-text-muted/70 focus:outline-none transition-colors ${
              error
                ? "border-orange focus:border-orange"
                : "border-input-border focus:border-orange"
            }`}
          />
          <button
            type="submit"
            className="h-[48px] bg-navy hover:bg-navy/90 text-white font-[700] px-6 rounded-[12px] transition-colors text-[14.5px] cursor-pointer"
          >
            Check
          </button>
        </form>
        {error && (
          <p className="text-[13px] text-orange mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
