import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { NAHUALES, glyphSrcForIndex, slugForIndex } from "@/lib/nahual";
import { nahualListSchema } from "@/lib/structured-data";

const description =
  "Die 20 Nahuales des Tzolk'in-Kalenders im Überblick — jedes Tageszeichen mit eigener Energie, Krafttier und Bedeutung.";

export const metadata: Metadata = {
  title: "Die 20 Nahuales",
  description,
  alternates: { canonical: "/nahuales" },
  openGraph: { title: "Die 20 Nahuales", description, url: "/nahuales" },
};

export default function NahualesPage() {
  return (
    <>
      <JsonLd data={nahualListSchema()} />
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Kosmovision Maya
      </div>
      <h1>Die 20 Nahuales</h1>
      <p>
        Jedes Nahual trägt eine eigene Energie, eigene Stärken und ein
        eigenes Krafttier. Wähle ein Zeichen, um mehr zu erfahren.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "var(--space-3)",
          marginTop: "var(--space-4)",
        }}
      >
        {NAHUALES.map((name, position) => {
          const nahualIndex = position + 1;
          return (
            <Link
              key={name}
              href={`/nahuales/${slugForIndex(nahualIndex)}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "var(--ink)",
                background: "var(--card)",
                border: "1px solid var(--line-card)",
                padding: "18px 12px 16px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={glyphSrcForIndex(nahualIndex, "card")}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ width: "70%", height: "auto", mixBlendMode: "multiply" }}
              />
              <span style={{ fontSize: 21, fontWeight: 600 }}>{name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
