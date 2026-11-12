// Homepage FAQ content. Rendered as an accordion + wired into FAQPage
// JSON-LD so Google can surface these as a rich result ("People also ask"
// style) on search.
//
// Edit answers freely — they are generic HVAC/local-business answers that
// hold true for TechPro; swap in company-specific copy whenever available.

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What areas do you serve?",
    answer:
      "TechPro Heating & Cooling is based in San Carlos and serves 20+ cities across San Mateo County — including San Mateo, Belmont, Redwood City, Menlo Park, Palo Alto, Burlingame, Hillsborough, Foster City, Daly City, South San Francisco, San Bruno, Millbrae, Half Moon Bay, Pacifica, Woodside, Atherton and Portola Valley. Call us for ZIP-code confirmation.",
  },
  {
    question: "Do you offer free estimates on installations?",
    answer:
      "Yes. For heat pump, mini-split, furnace, air conditioner and water heater installations we provide free in-home estimates with transparent pricing. Scheduling takes about a minute online, or call (650) 275-6357 and we will arrange a visit at a time that works for you.",
  },
  {
    question: "How long does a typical heat pump installation take?",
    answer:
      "Most residential heat pump installations are completed in a single day, including removing the old system, setting the outdoor condenser, running line sets, wiring the indoor unit, and commissioning. Larger homes or jobs that include new ductwork can take 2–3 days. Your estimate will include a specific timeline.",
  },
  {
    question: "Can you help with rebates and financing?",
    answer:
      "Absolutely. We handle paperwork for Peninsula Clean Energy (PCE) rebates, BayREN incentives, federal heat pump tax credits, and manufacturer promotions. Our office team files on your behalf and coordinates financing through programs such as the WestLight Heat Pump Loan — so you do not have to chase forms.",
  },
  {
    question: "What HVAC brands do you install and service?",
    answer:
      "We install Mitsubishi, Bryant, Carrier, Daikin, Rheem, Lennox, and Trane equipment on a regular basis and service most other major brands. If you have a specific preference or have been recommended a particular model, we can source and install it.",
  },
  {
    question: "Do you offer 24/7 emergency service?",
    answer:
      "Yes. We maintain a 24/7 answering service for emergency heating and cooling issues. Same-day response is available for most urgent calls during business hours (Monday–Friday, 8 AM – 4 PM) and after-hours callouts are dispatched as fast as technician availability allows.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "TechPro Heating & Cooling is a fully licensed, bonded, and insured California HVAC contractor (CSLB #860715). Every technician is background-checked and continuously trained on current code and manufacturer specifications.",
  },
  {
    question: "What is the difference between a heat pump and a traditional furnace?",
    answer:
      "A heat pump both heats and cools your home from a single outdoor unit, running on electricity and achieving 2–4× the efficiency of combustion heating. A gas furnace only heats, using natural gas. In the Bay Area climate, modern heat pumps are typically the most efficient and cost-effective choice for new installations, and most PCE / BayREN / federal rebate programs are structured to reward switching to a heat pump.",
  },
];
