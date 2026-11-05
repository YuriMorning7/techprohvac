#!/usr/bin/env python3
"""Transform the client's 2026 installation content into clean TS data modules.

Reads from: ~/Downloads/Techpro-2026-Installation-Content/installation-projects.json
Writes to:  src/content/projects.ts, src/content/cities.ts

Removes job numbers, Housecall Pro URLs, and internal review sections.
Generates clean, SEO-friendly slugs with collision handling.
Aggregates projects by city for the Service Areas pages.

Re-run whenever the client sends a new content drop.
"""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

SOURCE = Path.home() / "Downloads" / "Techpro-2026-Installation-Content" / "installation-projects.json"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUT_PROJECTS_TS = PROJECT_ROOT / "src" / "content" / "projects.ts"
OUT_CITIES_TS = PROJECT_ROOT / "src" / "content" / "cities.ts"

# Cities we actually serve (from Footer / nav). Projects in other cities are
# filtered out of /service-areas/[city] but still appear in /blog so the
# content is not wasted.
SERVICE_AREA_CITIES = {
    "San Carlos", "Belmont", "Redwood City", "San Mateo", "Foster City",
    "Burlingame", "Hillsborough", "Menlo Park", "Atherton", "Woodside",
    "Portola Valley", "Half Moon Bay", "Pacifica", "Daly City",
    "South San Francisco", "San Bruno", "Millbrae", "Brisbane",
    "Palo Alto", "El Granada", "Moss Beach", "Montara",
}


def slugify(value: str) -> str:
    """Lowercase, strip accents/punctuation, collapse spaces → dashes."""
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"[\s_-]+", "-", value)
    return value.strip("-")


def clean_markdown(md: str) -> str:
    """Remove the internal editorial review section and dangling horizontal
    rules. The client's drafts have an '---\\n## Internal editorial review'
    trailer that must NEVER reach the public site."""
    if not md:
        return ""
    # Split on the editorial trailer and keep only the public portion.
    public = re.split(r"\n---\s*\n##\s*Internal editorial review.*", md, flags=re.DOTALL, maxsplit=1)[0]
    # Drop the "Status: Draft — Needs Review" and "URL slug:" lines.
    public = re.sub(r"^Status:.*$", "", public, flags=re.MULTILINE)
    public = re.sub(r"^URL slug:.*$", "", public, flags=re.MULTILINE)
    public = re.sub(r"^Meta description:.*$", "", public, flags=re.MULTILINE)
    # Remove the H1 (we render the title separately from React).
    public = re.sub(r"^#\s+.*\n", "", public, count=1)
    # Strip operational-system leakage: "This project is identified in the
    # service records as Job #110059. Its completion date follows the recorded
    # finish timestamp. The equipment and work described here are specific to
    # that installation record." — public visitors don't need any of that.
    public = re.sub(
        r"\s*This project is identified in the service records as Job\s*#?\d+\.[^\n]*",
        "",
        public,
    )
    # Also strip any bare "Job #NNNNNN" phrases that remain.
    public = re.sub(r"\s*Job\s*#\s*\d+\.?", "", public)
    # Replace "Housecall Pro marks the job completed." with a cleaner phrase —
    # the public shouldn't see our internal system name.
    public = public.replace(
        "Housecall Pro marks the job completed.",
        "The installation was completed on schedule.",
    )
    # Collapse 3+ blank lines to 2, and double-spaces that cleanup left behind.
    public = re.sub(r"[ \t]{2,}", " ", public)
    public = re.sub(r"\n{3,}", "\n\n", public).strip()
    return public


def project_slug(p: dict, used: Counter) -> str:
    """Build a clean, SEO-friendly URL slug.
    Pattern: {type}-installation-{city}[-{n}] — no job numbers.
    """
    type_slug = slugify(p["installation_type"] + " installation")
    city_slug = slugify(p["city"]) if p["city"] and p["city"] != "MISSING" else "san-mateo-county"
    base = f"{type_slug}-{city_slug}"
    used[base] += 1
    return base if used[base] == 1 else f"{base}-{used[base]}"


def primary_equipment(p: dict) -> dict | None:
    """Pick the headline piece of equipment for card display."""
    for item in p.get("equipment", []):
        if item.get("brand") and item.get("capacity"):
            return {
                "name": item.get("name", ""),
                "brand": item.get("brand", ""),
                "model": (item.get("models") or [""])[0],
                "capacity": item.get("capacity", ""),
            }
    return None


def main() -> None:
    raw = json.loads(SOURCE.read_text())
    used = Counter()
    projects = []
    for p in sorted(raw, key=lambda x: x["completion_date"], reverse=True):
        # Skip documentation holds (missing ZIP / city).
        if p.get("blog_status") == "hold" or not p.get("blog_content"):
            continue
        if p["city"] == "MISSING":
            continue
        slug = project_slug(p, used)
        body = clean_markdown(p["blog_content"])
        projects.append({
            "slug": slug,
            "title": (p.get("seo_title") or "").strip(),
            "metaDescription": (p.get("meta_description") or "").strip(),
            "completionDate": p["completion_date"],
            "city": p["city"],
            "zip": p.get("zip", ""),
            "installationType": p["installation_type"],
            "equipment": primary_equipment(p),
            "allEquipment": [
                {
                    "name": e.get("name", ""),
                    "brand": e.get("brand", ""),
                    "model": (e.get("models") or [""])[0],
                    "capacity": e.get("capacity", ""),
                    "efficiency": e.get("efficiency", ""),
                }
                for e in p.get("equipment", [])
            ],
            "scope": p.get("scope", "").strip(),
            "ductwork": p.get("ductwork", "").strip(),
            "body": body,
            "wordCount": int(p.get("blog_word_count") or 0),
        })

    # Build city aggregates (only for cities we serve).
    by_city: dict[str, list[dict]] = defaultdict(list)
    for proj in projects:
        if proj["city"] in SERVICE_AREA_CITIES:
            by_city[proj["city"]].append(proj["slug"])

    cities = []
    for name in sorted(by_city.keys()):
        cities.append({
            "slug": slugify(name),
            "name": name,
            "projectSlugs": by_city[name],
            "projectCount": len(by_city[name]),
        })

    # Also keep a minimal entry for cities we serve but have no 2026 projects yet.
    # They still deserve a landing page (local SEO), just no project list.
    existing = {c["slug"] for c in cities}
    for name in SERVICE_AREA_CITIES:
        s = slugify(name)
        if s not in existing:
            cities.append({
                "slug": s,
                "name": name,
                "projectSlugs": [],
                "projectCount": 0,
            })
    cities.sort(key=lambda c: (-c["projectCount"], c["name"]))

    header = (
        "// AUTO-GENERATED by scripts/build-content.py — do not edit by hand.\n"
        "// Re-run `python3 scripts/build-content.py` when the client sends a new content drop.\n\n"
    )

    projects_ts = header + "export type ProjectEquipment = {\n"
    projects_ts += "  name: string;\n  brand: string;\n  model: string;\n  capacity: string;\n"
    projects_ts += "};\n\n"
    projects_ts += "export type Project = {\n"
    projects_ts += "  slug: string;\n  title: string;\n  metaDescription: string;\n"
    projects_ts += "  completionDate: string;\n  city: string;\n  zip: string;\n"
    projects_ts += "  installationType: string;\n"
    projects_ts += "  equipment: ProjectEquipment | null;\n"
    projects_ts += "  allEquipment: (ProjectEquipment & { efficiency: string })[];\n"
    projects_ts += "  scope: string;\n  ductwork: string;\n  body: string;\n  wordCount: number;\n"
    projects_ts += "};\n\n"
    projects_ts += f"export const projects: Project[] = {json.dumps(projects, indent=2)};\n"

    cities_ts = header + "export type City = {\n"
    cities_ts += "  slug: string;\n  name: string;\n  projectSlugs: string[];\n  projectCount: number;\n"
    cities_ts += "};\n\n"
    cities_ts += f"export const cities: City[] = {json.dumps(cities, indent=2)};\n"

    OUT_PROJECTS_TS.write_text(projects_ts)
    OUT_CITIES_TS.write_text(cities_ts)

    print(f"✓ {len(projects)} projects → {OUT_PROJECTS_TS.relative_to(PROJECT_ROOT)}")
    print(f"✓ {len(cities)} cities    → {OUT_CITIES_TS.relative_to(PROJECT_ROOT)}")
    print(f"  (of those, {sum(1 for c in cities if c['projectCount'] > 0)} have ≥1 real project)")


if __name__ == "__main__":
    main()
