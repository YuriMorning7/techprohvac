import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse HVAC products and equipment installed and serviced by TechPro — heat pumps, mini-splits, water heaters, ductwork, gas furnaces, air conditioners, indoor air quality, and packaged units.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
