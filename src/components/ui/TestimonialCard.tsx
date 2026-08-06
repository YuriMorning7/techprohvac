"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  rating: number;
  quote: string;
  authorName: string;
  authorLocation: string;
  index?: number;
}

export default function TestimonialCard({
  rating,
  quote,
  authorName,
  authorLocation,
  index = 0,
}: TestimonialCardProps) {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[16px] border border-border-light p-[26px] flex flex-col"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-[18px] h-[18px] ${
              i < rating
                ? "fill-orange text-orange"
                : "fill-border-lighter text-border-lighter"
            }`}
          />
        ))}
      </div>

      <p className="text-[16.5px] text-text-dark leading-relaxed mb-6 flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-[42px] h-[42px] rounded-full bg-navy flex items-center justify-center shrink-0">
          <span className="text-[14px] font-[700] text-white">{initials}</span>
        </div>
        <div>
          <p className="text-[15px] font-[700] text-navy leading-tight">
            {authorName}
          </p>
          <p className="text-[13.5px] text-text-muted leading-tight">
            {authorLocation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
