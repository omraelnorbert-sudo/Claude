import type { Metadata } from "next";
import RechtlichesSeite from "@/components/RechtlichesSeite";
import { RECHTLICHES } from "@/lib/rechtliches";

export const metadata: Metadata = {
  title: RECHTLICHES.en.titel,
  description: RECHTLICHES.en.beschreibung,
  alternates: { canonical: "/en/impressum" },
};

export default function Page() {
  return <RechtlichesSeite sprache="en" />;
}
