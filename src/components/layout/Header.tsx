"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#182849] h-[72px] xl:h-[84px]">
      <div className="container-site h-full flex items-center justify-between gap-4">
        {/* Logo — mark + wordmark */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] xl:w-[52px] xl:h-[52px] bg-[#1a2238] rounded-[12px] flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/images/Techpro_logo.png"
              alt="TechPro Heating & Cooling"
              width={44}
              height={44}
              priority
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[19px] lg:text-[22px] xl:text-[25px] font-[900] text-white leading-none tracking-tight">
              TECHPRO
            </span>
            <span className="text-[10px] lg:text-[11px] xl:text-[12px] font-[700] text-orange tracking-[.14em] leading-none mt-[5px] xl:mt-[6px]">
              HEATING &amp; COOLING
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] 2xl:text-[18px] font-normal text-white hover:text-white/80 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 h-[48px] px-5 2xl:px-6 border border-white/25 rounded-lg text-white text-[14.5px] 2xl:text-[15.5px] font-[600] whitespace-nowrap hover:border-white/50 transition-colors"
          >
            <Phone className="w-[18px] h-[18px] shrink-0" />
            {PHONE}
          </a>
          <Link
            href="/contact"
            className="flex items-center h-[48px] px-6 2xl:px-7 bg-[#DF6339] rounded-lg text-white text-[15px] 2xl:text-[16px] font-[700] whitespace-nowrap hover:bg-[#c8562f] transition-colors"
          >
            Schedule Online
          </Link>
        </div>

        {/* Mobile/Tablet Toggle */}
        <button
          type="button"
          className="xl:hidden text-white p-2 cursor-pointer shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-[72px] z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative bg-[#182849] w-[85vw] max-w-[320px] h-full ml-auto p-6 flex flex-col gap-2 overflow-y-auto shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[16px] font-normal text-white/90 hover:text-white py-4 border-b border-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2.5 h-[48px] border border-white/25 rounded-lg text-white text-[15px] font-[600]"
              >
                <Phone className="w-[18px] h-[18px]" />
                {PHONE}
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-[48px] bg-[#DF6339] rounded-lg text-white text-[15px] font-[700]"
              >
                Schedule Online
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}