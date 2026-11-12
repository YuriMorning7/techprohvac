import Script from "next/script";
import {
  GTM_ID,
  GA4_ID,
  GOOGLE_ADS_ID,
  CHATGPT_PIXEL_SRC,
} from "@/lib/analytics";

// Site-wide analytics boot. Every destination is behind its own env var, so
// nothing fires on preview / dev until you plug the ID in on Vercel:
//
//   NEXT_PUBLIC_GTM_ID             Google Tag Manager container (GTM-XXXXXXX)
//   NEXT_PUBLIC_GA4_ID             GA4 property  (G-XXXXXXXXXX)
//   NEXT_PUBLIC_GOOGLE_ADS_ID      Google Ads     (AW-XXXXXXXXXX)
//   NEXT_PUBLIC_CHATGPT_PIXEL_SRC  ChatGPT Ads pixel URL (from the
//                                  "Set up data source" dialog in Ads Manager)
//
// If GTM is on, prefer it — put GA4, Google Ads, and any paid-media pixels
// inside the container and manage them from there instead of adding more
// code. Direct GA4 / Ads scripts stay available for users who skip GTM.

export default function GoogleAnalytics() {
  const anyEnabled = GTM_ID || GA4_ID || GOOGLE_ADS_ID || CHATGPT_PIXEL_SRC;
  if (!anyEnabled) return null;

  return (
    <>
      {/* Google Tag Manager — single container for GA4, Google Ads,
          ChatGPT Ads, Meta Pixel, LinkedIn Insight, and anything else you
          want to add later without a code change. */}
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {/* Direct gtag.js — fallback for GA4 + Google Ads when GTM is not
          used, and also fine to run alongside GTM for people who prefer a
          dual setup. gtag() is cheap and idempotent. */}
      {(GA4_ID || GOOGLE_ADS_ID) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID || GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${GA4_ID ? `gtag('config', '${GA4_ID}', { anonymize_ip: true });` : ""}
              ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
            `}
          </Script>
        </>
      )}

      {/* ChatGPT Ads Manager — initial pageview ping when OpenAI's data
          source gave you a hosted script URL. Conversion pings for
          individual events are sent through analytics.ts instead. */}
      {CHATGPT_PIXEL_SRC && (
        <Script
          src={CHATGPT_PIXEL_SRC}
          strategy="afterInteractive"
          data-pixel="chatgpt-ads"
        />
      )}
    </>
  );
}
