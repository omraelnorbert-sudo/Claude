import type { Metadata } from "next";
import RechtlichesSeite from "@/components/RechtlichesSeite";
import { RECHTLICHES } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: RECHTLICHES.es.titel,
  description: RECHTLICHES.es.beschreibung,
  alternates: { canonical: "/es/impressum" },
};

export default function Page() {
  return <RechtlichesSeite sprache="es" />;
}
