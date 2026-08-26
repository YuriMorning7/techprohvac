import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import {
  SITE_NAME,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  CITY_STATE_ZIP,
  LICENSE,
  OFFICE_HOURS,
  EMERGENCY_HOURS,
} from "@/lib/constants";

const serviceLinks = [
  { label: "AC Repair", href: "/services/ac-repair" },
  { label: "Heating Repair", href: "/services/heating-repair" },
  { label: "Installation", href: "/services/installation" },
  { label: "Maintenance", href: "/services/maintenance" },
  { label: "Duct Services", href: "/services/duct-services" },
  { label: "Indoor Air Quality", href: "/services/indoor-air-quality" },
];

const productLinks = [
  { label: "Air Conditioners", href: "/products/air-conditioners" },
  { label: "Furnaces", href: "/products/furnaces" },
  { label: "Heat Pumps", href: "/products/heat-pumps" },
  { label: "Ductless Mini-Splits", href: "/products/mini-splits" },
  { label: "Thermostats", href: "/products/thermostats" },
  { label: "Air Purifiers", href: "/products/air-purifiers" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/Techpro_logo.png"
                alt="TechPro"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-[15px] font-[800] text-white tracking-[.07em] leading-none">
                  TECHPRO
                </span>
                <span className="text-[8px] font-[600] text-orange tracking-[.19em] leading-none mt-0.5">
                  HEATING &amp; COOLING
                </span>
              </div>
            </Link>
            <p className="text-[14px] text-white/60 leading-relaxed mb-5 max-w-[240px]">
              Family-owned heating and cooling for San Mateo County since 2005.
            </p>
            <div className="space-y-2.5">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-[15px] text-white/78 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange" />
                {PHONE}
              </a>
              <div className="flex items-start gap-2 text-[14px] text-white/60">
                <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <span>
                  {ADDRESS}
                  <br />
                  {CITY_STATE_ZIP}
                </span>
              </div>
              <p className="text-[13px] text-white/40">{LICENSE}</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[12.5px] font-[700] text-orange tracking-[.13em] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/78 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[12.5px] font-[700] text-orange tracking-[.13em] uppercase mb-5">
              Products
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/78 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[12.5px] font-[700] text-orange tracking-[.13em] uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/78 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Social */}
          <div>
            <h4 className="text-[12.5px] font-[700] text-orange tracking-[.13em] uppercase mb-5">
              Hours
            </h4>
            <div className="space-y-2 mb-6">
              <p className="text-[14px] text-white/78">{OFFICE_HOURS}</p>
              <p className="text-[14px] text-white/60">{EMERGENCY_HOURS}</p>
            </div>

            <h4 className="text-[12.5px] font-[700] text-orange tracking-[.13em] uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/techproheatingcooling"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-[44px] h-[44px] rounded-[10px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/techpro-builders/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[44px] h-[44px] rounded-[10px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13.5px] text-white/45">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[13.5px] text-white/45 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[13.5px] text-white/45 hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="text-[13.5px] text-white/45 hover:text-white/70 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
