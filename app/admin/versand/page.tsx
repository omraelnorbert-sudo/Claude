import PageHead from "@/components/admin/PageHead";
import {
  SettingsForm,
  TestMailForm,
} from "@/components/admin/SendSettingsForm";
import { getAdminSession } from "@/lib/admin";
import { getProfiles, getSendSettings } from "@/lib/admin-data";
import { hourInTimeZone, nahualOfToday } from "@/lib/tzolkin";

export const dynamic = "force-dynamic";

export default async function VersandPage() {
  const [{ settings, error }, { profiles }, { user }] = await Promise.all([
    getSendSettings(),
    getProfiles(),
    getAdminSession(),
  ]);

  const today = nahualOfToday(settings.timezone);
  const currentHour = hourInTimeZone(settings.timezone);
  const recipients = profiles.filter(
    (profile) => profile.email_opt_in && profile.nahual_index,
  ).length;

  return (
    <>
      <PageHead
        eyebrow="Versand"
        title="Einstellungen"
        description="Hier wird festgelegt, wann und von wem die tägliche Botschaft verschickt wird. Der automatische Versand geht erst ganz am Ende des Projekts live — Testmails kannst du jederzeit schicken."
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <div className="admin-grid">
        <div className="admin-tile">
          <span className="admin-tile-label">Status</span>
          <span className="admin-tile-value" style={{ fontSize: 26 }}>
            {settings.enabled ? "Aktiv" : "Aus"}
          </span>
          <span className="admin-tile-hint">
            {settings.enabled
              ? `Versand täglich um ${String(settings.send_hour).padStart(2, "0")}:00`
              : "Es wird nichts automatisch verschickt"}
          </span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Empfänger</span>
          <span className="admin-tile-value">{recipients}</span>
          <span className="admin-tile-hint">
            mit Einwilligung und Geburtsnahual
          </span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Ortszeit</span>
          <span className="admin-tile-value">
            {String(currentHour).padStart(2, "0")}:00
          </span>
          <span className="admin-tile-hint">{settings.timezone}</span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Zeichen heute</span>
          <span className="admin-tile-value" style={{ fontSize: 28 }}>
            {today.number} {today.name}
          </span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Zeitplan und Absender</h2>
          </div>
        </div>
        <div className="admin-panel-body">
          <SettingsForm settings={settings} />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Testmail</h2>
            <p>
              Verschickt die echte Botschaft für heute — mit dem Tagestext des
              aktuellen Zeichens und dem Zusatz des gewählten Geburtsnahuals.
            </p>
          </div>
        </div>
        <div className="admin-panel-body">
          <TestMailForm
            defaultRecipient={user?.email ?? ""}
            hasApiKey={Boolean(process.env.RESEND_API_KEY)}
          />
        </div>
      </section>
    </>
  );
}
