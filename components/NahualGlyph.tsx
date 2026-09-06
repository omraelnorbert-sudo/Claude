// Glyphen sind freigestellte PNGs mit eigenem Rahmen (transparenter
// Hintergrund), daher hier ohne zusätzliche Kartuschen-Umrandung. Nie
// beschnitten, nie eingefärbt. (Stylebook 03 · Rahmen & Ornamente)
export default function NahualGlyph({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        aspectRatio: "4 / 3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ height: "90%", width: "auto" }} />
    </div>
  );
}
