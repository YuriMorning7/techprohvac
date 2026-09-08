import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TechPro Heating & Cooling for a free estimate, to schedule service, or for any questions about your heating and cooling needs. Call (650) 275-6357.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
