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
        {/* Subtle top border accent */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 4,
          background: "#FF4757",
          display: "flex",
        }} />

        {/* Background flags — very faint, like watermark */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexWrap: "wrap", opacity: 0.06, fontSize: 80,
          lineHeight: "1.2", padding: 20, gap: 4,
        }}>
          {"🇺🇸🇨🇦🇦🇺🇬🇧🇩🇪🇫🇷🇯🇵🇸🇬🇳🇿🇵🇹🇪🇸🇮🇹🇸🇪🇳🇱🇨🇭🇰🇷🇧🇷🇲🇽🇦🇷🇮🇳🇹🇭🇵🇱🇨🇿🇦🇹🇧🇪🇩🇰🇫🇮🇬🇷🇮🇪🇱🇺🇲🇹🇸🇰🇸🇮🇪🇪🇱🇻🇱🇹🇭🇺🇷🇴🇧🇬🇭🇷🇨🇾"
            .match(/\p{Emoji_Presentation}\p{Emoji_Modifier_Base}*\p{Emoji_Modifier}*(‍\p{Emoji_Presentation}\p{Emoji_Modifier_Base}*\p{Emoji_Modifier}*)*/gu)
            ?.map((flag, i) => <span key={i}>{flag}</span>)}
        </div>

        {/* Left column — globe */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 420,
          paddingLeft: 72,
        }}>
          {/* Globe */}
          <div style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "3px solid #0D0D0D",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "rgba(13,13,13,0.02)",
          }}>
            {/* Equator */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "#0D0D0D", top: 128 }} />
            {/* Tropic of Cancer */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.25)", top: 86 }} />
            {/* Tropic of Capricorn */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.25)", top: 170 }} />
            {/* Arctic circle */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.12)", top: 50 }} />
            {/* Antarctic circle */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(13,13,13,0.12)", top: 206 }} />
            {/* Central meridian */}
            <div style={{
              position: "absolute",
              width: 110, height: 252,
              borderRadius: "50%",
              border: "2px solid rgba(13,13,13,0.7)",
              background: "transparent",
              display: "flex",
            }} />
            {/* Wide meridian */}
            <div style={{
              position: "absolute",
              width: 186, height: 252,
              borderRadius: "50%",
              border: "1px solid rgba(13,13,13,0.2)",
              background: "transparent",
              display: "flex",
            }} />
            {/* Narrow meridian */}
            <div style={{
              position: "absolute",
              width: 52, height: 252,
              borderRadius: "50%",
              border: "1px solid rgba(13,13,13,0.2)",
              background: "transparent",
              display: "flex",
            }} />
            {/* Red dot — destination pin */}
            <div style={{
              position: "absolute",
              width: 14, height: 14,
              borderRadius: "50%",
              background: "#FF4757",
              top: 90, left: 140,
              display: "flex",
            }} />
          </div>
        </div>

        {/* Right column — text */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          paddingRight: 72,
          paddingLeft: 40,
        }}>
          {/* Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#FF4757", display: "flex",
            }} />
            <span style={{ color: "#FF4757", fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              37 Countries
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 58,
            fontWeight: 900,
            color: "#0D0D0D",
            lineHeight: 1.05,
            marginBottom: 20,
            letterSpacing: "-1.5px",
          }}>
            Find the country where you belong.
          </div>

          {/* Sub-headline */}
          <div style={{
            fontSize: 20,
            color: "rgba(13,13,13,0.4)",
            lineHeight: 1.5,
            marginBottom: 44,
          }}>
            Real timelines, real odds — every path to permanent residence &amp; citizenship.
          </div>

          {/* Feature pills — match the site's card style */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Personalized Quiz", "Compare Countries", "13 Languages"].map((label) => (
              <div key={label} style={{
                background: "#FFFFFF",
                border: "1.5px solid #E5E7EB",
                borderRadius: 999,
                padding: "9px 20px",
                fontSize: 15,
                color: "rgba(13,13,13,0.55)",
                display: "flex",
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div style={{
          position: "absolute",
          bottom: 32,
          right: 72,
          fontSize: 16,
          color: "rgba(13,13,13,0.2)",
          letterSpacing: "0.5px",
          display: "flex",
        }}>
          immigrationmap.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
