import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { getAdminSession } from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import "./admin.css";

export const metadata: Metadata = {
  title: "Dashboard — Cosmovision Maya",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="eyebrow">Einrichtung</div>
          <h1 className="auth-title">Supabase fehlt</h1>
          <p className="auth-lead">
            Trage <code>NEXT_PUBLIC_SUPABASE_URL</code> und{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code>.env.local</code> ein und starte den Server neu.
          </p>
        </div>
      </div>
    );
  }

  const { user, isAdmin } = await getAdminSession();

  if (!user) redirect("/login?next=/admin");

  if (!isAdmin) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="eyebrow">Kein Zugriff</div>
          <h1 className="auth-title">Nur für Admins</h1>
          <p className="auth-lead">
            Du bist als {user.email} angemeldet. Dieses Konto ist nicht in der
            Tabelle <code>admins</code> eingetragen.
          </p>
          <form action="/auth/signout" method="post">
            <button type="submit">Abmelden</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <Sidebar email={user.email ?? null} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
