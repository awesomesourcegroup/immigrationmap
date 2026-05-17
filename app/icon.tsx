import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          background: "#FF4757",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Globe */}
        <div
          style={{
            width: 21,
            height: 21,
            borderRadius: "50%",
            border: "2px solid white",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Equator */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "white", top: 9 }} />
          {/* Tropic lines */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.5)", top: 5 }} />
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.5)", top: 14 }} />
          {/* Central meridian */}
          <div
            style={{
              position: "absolute",
              width: 9,
              height: 19,
              borderRadius: "50%",
              border: "2px solid white",
              background: "transparent",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
