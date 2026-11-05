"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// MapLibre v6 ships its worker as an ES module (`.mjs`) that Turbopack
// doesn't resolve automatically. Point it at the jsdelivr-hosted copy of
// the same pinned version so the browser can load it with the right MIME.
// The map still renders fine (fallback) if the worker ever fails to load.
// Guard against re-setting during HMR reloads.
if (
  typeof window !== "undefined" &&
  !(window as unknown as { __mlConfigured?: boolean }).__mlConfigured
) {
  maplibregl.setWorkerUrl(
    "https://cdn.jsdelivr.net/npm/maplibre-gl@6.16.0/dist/maplibre-gl-worker.mjs",
  );
  (window as unknown as { __mlConfigured?: boolean }).__mlConfigured = true;
}
import { projects } from "@/content/projects";
import { CITY_COORDS, HQ_COORDS } from "@/content/city-coords";
import { GOOGLE_REVIEWS_URL, YELP_REVIEWS_URL } from "@/lib/constants";

// Deterministic jitter so multiple projects in the same city don't stack
// exactly on top of each other. A seeded pseudo-random offset within ±0.004°
// keeps nearby pins visible without wandering outside the city bounds.
function jitterFor(seed: string, idx: number): [number, number] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const spread = 0.004;
  const dx = (((h ^ (idx * 1013)) % 1000) / 1000 - 0.5) * spread;
  const dy = (((h ^ (idx * 9851)) % 1000) / 1000 - 0.5) * spread;
  return [dx, dy];
}

type Feature = GeoJSON.Feature<GeoJSON.Point, { slug: string; title: string; city: string; type: string }>;

export default function ProjectsMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Build GeoJSON feature collection from projects that have known coords.
    const seenPerCity = new Map<string, number>();
    const features: Feature[] = [];
    projects.forEach((p) => {
      const base = CITY_COORDS[p.city];
      if (!base) return;
      const count = seenPerCity.get(p.city) || 0;
      seenPerCity.set(p.city, count + 1);
      const [dx, dy] = jitterFor(p.city, count);
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [base[0] + dx, base[1] + dy] },
        properties: {
          slug: p.slug,
          title: `${p.installationType} Installation in ${p.city}`,
          city: p.city,
          type: p.installationType,
        },
      });
    });

    const map = new maplibregl.Map({
      container: containerRef.current,
      // OpenFreeMap is a hosted, free-forever tile provider using
      // OpenStreetMap data — no API key, no quotas, same tech NUR uses.
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [-122.35, 37.55],
      zoom: 9.3,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    map.on("load", () => {
      map.addSource("projects", {
        type: "geojson",
        data: { type: "FeatureCollection", features },
        cluster: true,
        clusterRadius: 40,
        clusterMaxZoom: 13,
      });

      // Cluster circles — brand orange, size scales with count.
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "projects",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#F15A29",
          "circle-opacity": 0.92,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 3,
          "circle-radius": [
            "step", ["get", "point_count"],
            22, 5,   // < 5 projects → 22px
            28, 15,  // 5-14         → 28px
            34,      // 15+          → 34px
          ],
        },
      });
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "projects",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Noto Sans Bold"],
          "text-size": 14,
        },
        paint: { "text-color": "#ffffff" },
      });
      // Individual pins when zoomed in.
      map.addLayer({
        id: "unclustered",
        type: "circle",
        source: "projects",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#F15A29",
          "circle-radius": 9,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2.5,
        },
      });

      // HQ pin — navy, with ring.
      map.addSource("hq", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: { type: "Point", coordinates: HQ_COORDS },
            properties: { label: "TechPro HQ" },
          }],
        },
      });
      map.addLayer({
        id: "hq-outer",
        type: "circle",
        source: "hq",
        paint: {
          "circle-color": "#ffffff",
          "circle-radius": 14,
          "circle-stroke-color": "#13294B",
          "circle-stroke-width": 3,
        },
      });
      map.addLayer({
        id: "hq-inner",
        type: "circle",
        source: "hq",
        paint: {
          "circle-color": "#13294B",
          "circle-radius": 6,
        },
      });

      // Zoom-into-cluster on click.
      map.on("click", "clusters", async (e) => {
        const f = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
        if (!f) return;
        const clusterId = f.properties?.cluster_id;
        const source = map.getSource("projects") as maplibregl.GeoJSONSource;
        try {
          const zoom = await source.getClusterExpansionZoom(clusterId);
          map.easeTo({ center: (f.geometry as GeoJSON.Point).coordinates as [number, number], zoom });
        } catch {
          // no-op
        }
      });

      // Popup on unclustered-pin click.
      map.on("click", "unclustered", (e) => {
        const f = e.features?.[0];
        if (!f) return;
        const p = f.properties as Feature["properties"];
        const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const html =
          `<div style="font-family:system-ui;font-size:13px;line-height:1.4;padding:4px 6px;max-width:220px">` +
          `<div style="font-size:10.5px;font-weight:800;letter-spacing:.08em;color:#F15A29;text-transform:uppercase;margin-bottom:4px">${escapeHtml(p.type)}</div>` +
          `<div style="font-weight:800;color:#13294B;margin-bottom:6px">${escapeHtml(p.title)}</div>` +
          `<a href="/blog/${encodeURIComponent(p.slug)}" style="color:#F15A29;font-weight:700;text-decoration:none">View project →</a>` +
          `</div>`;
        new maplibregl.Popup({ offset: 14, closeButton: true }).setLngLat(coords).setHTML(html).addTo(map);
      });

      // Cursor affordance.
      ["clusters", "unclustered"].forEach((id) => {
        map.on("mouseenter", id, () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", id, () => { map.getCanvas().style.cursor = ""; });
      });

      // Google + Yelp branded review pins — matches Nur HVAC's map pattern.
      // Both represent the same HQ, offset slightly so neither hides the other.
      const makeReviewPin = (
        bg: string,
        label: string,
        url: string,
        tooltip: string,
      ) => {
        const el = document.createElement("a");
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.title = tooltip;
        el.setAttribute("aria-label", tooltip);
        el.style.cssText = [
          "display:flex",
          "align-items:center",
          "justify-content:center",
          "width:40px",
          "height:40px",
          "border-radius:50%",
          `background:${bg}`,
          "border:3px solid #ffffff",
          "box-shadow:0 2px 8px rgba(0,0,0,0.35)",
          "cursor:pointer",
          "text-decoration:none",
          "font:800 18px/1 system-ui,sans-serif",
          "color:#ffffff",
          "transition:transform .15s ease",
        ].join(";");
        el.textContent = label;
        el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.1)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
        return el;
      };

      new maplibregl.Marker({
        element: makeReviewPin("#4285F4", "G", GOOGLE_REVIEWS_URL, "Read our Google reviews"),
      })
        .setLngLat([HQ_COORDS[0] - 0.02, HQ_COORDS[1] + 0.015])
        .addTo(map);

      new maplibregl.Marker({
        element: makeReviewPin("#D32323", "Y", YELP_REVIEWS_URL, "Read our Yelp reviews"),
      })
        .setLngLat([HQ_COORDS[0] + 0.02, HQ_COORDS[1] + 0.015])
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative rounded-[18px] overflow-hidden border border-border-light bg-light-bg h-[460px] sm:h-[520px] lg:h-[560px]">
      {/* Project count badge */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-[12px] shadow-lg border border-border-light px-4 py-2.5 pointer-events-none">
        <p className="text-[22px] sm:text-[26px] font-[900] text-navy leading-none tracking-tight">
          {projects.length}
        </p>
        <p className="text-[10px] font-[800] text-orange tracking-[.14em] uppercase mt-1">
          Completed Projects
        </p>
      </div>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
