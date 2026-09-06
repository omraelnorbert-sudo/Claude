import type { Metadata } from "next";

const description =
  "Berechne dein Geburtsnahual und deine Schwingungszahl nach dem Tzolk'in-Kalender der Maya. Kostenlos, ohne Anmeldung — plus das erweiterte Maya-Kreuz.";

export const metadata: Metadata = {
  title: "Maya-Horoskop — Dein Nahual berechnen",
  description,
  alternates: { canonical: "/horoskop" },
  openGraph: { title: "Maya-Horoskop", description, url: "/horoskop" },
};

export default function HoroskopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
