import { ImageResponse } from "next/og";

export const alt = "TechPro Heating & Cooling — Licensed HVAC in San Mateo County";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#F15A29",
            }}
          />
          <span
            style={{
              fontSize: "24px",
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
            fontSize: "88px",
            fontWeight: 800,
            lineHeight: 1.03,
            letterSpacing: "-0.025em",
            marginBottom: "28px",
            maxWidth: "1020px",
            display: "flex",
          }}
        >
          Heat Pump Specialists in San Mateo County
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "rgba(255,255,255,0.72)",
            display: "flex",
            maxWidth: "900px",
          }}
        >
          Licensed · Insured · 20+ years · 4.9 on Google
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
          <span style={{ display: "flex" }}>(650) 275-6357</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
