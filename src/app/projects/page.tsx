"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImage } from "@/lib/placeholder";
import {
  ChevronRight,
  MapPin,
  ArrowRight,
  Phone,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { PHONE, PHONE_HREF } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type ProjectCategory =
  | "all"
  | "heat-pumps"
  | "air-conditioning"
  | "water-heaters";

interface ProjectItem {
  title: string;
  location: string;
  description: string;
  category: ProjectCategory;
  slug: string;
  completedAt: string;
}

const filterTabs: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "heat-pumps", label: "Heat Pumps" },
  { value: "air-conditioning", label: "Air Conditioning" },
  { value: "water-heaters", label: "Water Heaters" },
];

const projects: ProjectItem[] = [
  {
    title: "Complete HVAC System Replacement",
    location: "San Carlos, CA",
    description:
      "Replaced aging furnace and AC with a high-efficiency heat pump system, improving comfort and reducing energy costs by 35%. The project included new ductwork and a smart thermostat installation.",
    category: "heat-pumps",
    slug: "hvac-system-replacement-san-carlos",
    completedAt: "2024",
  },
  {
    title: "Ductless Mini-Split Installation",
    location: "Belmont, CA",
    description:
      "Installed a 3-zone ductless system in a home addition, providing precise temperature control without ductwork. The homeowner now enjoys independent climate control in each room.",
    category: "air-conditioning",
    slug: "ductless-mini-split-belmont",
    completedAt: "2024",
  },
  {
    title: "Tankless Water Heater Upgrade",
    location: "Redwood City, CA",
    description:
      "Upgraded from a 50-gallon tank to a high-efficiency tankless unit, delivering endless hot water with lower energy bills. Included a recirculation pump for instant hot water.",
    category: "water-heaters",
    slug: "tankless-water-heater-redwood-city",
    completedAt: "2024",
  },
  {
    title: "Dual-Zone Heat Pump System",
    location: "San Mateo, CA",
    description:
      "Designed and installed a dual-zone heat pump system for a two-story home, eliminating hot and cold spots between floors. Energy savings of over 40% compared to the old system.",
    category: "heat-pumps",
    slug: "dual-zone-heat-pump-san-mateo",
    completedAt: "2024",
  },
  {
    title: "Central AC Installation",
    location: "Foster City, CA",
    description:
      "First-time central air conditioning installation in a home that previously relied on window units. Included new ductwork design and installation for optimal airflow.",
    category: "air-conditioning",
    slug: "central-ac-foster-city",
    completedAt: "2023",
  },
  {
    title: "Commercial Water Heater Installation",
    location: "Burlingame, CA",
    description:
      "Installed two commercial-grade tankless water heaters for a small office building, providing reliable hot water for 30+ employees with significant energy savings.",
    category: "water-heaters",
    slug: "commercial-water-heater-burlingame",
    completedAt: "2023",
  },
  {
    title: "Whole-Home Heat Pump Conversion",
    location: "Hillsborough, CA",
    description:
      "Converted a 4,000 sq ft home from gas heating to a whole-home heat pump system. The project included removing the old gas furnace and upgrading the electrical panel.",
    category: "heat-pumps",
    slug: "whole-home-heat-pump-hillsborough",
    completedAt: "2023",
  },
  {
    title: "AC Replacement with High-SEER Unit",
    location: "Menlo Park, CA",
    description:
      "Replaced a 15-year-old AC unit with a new 20-SEER system. The high-efficiency upgrade reduced cooling costs by 30% while providing more consistent temperatures throughout the home.",
    category: "air-conditioning",
    slug: "ac-replacement-menlo-park",
    completedAt: "2023",
  },
  {
    title: "Hybrid Water Heater Installation",
    location: "Woodside, CA",
    description:
      "Installed a hybrid heat pump water heater that uses 60% less energy than a traditional electric water heater. The unit qualifies for utility rebates and federal tax credits.",
    category: "water-heaters",
    slug: "hybrid-water-heater-woodside",
    completedAt: "2023",
  },
];

const categoryLabels: Record<ProjectCategory, string> = {
  all: "All Projects",
  "heat-pumps": "Heat Pump",
  "air-conditioning": "Air Conditioning",
  "water-heaters": "Water Heater",
};

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
            <span className="text-white/90">Projects</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-[800] tracking-[-.02em] leading-[1.08] mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Browse our recent HVAC projects across San Mateo County. From heat
              pump conversions to AC installations, see the quality work we
              deliver.
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

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                className="group bg-light-bg rounded-[18px] overflow-hidden border border-border-light hover:shadow-lg hover:border-orange/20 transition-all duration-300"
              >
                {/* Cover image (placeholder) */}
                <div className="aspect-[16/10] bg-border-lighter relative overflow-hidden">
                  <Image
                    src={placeholderImage(
                      project.category === "heat-pumps"
                        ? "heat-pump,hvac,installation"
                        : project.category === "air-conditioning"
                          ? "air-conditioner,ac-unit,install"
                          : "water-heater,plumbing,tankless",
                      {
                        w: 800,
                        h: 500,
                        seed: `proj-${project.slug}`,
                      }
                    )}
                    alt={`${project.title} (placeholder)`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-[700] bg-white/95 backdrop-blur text-navy px-3 py-1 rounded-full">
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-[600] bg-navy/85 backdrop-blur text-white px-3 py-1 rounded-full">
                      {project.completedAt}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-text-muted text-[13px] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </div>
                  <h3 className="text-lg font-[700] text-text-dark mb-2 group-hover:text-orange transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-[14px] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-orange section-padding">
        <div className="container-site text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-[800] tracking-[-.02em] text-white leading-[1.15] mb-4">
            Ready for Your HVAC Project?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Whether you need a new installation or a system upgrade, our team is
            ready to deliver quality work for your home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px] border border-white/30"
            >
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
