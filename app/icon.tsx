import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f1c17",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: "78%",
            height: "78%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "2px solid #c9963a",
            color: "#faf7f0",
            fontSize: 17,
            fontFamily: "Georgia, serif",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size },
  );
}
