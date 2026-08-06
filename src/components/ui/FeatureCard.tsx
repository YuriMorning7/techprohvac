import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/[.055] border border-white/[.13] rounded-[16px] p-[28px]">
      <div className="w-[46px] h-[46px] rounded-[12px] bg-orange/15 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-orange" />
      </div>

      <h3 className="text-[19px] font-[700] text-white leading-tight mb-2">
        {title}
      </h3>

      <p className="text-[15px] text-white/65 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
