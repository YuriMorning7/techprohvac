import { cities } from "@/content/cities";
import { projects, type Project } from "@/content/projects";

// Projects by slug — O(1) lookup.
const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return projectBySlug.get(slug);
}

// Related projects: same type first, then same city, cap at `limit`.
// Keeps results deterministic by preserving the source array order.
export function getRelated(current: Project, limit = 3): Project[] {
  const seen = new Set<string>([current.slug]);
  const out: Project[] = [];
  const push = (p: Project) => {
    if (!seen.has(p.slug) && out.length < limit) {
      seen.add(p.slug);
      out.push(p);
    }
  };
  // Same type + same city
  projects.forEach((p) => {
    if (p.installationType === current.installationType && p.city === current.city) push(p);
  });
  // Same type, any city
  projects.forEach((p) => {
    if (p.installationType === current.installationType) push(p);
  });
  // Same city, any type
  projects.forEach((p) => {
    if (p.city === current.city) push(p);
  });
  return out;
}

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getProjectsForCity(slug: string): Project[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.projectSlugs
    .map((s) => projectBySlug.get(s))
    .filter((p): p is Project => Boolean(p));
}

export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}
