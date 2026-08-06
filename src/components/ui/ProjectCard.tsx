"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  image?: string;
  location: string;
  title: string;
  description: string;
  href: string;
  index?: number;
}

export default function ProjectCard({
  image,
  location,
  title,
  description,
  href,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[--radius-card] border border-border-light shadow-[0_2px_14px_rgba(19,41,75,.07)] overflow-hidden flex flex-col"
    >
      <div className="h-[230px] bg-light-bg relative overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-orange shrink-0" />
          <span className="text-[13px] font-[600] text-text-muted">{location}</span>
        </div>

        <h3 className="text-[21px] font-[800] text-navy leading-tight mb-2">
          {title}
        </h3>

        <p className="text-[15px] text-text-muted leading-relaxed mb-5 flex-1">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-orange font-[700] text-[14.5px] hover:gap-3 transition-all duration-200"
        >
          View project
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
