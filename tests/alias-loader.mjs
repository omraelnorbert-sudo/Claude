/**
 * Löst die Pfad-Alias `@/…` aus tsconfig.json für `node --test` auf.
 *
 * Node führt TypeScript seit v23.6 direkt aus (Type-Stripping), kennt aber die
 * TypeScript-Alias nicht. Dieser Hook bildet `@/lib/foo` auf `<repo>/lib/foo.ts`
 * ab, damit die Tests ohne zusätzliche Abhängigkeit (tsx, ts-node, Jest …)
 * laufen und der Quellcode weiter die im Projekt übliche Alias-Schreibweise
 * verwenden kann.
 *
 *   node --import ./tests/alias-loader.mjs --test tests/
 */

import { registerHooks } from "node:module";
import { statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

    const base = path.join(root, specifier.slice(2));
    const target = [
      `${base}.ts`,
      `${base}.tsx`,
      base,
      path.join(base, "index.ts"),
    ].find((candidate) => statSync(candidate, { throwIfNoEntry: false })?.isFile());

    if (!target) throw new Error(`Alias nicht auflösbar: ${specifier}`);
    return { url: pathToFileURL(target).href, shortCircuit: true };
  },
});
