import { ImageResponse } from "next/og";
import { getProject } from "@/lib/content-helpers";

export const alt = "TechPro Heating & Cooling project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project
    ? `${project.installationType} Installation in ${project.city}, CA`
    : "TechPro Heating & Cooling";
  const subtitle = project
    ? `${project.equipment?.brand ? project.equipment.brand.charAt(0) + project.equipment.brand.slice(1).toLowerCase() : "Licensed HVAC"} · San Mateo County`
    : "San Carlos, CA · Licensed HVAC";

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
            TechPro Heating &amp; Cooling
          </span>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "980px",
            display: "flex",
          }}
        >
          {title}
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
          <span style={{ display: "flex" }}>Serving San Mateo County since 2005</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
