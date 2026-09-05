import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Admin-Adressen aus der Umgebung. Dient als Rückfallebene, damit das
 * Dashboard auch dann erreichbar ist, wenn das SQL-Schema (Tabelle `admins`)
 * noch nicht eingespielt wurde.
 */
export function adminEmailsFromEnv(): string[] {
  return (process.env.ADMIN_EMAILS ?? "omraelnorbert@gmail.com")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export type AdminSession = {
  user: User | null;
  isAdmin: boolean;
  /** true, sobald die Admin-Rolle aus der Datenbank bestätigt wurde. */
  confirmedByDatabase: boolean;
};

export async function getAdminSession(): Promise<AdminSession> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, isAdmin: false, confirmedByDatabase: false };

  const email = (user.email ?? "").toLowerCase();
  const allowedByEnv = adminEmailsFromEnv().includes(email);

  // Maßgeblich ist die Datenbank: dieselbe Funktion entscheidet in den
  // RLS-Policies über Schreibrechte.
  const { data, error } = await supabase.rpc("is_admin");
  const allowedByDatabase = error ? false : data === true;

  return {
    user,
    isAdmin: allowedByDatabase || allowedByEnv,
    confirmedByDatabase: allowedByDatabase,
  };
}
