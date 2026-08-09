"use client";

import { useState } from "react";
import { CheckCircle2, Phone, X } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/constants";

type Props = {
  /** Default map query when no ZIP has been checked. */
  defaultQuery: string;
  /** Human-readable label for the default view. */
  defaultLabel: string;
};

/**
 * ZIP codes we serve, keyed to the 18 cities on the Service Areas
 * section of the home page. The label is what customers see in the
 * success card; several ZIPs span more than one town, so the label
 * lists every real municipality on that ZIP.
 */
const SERVICE_ZIPS: Record<string, string> = {
  // San Carlos
  "94070": "San Carlos",

  // Belmont
  "94002": "Belmont",

  // Redwood City (+ shared Woodside coverage on 94062)
  "94059": "Redwood City",
  "94061": "Redwood City",
  "94062": "Redwood City / Woodside",
  "94063": "Redwood City",
  "94064": "Redwood City",
  "94065": "Redwood City",

  // San Mateo
  "94401": "San Mateo",
  "94402": "San Mateo",
  "94403": "San Mateo",

  // Foster City (shares 94404 with parts of San Mateo)
  "94404": "Foster City",

  // Burlingame + Hillsborough (both live on 94010; 94011 is Burlingame PO)
  "94010": "Burlingame / Hillsborough",
  "94011": "Burlingame",

  // Menlo Park + Atherton (94027 covers Atherton and adjacent Menlo Park)
  "94025": "Menlo Park",
  "94026": "Menlo Park",
  "94027": "Atherton / Menlo Park",

  // Portola Valley
  "94028": "Portola Valley",

  // Half Moon Bay
  "94019": "Half Moon Bay",

  // Pacifica
  "94044": "Pacifica",

  // Daly City
  "94014": "Daly City",
  "94015": "Daly City",
  "94016": "Daly City",
  "94017": "Daly City",

  // South San Francisco
  "94080": "South San Francisco",
  "94083": "South San Francisco",

  // San Bruno
  "94066": "San Bruno",

  // Millbrae
  "94030": "Millbrae",

  // Brisbane
  "94005": "Brisbane",
};

const zipRegex = /^\d{5}$/;

type CheckResult =
  | { status: "served"; zip: string; city: string }
  | { status: "unserved"; zip: string }
  | { status: "invalid"; message: string };

function buildMapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
}

export default function ServiceAreaMap({ defaultQuery, defaultLabel }: Props) {
  const [zipInput, setZipInput] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const pinnedZip =
    result?.status === "served" || result?.status === "unserved"
      ? result.zip
      : null;

  const currentQuery = pinnedZip ? `${pinnedZip}, USA` : defaultQuery;
  const mapSrc = buildMapSrc(currentQuery);
  const mapLabel = pinnedZip ? `ZIP ${pinnedZip}` : defaultLabel;

  function handleCheck() {
    const value = zipInput.trim();
    if (!zipRegex.test(value)) {
      setResult({ status: "invalid", message: "Enter a valid 5-digit ZIP" });
      return;
    }
    const city = SERVICE_ZIPS[value];
    if (city) {
      setResult({ status: "served", zip: value, city });
    } else {
      setResult({ status: "unserved", zip: value });
    }
  }

  function handleReset() {
    setZipInput("");
    setResult(null);
  }

  const inputHasError = result?.status === "invalid";

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Map */}
      <div className="relative rounded-[18px] overflow-hidden border border-border-light bg-progress-bg w-full">
        <div className="aspect-[4/3] w-full">
          <iframe
            key={mapSrc}
            title={`Service area map — ${mapLabel}`}
            src={mapSrc}
            className="w-full h-full block border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        {pinnedZip && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 h-[36px] pl-3.5 pr-1 rounded-full bg-white/95 backdrop-blur border border-border-light shadow-sm">
            <span className="text-[12.5px] font-[700] text-navy">
              Pinned to {pinnedZip}
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
          className="flex flex-col sm:flex-row gap-3 w-full min-w-0"
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zipInput}
            onChange={(e) => {
              setZipInput(e.target.value.replace(/\D/g, ""));
              if (result?.status === "invalid") setResult(null);
            }}
            placeholder="Enter ZIP code"
            aria-label="ZIP code"
            aria-invalid={inputHasError}
            className={`min-w-0 w-full sm:w-auto sm:flex-1 h-[48px] px-4 rounded-[12px] border bg-white text-[15px] text-text-dark placeholder:text-text-muted/70 focus:outline-none transition-colors ${
              inputHasError
                ? "border-orange focus:border-orange"
                : "border-input-border focus:border-orange"
            }`}
          />
          <button
            type="submit"
            className="h-[48px] bg-navy hover:bg-navy/90 text-white font-[700] px-6 rounded-[12px] transition-colors text-[14.5px] cursor-pointer shrink-0"
          >
            Check
          </button>
        </form>

        {result?.status === "invalid" && (
          <p role="alert" className="text-[13px] text-orange mt-2">
            {result.message}
          </p>
        )}

        {result?.status === "served" && (
          <div
            role="status"
            className="mt-4 flex items-start gap-3 rounded-[12px] border border-success-border bg-success-bg px-4 py-3"
          >
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-[14.5px] font-[700] text-success leading-tight">
                Great news — we serve {result.city}.
              </p>
              <p className="text-[13px] text-text-dark/80 mt-0.5">
                ZIP {result.zip} is inside our service area. Request a visit
                and we&apos;ll be out soon.
              </p>
            </div>
          </div>
        )}

        {result?.status === "unserved" && (
          <div
            role="status"
            className="mt-4 rounded-[12px] border border-orange/30 bg-badge-bg px-4 py-3.5"
          >
            <p className="text-[14.5px] font-[700] text-navy leading-tight">
              ZIP {result.zip} is outside our service area.
            </p>
            <p className="text-[13px] text-text-dark/80 mt-1">
              We currently serve 18 cities across San Mateo County. Give us a
              call — we may still be able to help.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-3 inline-flex items-center gap-2 h-[40px] px-4 rounded-[10px] bg-navy text-white text-[13.5px] font-[700] hover:bg-navy/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
