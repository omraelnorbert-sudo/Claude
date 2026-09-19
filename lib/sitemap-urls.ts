// Quelle für die Sitemap. Wird von scripts/generate-sitemap.mjs benutzt, das
// public/sitemap.xml schreibt, und vom Test, der prüft ob die abgelegte Datei
// noch dazu passt.
//
// Die Sitemap liegt bewusst als statische Datei in public/ und nicht als
// app/sitemap.ts: Next.js-Metadata-Routen laufen auf Netlify durch die
// Serverless-Funktion. Beim Kaltstart dauert das bis zu zwei Sekunden, und
// Google bricht den Abruf dann ab.

import { NAHUALES, slugForIndex } from "@/lib/nahual";

export const SITE_URL = "https://cosmovisionmaya.org";

/** Seiten, die es in jeder Sprachfassung gibt — Pfade ohne Sprachpräfix. */
const PAGES = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/horoskop", changefreq: "monthly", priority: "0.9" },
  { path: "/nahuales", changefreq: "monthly", priority: "0.8" },
  { path: "/nahuales/videos", changefreq: "monthly", priority: "0.6" },
  { path: "/nahuales/bruecken-zur-moderne", changefreq: "monthly", priority: "0.5" },
  { path: "/paz-mundo", changefreq: "monthly", priority: "0.6" },
] as const;

/** Sprachpräfixe. Deutsch liegt ohne Präfix an der Wurzel. */
const LANGUAGE_PREFIXES = ["", "/es", "/en"] as const;

export type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: string;
};

/** Alle URLs der Sitemap, gruppiert nach Sprache. */
export function sitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const prefix of LANGUAGE_PREFIXES) {
    for (const page of PAGES) {
      entries.push({
        loc: `${SITE_URL}${prefix}${page.path}` || SITE_URL,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }

    for (let position = 0; position < NAHUALES.length; position++) {
      entries.push({
        loc: `${SITE_URL}${prefix}/nahuales/${slugForIndex(position + 1)}`,
        changefreq: "monthly",
        priority: "0.7",
      });
    }
  }

  return entries;
}

/** Die fertige sitemap.xml als Text, mit abschließendem Zeilenumbruch. */
export function sitemapXml(): string {
  const urls = sitemapEntries()
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${entry.loc}</loc>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  );
}
