import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import NahualesOverviewEn from "@/components/NahualesOverviewEn";
import { getNahualOverviewItems } from "@/lib/public-data";
import { nahualListSchema } from "@/lib/structured-data";

const description =
  "The 20 Nahuales of the Tzolk'in calendar at a glance — each day sign with its own energy, power animal and meaning.";

export const metadata: Metadata = {
  title: "The 20 Nahuales",
  description,
  alternates: { canonical: "/en/nahuales" },
  openGraph: { title: "The 20 Nahuales", description, url: "/en/nahuales" },
};

export default async function NahualesPageEn() {
  const items = await getNahualOverviewItems("en");

  return (
    <>
      <JsonLd data={nahualListSchema()} />
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        MAYA cosmovision
      </div>
      <h1>The 20 Nahuales</h1>
      <p>
        Each Nahual carries its own polar energy field. Embedded within it are
        human experiences and optimal possibilities for development of
        consciousness — like files, so to speak — in quality and finely tuned
        with the number.
      </p>

      <NahualesOverviewEn items={items} />
    </>
  );
}
