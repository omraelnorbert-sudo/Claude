import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import NahualesOverviewEs from "@/components/NahualesOverviewEs";
import { getNahualOverviewItems } from "@/lib/public-data";
import { nahualListSchema } from "@/lib/structured-data";

const description =
  "Los 20 Nahuales del calendario Tzolk'in de un vistazo — cada signo del día con su propia energía, animal de poder y significado.";

export const metadata: Metadata = {
  title: "Los 20 Nahuales",
  description,
  alternates: { canonical: "/es/nahuales" },
  openGraph: { title: "Los 20 Nahuales", description, url: "/es/nahuales" },
};

export default async function NahualesPageEs() {
  const items = await getNahualOverviewItems("es");

  return (
    <>
      <JsonLd data={nahualListSchema()} />
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Cosmovisión MAYA
      </div>
      <h1>Los 20 Nahuales</h1>
      <p>
        Cada Nahual lleva su propio campo energético polar. En él están
        incrustadas experiencias humanas y posibilidades óptimas de
        desarrollo para la conciencia — como archivos, por así decirlo — en
        calidad y en sintonía fina con el número.
      </p>

      <NahualesOverviewEs items={items} />
    </>
  );
}
