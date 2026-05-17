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
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm red glow behind globe */}
        <div style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,71,87,0.18) 0%, transparent 70%)",
          top: -80,
          left: -60,
          display: "flex",
        }} />

        {/* Background flags — more visible */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexWrap: "wrap", opacity: 0.1, fontSize: 72,
          lineHeight: "1.25", padding: 24, gap: 6,
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
          width: 440,
          paddingLeft: 72,
        }}>
          {/* Globe */}
          <div style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "4px solid rgba(255,71,87,0.75)",
            boxShadow: "0 0 80px rgba(255,71,87,0.35), 0 0 180px rgba(255,71,87,0.15)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "rgba(255,71,87,0.06)",
          }}>
            {/* Equator */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: "rgba(255,71,87,0.8)", top: 128 }} />
            {/* Tropic of Cancer */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(255,71,87,0.4)", top: 86 }} />
            {/* Tropic of Capricorn */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(255,71,87,0.4)", top: 170 }} />
            {/* Arctic circle */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(255,71,87,0.2)", top: 50 }} />
            {/* Antarctic circle */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(255,71,87,0.2)", top: 206 }} />
            {/* Central meridian */}
            <div style={{
              position: "absolute",
              width: 110, height: 252,
              borderRadius: "50%",
              border: "3px solid rgba(255,71,87,0.75)",
              background: "transparent",
              display: "flex",
            }} />
            {/* Wide meridian */}
            <div style={{
              position: "absolute",
              width: 186, height: 252,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,71,87,0.35)",
              background: "transparent",
              display: "flex",
            }} />
            {/* Narrow meridian */}
            <div style={{
              position: "absolute",
              width: 52, height: 252,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,71,87,0.35)",
              background: "transparent",
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
            <span style={{ color: "#FF4757", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              37 Countries
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 62,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: 20,
            letterSpacing: "-1.5px",
          }}>
            Find the country where you belong.
          </div>

          {/* Sub-headline */}
          <div style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            marginBottom: 44,
          }}>
            Real timelines, real odds — every path to permanent residence &amp; citizenship.
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Personalized Quiz", "Compare Countries", "13 Languages"].map((label) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "9px 20px",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
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
          fontSize: 18,
          color: "rgba(255,255,255,0.2)",
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
