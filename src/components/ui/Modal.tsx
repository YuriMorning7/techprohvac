"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  eyebrow?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  footer?: React.ReactNode;
};

// Accessible, mobile-safe modal with scrim, focus trap, Esc-to-close, and a
// subtle enter/exit transition. Rendered inline (no portal) because every
// consumer mounts under <body>'s stacking context, which is sufficient for
// our current nav + sticky header z-indexes.
export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  size = "md",
  children,
  footer,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll while the modal is open; restore on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close; focus the panel on open so screen readers announce it.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const maxW =
    size === "sm" ? "max-w-[420px]" : size === "lg" ? "max-w-[720px]" : "max-w-[540px]";

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel. IMPORTANT: pointer-events must toggle with `open`. The dialog
          panel is positioned over the center of the viewport and has
          `overflow-y-auto`; if we leave `pointer-events-auto` on it while
          the modal is closed, the panel silently captures wheel + touch
          events over most of the viewport — users can't scroll the page
          even though the modal is visually hidden. */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none">
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={typeof title === "string" ? "modal-title" : undefined}
          className={`relative w-full ${maxW} bg-white rounded-t-[24px] sm:rounded-[20px] shadow-[0_30px_80px_-20px_rgba(10,19,41,0.45)] transition-transform duration-250 ease-out ${
            open
              ? "pointer-events-auto translate-y-0"
              : "pointer-events-none translate-y-6"
          } max-h-[92vh] overflow-y-auto`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-light-bg hover:bg-border-light flex items-center justify-center text-text-muted hover:text-navy transition-colors z-10"
          >
            <X className="w-4 h-4" strokeWidth={2.4} />
          </button>

          <div className="p-6 sm:p-8 pr-14 sm:pr-16">
            {eyebrow && (
              <p className="text-[11px] font-[800] text-orange tracking-[.18em] uppercase mb-2">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={typeof title === "string" ? "modal-title" : undefined}
                className="text-[22px] sm:text-[26px] font-[800] text-navy leading-[1.15] tracking-tight"
              >
                {title}
              </h2>
            )}
          </div>

          <div className="px-6 sm:px-8 pb-6 sm:pb-8">{children}</div>

          {footer && (
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-border-lighter mt-2 bg-light-bg/50 rounded-b-[24px] sm:rounded-b-[20px]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
