// Typical San Mateo County 2026 install price ranges — used by the instant
// estimate wizard to give homeowners a realistic ballpark before they book
// a free in-home visit. Numbers are TYPICAL residential ranges based on
// publicly reported Bay Area installs; actual quotes depend on load calc,
// electrical panel, permits and venting. Always labeled "typical range" in
// the UI and paired with a free-estimate CTA.

export type ServiceKey =
  | "heat-pump"
  | "mini-split"
  | "furnace"
  | "ac"
  | "ductwork"
  | "water-heater-hp"
  | "water-heater-tank"
  | "maintenance"
  | "repair";

export type ServiceOption = {
  key: ServiceKey;
  label: string;
  tagline: string;
  icon: string; // lucide icon name — resolved at the call site
  base: [number, number];
  rebateHint?: string; // optional PCE / BayREN note
};

export const SERVICES: ServiceOption[] = [
  {
    key: "heat-pump",
    label: "Heat Pump",
    tagline: "Electric heating + cooling, 2–4× efficiency",
    icon: "Thermometer",
    base: [14000, 26000],
    rebateHint: "Typically $3,000–$9,000 in PCE / BayREN / federal rebates",
  },
  {
    key: "mini-split",
    label: "Ductless Mini-Split",
    tagline: "Room-by-room comfort, no ducts needed",
    icon: "Wind",
    base: [5000, 14000],
    rebateHint: "Some PCE rebates apply to qualifying mini-split heat pumps",
  },
  {
    key: "furnace",
    label: "Gas Furnace",
    tagline: "High-efficiency gas heat",
    icon: "Flame",
    base: [5500, 11000],
  },
  {
    key: "ac",
    label: "Air Conditioner",
    tagline: "Central cooling for ducted homes",
    icon: "Snowflake",
    base: [7500, 13000],
  },
  {
    key: "ductwork",
    label: "Ductwork",
    tagline: "New or replacement duct system",
    icon: "GitBranch",
    base: [4500, 12000],
  },
  {
    key: "water-heater-hp",
    label: "Heat Pump Water Heater",
    tagline: "80 gal electric, rebate-friendly",
    icon: "Droplets",
    base: [4500, 8500],
    rebateHint: "Up to $1,000 federal + BayREN incentive available",
  },
  {
    key: "water-heater-tank",
    label: "Standard Water Heater",
    tagline: "Gas or electric tank replacement",
    icon: "Droplets",
    base: [2200, 4500],
  },
  {
    key: "maintenance",
    label: "Tune-up / Maintenance",
    tagline: "Annual service visit",
    icon: "Wrench",
    base: [189, 349],
  },
  {
    key: "repair",
    label: "Repair / Diagnostic",
    tagline: "System not working right?",
    icon: "Wrench",
    base: [120, 850],
  },
];

export type HomeSize = "under-1500" | "1500-2500" | "2500-3500" | "over-3500";
export type CurrentSystem = "existing" | "replacement" | "new-home" | "unsure";

// Multipliers applied to a service's base range — kept conservative so we
// never understate; the wizard always encourages a free in-home estimate
// for the real number.
export const HOME_SIZE_MULT: Record<HomeSize, [number, number]> = {
  "under-1500": [0.85, 1.0],
  "1500-2500": [1.0, 1.15],
  "2500-3500": [1.15, 1.35],
  "over-3500": [1.3, 1.6],
};

export const SYSTEM_MULT: Record<CurrentSystem, [number, number]> = {
  existing: [1.0, 1.1],       // compatible system, straight swap
  replacement: [1.05, 1.2],   // some sheet-metal / electrical mods
  "new-home": [1.1, 1.35],    // new ducts, new electrical
  unsure: [1.0, 1.25],        // widen the range
};

export function estimateRange(
  service: ServiceOption,
  size: HomeSize,
  system: CurrentSystem
): [number, number] {
  const [bLo, bHi] = service.base;
  const [sLo, sHi] = HOME_SIZE_MULT[size];
  const [yLo, yHi] = SYSTEM_MULT[system];
  const lo = Math.round((bLo * sLo * yLo) / 100) * 100;
  const hi = Math.round((bHi * sHi * yHi) / 100) * 100;
  return [lo, hi];
}

export function formatRange([lo, hi]: [number, number]): string {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return `${fmt(lo)} – ${fmt(hi)}`;
}
