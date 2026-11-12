import { ImageResponse } from "next/og";
import { getCityBySlug, getProjectsForCity } from "@/lib/content-helpers";

export const alt = "TechPro Heating & Cooling service area";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const match = getCityBySlug(city);
  const name = match?.name ?? "San Mateo County";
  const projects = match ? getProjectsForCity(city) : [];
  const subtitle =
    projects.length > 0
      ? `${projects.length} recent ${projects.length === 1 ? "project" : "projects"} documented in ${name}`
      : "Licensed HVAC installation & repair";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0A1329 0%, #0F1D40 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#F15A29",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F15A29",
            }}
          >
            Service Area
          </span>
        </div>
        <div
          style={{
            fontSize: "80px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "28px",
            maxWidth: "980px",
            display: "flex",
          }}
        >
          HVAC Services in {name}, CA
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.7)",
            display: "flex",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span style={{ display: "flex" }}>techprohvac.com</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>Licensed · Insured · Since 2005</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
