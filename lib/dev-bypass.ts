/**
 * Lokale Abkürzung: Dashboard ohne Anmeldung öffnen.
 *
 * Zwei Schlösser, die BEIDE offen sein müssen:
 *
 * 1. `NODE_ENV === "development"` — `next build` setzt den Wert fest auf
 *    "production". Auf Netlify ist die Abkürzung damit schon tot, bevor
 *    irgendeine Einstellung gelesen wird.
 * 2. `DEV_ADMIN_BYPASS === "true"` — muss ausdrücklich in `.env.local`
 *    gesetzt werden. Diese Datei steht in `.gitignore` und existiert bei
 *    Netlify nicht.
 *
 * Zusätzlich zeigt das Dashboard ein Warnband, solange die Abkürzung aktiv
 * ist — sie kann also nicht unbemerkt eingeschaltet bleiben.
 */
export function isDevBypassActive(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_ADMIN_BYPASS === "true"
  );
}

/**
 * Unter welcher Adresse man im Abkürzungsmodus unterwegs ist. Nur fürs
 * Anzeigen — die Datenbank sieht in diesem Modus den Service-Role-Zugang.
 */
export function devBypassEmail(): string {
  return (process.env.ADMIN_EMAILS ?? "omraelnorbert@gmail.com")
    .split(",")[0]
    .trim();
}
