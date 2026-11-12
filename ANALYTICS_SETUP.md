# Analytics & Conversion Tracking — Setup Guide

This site is wired to report conversions to **Google Tag Manager**, **GA4**,
**Google Ads**, and **ChatGPT Ads Manager (Beta)**. Each destination is
behind its own environment variable — turn on only the ones you use.

> **TL;DR** — copy `.env.local.example` to `.env.local`, fill in the IDs you
> have, redeploy. Nothing else to touch in code.

---

## What already fires automatically

Four events fire on every live page the moment you plug in an ID:

| Event              | Trigger                                                |
| ------------------ | ------------------------------------------------------ |
| `call_click`       | Any `tel:` link (header, hero, sticky bar, blog, CTA)  |
| `sms_click`        | Any `sms:` link (sticky mobile bar)                    |
| `booking_click`    | Any link to `book.housecallpro.com` (Schedule Online)  |
| `estimate_submit`  | User completes all 5 wizard steps on `/estimate`       |

Plus non-conversion signals: `estimate_start`, `estimate_step`,
`map_pin_click`, `review_platform_click`, `faq_open`.

All four conversion events are also sent to Google Ads (if configured) and
to ChatGPT Ads (if configured).

---

## Option A — Google Tag Manager (recommended)

One container, every tag lives inside it. Switch ad platforms later without
touching code.

1. Go to <https://tagmanager.google.com> → create a container for
   `techprohvac.com` → pick **Web**.
2. Copy the container ID at the top (looks like `GTM-ABC1234`).
3. On Vercel → Project Settings → Environment Variables, set:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-ABC1234
   ```
4. Redeploy. Confirm with the **Google Tag Assistant** Chrome extension.
5. Inside GTM, add:
   - **GA4 Configuration tag** — fires on *All Pages*, Measurement ID = your
     `G-XXXXXXXXXX`.
   - **GA4 Event tags** for `call_click`, `sms_click`, `booking_click`,
     `estimate_submit`, each triggered by a **Custom Event** trigger named
     identically. (Our dataLayer already pushes these — GTM picks them up.)
   - For Google Ads: **Conversion Linker** + one **Conversion Tracking**
     tag per conversion event with its AW-ID + label.
   - For ChatGPT Ads: add OpenAI's tag template or the **Custom HTML** tag
     with the snippet OpenAI gives you under "Set up data source".

---

## Option B — Direct GA4 (no GTM)

Faster if you only want pageview + event data in GA4.

1. Analytics → Admin → **Data Streams** → **Web** → copy the Measurement ID
   (looks like `G-ABC1234567`).
2. Set on Vercel:
   ```
   NEXT_PUBLIC_GA4_ID=G-ABC1234567
   ```
3. Redeploy. Events appear in **Reports → Realtime** within ~30 seconds.

GA4 `page_view` is automatic. The four conversion events listed above
also appear in GA4 — go to **Admin → Events** and toggle them as
**Mark as conversion** so they count for goals.

---

## Option C — Google Ads conversions

If you run paid search, you want conversions to land in Google Ads so the
bidder can optimise for them.

1. Google Ads → **Tools → Conversions → + New conversion action → Website**.
2. Create one action per event you care about (recommended: `Book Online`,
   `Call Click`, `Estimate Submit`).
3. For each, choose **Install the tag yourself**. On the snippet shown,
   you want two things:
   - The account ID — `AW-XXXXXXXXXX` (same for every action).
   - The label — the string after the `/` in `send_to: 'AW-xxx/LABEL'`.
4. Set on Vercel:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABELS=estimate_submit:AbC-D_eFg,booking_click:HiJ-K_lMn,call_click:OpQ-R_sTu
   ```
5. Redeploy. Google Ads marks conversions as **Verified** within ~24 hours
   once real traffic hits them.

---

## Option D — ChatGPT Ads Manager (OpenAI, Beta)

You're already set up — your Ads Manager screenshot shows the
`Techpro Builders inc campaign`. The banner at the top says
**"You haven't set up conversions yet"**.

1. Click **Set up data source** on that banner.
2. Pick **Web pixel** (or whatever OpenAI labels the website tag option).
3. OpenAI gives you two things — copy them both:
   - A **pixel / data source URL**. Looks something like
     `https://ads.openai.com/pixel.js` or
     `https://insights.openai.com/collect` (OpenAI controls the exact
     format; take what they show you).
   - An **advertiser / data source ID** (your account identifier).
4. Set on Vercel:
   ```
   NEXT_PUBLIC_CHATGPT_PIXEL_SRC=<paste the URL from OpenAI>
   NEXT_PUBLIC_CHATGPT_PIXEL_ID=<paste the ID from OpenAI>
   ```
5. Redeploy. Open the site, click **Get my price in 60 seconds**, complete
   the wizard. Back in Ads Manager, the conversion should appear within
   the Beta's refresh window (OpenAI documents this on the setup dialog).

> **If OpenAI gives you a `<script>` tag instead of a URL**, paste only the
> `src="..."` URL into `NEXT_PUBLIC_CHATGPT_PIXEL_SRC`. The `<script>`
> loader in `GoogleAnalytics.tsx` reproduces the rest.

> **If the snippet looks nothing like what the code expects** (for example
> OpenAI ships a `window.oaiTrack('event', {...})` style SDK instead of a
> pixel URL), paste the full snippet into `GoogleAnalytics.tsx` where
> `CHATGPT_PIXEL_SRC` is rendered, and update `sendChatGptConversion()`
> in `src/lib/analytics.ts` to call their SDK method instead of building
> an image beacon. Everything else — the event names, the trigger points —
> stays the same.

---

## How to verify it's working

1. **GA4** — open the site in an incognito window, click Call / Schedule /
   complete the wizard. In GA4 → **Reports → Realtime**, look for the
   event name in the right-hand column within 30 seconds.
2. **GTM** — install [Tag Assistant Companion](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm). It lists every tag that fires per page.
3. **Google Ads** — Tools → Conversions → your conversion row should flip
   from *Unverified* to *Recording conversions* once real traffic flows.
4. **ChatGPT Ads** — the "set up data source" banner disappears once OpenAI
   detects pings. Give it 10-15 minutes after the first real test event.

---

## Privacy / consent

The site currently fires without a cookie banner. US/California traffic is
fine — there's no CCPA opt-in requirement for this category of first-party
analytics. If you later target the EU, add a consent manager and gate the
`Script` tags in `GoogleAnalytics.tsx` on the user's choice. GA4 and
Google Ads both respect `gtag('consent', 'default', {...})` natively.

GA4 is initialized with `anonymize_ip: true` already.
