import type { Metadata } from "next";
import CholqijHome from "@/components/CholqijHome";
import JsonLd from "@/components/JsonLd";
import { getNahualOverviewItems } from "@/lib/public-data";
import { websiteSchema } from "@/lib/structured-data";

const description =
  "Die Kosmovision der Maya: 13 Schwingungszahlen und 20 Nahuales im heiligen Tzolk'in-Kalender. Finde dein Geburtsnahual und entdecke, wie der Maya-Kalender funktioniert.";

export const metadata: Metadata = {
  title: { absolute: "Cosmovision Maya — Kosmovision, Horoskop und die 20 Nahuales" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Cosmovision Maya", description, url: "/" },
};

export default async function HomePage() {
  const overviewItems = await getNahualOverviewItems();

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <CholqijHome overviewItems={overviewItems} />
    </>
  );
}
