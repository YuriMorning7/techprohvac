"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A thin orange bar at the top of the page that animates on route
 * navigation, similar to youtube.com / github.com. Purely decorative:
 * all content is still server-rendered so crawlers see the real page
 * without any spinner or loading state.
 *
 * How it works:
 * 1. Any same-origin left-click on an <a> is intercepted; the bar
 *    starts filling to ~85%.
 * 2. When usePathname() changes (the route settled), we snap to 100%
 *    and fade out.
 */
export default function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      let target: URL;
      try {
        target = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (target.origin !== window.location.origin) return;
      // Same page (including hash-only jump) — no route change to signal.
      if (target.pathname === window.location.pathname) return;

      clearTimers();
      setVisible(true);
      setProgress(15);
      timersRef.current.push(
        window.setTimeout(() => setProgress(45), 120),
        window.setTimeout(() => setProgress(75), 320),
        window.setTimeout(() => setProgress(88), 600)
      );
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      clearTimers();
    };
  }, []);

  // Route settled — finish the bar and fade out.
  useEffect(() => {
    if (!visible) return;
    clearTimers();
    setProgress(100);
    const hide = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
    timersRef.current.push(hide);
    return () => window.clearTimeout(hide);
    // Trigger on pathname change only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] h-[3px] bg-orange pointer-events-none"
      style={{
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
        transition:
          "width 200ms ease-out, opacity 240ms ease-out",
        boxShadow: visible
          ? "0 0 10px rgba(241, 90, 41, 0.6), 0 0 4px rgba(241, 90, 41, 0.8)"
          : "none",
      }}
    />
  );
}
