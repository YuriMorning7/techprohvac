"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ProductCategoryCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

export default function ProductCategoryCard({
  icon: Icon,
  title,
  href,
}: ProductCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 bg-light-bg border border-border-lighter rounded-[--radius-icon] p-[22px_20px] transition-all duration-200 hover:bg-white hover:border-orange hover:shadow-[0_2px_14px_rgba(19,41,75,.07)]"
    >
      <Icon className="w-5 h-5 text-orange shrink-0" />
      <span className="text-[16px] font-[700] text-navy">{title}</span>
    </Link>
  );
}
