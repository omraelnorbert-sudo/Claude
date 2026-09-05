# Einrichtung

Was einmalig zu tun ist, damit das Dashboard unter `/admin` läuft. Reihenfolge einhalten — Schritt 1 und 2 genügen, um dich anzumelden.

## 1. Datenbank-Schema einspielen

1. Supabase öffnen → dein Projekt → **SQL Editor**
2. Inhalt von [`supabase/schema_admin.sql`](supabase/schema_admin.sql) hineinkopieren und ausführen

Das legt die Tabellen `profiles`, `nahual_videos`, `day_sign_texts`, `nahual_traits`, `send_settings`, `email_log` und `admins` an, setzt die Zugriffsregeln und trägt deine Adresse als Admin ein. Die Datei ist so gebaut, dass sie gefahrlos mehrfach laufen kann.

Es werden dabei bereits 20 × 3 leere Textzeilen angelegt, damit im Dashboard sofort alle Felder zum Ausfüllen bereitstehen.

## 2. Anmelden

Zwei Wege stehen offen:

**Magic Link** — funktioniert sofort, ohne weitere Einrichtung. Auf `/login` deine Adresse eintragen, den Link aus der E-Mail anklicken, fertig.

**Google** — braucht einmalige Konfiguration:

1. In der [Google Cloud Console](https://console.cloud.google.com/apis/credentials) eine **OAuth-Client-ID** vom Typ *Webanwendung* anlegen
2. Als autorisierten Weiterleitungs-URI eintragen: `https://<dein-projekt>.supabase.co/auth/v1/callback`
3. Client-ID und Client-Secret in Supabase unter **Authentication → Providers → Google** hinterlegen und den Provider aktivieren
4. In Supabase unter **Authentication → URL Configuration** die Site-URL und als zusätzliche Redirect-URL `http://localhost:3000/auth/callback` sowie später die Adresse deiner Domain eintragen

Nur `omraelnorbert@gmail.com` kommt ins Dashboard. Weitere Admins fügst du in der Tabelle `admins` hinzu.

## 3. Umgebungsvariablen

In `.env.local` (lokal) und bei Netlify unter **Site configuration → Environment variables**:

| Variable | Wofür | Wann nötig |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Verbindung zur Datenbank | sofort |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Verbindung zur Datenbank | sofort |
| `SUPABASE_SERVICE_ROLE_KEY` | Nutzerkonten anlegen und löschen | für die Nutzerverwaltung |
| `RESEND_API_KEY` | E-Mail-Versand | zuletzt |
| `ADMIN_EMAILS` | Rückfallebene für den Dashboard-Zugang | optional |

Den Service-Role-Schlüssel findest du in Supabase unter **Project Settings → API**.

> **Wichtig:** Der Service-Role-Schlüssel umgeht sämtliche Zugriffsregeln. Er darf nie mit `NEXT_PUBLIC_` beginnen und nie ins Repository — `.env.local` steht bereits in `.gitignore`.

## 4. Lokal starten

```bash
npm run dev
```

Dashboard: `http://localhost:3000/admin`

## 5. Netlify

Das Repository ist bereits mit Netlify verbunden, `netlify.toml` und `@netlify/plugin-nextjs` sind eingerichtet. Nach dem ersten Deploy noch:

1. Die Umgebungsvariablen aus Schritt 3 eintragen
2. Deine Domain unter **Domain management** hinzufügen
3. Die Domain in Supabase unter **Authentication → URL Configuration** als Site-URL nachtragen, sonst laufen die Anmelde-Links ins Leere

## 6. E-Mail-Versand (kommt zuletzt)

Erst wenn alle Texte stehen:

1. Bei [Resend](https://resend.com) die Absender-Domain verifizieren (DNS-Einträge setzen)
2. `RESEND_API_KEY` als Umgebungsvariable eintragen
3. Im Dashboard unter **Versand → Einstellungen** Absenderadresse und Uhrzeit setzen
4. Mit **Testmail** prüfen, ob alles ankommt
5. Erst dann den Haken bei „Täglichen Versand aktivieren" setzen
