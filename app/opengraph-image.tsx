import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf7f0",
          border: "16px solid #1f1c17",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "4px solid #c9963a",
            alignItems: "center",
            justifyContent: "center",
            color: "#1f1c17",
            fontSize: 64,
            fontFamily: "Georgia, serif",
            marginBottom: 36,
          }}
        >
          M
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: "Georgia, serif",
            color: "#1f1c17",
            letterSpacing: 1,
          }}
        >
          Cosmovision Maya
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9a5a34",
          }}
        >
          Horoskop &amp; die 20 Nahuales
        </div>
      </div>
    ),
    { ...size },
  );
}
