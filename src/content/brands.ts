// Brand directory shown on /brands. Blurbs stay factual and generic — we
// state what each brand is known for and whether TechPro installs it
// regularly. We never claim a certification tier (e.g. "Diamond Elite",
// "Factory Authorized Dealer") unless the business actually holds it.

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  bestFor: string[];
};

export const BRANDS: Brand[] = [
  {
    slug: "mitsubishi",
    name: "Mitsubishi Electric",
    tagline: "Mini-split + hyper-heat specialists",
    about:
      "Mitsubishi Electric is the global leader in ductless mini-split heat pumps and one of the few manufacturers whose Hyper-Heat lineup is rated to keep delivering full capacity down to 5 °F — essentially unheard of on the Peninsula, which means the system never has to lean on backup heat. Their indoor units are quiet, slim, and multi-zone configurable, and we install them most often for whole-home electrification jobs.",
    bestFor: [
      "Ductless retrofits (older homes without ducts)",
      "Room-by-room comfort control",
      "Garage / ADU / addition conditioning",
      "Cold-climate / high-efficiency heat pumps",
    ],
  },
  {
    slug: "bryant",
    name: "Bryant",
    tagline: "High-efficiency ducted heat pumps and furnaces",
    about:
      "Bryant is our most-installed ducted brand. Their Evolution and Preferred series heat pumps, furnaces, and air conditioners cover every budget tier from mid-range to premium, and their 24-volt communicating controls pair well with Housecall Pro diagnostics. Bryant and Carrier share the same parent company and most of their internal components, so parts availability is excellent across San Mateo County.",
    bestFor: [
      "Central ducted replacements",
      "Gas-to-heat-pump conversions",
      "Variable-speed systems for larger homes",
      "Single-stage AC replacements",
    ],
  },
  {
    slug: "carrier",
    name: "Carrier",
    tagline: "Premium ducted systems with Infinity controls",
    about:
      "Carrier pioneered modern air conditioning in 1902 and their Infinity series remains one of the most refined variable-speed systems on the market. We install Carrier when homeowners want the top-tier sound ratings, ultra-fine humidity control, or need a specific SEER2 rating to qualify for a utility rebate. Shares a parts platform with Bryant.",
    bestFor: [
      "Premium quiet operation",
      "Multi-stage / variable-speed systems",
      "Humidity-sensitive applications",
      "Rebate-driven replacements",
    ],
  },
  {
    slug: "daikin",
    name: "Daikin",
    tagline: "Variable refrigerant flow and inverter heat pumps",
    about:
      "Daikin is the largest HVAC manufacturer in the world and their inverter-driven heat pumps are among the most efficient on the market. Their Fit and Aurora lines are compact ducted heat pumps that fit in tight Peninsula side-yards where a full-size condenser won't. We install Daikin for multi-zone and compact-footprint jobs.",
    bestFor: [
      "Compact side-yard installs",
      "High-SEER2 / high-HSPF2 requirements",
      "Multi-zone ducted systems",
      "Light-commercial applications",
    ],
  },
  {
    slug: "rheem",
    name: "Rheem",
    tagline: "Water heaters and reliable HVAC",
    about:
      "Rheem is our go-to for water heaters — both standard gas and electric tanks and their ProTerra heat-pump water heaters, which qualify for both federal and BayREN incentives. Their tankless and HVAC lines round out their portfolio for budget-conscious whole-home jobs.",
    bestFor: [
      "Tank water heater replacements",
      "Heat-pump water heaters",
      "Tankless water heaters",
      "Budget-friendly HVAC replacements",
    ],
  },
  {
    slug: "lennox",
    name: "Lennox",
    tagline: "High-efficiency ducted and heat-pump systems",
    about:
      "Lennox manufactures some of the highest-efficiency residential systems available. Their Signature Collection reaches SEER2 ratings that unlock the top tier of PCE and federal rebates. We install Lennox when a homeowner is optimizing specifically for efficiency and long-term operating cost.",
    bestFor: [
      "Maximum-efficiency installs",
      "Top-tier rebate qualification",
      "Long-run operating cost optimization",
    ],
  },
  {
    slug: "trane",
    name: "Trane",
    tagline: "Commercial-grade residential durability",
    about:
      "Trane's reputation is built on durability — their residential condensers are often spec'd like light-commercial units. We install Trane when a customer prioritizes expected service life and cold-weather reliability over sticker price.",
    bestFor: [
      "Long-service-life installations",
      "Light-commercial residential (duplexes, small multi-unit)",
      "High-reliability requirements",
    ],
  },
];
