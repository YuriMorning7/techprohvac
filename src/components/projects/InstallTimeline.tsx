import {
  ClipboardList,
  Package,
  Wrench,
  FileCheck,
  Receipt,
} from "lucide-react";

type Props = {
  completionDate: string; // ISO yyyy-mm-dd
};

// Visual summary of a typical TechPro install. We don't have per-project
// timestamps for every stage in the content drop, so the visual presents
// this as the standard flow a customer goes through, anchored by the known
// completion date at the end.
export default function InstallTimeline({ completionDate }: Props) {
  const steps = [
    {
      icon: ClipboardList,
      label: "Free in-home scope",
      detail: "Load calc, electrical check, equipment match.",
    },
    {
      icon: Receipt,
      label: "Rebates prepped",
      detail: "PCE / BayREN / federal paperwork drafted.",
    },
    {
      icon: Package,
      label: "Equipment ordered",
      detail: "Mitsubishi, Bryant, Carrier — stocked locally.",
    },
    {
      icon: Wrench,
      label: "Install day",
      detail: "Same father-and-son crew, in and out.",
    },
    {
      icon: FileCheck,
      label: "Sign-off",
      detail: `Commissioned & completed ${new Date(completionDate).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric", year: "numeric" }
      )}.`,
    },
  ];

  return (
    <section className="not-prose mt-10 pt-8 border-t border-border-lighter">
      <p className="text-[11.5px] font-[800] text-orange tracking-[.16em] uppercase mb-5">
        How this install happened
      </p>
      <ol className="relative">
        {/* vertical connector */}
        <span
          aria-hidden="true"
          className="absolute left-[18px] top-4 bottom-4 w-px bg-border-light"
        />
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
              <span
                className={`relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                  isLast
                    ? "bg-orange text-white border-orange shadow-[0_8px_18px_-8px_rgba(241,90,41,0.5)]"
                    : "bg-white text-orange border-orange/30"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </span>
              <div className="pt-1">
                <p className="text-[14.5px] font-[800] text-navy leading-tight">
                  {s.label}
                </p>
                <p className="text-[13px] text-text-muted mt-1 leading-relaxed">
                  {s.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
