# Cosmovision Maya – Arbeitsregeln

Next.js 14 (App Router) + Supabase, deployt über Netlify.

## Wichtigster Grundsatz

`main` → GitHub → Netlify. **Jeder Push auf `main` geht sofort live.**
Lokal arbeiten ist gratis, Pushen ist eine Veröffentlichung.

## Lokal (ohne Rückfrage erlaubt)

- Dateien anlegen, ändern, löschen
- `npm run dev`, `npm run typecheck`, `npm test`, `npm run build`
- **`git commit` lokal, so oft wie sinnvoll** – kleine, abgeschlossene Schritte,
  deutsche Commit-Nachrichten im Stil der bisherigen Historie
- Branch: alles direkt auf `main`, keine Feature-Branches

## Pushen (nur auf ausdrückliche Ansage)

- **Nie von selbst pushen.** Erst wenn Omrael „push", „hochladen" oder „live" sagt.
- Kein `git push --force`, kein Push auf andere Branches.
- Wenn lokale Commits liegen, am Ende einer Aufgabe kurz melden:
  „X Commits liegen lokal bereit – pushen?" Dann warten.

## Vor jedem Push – Pflichtcheck

In dieser Reihenfolge, alle drei müssen grün sein:

1. `npm run typecheck`
2. `npm test`
3. `npm run build`  ← genau das, was Netlify ausführt

Schlägt einer fehl: **nicht pushen**, Fehler beheben oder melden.
Bei sichtbaren UI-Änderungen zusätzlich vorher `npm run dev` starten und
die geänderte Seite anschauen.

## Nach dem Push

Kurz sagen, was live gegangen ist, und dass Netlify jetzt baut.

## Was nie ins Repo gehört

- `.env`, `.env.local`, echte Keys und Passwörter
- `node_modules`, `.next`, `*.tsbuildinfo`, `.netlify`
- große Binärdateien (ZIPs, Design-Exporte) – gehören nicht in Git
