import Link from "next/link";
import { Home, ArrowRight, Phone, Search } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="bg-white min-h-[calc(100vh-var(--header-height))] flex items-center">
      <div className="container-site py-20 text-center">
        {/* 404 number */}
        <div className="relative mb-8">
          <span className="text-[clamp(120px,20vw,200px)] font-[800] text-light-bg leading-none select-none">
            404
          </span>
        </div>

        <h1 className="text-[clamp(28px,3.5vw,44px)] font-[800] tracking-[-.02em] text-navy leading-[1.15] mb-4">
          Page Not Found
        </h1>
        <p className="text-text-muted text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
          Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover text-white font-[700] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
          >
            View Services
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 bg-light-bg hover:bg-border-light text-text-dark font-[600] px-7 py-3.5 rounded-[12px] transition-colors text-[15px]"
          >
            <Phone className="w-4 h-4" />
            Call {PHONE}
          </Link>
        </div>

        {/* Quick Links */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-[15px] font-[700] text-text-dark mb-4">
            Popular Pages
          </h2>
          <div className="grid grid-cols-2 gap-3 text-left">
            {[
              { label: "HVAC Services", href: "/services" },
              { label: "Products & Equipment", href: "/products" },
              {
                label: "Heat Pump Installation",
                href: "/services/heat-pump-installation",
              },
              { label: "AC Repair", href: "/services/ac-repair" },
              { label: "Our Projects", href: "/projects" },
              { label: "Contact Us", href: "/contact" },
              { label: "About TechPro", href: "/about" },
              {
                label: "Furnace Maintenance",
                href: "/services/furnace-maintenance",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-[14px] text-text-muted hover:text-orange transition-colors py-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
