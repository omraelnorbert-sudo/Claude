// Bausteine für die strukturierten Daten (schema.org / JSON-LD).
// Alles an einer Stelle, damit Name, Beschreibung und URLs nicht an fünf
// Orten auseinanderlaufen.

import { NAHUALES, glyphSrcForIndex, slugForIndex } from "@/lib/nahual";

export const SITE_URL = "https://cosmovisionmaya.org";
const SITE_NAME = "Cosmovision Maya";

/** Wird von den anderen Bausteinen per @id referenziert. */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Herausgeber und Website — gehört einmal auf die Startseite.
 */
export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        description:
          "Die Kosmovision der Maya: Tzolk'in-Kalender, die 20 Nahuales und das Maya-Horoskop.",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "de-DE",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** Die 20 Nahuales als Liste — für die Übersichtsseite. */
export function nahualListSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Die 20 Nahuales des Tzolk'in-Kalenders",
    numberOfItems: NAHUALES.length,
    itemListElement: NAHUALES.map((name, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name,
      url: `${SITE_URL}/nahuales/${slugForIndex(position + 1)}`,
    })),
  };
}

/** Ein einzelnes Nahual als Artikel — für die Detailseite. */
export function nahualArticleSchema({
  index,
  slug,
  name,
  description,
}: {
  index: number;
  slug: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/nahuales/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${name} — Nahual ${index} von 20`,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "de-DE",
    image: `${SITE_URL}${glyphSrcForIndex(index)}`,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
