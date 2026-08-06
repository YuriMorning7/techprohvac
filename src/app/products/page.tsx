"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ThermometerSun,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Fan,
  Gauge,
  Layers,
  ArrowRight,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type ProductCategory =
  | "all"
  | "heating"
  | "cooling"
  | "water-air"
  | "controls";

interface ProductItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: ProductCategory[];
  brands: string[];
  slug: string;
}

const filterTabs: { value: ProductCategory; label: string }[] = [
  { value: "all", label: "All Equipment" },
  { value: "heating", label: "Heating" },
  { value: "cooling", label: "Cooling" },
  { value: "water-air", label: "Water & Air" },
  { value: "controls", label: "Controls" },
];

const products: ProductItem[] = [
  {
    icon: ThermometerSun,
    title: "Heat Pumps",
    description:
      "Energy-efficient heat pump systems that provide both heating and cooling. Ideal for the Bay Area climate with year-round comfort and significant energy savings.",
    category: ["heating", "cooling"],
    brands: ["Carrier", "Lennox", "Trane", "Daikin"],
    slug: "heat-pumps",
  },
  {
    icon: Flame,
    title: "Furnaces",
    description:
      "High-efficiency gas and electric furnaces for reliable home heating. Available in single-stage, two-stage, and variable-speed models.",
    category: ["heating"],
    brands: ["Carrier", "Lennox", "Trane", "Rheem"],
    slug: "furnaces",
  },
  {
    icon: Snowflake,
    title: "Air Conditioners",
    description:
      "Central air conditioning systems designed for maximum cooling efficiency. SEER ratings up to 26 for significant energy savings.",
    category: ["cooling"],
    brands: ["Carrier", "Lennox", "Trane", "Goodman"],
    slug: "air-conditioners",
  },
  {
    icon: Droplets,
    title: "Water Heaters",
    description:
      "Tank and tankless water heaters for endless hot water. Energy-efficient models that reduce utility costs while providing reliable performance.",
    category: ["water-air"],
    brands: ["Rheem", "Rinnai", "Navien", "A.O. Smith"],
    slug: "water-heaters",
  },
  {
    icon: Gauge,
    title: "Thermostats",
    description:
      "Smart and programmable thermostats for precise temperature control. Wi-Fi enabled models with app control and energy usage tracking.",
    category: ["controls"],
    brands: ["Ecobee", "Honeywell", "Nest", "Carrier"],
    slug: "thermostats",
  },
  {
    icon: Fan,
    title: "Ductless Systems",
    description:
      "Ductless mini-split systems for flexible zone-based heating and cooling. Perfect for room additions, garages, and homes without ductwork.",
    category: ["heating", "cooling"],
    brands: ["Mitsubishi", "Daikin", "Fujitsu", "LG"],
    slug: "ductless-systems",
  },
  {
    icon: Wind,
    title: "Indoor Air Quality",
    description:
      "Air purifiers, humidifiers, dehumidifiers, and UV germicidal systems. Improve the air you breathe with whole-home air quality solutions.",
    category: ["water-air"],
    brands: ["Aprilaire", "Honeywell", "Carrier", "Lennox"],
    slug: "indoor-air-quality",
  },
  {
    icon: Layers,
    title: "Zoning Systems",
    description:
      "Multi-zone HVAC controls that let you heat and cool different areas independently. Eliminate hot and cold spots for consistent comfort.",
    category: ["controls"],
    brands: ["Honeywell", "Carrier", "EWC Controls", "Arzel"],
    slug: "zoning-systems",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category.includes(activeFilter));

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-navy text-white">
        <div className="container-site py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Products</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Products & Equipment
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              We install and service all major HVAC brands. Browse our product
              categories to find the right heating and cooling solution for your
              home.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FILTER + GRID ========== */}
      <section className="bg-white section-padding">
        <div className="container-site">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-[600] transition-colors ${
                  activeFilter === tab.value
                    ? "bg-navy text-white"
                    : "bg-light-bg text-text-muted hover:bg-border-light"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.slug}
                className="group bg-light-bg rounded-[18px] overflow-hidden border border-border-light hover:border-orange/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image area placeholder */}
                <div className="aspect-[4/3] bg-border-lighter flex items-center justify-center relative">
                  <product.icon className="w-16 h-16 text-navy/20" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-[700] bg-white text-navy px-3 py-1 rounded-full">
                      {product.category.includes("heating") &&
                      product.category.includes("cooling")
                        ? "Heating & Cooling"
                        : product.category[0] === "water-air"
                          ? "Water & Air"
                          : product.category[0] === "controls"
                            ? "Controls"
                            : product.category[0].charAt(0).toUpperCase() +
                              product.category[0].slice(1)}
                    </span>
                  </div>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-lg font-[700] text-text-dark mb-2 group-hover:text-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-text-muted text-[14px] leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.brands.map((brand) => (
                      <span
                        key={brand}
                        className="text-[11px] font-[600] text-text-muted bg-white px-2.5 py-1 rounded-full border border-border-light"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 text-orange font-[600] text-[14px] group-hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-navy section-padding">
        <div className="container-site text-center">
          <SectionLabel>Need Help Choosing?</SectionLabel>
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mt-3 mb-4">
            Let Us Help You Find the Right System
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Our HVAC experts will assess your home and recommend the best
            equipment for your needs and budget. Free estimates on all new
            installations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
            >
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] border border-white/20"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
