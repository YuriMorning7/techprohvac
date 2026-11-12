// Map installation types to placeholder equipment photos from /public/images.
// Used as the hero image on project cards until the client clears real on-site
// job photos for publication.

const TYPE_TO_IMAGE: Record<string, string> = {
  "Heat Pump": "/images/Heat pumps.jpeg",
  "Mini Split": "/images/Mini Split System.jpeg",
  "Furnace": "/images/Gas furnaces.jpeg",
  "Air Conditioner": "/images/Air conditioners.jpeg",
  "Ductwork": "/images/Ductwork.jpeg",
  "Water Heater": "/images/Water Heaters.jpeg",
  "Indoor Air Quality": "/images/Indoor air quality.jpeg",
  "Packaged Unit": "/images/Packaged units.jpeg",
};

// Wall Heater and plain "HVAC" fall back to Heat Pumps — the closest visual match.
export function imageForInstallationType(type: string): string {
  return TYPE_TO_IMAGE[type] || "/images/Heat pumps.jpeg";
}

// Tinted background per type, to give each card a bit of color variation.
export function tintForInstallationType(type: string): string {
  switch (type) {
    case "Heat Pump": return "bg-sky-50";
    case "Mini Split": return "bg-emerald-50";
    case "Furnace": return "bg-orange-50";
    case "Air Conditioner": return "bg-indigo-50";
    case "Ductwork": return "bg-slate-50";
    case "Water Heater": return "bg-amber-50";
    case "Indoor Air Quality": return "bg-teal-50";
    default: return "bg-neutral-50";
  }
}
