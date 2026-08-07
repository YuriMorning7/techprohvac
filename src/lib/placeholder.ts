/**
 * Placeholder image helper.
 *
 * Returns a Loremflickr URL that serves a real photo matching the given
 * comma-separated keywords. Pass a `seed` to get a stable image for a
 * given content slot (so the same product/project always shows the same
 * photo across renders).
 *
 * All output is honest placeholder content — swap the callsite for a
 * real asset (or CMS field) when the client provides final imagery.
 */
export function placeholderImage(
  keywords: string,
  opts: { w?: number; h?: number; seed?: string | number } = {}
): string {
  const { w = 800, h = 600, seed } = opts;
  const tags = keywords
    .split(",")
    .map((s) => encodeURIComponent(s.trim()))
    .filter(Boolean)
    .join(",");
  const lockParam =
    seed !== undefined ? `?lock=${encodeURIComponent(String(seed))}` : "";
  return `https://loremflickr.com/${w}/${h}/${tags}${lockParam}`;
}
