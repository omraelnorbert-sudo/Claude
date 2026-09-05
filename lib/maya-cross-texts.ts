/**
 * Sichtbare Texte des Maya-Kreuzes — bewusst an EINER Stelle gebündelt.
 *
 * Die Anwendung ist heute deutschsprachig; die Mehrsprachigkeit (DE/EN/ES,
 * siehe PLAN.md) kommt als eigener Schritt. Deshalb stehen hier deutsche
 * Texte, aber unter sprachneutralen Schlüsseln (`conception`, `masculine`,
 * `birth`, `feminine`, `maturity`) und getrennt von der Komponente. Sobald das
 * Übersetzungssystem steht, wird aus diesem Objekt ein `Record<Lang, …>` —
 * ohne dass die UI angefasst werden muss.
 *
 * Diese Texte beschreiben die POSITION im Kreuz. Die Beschreibungen der
 * einzelnen Nahuales bleiben unverändert in `lib/nahual-descriptions.ts`.
 */

import type { MayaCrossPositionKey } from "@/lib/maya-cross";

export interface MayaCrossPositionText {
  /** Überschrift der Position, z. B. "Empfängnis / Ursprung". */
  title: string;
  /** Kurzform für enge Stellen im Kreuz, z. B. "Ursprung". */
  short: string;
  /** Was die Position bedeutet. */
  description: string;
}

export const MAYA_CROSS_TEXTS: {
  title: string;
  lead: string;
  hint: string;
  disclaimer: string;
  positions: Record<MayaCrossPositionKey, MayaCrossPositionText>;
  errors: Record<"invalidDate" | "dateOutOfRange" | "calculationFailed", string>;
} = {
  title: "Dein Maya-Kreuz",

  lead:
    "Das Maya-Kreuz stellt neben deinem Geburts-Nahual vier weitere Energien dar. " +
    "Sie werden aus realen Kalendertagen rund um deinen Geburtstag berechnet — " +
    "acht und sechs Tage davor, sechs und acht Tage danach.",

  hint:
    "Die Darstellung wird wie ein Spiegel gelesen: links die männliche, rechts die " +
    "weibliche Kraft. Beide Bezeichnungen meinen eine energetische Qualität, nicht " +
    "das biologische Geschlecht.",

  disclaimer:
    "Das Maya-Kreuz basiert auf dem 260-tägigen Cholq'ij-Kalender. Die dargestellten " +
    "Positionen dienen der kulturellen und spirituellen Interpretation und sind keine " +
    "wissenschaftliche Persönlichkeitsanalyse oder konkrete Zukunftsvorhersage. " +
    "Auslegung und Benennung können zwischen Maya-Traditionen und Ajq'ijab' variieren. " +
    "Eine digitale Berechnung ersetzt nicht die persönliche Auslegung durch eine " +
    "ausgebildete Ajq'ij.",

  positions: {
    conception: {
      title: "Empfängnis / Ursprung",
      short: "Ursprung",
      description:
        "Ursprung, Herkunft, Ahnenbezug und das Lebensprojekt, das schon vor der " +
        "Geburt angelegt war. Diese Position wird manchmal vereinfacht als " +
        "„Vergangenheit“ bezeichnet.",
    },
    masculine: {
      title: "Männliche Kraft",
      short: "Männliche Kraft",
      description:
        "Die generative, nach außen gerichtete Kraft: Handeln, Arbeit, Umsetzung, " +
        "gesellschaftliche Rolle — und das, was die Außenwelt von dir fordert. " +
        "Gemeint ist eine energetische Qualität, nicht das biologische Geschlecht.",
    },
    birth: {
      title: "Geburts-Nahual / Zentrum",
      short: "Zentrum",
      description:
        "Die zentrale Geburtsenergie: dein Wesenskern und die grundlegenden " +
        "Fähigkeiten und Herausforderungen, mit denen du deinen Lebensweg gestaltest.",
    },
    feminine: {
      title: "Weibliche Kraft",
      short: "Weibliche Kraft",
      description:
        "Die intuitive, emotionale, empfangende und materialisierende Kraft. Sie " +
        "trägt Wachstum, Entwicklung und die Entfaltung des Lebensprojekts. Auch " +
        "hier ist eine energetische Qualität gemeint, nicht das biologische Geschlecht.",
    },
    maturity: {
      title: "Reife / Bestimmung",
      short: "Reife",
      description:
        "Reifung, Entfaltung, Erfüllung und das mögliche Ergebnis des Lebensweges. " +
        "Diese Position wird manchmal vereinfacht als „Zukunft“ bezeichnet, ist aber " +
        "keine konkrete Vorhersage.",
    },
  },

  errors: {
    invalidDate: "Dieses Datum gibt es nicht. Bitte prüfe Tag, Monat und Jahr.",
    dateOutOfRange:
      "Für das Maya-Kreuz werden acht Tage vor und nach dem Geburtstag mitgerechnet. " +
      "Deshalb deckt es den Bereich 9. Januar 1830 bis 23. Dezember 2099 ab.",
    calculationFailed: "Das Maya-Kreuz konnte nicht berechnet werden.",
  },
};
