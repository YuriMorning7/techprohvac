import { GTM_ID } from "@/lib/analytics";

// GTM's noscript iframe fallback — fires once per pageview for users who
// disable JavaScript. Google requires it to be the first child of <body>
// for full coverage; the Script in GoogleAnalytics.tsx handles everyone else.
export default function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
