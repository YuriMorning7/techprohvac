// Analytics layer — fans every event out to every configured destination
// (Google Tag Manager, Google Analytics 4, Google Ads, and an optional
// third-party pixel such as the ChatGPT Ads Manager data source). Each call
// is a no-op in SSR, and silently skips any destination whose env var is
// not set, so the same component code works in dev and prod.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const CHATGPT_PIXEL_SRC = process.env.NEXT_PUBLIC_CHATGPT_PIXEL_SRC || "";
export const CHATGPT_PIXEL_ID = process.env.NEXT_PUBLIC_CHATGPT_PIXEL_ID || "";

// Comma-separated map of event name → Google Ads conversion label, e.g.
// "estimate_submit:AbC-D_eFg,booking_click:HiJ-K_lMn". Lets the marketer wire
// each conversion from env instead of editing code when they swap campaigns.
const GOOGLE_ADS_CONVERSION_LABELS: Record<string, string> = (() => {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABELS || "";
  const out: Record<string, string> = {};
  raw.split(",").forEach((pair) => {
    const [name, label] = pair.split(":").map((s) => s?.trim());
    if (name && label) out[name] = label;
  });
  return out;
})();

export type AnalyticsEvent =
  | "call_click"
  | "sms_click"
  | "booking_click"
  | "estimate_start"
  | "estimate_step"
  | "estimate_submit"
  | "map_pin_click"
  | "review_platform_click"
  | "faq_open";

// Conversion-grade events trigger the ad-platform conversion pings in
// addition to the normal gtag event. Keep this list small on purpose —
// vanity events clutter the ads dashboard.
const CONVERSION_EVENTS: readonly AnalyticsEvent[] = [
  "call_click",
  "sms_click",
  "booking_click",
  "estimate_submit",
];

type Params = Record<string, string | number | boolean>;

// Push to the GTM dataLayer (works whether GTM is installed or not — the
// array just collects entries until the GTM script picks them up).
function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// Call Google Ads conversion endpoint via gtag. Needs both an AW-* ID and
// an event-specific label from env.
function sendGoogleAdsConversion(name: AnalyticsEvent): void {
  if (!GOOGLE_ADS_ID) return;
  const label = GOOGLE_ADS_CONVERSION_LABELS[name];
  if (!label) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
  });
}

// Fire a ChatGPT Ads pixel. OpenAI's Ads Manager (Beta) gives you either a
// GET URL you call per conversion, or a JS snippet that defines its own
// global. We support the GET flavour here via a configurable base URL and
// event parameter — swap the shape in one place if OpenAI changes it.
function sendChatGptConversion(name: AnalyticsEvent, params: Params): void {
  if (!CHATGPT_PIXEL_SRC || !CHATGPT_PIXEL_ID) return;
  if (typeof window === "undefined") return;
  try {
    const url = new URL(CHATGPT_PIXEL_SRC);
    url.searchParams.set("id", CHATGPT_PIXEL_ID);
    url.searchParams.set("event", name);
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.set(k, String(v));
    });
    // Image beacon — no CORS, no rendering, fires-and-forgets on every browser.
    const img = new Image(1, 1);
    img.src = url.toString();
  } catch {
    /* bad URL — skip silently rather than break the page */
  }
}

export function trackEvent(name: AnalyticsEvent, params: Params = {}): void {
  // Always push to dataLayer so GTM triggers can fire on it even when
  // direct gtag is not configured.
  pushDataLayer({ event: name, ...params });

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (CONVERSION_EVENTS.includes(name)) {
    sendGoogleAdsConversion(name);
    sendChatGptConversion(name, params);
  }
}
