// Thin wrapper around the window.gtag global that the GoogleAnalytics
// <Script /> installs. Calls are no-ops in SSR and in dev (when the GA4 ID
// env var is not set), so component code can call them unconditionally.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

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

export function trackEvent(
  name: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
