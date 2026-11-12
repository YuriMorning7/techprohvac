import Script from "next/script";
import { GA4_ID } from "@/lib/analytics";

// Loaded site-wide from the root layout. No-op unless NEXT_PUBLIC_GA4_ID is
// set in the environment, so dev + preview deployments stay clean and the
// property only starts counting when the user plugs their real GA4 ID in.
export default function GoogleAnalytics() {
  if (!GA4_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
