// Bildrahmen: 1.5px Tinte + 3px double Gold. Glyphen sind freigestellte PNGs
// (transparenter Hintergrund), nie beschnitten, nie eingefärbt. (Stylebook 03 · Rahmen & Ornamente)
export default function NahualGlyph({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        aspectRatio: "4 / 3",
        border: "1.5px solid var(--ink-deep)",
        padding: 8,
        boxSizing: "border-box",
        background: "var(--paper-warm)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "3px double var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ height: "80%", width: "auto" }}
        />
      </div>
    </div>
  );
}
