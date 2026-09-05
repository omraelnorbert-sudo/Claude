import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDevBypassActive } from "@/lib/dev-bypass";

/**
 * Client für alle Dashboard-Abfragen.
 *
 * Normalfall: der Session-Client. Die Zugriffsregeln in der Datenbank prüfen
 * die angemeldete Adresse — genau so läuft es auch live.
 *
 * Abkürzungsmodus: der Service-Role-Client, weil ohne Anmeldung keine
 * Identität existiert und jede Abfrage sonst leer zurückkäme.
 *
 * Achtung beim Testen: In diesem Modus greifen die RLS-Policies nicht. Fehler
 * darin fallen erst nach einer echten Anmeldung auf.
 */
export function createDataClient() {
  if (isDevBypassActive()) {
    const admin = createAdminClient();
    if (admin) return admin;
  }
  return createClient();
}

/** true, wenn im Abkürzungsmodus der Service-Role-Schlüssel fehlt. */
export function devBypassNeedsServiceKey(): boolean {
  return isDevBypassActive() && !process.env.SUPABASE_SERVICE_ROLE_KEY;
}
