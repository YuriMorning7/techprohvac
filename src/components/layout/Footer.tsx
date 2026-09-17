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
                alt="TechPro Heating & Cooling"
                width={1192}
                height={1193}
                sizes="56px"
                className="h-[56px] w-auto shrink-0 object-contain"
              />
              <div className="flex flex-col items-start">
                <span className="text-[18px] font-[900] text-white leading-none tracking-tight">
                  TECHPRO
                </span>
                <span className="text-[11px] font-[600] text-orange leading-none mt-[5px] self-stretch flex justify-between">
                  <span>H</span><span>e</span><span>a</span><span>t</span><span>i</span><span>n</span><span>g</span><span>&nbsp;&amp;&nbsp;</span><span>C</span><span>o</span><span>o</span><span>l</span><span>i</span><span>n</span><span>g</span>
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
            <div className="flex gap-1.5">
              <a
                href="https://maps.app.goo.gl/SuPQZ6RdxRUCr3Yx5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="w-[36px] h-[36px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                </svg>
              </a>
              <a
                href="https://www.yelp.com/biz/techpro-builders-san-carlos-6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yelp"
                className="w-[36px] h-[36px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 011.88 2.791 1.072 1.072 0 01-.21 1.92zM14.229 15.39l3.252 3.967c.58.703-.104 1.736-.978 1.472a9.196 9.196 0 01-3.072-1.635 1.072 1.072 0 01-.118-1.602l.916-2.202zM12.142 9.862L6.852 2.544c-.48-.665.188-1.552.988-1.31 2.375.717 4.404 2.143 5.776 4.08.372.526.106 1.256-.488 1.492l-1.986 1.056v2zM10.834 14.168l-1.834 4.768c-.325.843-1.52.838-1.778-.026a9.192 9.192 0 01-.244-3.468 1.072 1.072 0 01.965-.944l2.891.33v-.66zM9.73 11.516l-5.194-.748c-.94-.136-1.142-1.408-.288-1.882a9.19 9.19 0 013.24-1.272 1.072 1.072 0 011.17.754l1.072 3.148z" />
                </svg>
              </a>
              <a
                href="https://nextdoor.com/pages/techpro-builders-belmont-ca/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nextdoor"
                className="w-[36px] h-[36px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.4 8.6c-3.5 0-6.4 2.9-6.4 6.4v6.5H6.3v-6.5c0-2 .8-3.9 2.2-5.3s3.3-2.2 5.3-2.2h.4L12 3.8l3.4-1.3 2.2 5.7c1.6.3 2.9 1.8 2.9 3.5 0 2-1.6 3.6-3.6 3.6v-3.6c0-1.6-1.3-2.9-2.9-2.9-.7 0-1.4.2-1.9.7l3.3.1z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/techproheatingcooling/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-[36px] h-[36px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/techproheatingcooling/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[36px] h-[36px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
