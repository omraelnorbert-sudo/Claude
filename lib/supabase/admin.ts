import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client mit Service-Role-Schlüssel — umgeht RLS.
 *
 * Nur serverseitig verwenden (Server Actions, Netlify Functions), niemals in
 * Client Components. Der Schlüssel darf ausschließlich als
 * SUPABASE_SERVICE_ROLE_KEY gesetzt sein, nie mit NEXT_PUBLIC_-Präfix.
 *
 * Nötig für Aufgaben, die kein Nutzerkonto erledigen kann: Nutzer anlegen,
 * Nutzerliste aus auth.users lesen, täglicher E-Mail-Versand ohne Login.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function isServiceRoleConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
