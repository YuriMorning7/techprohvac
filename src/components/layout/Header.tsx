"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { PHONE, PHONE_HREF, BOOKING_URL } from "@/lib/constants";

type NavChild = { label: string; href: string; description?: string; badge?: string };
type NavItem = { label: string; href: string; badge?: string; children?: NavChild[] };

// Top-level nav is deliberately 5 items. Everything deeper lives inside
// hover dropdowns, so the bar breathes instead of competing with the logo
// + CTAs for horizontal space.
// Dropdowns only carry children when each child routes somewhere distinct.
// Services previously had three children (Install / Repair / Maintenance) that
// all pointed at /#services — pure redundancy. Collapsed to a plain top-level
// link. Equipment items deep-link to the /blog type filter, matching the
// homepage product tiles so the nav and the hero both lead somewhere real.
const navItems: NavItem[] = [
  { label: "Services", href: "/#services" },
  {
    label: "Equipment",
    href: "/#products",
    children: [
      { label: "Heat Pumps", href: "/blog?type=Heat%20Pump", description: "37 recent installs across the county" },
      { label: "Mini-Split Systems", href: "/blog?type=Mini%20Split", description: "20 installs — room-by-room, no ducts" },
      { label: "Gas Furnaces", href: "/blog?type=Furnace", description: "High-efficiency gas heat" },
      { label: "Air Conditioners", href: "/blog?type=Air%20Conditioner", description: "Central cooling for ducted homes" },
      { label: "Ductwork", href: "/blog?type=Ductwork", description: "New builds and replacements" },
      { label: "Water Heaters", href: "/contact", description: "Tank, tankless, and heat-pump — ask us" },
    ],
  },
  {
    label: "Our Work",
    href: "/blog",
    children: [
      { label: "Recent Projects", href: "/blog", description: "72 real 2026 installs across the county" },
      { label: "Service Areas", href: "/service-areas", description: "22 cities we cover across San Mateo County" },
      { label: "Brands We Install", href: "/brands", description: "Mitsubishi, Bryant, Carrier and more" },
    ],
  },
  // Instant Estimate temporarily hidden pending client approval. The /estimate
  // page still resolves (so pasted links don't 404) but it's absent from every
  // navigation surface. Restore by adding back a NavItem with href: "/estimate".
  { label: "Contact", href: "/contact" },
];

/* --------------------------------------------------------------------- */
/*   Desktop hover-dropdown item                                         */
/* --------------------------------------------------------------------- */
function DesktopNavItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="relative inline-flex items-center gap-1.5 px-1 h-[40px] text-[15px] font-[500] text-white hover:text-orange transition-colors whitespace-nowrap"
      >
        {item.label}
        {item.badge && (
          <span className="inline-flex items-center h-[18px] px-1.5 rounded-full bg-orange text-white text-[9.5px] font-[800] tracking-[.1em] uppercase">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 px-1 h-[40px] text-[15px] font-[500] text-white hover:text-orange transition-colors whitespace-nowrap"
      >
        {item.label}
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
          strokeWidth={2.5}
        />
      </Link>

      {/* Hover hit-strip — bridges the gap between the trigger and the
          panel so the dropdown does not close when the mouse crosses it. */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-56 h-3 pointer-events-auto opacity-0 group-hover:opacity-100" />

      <div
        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[320px] opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200"
        role="menu"
      >
        <div className="bg-white rounded-[16px] border border-border-light shadow-[0_20px_50px_-12px_rgba(10,19,41,0.25)] overflow-hidden">
          <ul className="py-2">
            {item.children.map((child) => (
              <li key={child.label}>
                <Link
                  href={child.href}
                  role="menuitem"
                  className="group/row flex items-start gap-3 px-4 py-2.5 hover:bg-light-bg transition-colors"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange shrink-0 opacity-50 group-hover/row:opacity-100 transition-opacity" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-[700] text-navy group-hover/row:text-orange transition-colors">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="block text-[12px] text-text-muted mt-0.5 leading-snug">
                        {child.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/*   Mobile drawer item (keeps flat list, no nested accordion needed)    */
/* --------------------------------------------------------------------- */
// Flattened for the drawer so every leaf page is still one tap away.
const mobileLinks: { label: string; href: string; badge?: string }[] = [
  { label: "Services", href: "/#services" },
  { label: "Equipment", href: "/#products" },
  { label: "Recent Projects", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 bg-[#182849] h-[72px] xl:h-[88px]">
      <div className="container-site h-full flex items-center justify-between gap-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/Techpro_logo.png"
            alt="TechPro Heating & Cooling"
            width={1192}
            height={1193}
            priority
            sizes="64px"
            className="h-[56px] lg:h-[60px] xl:h-[64px] w-auto shrink-0 object-contain"
          />
          <div className="flex flex-col items-start">
            <span className="text-[19px] lg:text-[22px] xl:text-[25px] font-[900] text-white leading-none tracking-tight">
              TECHPRO
            </span>
            <span className="text-[10.5px] lg:text-[12px] xl:text-[13px] font-[600] text-orange leading-none mt-[5px] xl:mt-[6px] self-stretch flex justify-between">
              <span>H</span><span>e</span><span>a</span><span>t</span><span>i</span><span>n</span><span>g</span><span>&nbsp;&amp;&nbsp;</span><span>C</span><span>o</span><span>o</span><span>l</span><span>i</span><span>n</span><span>g</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav — 5 top-level items with breathable gaps */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-10">
          {navItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Right Actions — pill-shaped to match the modern Nur style */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2.5 h-[48px] px-5 2xl:px-6 rounded-full border border-orange/70 text-white text-[14.5px] 2xl:text-[15.5px] font-[600] whitespace-nowrap hover:border-orange hover:bg-orange/10 transition-colors"
          >
            <Phone className="w-[16px] h-[16px] text-orange shrink-0" strokeWidth={2.4} />
            {PHONE}
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[48px] px-6 2xl:px-7 bg-orange hover:bg-orange-hover rounded-full text-white text-[14.5px] 2xl:text-[15.5px] font-[700] whitespace-nowrap transition-colors shadow-[0_10px_28px_-10px_rgba(241,90,41,0.55)]"
          >
            <CalendarCheck className="w-[16px] h-[16px] shrink-0" strokeWidth={2.4} />
            Schedule Online
          </a>
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
                mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
                mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile/Tablet Drawer */}
      <div
        id="mobile-drawer"
        className={`xl:hidden fixed inset-0 top-[72px] z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={`relative bg-[#182849] w-[86vw] max-w-[340px] h-full ml-auto flex flex-col overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="px-6 pt-6 pb-4">
            <p className="text-[11px] font-[800] text-orange tracking-[.18em] uppercase">
              Menu
            </p>
          </div>

          <div className="flex-1 pb-4">
            {mobileLinks.map((link) => {
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
                        isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                      }`}
                      aria-hidden="true"
                    />
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center h-[18px] px-1.5 rounded-full bg-orange text-white text-[9.5px] font-[800] tracking-[.1em] uppercase">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-white/40 group-hover:text-orange group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          <div className="px-6 py-5 border-t border-white/10 space-y-3 bg-[#131e3b]">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2.5 h-[50px] rounded-full border border-orange/70 text-white text-[15px] font-[600] hover:bg-orange/10 transition-colors"
            >
              <Phone className="w-[16px] h-[16px] text-orange" strokeWidth={2.4} />
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 h-[50px] bg-orange hover:bg-orange-hover rounded-full text-white text-[15px] font-[700] transition-colors shadow-[0_6px_18px_rgba(223,99,57,0.35)]"
            >
              <CalendarCheck className="w-[16px] h-[16px]" strokeWidth={2.4} />
              Schedule Online
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
