import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import CholqijHomeEs from "@/components/CholqijHomeEs";
import { getNahualOverviewItems } from "@/lib/public-data";
import { websiteSchema } from "@/lib/structured-data";

const description =
  "Cosmovisión MAYA: los 20 Nahuales, tu horóscopo MAYA y el Coaching del Alma de Paz Mundo.";

export const metadata: Metadata = {
  title: "Cosmovision Maya — Cosmovisión, horóscopo y los 20 Nahuales",
  description,
  alternates: { canonical: "/es" },
  openGraph: {
    title: "Cosmovision Maya — Cosmovisión, horóscopo y los 20 Nahuales",
    description,
    url: "/es",
  },
};

export default async function HomePageEs() {
  const overviewItems = await getNahualOverviewItems("es");

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <CholqijHomeEs overviewItems={overviewItems} />
    </>
  );
}
