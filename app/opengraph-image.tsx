import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Immigration Pathway — Real timelines, real odds across 36 countries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background flag emojis */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexWrap: "wrap", opacity: 0.07, fontSize: 80,
          lineHeight: "1.2", padding: 20, gap: 8,
        }}>
          {"🇺🇸🇨🇦🇦🇺🇬🇧🇩🇪🇫🇷🇯🇵🇸🇬🇳🇿🇵🇹🇪🇸🇮🇹🇸🇪🇳🇱🇨🇭🇰🇷🇧🇷🇲🇽🇦🇷🇮🇳🇹🇭🇵🇱🇨🇿🇦🇹🇧🇪🇩🇰🇫🇮🇬🇷🇮🇪🇱🇺🇲🇹🇸🇰🇸🇮🇪🇪🇱🇻🇱🇹🇭🇺🇷🇴🇧🇬🇭🇷🇨🇾"
            .match(/\p{Emoji_Presentation}\p{Emoji_Modifier_Base}*\p{Emoji_Modifier}*(‍\p{Emoji_Presentation}\p{Emoji_Modifier_Base}*\p{Emoji_Modifier}*)*/gu)
            ?.map((flag, i) => <span key={i}>{flag}</span>)}
        </div>

        {/* Globe icon */}
        <div style={{ fontSize: 100, marginBottom: 24, display: "flex" }}>🌍</div>

        {/* Title */}
        <div style={{
          fontSize: 64, fontWeight: 800, color: "#ffffff",
          textAlign: "center", lineHeight: 1.1, marginBottom: 20,
          letterSpacing: "-1px",
        }}>
          The Immigration Pathway
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 26, color: "#94a3b8",
          textAlign: "center", maxWidth: 700, lineHeight: 1.5,
          marginBottom: 40,
        }}>
          Real timelines, real odds — every path to PR &amp; citizenship across 36 countries
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["🎯 Personalized Quiz", "📊 Compare Countries", "🌐 13 Languages"].map((label) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999, padding: "10px 22px",
              fontSize: 18, color: "#e2e8f0", display: "flex",
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: "absolute", bottom: 36,
          fontSize: 20, color: "#475569", letterSpacing: "0.5px",
          display: "flex",
        }}>
          immigrationmap.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
