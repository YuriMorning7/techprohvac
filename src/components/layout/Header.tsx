"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
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
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

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
          className="xl:hidden w-[44px] h-[44px] flex items-center justify-center rounded-[12px] bg-white/[0.08] border border-white/10 text-white hover:bg-white/[0.14] active:scale-95 transition-all shrink-0 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
        >
          <span className="relative w-5 h-5 block">
            <Menu
              className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
                mobileOpen
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
                mobileOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile/Tablet Drawer */}
      <div
        id="mobile-drawer"
        className={`xl:hidden fixed inset-0 top-[72px] z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Scrim */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <nav
          className={`relative bg-[#182849] w-[86vw] max-w-[340px] h-full ml-auto flex flex-col overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          {/* Drawer label */}
          <div className="px-6 pt-6 pb-4">
            <p className="text-[11px] font-[800] text-orange tracking-[.18em] uppercase">
              Menu
            </p>
          </div>

          {/* Nav links */}
          <div className="flex-1 pb-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href !== "/" &&
                  !link.href.startsWith("/#") &&
                  pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between gap-3 px-6 py-3.5 text-[17px] font-[600] transition-colors ${
                    isActive
                      ? "text-white bg-white/[0.05]"
                      : "text-white/85 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-[3px] h-6 rounded-full bg-orange transition-transform duration-200 origin-center ${
                        isActive
                          ? "scale-y-100"
                          : "scale-y-0 group-hover:scale-y-100"
                      }`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-white/40 group-hover:text-orange group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA cluster */}
          <div className="px-6 py-5 border-t border-white/10 space-y-3 bg-[#131e3b]">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2.5 h-[50px] border border-white/25 rounded-[12px] text-white text-[15px] font-[600] hover:bg-white/[0.06] transition-colors"
            >
              <Phone className="w-[18px] h-[18px]" />
              {PHONE}
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-[50px] bg-[#DF6339] hover:bg-[#c8562f] rounded-[12px] text-white text-[15px] font-[700] transition-colors shadow-[0_6px_18px_rgba(223,99,57,0.35)]"
            >
              Schedule Online
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
