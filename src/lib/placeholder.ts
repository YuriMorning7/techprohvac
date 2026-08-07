/**
 * Placeholder image helper.
 *
 * Returns a placehold.co URL styled with the brand palette and a label
 * that describes what the final image should be. The `keywords` string
 * doubles as the visible label (first tag is capitalized as the title
 * so cards read "Heat Pump", "Air Conditioner", etc.).
 *
 * These are intentionally obvious placeholders so it's clear during
 * design review what asset belongs where. Swap the callsite for a
 * real image URL (or CMS field) when the client provides final assets.
 */
export function placeholderImage(
  keywords: string,
  opts: { w?: number; h?: number; seed?: string | number } = {}
): string {
  const { w = 800, h = 600 } = opts;
  const label = keywords
    .split(",")[0]
    .trim()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  // Navy background, orange text — matches --color-navy and --color-orange.
  const bg = "13294B";
  const fg = "F15A29";
  const text = encodeURIComponent(label);
  return `https://placehold.co/${w}x${h}/${bg}/${fg}/png?text=${text}&font=oswald`;
}
