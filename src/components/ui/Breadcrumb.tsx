import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-navy py-4">
      <div className="container-site">
        <ol className="flex items-center gap-2 text-[14px]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-[600]">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
