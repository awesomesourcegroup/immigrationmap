import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Immigration Pathway — Find the country where you belong";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "#FF4757", display: "flex" }} />

        {/* Left warm tint panel behind globe */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 460, background: "#FFF5F5", display: "flex" }} />

        {/* Decorative concentric rings behind globe */}
        {[380, 300, 220].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid rgba(255,71,87,${0.06 + i * 0.04})`,
            top: 315 - size / 2,
            left: 230 - size / 2,
            display: "flex",
          }} />
        ))}

        {/* Globe */}
        <div style={{
          position: "absolute",
          width: 240,
          height: 240,
          top: 195,
          left: 110,
          borderRadius: "50%",
          border: "2.5px solid rgba(13,13,13,0.75)",
          overflow: "hidden",
          background: "rgba(255,71,87,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Equator */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(13,13,13,0.6)", top: 118 }} />
          {/* Tropic of Cancer */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.18)", top: 79 }} />
          {/* Tropic of Capricorn */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.18)", top: 157 }} />
          {/* Arctic */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.1)", top: 46 }} />
          {/* Antarctic */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.1)", top: 190 }} />
          {/* Central meridian */}
          <div style={{ position: "absolute", width: 100, height: 232, borderRadius: "50%", border: "2px solid rgba(13,13,13,0.55)", background: "transparent", display: "flex" }} />
          {/* Wide meridian */}
          <div style={{ position: "absolute", width: 170, height: 232, borderRadius: "50%", border: "1px solid rgba(13,13,13,0.15)", background: "transparent", display: "flex" }} />
          {/* Narrow meridian */}
          <div style={{ position: "absolute", width: 48, height: 232, borderRadius: "50%", border: "1px solid rgba(13,13,13,0.15)", background: "transparent", display: "flex" }} />
        </div>

        {/* Red destination pin on globe */}
        <div style={{ position: "absolute", width: 14, height: 14, borderRadius: "50%", background: "#FF4757", top: 277, left: 262, display: "flex", boxShadow: "0 0 0 3px rgba(255,71,87,0.2)" }} />

        {/* Right column — text */}
        <div style={{
          position: "absolute",
          top: 0, bottom: 0,
          left: 460, right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 64,
          paddingRight: 72,
        }}>
          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4757", display: "flex" }} />
            <span style={{ color: "#FF4757", fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              37 Countries
            </span>
          </div>

          {/* Headline */}
          <div style={{ fontSize: 60, fontWeight: 900, color: "#0D0D0D", lineHeight: 1.05, marginBottom: 20, letterSpacing: "-1.5px" }}>
            Find the country where you belong.
          </div>

          {/* Sub-headline */}
          <div style={{ fontSize: 20, color: "rgba(13,13,13,0.38)", lineHeight: 1.5, marginBottom: 44 }}>
            Real timelines, real odds — every path to permanent residence &amp; citizenship.
          </div>

        </div>

        {/* Bottom URL */}
        <div style={{ position: "absolute", bottom: 28, right: 72, fontSize: 15, color: "rgba(13,13,13,0.18)", letterSpacing: "0.4px", display: "flex" }}>
          immigrationmap.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
