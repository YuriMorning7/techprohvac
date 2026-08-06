"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { MapPin, Shield } from "lucide-react";
import { PHONE_HREF, GOOGLE_RATING, YEARS_IN_BUSINESS } from "@/lib/constants";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center min-h-[calc(100vh-var(--header-height))] py-16 lg:py-0">
          {/* Left Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-[560px]"
          >
            {/* Location Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.12] rounded-full px-4 py-2 text-[13.5px] font-[600] text-white/80">
                <MapPin className="w-3.5 h-3.5 text-orange" />
                San Mateo County, California
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(38px,5vw,58px)] font-[800] text-white leading-[1.08] tracking-[-.025em] mb-5"
            >
              Your Trusted HVAC
              <br />
              <span className="text-orange">Experts Since 2005</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-[19px] text-white/70 leading-relaxed mb-8 max-w-[480px]"
            >
              Family-owned heating and cooling company providing reliable
              installation, repair, and maintenance for homes and businesses
              across the Peninsula.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6">
              <Button variant="primary" size="lg" href="/contact" showArrow>
                Schedule Service
              </Button>
              <Button variant="outline" size="lg" href={PHONE_HREF}>
                Call Now
              </Button>
            </motion.div>

            {/* Trust Subtext */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-5 text-[13.5px] text-white/50"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-orange" />
                Licensed &amp; Insured
              </span>
              <span>{GOOGLE_RATING} Google Rating</span>
              <span>{YEARS_IN_BUSINESS} Years Experience</span>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
              <Image
                src="/images/hero-team.jpg"
                alt="TechPro HVAC team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Van Image - positioned at bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute bottom-0 right-[5%] z-20 hidden xl:block"
      >
        <Image
          src="/images/van.png"
          alt="TechPro service van"
          width={340}
          height={200}
          className="object-contain"
        />
      </motion.div>
    </section>
  );
}
