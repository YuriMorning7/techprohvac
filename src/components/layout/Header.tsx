"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy h-[--header-height]">
      <div className="container-site h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo-mark.png"
            alt="TechPro"
            width={46}
            height={46}
            className="rounded-[10px]"
          />
          <div className="flex flex-col">
            <span className="text-[17px] font-[800] text-white tracking-[.07em] leading-none">
              TECHPRO
            </span>
            <span className="text-[9px] font-[600] text-orange tracking-[.19em] leading-none mt-0.5">
              HEATING &amp; COOLING
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14.5px] font-[500] text-white/88 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 h-[46px] px-5 border-[1.5px] border-white/35 rounded-[10px] text-white text-[14.5px] font-[600] hover:border-white/60 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
          <Link
            href="/contact"
            className="flex items-center h-[46px] px-6 bg-orange rounded-[10px] text-white text-[14.5px] font-[700] hover:bg-orange-hover transition-colors"
          >
            Schedule Online
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="lg:hidden text-white p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[--header-height] z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative bg-navy w-[300px] h-full ml-auto p-6 flex flex-col gap-1 overflow-y-auto shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[16px] font-[500] text-white/88 hover:text-white py-3 border-b border-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 h-[48px] border-[1.5px] border-white/35 rounded-[10px] text-white text-[15px] font-[600]"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-[48px] bg-orange rounded-[10px] text-white text-[15px] font-[700]"
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
