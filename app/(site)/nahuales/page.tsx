import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import NahualesOverview from "@/components/NahualesOverview";
import { getNahualOverviewItems } from "@/lib/public-data";
import { nahualListSchema } from "@/lib/structured-data";

const description =
  "Die 20 Nahuales des Tzolk'in-Kalenders im Überblick — jedes Tageszeichen mit eigener Energie, Krafttier und Bedeutung.";

export const metadata: Metadata = {
  title: "Die 20 Nahuales",
  description,
  alternates: { canonical: "/nahuales" },
  openGraph: { title: "Die 20 Nahuales", description, url: "/nahuales" },
};

export default async function NahualesPage() {
  const items = await getNahualOverviewItems();

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

      <NahualesOverview items={items} />
    </>
  );
}
