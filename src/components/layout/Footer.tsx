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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-[38px] h-[38px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[38px] h-[38px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="https://yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yelp"
                className="w-[38px] h-[38px] rounded-[9px] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 011.88 2.791 1.072 1.072 0 01-.21 1.92zM14.229 15.39l3.252 3.967c.58.703-.104 1.736-.978 1.472a9.196 9.196 0 01-3.072-1.635 1.072 1.072 0 01-.118-1.602l.916-2.202zM12.142 9.862L6.852 2.544c-.48-.665.188-1.552.988-1.31 2.375.717 4.404 2.143 5.776 4.08.372.526.106 1.256-.488 1.492l-1.986 1.056v2zM10.834 14.168l-1.834 4.768c-.325.843-1.52.838-1.778-.026a9.192 9.192 0 01-.244-3.468 1.072 1.072 0 01.965-.944l2.891.33v-.66zM9.73 11.516l-5.194-.748c-.94-.136-1.142-1.408-.288-1.882a9.19 9.19 0 013.24-1.272 1.072 1.072 0 011.17.754l1.072 3.148z" />
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
