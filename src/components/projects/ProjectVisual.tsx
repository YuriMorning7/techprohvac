import type { Project } from "@/content/projects";
import {
  Thermometer,
  Snowflake,
  Flame,
  Wind,
  Droplets,
  AirVent,
  Package2,
  Container,
  Fan,
  type LucideIcon,
} from "lucide-react";

// Per-type palette. Every gradient darkens to navy on one end so the grid of
// cards stays visually unified with the rest of the site — no rainbow.
type Palette = { from: string; to: string; accent: string; grid: string };

const PALETTES: Record<string, Palette> = {
  "Heat Pump":          { from: "#0f62fe", to: "#0a1329", accent: "#60a5fa", grid: "#60a5fa" },
  "Mini Split":         { from: "#059669", to: "#0a1329", accent: "#34d399", grid: "#34d399" },
  "Furnace":            { from: "#c2410c", to: "#1a0a0a", accent: "#fb923c", grid: "#fdba74" },
  "Air Conditioner":    { from: "#4338ca", to: "#0a1329", accent: "#818cf8", grid: "#a5b4fc" },
  "Ductwork":           { from: "#475569", to: "#1e293b", accent: "#cbd5e1", grid: "#cbd5e1" },
  "Water Heater":       { from: "#b45309", to: "#1a0f04", accent: "#fbbf24", grid: "#fcd34d" },
  "Indoor Air Quality": { from: "#0d9488", to: "#0a1329", accent: "#5eead4", grid: "#99f6e4" },
  "Packaged Unit":      { from: "#6d28d9", to: "#0a1329", accent: "#c4b5fd", grid: "#c4b5fd" },
  "Wall Heater":        { from: "#be123c", to: "#1a0a0a", accent: "#fda4af", grid: "#fecdd3" },
};
const DEFAULT_PALETTE: Palette = {
  from: "#1e293b",
  to: "#0a1329",
  accent: "#F15A29",
  grid: "#64748b",
};

const ICONS: Record<string, LucideIcon> = {
  "Heat Pump": Thermometer,
  "Mini Split": AirVent,
  "Furnace": Flame,
  "Air Conditioner": Snowflake,
  "Ductwork": Wind,
  "Water Heater": Droplets,
  "Indoor Air Quality": Fan,
  "Packaged Unit": Package2,
  "Wall Heater": Container,
};

// Deterministic 32-bit-ish hash of the slug. Seeds the visual's unique traits
// (grid offset, orb position, project number) so each card looks distinct
// without being random per-render.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function titleCase(s: string): string {
  if (!s) return "";
  return s.charAt(0) + s.slice(1).toLowerCase();
}

type ProjectLike = Pick<
  Project,
  "slug" | "installationType" | "completionDate" | "equipment"
>;

type Props = {
  project: ProjectLike;
  /** Compact variant used in the Related Projects grid on detail pages. */
  compact?: boolean;
};

export default function ProjectVisual({ project, compact = false }: Props) {
  const palette = PALETTES[project.installationType] ?? DEFAULT_PALETTE;
  const Icon = ICONS[project.installationType] ?? Thermometer;

  const h = hashString(project.slug);
  const projectNo = String(100 + (h % 900));
  const gridOffsetX = h % 24;
  const gridOffsetY = (h * 7) % 24;
  const orbX = 15 + (h % 70);
  const orbY = 10 + ((h >> 3) % 70);

  const brand = project.equipment?.brand ? titleCase(project.equipment.brand) : "";
  const capacity = project.equipment?.capacity ?? "";
  const hasBrand = brand && brand !== "Not documented";

  const date = new Date(project.completionDate);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  const iconSize = compact ? 36 : 48;
  const discSize = compact ? 76 : 100;
  const gridId = `grid-${project.slug}`;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
      aria-hidden
    >
      {/* Blueprint grid — same primitive across cards, but offset per slug so
          the pattern never aligns between two projects side-by-side. */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.09]">
        <defs>
          <pattern
            id={gridId}
            x={gridOffsetX}
            y={gridOffsetY}
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 26 0 L 0 0 L 0 26"
              fill="none"
              stroke={palette.grid}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {/* Soft accent orb — position seeded by slug hash */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          background: palette.accent,
          left: `${orbX}%`,
          top: `${orbY}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content layer */}
      <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-5 text-white">
        {/* Top row — brand mark + project number + date stamp */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
            <span className="text-[9.5px] sm:text-[10px] font-[800] tracking-[.16em] uppercase text-white/75 truncate">
              TechPro · №{projectNo}
            </span>
          </div>
          <span className="text-[10px] sm:text-[10.5px] font-[700] tracking-[.08em] text-white/65 font-mono shrink-0">
            {mm}/{yy}
          </span>
        </div>

        {/* Center medallion */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: discSize,
              height: discSize,
              background: `radial-gradient(circle, ${palette.accent}33 0%, transparent 70%)`,
            }}
          >
            {/* Concentric accent ring */}
            <div
              className="absolute inset-[18%] rounded-full border"
              style={{ borderColor: `${palette.accent}55` }}
            />
            <div
              className="absolute inset-[34%] rounded-full border"
              style={{ borderColor: `${palette.accent}33` }}
            />
            <Icon
              className="relative text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              style={{ width: iconSize, height: iconSize }}
              strokeWidth={1.35}
            />
          </div>
        </div>

        {/* Bottom row — brand + type + capacity chip */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            {hasBrand ? (
              <p className="text-[13.5px] sm:text-[15px] font-[800] tracking-tight text-white leading-tight truncate">
                {brand}
              </p>
            ) : (
              <p className="text-[13.5px] sm:text-[15px] font-[800] tracking-tight text-white leading-tight truncate">
                {project.installationType}
              </p>
            )}
            <p className="text-[10px] sm:text-[10.5px] font-[700] tracking-[.14em] uppercase text-white/55 mt-1 truncate">
              {hasBrand ? project.installationType : "Installation"}
            </p>
          </div>
          {capacity && (
            <span className="inline-flex items-center h-[24px] sm:h-[26px] px-2.5 rounded-full text-[10.5px] sm:text-[11px] font-[800] tracking-[.03em] shrink-0 bg-orange text-white shadow-[0_6px_16px_-6px_rgba(241,90,41,0.6)]">
              {capacity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
