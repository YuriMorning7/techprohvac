import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Recent HVAC installations, retrofits, and system upgrades TechPro Heating & Cooling has completed across San Mateo County.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
