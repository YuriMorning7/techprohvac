"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  index?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[--radius-card] p-[34px_30px] border border-border-lighter shadow-[0_2px_14px_rgba(19,41,75,.07)] flex flex-col"
    >
      <div className="w-[58px] h-[58px] rounded-[--radius-icon] bg-navy flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-[25px] font-[800] text-navy leading-tight mb-3">
        {title}
      </h3>

      <p className="text-[16px] text-text-muted leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-orange font-[700] text-[15px] hover:gap-3 transition-all duration-200"
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
