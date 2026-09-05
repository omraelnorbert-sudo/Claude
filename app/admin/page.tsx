import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import {
  getEmailLog,
  getProfiles,
  getSendSettings,
  getTextCompletion,
} from "@/lib/admin-data";
import { isServiceRoleConfigured } from "@/lib/supabase/admin";
import { formatDate, nahualOfToday } from "@/lib/tzolkin";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [{ settings, error: settingsError }, { profiles }, texts, log] =
    await Promise.all([
      getSendSettings(),
      getProfiles(),
      getTextCompletion(),
      getEmailLog(5),
    ]);

  const today = nahualOfToday(settings.timezone);
  const optIn = profiles.filter((profile) => profile.email_opt_in).length;
  const withNahual = profiles.filter((profile) => profile.nahual_index).length;
  const filledTexts = texts.dayTexts + texts.traits;

  const setupIssues = [
    settingsError && {
      label: "Datenbank-Schema",
      hint: "supabase/schema_admin.sql im Supabase SQL Editor ausführen.",
    },
    !isServiceRoleConfigured() && {
      label: "SUPABASE_SERVICE_ROLE_KEY",
      hint: "Wird gebraucht, um Konten anzulegen oder zu löschen.",
    },
    !process.env.RESEND_API_KEY && {
      label: "RESEND_API_KEY",
      hint: "Wird erst für den E-Mail-Versand gebraucht.",
    },
    !settings.from_email && {
      label: "Absenderadresse",
      hint: "Unter Versand → Einstellungen hinterlegen.",
    },
  ].filter(Boolean) as { label: string; hint: string }[];

  return (
    <>
      <PageHead
        eyebrow="Überblick"
        title="Dashboard"
        description="Der aktuelle Stand von Inhalten, Nutzern und Versand auf einen Blick."
      />

      {settingsError && (
        <p className="admin-note admin-note-error">{settingsError}</p>
      )}

      <div className="admin-grid">
        <div className="admin-tile">
          <span className="admin-tile-label">Tageszeichen heute</span>
          <span className="admin-tile-value">
            {today.number} {today.name}
          </span>
          <span className="admin-tile-hint">{formatDate(today.date)}</span>
        </div>

        <div className="admin-tile">
          <span className="admin-tile-label">Nutzer</span>
          <span className="admin-tile-value">{profiles.length}</span>
          <span className="admin-tile-hint">
            {withNahual} mit berechnetem Nahual
          </span>
        </div>

        <div className="admin-tile">
          <span className="admin-tile-label">Möchten Post</span>
          <span className="admin-tile-value">{optIn}</span>
          <span className="admin-tile-hint">
            {profiles.length - optIn} haben abbestellt
          </span>
        </div>

        <div className="admin-tile">
          <span className="admin-tile-label">Texte gefüllt</span>
          <span className="admin-tile-value">
            {filledTexts}
            <span style={{ fontSize: 20, color: "var(--label)" }}>/120</span>
          </span>
          <span className="admin-tile-hint">
            {texts.dayTexts} Tagestexte · {texts.traits} Zusätze
          </span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Versand</h2>
            <p>
              Die tägliche E-Mail wird erst ganz zum Schluss scharf geschaltet.
              Bis dahin lässt sich hier alles vorbereiten und testen.
            </p>
          </div>
          <span
            className={`admin-pill ${settings.enabled ? "admin-pill-ok" : "admin-pill-off"}`}
          >
            {settings.enabled ? "Aktiv" : "Ausgeschaltet"}
          </span>
        </div>
        <div className="admin-panel-body">
          <dl className="admin-kv">
            <dt>Uhrzeit</dt>
            <dd>
              {String(settings.send_hour).padStart(2, "0")}:00 Uhr ·{" "}
              {settings.timezone}
            </dd>
            <dt>Absender</dt>
            <dd>
              {settings.from_email
                ? `${settings.from_name} <${settings.from_email}>`
                : "— noch nicht hinterlegt —"}
            </dd>
            <dt>Empfänger</dt>
            <dd>
              {optIn} {optIn === 1 ? "Person" : "Personen"} mit Einwilligung
            </dd>
          </dl>
          <div className="admin-actions">
            <Link href="/admin/versand" className="btn admin-btn-small">
              Einstellungen öffnen
            </Link>
            <Link
              href="/admin/texte"
              className="btn admin-btn-ghost admin-btn-small"
            >
              Texte pflegen
            </Link>
          </div>
        </div>
      </section>

      {setupIssues.length > 0 && (
        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Noch einzurichten</h2>
              <p>
                Alles andere funktioniert bereits — diese Punkte fehlen noch für
                den vollen Funktionsumfang.
              </p>
            </div>
          </div>
          <div className="admin-panel-body">
            <div className="admin-table-wrap">
              <table className="admin-table">
                <tbody>
                  {setupIssues.map((issue) => (
                    <tr key={issue.label}>
                      <td style={{ width: 220 }}>
                        <span className="admin-pill admin-pill-warn">
                          {issue.label}
                        </span>
                      </td>
                      <td>{issue.hint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Letzte Sendungen</h2>
          </div>
          <Link
            href="/admin/protokoll"
            className="btn admin-btn-ghost admin-btn-small"
          >
            Ganzes Protokoll
          </Link>
        </div>
        <div className="admin-panel-body">
          {log.rows.length === 0 ? (
            <p className="admin-empty">Noch nichts verschickt.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Zeitpunkt</th>
                    <th>Empfänger</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {log.rows.map((row) => (
                    <tr key={row.id}>
                      <td className="num">
                        {new Date(row.created_at).toLocaleString("de-CH")}
                      </td>
                      <td>{row.email}</td>
                      <td>
                        <span
                          className={`admin-pill ${row.status === "sent" ? "admin-pill-ok" : "admin-pill-error"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
