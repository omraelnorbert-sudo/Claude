import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test, { describe } from "node:test";
import { fileURLToPath } from "node:url";

import { NAHUALES } from "@/lib/nahual";
import { SITE_URL, sitemapEntries, sitemapXml } from "@/lib/sitemap-urls";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const abgelegt = readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");

describe("public/sitemap.xml", () => {
  test("ist auf dem Stand von lib/sitemap-urls.ts", () => {
    assert.equal(
      abgelegt,
      sitemapXml(),
      "public/sitemap.xml ist veraltet — `npm run sitemap` ausführen",
    );
  });

  test("enthält alle drei Sprachfassungen vollständig", () => {
    const pfade = sitemapEntries().map((e) => e.loc.replace(SITE_URL, ""));
    const proSprache = 6 + NAHUALES.length;

    for (const [sprache, praefix] of [
      ["Deutsch", ""],
      ["Spanisch", "/es"],
      ["Englisch", "/en"],
    ] as const) {
      const treffer = pfade.filter((p) =>
        praefix ? p.startsWith(`${praefix}/`) || p === praefix : !p.startsWith("/es") && !p.startsWith("/en"),
      );
      assert.equal(treffer.length, proSprache, `${sprache}: ${treffer.length} statt ${proSprache} URLs`);
    }

    assert.equal(pfade.length, proSprache * 3);
  });

  test("keine doppelten URLs, alle absolut und ohne Schrägstrich am Ende", () => {
    const locs = sitemapEntries().map((e) => e.loc);
    assert.equal(new Set(locs).size, locs.length, "doppelte URL in der Sitemap");

    for (const loc of locs) {
      assert.ok(loc.startsWith(`${SITE_URL}`), `nicht absolut: ${loc}`);
      assert.ok(!loc.endsWith("/"), `Schrägstrich am Ende: ${loc}`);
    }
  });
});
