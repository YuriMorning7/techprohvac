import type { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export default function TrustBadge({ icon: Icon, title, subtitle }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-[44px] h-[44px] rounded-[11px] bg-badge-bg shrink-0">
        <Icon className="w-5 h-5 text-orange" />
      </div>
      <div>
        <p className="text-[15.5px] font-[700] text-navy leading-tight">{title}</p>
        <p className="text-[13.5px] text-text-muted leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}
