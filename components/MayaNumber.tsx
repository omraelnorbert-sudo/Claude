// Punkt = 1, Balken = 5. Punkte (max. 4) stehen zentriert über den Balken. (Stylebook 04 · Maya-Zahlen)
export default function MayaNumber({ value }: { value: number }) {
  const dots = value % 5;
  const bars = Math.floor(value / 5);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        minHeight: 34,
        justifyContent: "flex-end",
      }}
    >
      {dots > 0 && (
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: dots }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--ink)",
              }}
            />
          ))}
        </div>
      )}
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{ width: 32, height: 3.5, background: "var(--ink)" }} />
      ))}
    </div>
  );
}
