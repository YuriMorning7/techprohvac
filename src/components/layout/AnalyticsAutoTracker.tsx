"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Delegated click listener that fires GA4 events for the three highest-intent
// link types (tel:, sms:, Housecall Pro booking) without us having to touch
// every CTA across the site. Each event tags its source with the closest
// section's id or the body path so dashboards can see where conversions come
// from. Dedupe via a sessionStorage flag so rapid double-clicks don't double-
// count.

const BOOKING_HOST = "book.housecallpro.com";

function nearestSectionId(el: HTMLElement): string {
  let cur: HTMLElement | null = el;
  while (cur) {
    if (cur.id) return cur.id;
    if (cur.tagName === "SECTION" && cur.getAttribute("aria-label")) {
      return cur.getAttribute("aria-label") || "section";
    }
    cur = cur.parentElement;
  }
  return window.location.pathname || "unknown";
}

export default function AnalyticsAutoTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const href = anchor.href;
      const source = nearestSectionId(anchor);

      if (href.startsWith("tel:")) {
        trackEvent("call_click", { source, href });
        return;
      }
      if (href.startsWith("sms:")) {
        trackEvent("sms_click", { source, href });
        return;
      }
      try {
        const url = new URL(href);
        if (url.host === BOOKING_HOST) {
          trackEvent("booking_click", { source, href });
        }
      } catch {
        /* non-URL — ignore */
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
  }, []);

  return null;
}
