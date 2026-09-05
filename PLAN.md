# Cosmovision Maya — Projektplan

_Lebendes Dokument. Wird gemeinsam und Schritt für Schritt erweitert, während wir Funktionen festlegen. Stand: 2026-09-05._

## Vision

Cosmovision Maya soll zwei Dinge gleichzeitig sein:

1. Die **persönliche Anwendung** der Marke *Paz Mundo Seelencoaching*: Nutzer berechnen ihr Geburts-Nahual, bekommen ein passendes Video und täglich eine Botschaft dazu.
2. Die **inhaltliche Referenz** zur Maya-Kosmovision im Netz — mehrsprachig (DE/EN/ES) und so tief recherchiert, dass Google und KI-Systeme sie als Hauptquelle zum Thema "Cosmovisión Maya" heranziehen.

## Marke & Kontext

- Projekt gehört zu **Paz Mundo Seelencoaching**. Die Tzolk'in/Nahual-Berechnung in [`lib/nahual.ts`](lib/nahual.ts) ist von pazmundo.com portiert.
- Nahual-System = K'iche'-Tageszeichen (20 Zeichen, z. B. B'aatz', Iq', Kaan …), nicht die Yukatekische Ajaw-Reihe — wichtig, damit Bildungsinhalte später konsistent zum bestehenden Rechner bleiben.
- YouTube-Kanal des Nutzers soll verlinkt und inhaltlich eingebunden werden (Video pro Nahual).

## Tech-Stack (bereits festgelegt, im Repo vorhanden)

- **Next.js 14** (App Router, TypeScript)
- **Supabase** (Datenbank, künftig auch Auth)
- **Netlify** (Hosting, `@netlify/plugin-nextjs`)
- **GitHub** — `github.com/omraelnorbert-sudo/Claude`

## Aktueller Stand im Code

_Stand: 5. September 2026. Typprüfung sauber, 24 Tests grün, Produktions-Build läuft durch._

**Öffentliche Website** (`app/(site)/…`, alle Routen unverändert erreichbar)
- Startseite: Intro + zwei rotierende Zahnräder (13 Schwingungszahlen, 20 Nahuales)
- `/horoskop`: umschaltbar zwischen **Geburtsnahual** und **Maya-Kreuz** (fünf Positionen), mit ausformulierten Nahual-Beschreibungen und Krafttieren
- `/rituale`, `/workouts`: lesen aus `content_items`

**Anmeldung**
- `/login` mit Magic Link (funktioniert) und Google (Code fertig, Provider in Supabase noch nicht aktiviert)
- `middleware.ts` hält die Session frisch und schützt `/admin`; Callback- und Abmelde-Routen vorhanden

**Admin-Dashboard** (`/admin`, acht Bereiche mit Seitenmenü)
- Dashboard, Texte (DE/EN/ES), Videos, Rituale & Workouts, Nutzer, Versand-Einstellungen mit Testmail, Protokoll, Logik & Status
- Dreifach abgesichert: Middleware, Layout-Prüfung, RLS-Policies in der Datenbank

**Datenbank**
- `supabase/schema_admin.sql` liegt bereit — **muss noch im Supabase SQL Editor ausgeführt werden**

**Noch nicht vorhanden:** Mehrsprachigkeit (`[lang]`-Struktur), Nutzerprofile auf der öffentlichen Seite, YouTube-Einbindung, teilbares Bild, Bildungsseiten, SEO-Ausbau, automatischer E-Mail-Versand.

> ⚠️ **Wachsende Altlast:** Das Maya-Kreuz kam vor dem Sprachumbau dazu. Jede neue öffentliche Seite und jeder neue Text macht Punkt 2 des Phasenplans teurer. Die Texte liegen immerhin schon unter sprachneutralen Schlüsseln in `lib/maya-cross-texts.ts` und `lib/nahual-descriptions.ts` — der Umbau bleibt machbar, sollte aber nicht weiter warten.

## Design-System (bereits etabliert, bitte beibehalten)

Definiert in [`app/globals.css`](app/globals.css) — neue Seiten sollen diese Tokens verwenden statt eigene Farben/Abstände einzuführen:

- **Farben:** Papier `--paper #faf7f0`, Gold `--gold #c9963a`, Akzent (Terrakotta) `--accent #9a5a34`, Tinte `--ink #1f1c17`
- **Schrift:** Cormorant Garamond (Serif, Fließtext/Headlines) + IBM Plex Mono (Labels, Buttons, Eyebrows — immer Versalien mit Letterspacing)
- **Form:** `--radius: 0` — bewusst kantig, keine abgerundeten Ecken; Karten mit goldener Linkskante
- **Nur Hell-Modus:** aktuell kein Dark-Theme definiert. Falls gewünscht, ist das eine eigene Aufgabe (alle Tokens brauchen dann eine zweite Fassung).

## Geplante Funktionen

### 1. Nutzerkonten
- Login via **Google OAuth** und **Magic Link** (beide über Supabase Auth).
- Profilseite: Geburtsdatum, berechnetes Nahual, zugeordnetes Video, Spracheinstellung, E-Mail-Opt-in.

### 2. Persönliches Horoskop (Ausbau von `/horoskop`)
- Bestehende Berechnung bleibt Kern.
- Ergebnis wird bei eingeloggten Nutzern im Profil gespeichert (nicht jedes Mal neu eingeben).
- Jedem der 20 Nahuales wird ein YouTube-Video zugeordnet, das im Profil des Nutzers erscheint.

#### 2a. Erweitertes Horoskop: Maya-Kreuz (umgesetzt)

- `/horoskop` hat einen Umschalter: **Nur Geburtsnahual** (wie bisher) oder **Erweitertes Horoskop**.
- Das erweiterte Horoskop zeigt das Maya-Kreuz ("Cruz Maya") mit fünf Positionen, berechnet aus
  realen Kalendertagen um den Geburtstag: Empfängnis/Ursprung (−8), männliche Kraft (−6),
  Geburts-Nahual/Zentrum (0), weibliche Kraft (+6), Reife/Bestimmung (+8).
- **Zugang:** vorerst frei. Später nur für angemeldete Nutzer — die Seite weist bereits darauf hin.
  Die Umstellung ist ein reiner Gate-Schritt: die Berechnung liegt vollständig in
  [`lib/maya-cross.ts`](lib/maya-cross.ts) und kann genauso serverseitig laufen.
- **Keine parallele Kalenderlogik:** Zahl und Nahual jeder Position kommen ausschließlich aus dem
  vorhandenen `calculateNahual()` in [`lib/nahual.ts`](lib/nahual.ts). Neu ist nur die
  Datums-Arithmetik (JDN-basiert, zeitzonenunabhängig).
- **Korrelation:** Die vorhandene pazmundo-Berechnung entspricht exakt der klassischen
  GMT-Korrelation 584283 — an allen 98.616 Tagen von 1830 bis 2099 nachgerechnet
  (`tests/maya-cross.test.ts`). Rechner mit anderer Korrelation (z. B. 584285) können um ein bis
  zwei Tage abweichen.
- **Grenzen:** Weil acht Tage vor und nach dem Geburtstag mitgerechnet werden, deckt das Kreuz
  9. Januar 1830 bis 23. Dezember 2099 ab (statt 1830–2099 wie das reine Geburtsnahual).
- **Mehrsprachigkeit:** Die sichtbaren Texte liegen unter sprachneutralen Schlüsseln in
  [`lib/maya-cross-texts.ts`](lib/maya-cross-texts.ts) und werden bei Punkt 6 zu `Record<Lang, …>`
  erweitert, ohne die UI anzufassen.

### 3. Tägliche persönliche Botschaft
- Für eingeloggte Nutzer: täglich eine Nachricht per **E-Mail**, was der heutige Tzolk'in-Tag für ihr Nahual bedeutet.
- **Textquelle (entschieden):** 20 feste Texte — einer je Tageszeichen — plus ein kurzer persönlicher Zusatz je nach Geburts-Nahual des Nutzers. Also 20 Tagestexte + 20 Nahual-Zusätze pro Sprache, statt 400 Einzelkombinationen.
- **Versand (entschieden):** Resend, ausgelöst von einer täglichen Netlify Scheduled Function.

### 4. YouTube-Integration
- Link zum Kanal in Header/Footer.
- Zuordnungstabelle Nahual → Video (siehe Datenmodell).
- **Stand:** Alle 20 Videos (eines je Nahual) existieren bereits auf dem Kanal. Nötig ist nur noch die Liste der Links/Video-IDs in der richtigen Reihenfolge, um `nahual_videos` zu befüllen.

### 5. Rituale & Workouts (bestehend, ausbaufähig)
- Weiter über Supabase `content_items` pflegen.
- Später denkbar: Verknüpfung "welches Ritual/Workout passt zu welchem Nahual".

### 6. Mehrsprachigkeit — **entschieden: vollständig DE/EN/ES**

Alles dreisprachig: Bildungsseiten, Horoskop-Ergebnis und die täglichen E-Mails (Sprache je Nutzer aus `profiles.preferred_language`). Spanisch ist für dieses Thema der größte Suchmarkt und damit zentral für das Referenz-Ziel.

**Arbeitsweise (festgelegt):** Deutsch ist die **Quellsprache**. Alle Inhalte werden auf Deutsch geliefert, Englisch und Spanisch werden daraus übersetzt. Für den Anfang bleibt es bei diesen drei Sprachen. Daraus folgt fürs Datenmodell und für alle Textdateien: der deutsche Text ist maßgeblich, fehlt eine Übersetzung, wird auf Deutsch zurückgefallen statt eine Lücke zu zeigen.

**Umsetzung:** `app/[lang]/…` mit den Präfixen `/de`, `/en`, `/es`.

> Sprechende Übersetzungen der URL-Pfade selbst (`/es/horoscopo-maya` statt `/es/horoskop`) bringen für SEO noch etwas zusätzlich, verdreifachen aber die Routing-Komplexität. Sie lassen sich später ohne Bruch per Weiterleitung nachrüsten — deshalb bewusst erst nach den Inhalten.

### 7. Bildungs-/Referenz-Ebene (Inhalte in DE/EN/ES)
- Die drei Weltebenen (Ober-/Mittelwelt, Xibalba) + Weltenbaum
- Kalendersysteme (Tzolk'in, Haab', Lange Zählung) — passend zum bestehenden Kalenderrad-Konzept auf der Startseite
- Götter & Mythologie (Popol Vuh, Heldenzwillinge, Maisgott)
- Zweck: inhaltliche Tiefe und Autorität für das SEO-/KI-Referenz-Ziel.

### 8. SEO & KI-Auffindbarkeit
- Saubere Metadata pro Seite, `hreflang` für DE/EN/ES
- Strukturierte Daten (schema.org: `Article`, `FAQPage`, ggf. `Person`/`Organization` für Paz Mundo)
- `sitemap.xml`, `robots.txt`
- Inhaltstiefe & interne Verlinkung als Voraussetzung, um von Google/KIs als Referenz zitiert zu werden

## Datenmodell (Supabase — Entwurf)

| Tabelle | Zweck | Wichtige Felder |
|---|---|---|
| `content_items` (existiert) | Rituale/Workouts | `type`, `title`, `description`, `theme` |
| `profiles` (neu) | Nutzerprofil | `user_id`, `display_name`, `birth_date`, `nahual_number`, `nahual_index`, `preferred_language`, `email_opt_in` |
| `nahual_videos` (neu) | Video pro Nahual | `nahual_index`, `youtube_video_id`, `title` |
| `day_sign_texts` (neu) | Tagestext je Tageszeichen | `nahual_index`, `lang`, `text` — 20 × 3 Sprachen |
| `nahual_traits` (neu) | Persönlicher Zusatz je Geburts-Nahual | `nahual_index`, `lang`, `text` — 20 × 3 Sprachen |

## Technische Voraussetzungen (aus der Code-Prüfung)

| Vorhaben | Was konkret nötig ist |
|---|---|
| Login (Google + Magic Link) | Paket `@supabase/ssr` ergänzen (aktuell nur `supabase-js`), dazu `middleware.ts` für die Session-Aktualisierung und eine Route `app/auth/callback/route.ts`. Google-OAuth muss zusätzlich in der Google Cloud Console und im Supabase-Dashboard konfiguriert werden. |
| Geschützte Profildaten | Row Level Security für `profiles` — anders als bei `content_items` (dort ist "public read" korrekt) darf jeder Nutzer nur seine eigene Zeile lesen/schreiben. |
| Mehrsprachigkeit | Im App Router über eine Ordnerstruktur `app/[lang]/…`. **Das verschiebt alle bestehenden Routen** — deshalb früh entscheiden, siehe Phasenplan. |
| Tägliche E-Mail | **Resend** als Versanddienst (Paket `resend`, API-Key als Umgebungsvariable — niemals ins Repo). Auslöser: Netlify Scheduled Function, da das Hosting ohnehin auf Netlify läuft. Für gute Zustellbarkeit muss die Absender-Domain bei Resend verifiziert werden (DNS-Einträge). |
| SEO | `app/sitemap.ts` und `app/robots.ts` (Next.js kann beides nativ), `generateMetadata` pro Seite, `hreflang` über die `[lang]`-Struktur, JSON-LD für strukturierte Daten. |

> Hinweis: In `.claude/settings.local.json` sind `git commit`, `git push`, `gh repo` und `gh auth` bereits freigegeben.

## Noch benötigte Angaben

Alle grundsätzlichen Entscheidungen sind getroffen. Für die Umsetzung fehlen nur noch diese Zulieferungen:

- **YouTube:** Kanal-URL und die 20 Video-Links/IDs, zugeordnet zu den Nahuales.
- **Domain:** Der Domainname (ist vorhanden). Wird bei Netlify hinterlegt und bei Resend als Absender-Domain per DNS verifiziert.
- **Texte:** 20 Tagestexte + 20 Nahual-Zusätze, je Sprache (DE/EN/ES).

## Ideen-Sammlung

Wird laufend erweitert. Noch nicht eingeplant, aber festgehalten, damit nichts verloren geht.

- **Teilbares Bild zum Geburts-Nahual:** Nach der Berechnung ein fertiges Bild zum Herunterladen — im Instagram-Format (1080 × 1350) und im TikTok-/Story-Format (1080 × 1920), mit Glyphe, Schwingungszahl, Nahual-Name und dezenter Paz-Mundo-Signatur. Starker Verbreitungshebel: Jeder geteilte Post verlinkt zurück auf die Seite und zahlt damit direkt auf das SEO-Ziel ein.

## Phasenplan

Reihenfolge bewusst so gewählt: erst das, was Nutzer sofort sehen und teilen können, zuletzt der automatische Versand.

1. **Admin-Dashboard** *(gebaut, siehe [SETUP.md](SETUP.md))*: Login über Google und Magic Link, Seitenmenü, Nutzer- und Textverwaltung, Videos, Rituale/Workouts, Versand-Einstellungen mit Testmail, Logik- und Statusansicht
2. **Sprachstruktur:** Umbau auf `app/[lang]/…`. Muss **vor** neuen öffentlichen Seiten passieren, sonst ziehen später alle Routen um. Konkrete Schritte siehe unten.
3. **Horoskop-Ausbau:** Video-Zuordnung pro Nahual, Ergebnis-Speicherung im Profil, teilbares Bild zum Download
4. **Bildungs-/Referenz-Ebene:** Weltebenen, Kalender, Mythologie in DE/EN/ES
5. **SEO:** Sitemap, robots, strukturierte Daten, `hreflang`, Metadata pro Seite
6. **Feinschliff:** Design, Performance, Barrierefreiheit
7. **Tägliche E-Mail an die Nutzer:** ganz zum Schluss — Resend anbinden, Absender-Domain verifizieren, Scheduled Function scharf schalten. Die Konfiguration dafür ist im Dashboard schon vorhanden, der automatische Versand wird erst hier aktiviert.

## Sprachumbau — Schrittfolge

Vorbereitet am 5. September 2026. Auszuführen auf **sauberem Arbeitsverzeichnis** (nichts Uncommittetes), weil dabei Dateien verschoben werden.

1. **Routen verschieben:** `app/(site)/…` → `app/[lang]/…`. Die Gruppe `(site)` hat ihren Zweck erfüllt — sie hat das Dashboard vom Website-Layout getrennt und macht den Umzug jetzt zu einem reinen Umbenennen.
2. **Sprachen festnageln:** `generateStaticParams()` gibt `de`, `en`, `es` zurück; ungültige Präfixe laufen auf `notFound()`.
3. **Einstieg regeln:** In `middleware.ts` `/` auf die passende Sprache leiten — erst Cookie (bewusste Wahl), sonst `Accept-Language`, sonst Deutsch. Ausgenommen bleiben `/admin`, `/login`, `/auth` und `/_next`.
4. **Alte URLs erhalten:** `/horoskop`, `/rituale`, `/workouts` dauerhaft auf `/de/…` weiterleiten. Nichts, was schon geteilt wurde, darf ins Leere laufen.
5. **Wörterbuch anlegen:** `lib/i18n/{de,en,es}.ts` für Oberflächentexte (Navigation, Knöpfe, Formularbeschriftungen), geladen über `getDictionary(lang)`. Deutsch ist die Vorlage.
6. **Inhaltstexte umstellen:** `lib/nahual-descriptions.ts` und `lib/maya-cross-texts.ts` von flachen Objekten auf `Record<Lang, …>`. **Fehlt eine Übersetzung, wird auf Deutsch zurückgefallen** — nie eine leere Stelle zeigen.
7. **Sprachumschalter** in die Kopfzeile, der den aktuellen Pfad beibehält (von `/en/horoskop` nach `/es/horoskop`, nicht zurück auf die Startseite) und die Wahl im Cookie merkt.
8. **Suchmaschinen bedienen:** `<html lang>` aus dem Routen-Parameter, `generateMetadata` mit `alternates.languages` für `hreflang`, dazu `x-default` auf Deutsch.
9. **Dashboard bleibt außen vor:** `/admin` bleibt einsprachig deutsch und außerhalb von `[lang]`.

Das Dashboard und die Anmeldung sind von Schritt 1 nicht betroffen — sie liegen bereits außerhalb von `(site)`.
