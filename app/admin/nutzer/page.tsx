import PageHead from "@/components/admin/PageHead";
import { CreateUserForm, UserTable } from "@/components/admin/UserManager";
import { getProfiles } from "@/lib/admin-data";
import { isServiceRoleConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function NutzerPage() {
  const { profiles, error } = await getProfiles();
  const canCreate = isServiceRoleConfigured();

  const optIn = profiles.filter((profile) => profile.email_opt_in).length;
  const withNahual = profiles.filter((profile) => profile.nahual_index).length;

  return (
    <>
      <PageHead
        eyebrow="Menschen"
        title="Nutzer"
        description="Konten anlegen, Geburtsdaten ergänzen und sehen, wer tägliche Post bekommen möchte. Das Nahual wird aus dem Geburtsdatum berechnet, sobald du es einträgst."
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <div className="admin-grid">
        <div className="admin-tile">
          <span className="admin-tile-label">Konten</span>
          <span className="admin-tile-value">{profiles.length}</span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Mit Nahual</span>
          <span className="admin-tile-value">{withNahual}</span>
          <span className="admin-tile-hint">Geburtsdatum hinterlegt</span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Möchten Post</span>
          <span className="admin-tile-value">{optIn}</span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Neuen Nutzer anlegen</h2>
            <p>
              Normalerweise registrieren sich Menschen selbst über die Website.
              Hier legst du von Hand an, etwa für Kundinnen aus dem Coaching.
            </p>
          </div>
        </div>
        <div className="admin-panel-body">
          <CreateUserForm canCreate={canCreate} />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Alle Nutzer</h2>
            <p>Änderungen werden sofort gespeichert.</p>
          </div>
        </div>
        <div className="admin-panel-body">
          <UserTable profiles={profiles} />
        </div>
      </section>
    </>
  );
}
