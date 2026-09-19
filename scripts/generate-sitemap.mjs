/**
 * Schreibt public/sitemap.xml aus lib/sitemap-urls.ts.
 *
 *   npm run sitemap
 *
 * Nach dem Anlegen oder Entfernen von Seiten aufrufen. Der Test
 * tests/sitemap.test.ts schlägt fehl, solange die Datei nicht dazu passt.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sitemapXml } from "@/lib/sitemap-urls";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "public", "sitemap.xml");

writeFileSync(target, sitemapXml(), "utf8");
console.log(`sitemap.xml geschrieben: ${sitemapXml().match(/<loc>/g).length} URLs`);
