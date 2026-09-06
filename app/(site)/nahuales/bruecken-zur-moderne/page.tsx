import type { Metadata } from "next";

const description =
  "Wie sich das jahrtausendealte Wissen der 20 Nahuales mit dem heutigen Leben verbindet.";

export const metadata: Metadata = {
  title: "Brücken zur Moderne",
  description,
  alternates: { canonical: "/nahuales/bruecken-zur-moderne" },
  openGraph: {
    title: "Brücken zur Moderne",
    description,
    url: "/nahuales/bruecken-zur-moderne",
  },
};

export default function BrueckenZurModernePage() {
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Brücken zur Moderne</h1>
      <p>
        Wie das jahrtausendealte Wissen der 20 Nahuales sich mit dem heutigen
        Leben verbindet — Inhalt folgt in Kürze.
      </p>
    </>
  );
}
