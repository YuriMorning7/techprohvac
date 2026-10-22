import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// All /services/<anything> and /products/<anything> URLs are hidden for now.
// Proxy runs before SSG/route resolution, so pre-rendered detail pages
// (/services/heat-pump-installation, etc.) are intercepted and 308-redirected
// to the home-page section anchor.
// Index-level redirects (/services, /products, /about, /projects) are
// handled by `redirects()` in next.config.ts.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/services/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = "services";
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/products/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = "products";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Only run proxy on these paths — faster than running on every request.
  matcher: ["/services/:path*", "/products/:path*"],
};
