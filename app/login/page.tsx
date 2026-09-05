import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Anmelden — Cosmovision Maya",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="eyebrow">Paz Mundo</div>
        <h1 className="auth-title">Anmelden</h1>
        <p className="auth-lead">
          Melde dich an, um dein Nahual zu speichern und deine täglichen
          Botschaften zu verwalten.
        </p>

        {searchParams.error && (
          <p className="auth-error" role="alert">
            Anmeldung fehlgeschlagen: {searchParams.error}
          </p>
        )}

        {isSupabaseConfigured() ? (
          <LoginForm next={searchParams.next ?? "/admin"} />
        ) : (
          <p className="auth-error">
            Supabase ist nicht konfiguriert. Trage NEXT_PUBLIC_SUPABASE_URL und
            NEXT_PUBLIC_SUPABASE_ANON_KEY in <code>.env.local</code> ein.
          </p>
        )}
      </div>
    </div>
  );
}
