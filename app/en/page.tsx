import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import CholqijHomeEn from "@/components/CholqijHomeEn";
import { getNahualOverviewItems } from "@/lib/public-data";
import { websiteSchema } from "@/lib/structured-data";

const description =
  "MAYA cosmovision: the 20 Nahuales, your MAYA horoscope and Paz Mundo's Soul Coaching.";

export const metadata: Metadata = {
  title: { absolute: "Cosmovision Maya — Cosmovision, horoscope and the 20 Nahuales" },
  description,
  alternates: { canonical: "/en" },
  openGraph: {
    title: "Cosmovision Maya — Cosmovision, horoscope and the 20 Nahuales",
    description,
    url: "/en",
  },
};

export default async function HomePageEn() {
  const overviewItems = await getNahualOverviewItems("en");

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <CholqijHomeEn overviewItems={overviewItems} />
    </>
  );
}
