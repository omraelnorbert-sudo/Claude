import type { Metadata } from "next";
import RechtlichesSeite from "@/components/RechtlichesSeite";
import { RECHTLICHES } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: RECHTLICHES.de.titel,
  description: RECHTLICHES.de.beschreibung,
  alternates: { canonical: "/impressum" },
};

export default function Page() {
  return <RechtlichesSeite sprache="de" />;
}
