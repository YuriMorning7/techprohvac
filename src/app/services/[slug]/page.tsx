import { permanentRedirect } from "next/navigation";

// All service detail URLs are hidden for now and bounce to the Services
// section on the home page. The route is intentionally kept (not deleted)
// so Google — which may still have /services/<slug> URLs in its index —
// hits a real 308 and updates search results. Restore the full detail page
// implementation from git history when the client is ready to re-enable it.

export const dynamic = "force-static";
export const dynamicParams = true;

export default function ServiceSlugRedirect() {
  permanentRedirect("/#services");
}
