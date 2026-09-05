"use client";

import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import {
  saveSendSettingsAction,
  sendTestEmailAction,
  type ActionResult,
} from "@/app/admin/actions";
import type { SendSettings } from "@/lib/admin-data";
import { NAHUALES } from "@/lib/nahual";
import { LANGUAGES, LANGUAGE_LABELS } from "@/lib/tzolkin";

const TIMEZONES = [
  "Europe/Zurich",
  "Europe/Berlin",
  "Europe/Madrid",
  "America/Guatemala",
  "America/Mexico_City",
  "UTC",
];

export function SettingsForm({ settings }: { settings: SendSettings }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    saveSendSettingsAction,
    null,
  );

  return (
    <form action={formAction}>
      {state && (
        <p
          className={`admin-note ${state.ok ? "" : "admin-note-error"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <div className="admin-form">
        <div className="admin-form-wide">
          <label className="admin-check">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={settings.enabled}
            />
            <span>
              <strong>Täglichen Versand aktivieren.</strong> Solange der Haken
              fehlt, verschickt der Zeitplan nichts — Testmails funktionieren
              trotzdem.
            </span>
          </label>
        </div>

        <div className="field">
          <label htmlFor="send_hour">Uhrzeit</label>
          <select
            id="send_hour"
            name="send_hour"
            defaultValue={String(settings.send_hour)}
          >
            {Array.from({ length: 24 }, (_, hour) => (
              <option key={hour} value={hour}>
                {String(hour).padStart(2, "0")}:00
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="timezone">Zeitzone</label>
          <select
            id="timezone"
            name="timezone"
            defaultValue={settings.timezone}
          >
            {TIMEZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <p className="admin-field-hint">
            Bestimmt auch, wann ein neuer Tag beginnt — und damit das
            Tageszeichen wechselt.
          </p>
        </div>

        <div className="field">
          <label htmlFor="from_name">Absendername</label>
          <input
            id="from_name"
            name="from_name"
            type="text"
            defaultValue={settings.from_name}
          />
        </div>

        <div className="field">
          <label htmlFor="from_email">Absenderadresse</label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            placeholder="botschaft@deine-domain.ch"
            defaultValue={settings.from_email ?? ""}
          />
          <p className="admin-field-hint">
            Die Domain muss bei Resend verifiziert sein.
          </p>
        </div>

        <div className="field">
          <label htmlFor="reply_to">Antwortadresse</label>
          <input
            id="reply_to"
            name="reply_to"
            type="email"
            placeholder="optional"
            defaultValue={settings.reply_to ?? ""}
          />
        </div>

        <div className="field admin-form-wide">
          <label htmlFor="subject_template">Betreffzeile</label>
          <input
            id="subject_template"
            name="subject_template"
            type="text"
            defaultValue={settings.subject_template}
          />
          <p className="admin-field-hint">
            Platzhalter: <code>{"{nahual}"}</code> für das Tageszeichen,{" "}
            <code>{"{zahl}"}</code> für die Schwingungszahl,{" "}
            <code>{"{name}"}</code> für den Namen der Person.
          </p>
        </div>

        <div className="admin-form-wide admin-actions">
          <SaveButton>Einstellungen speichern</SaveButton>
        </div>
      </div>
    </form>
  );
}

export function TestMailForm({
  defaultRecipient,
  hasApiKey,
}: {
  defaultRecipient: string;
  hasApiKey: boolean;
}) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    sendTestEmailAction,
    null,
  );

  return (
    <form action={formAction}>
      {!hasApiKey && (
        <p className="admin-note admin-note-error">
          <code>RESEND_API_KEY</code> fehlt. Ohne ihn lässt sich nichts
          verschicken.
        </p>
      )}

      {state && (
        <p
          className={`admin-note ${state.ok ? "" : "admin-note-error"}`}
          role="status"
        >
          {state.message}
        </p>
      )}

      <div className="admin-form">
        <div className="field">
          <label htmlFor="recipient">Empfänger</label>
          <input
            id="recipient"
            name="recipient"
            type="email"
            defaultValue={defaultRecipient}
          />
        </div>

        <div className="field">
          <label htmlFor="test-lang">Sprache</label>
          <select id="test-lang" name="lang" defaultValue="de">
            {LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_LABELS[code]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="test-nahual">Als Person mit Geburtsnahual</label>
          <select id="test-nahual" name="birth_nahual_index" defaultValue="1">
            {NAHUALES.map((name, position) => (
              <option key={name} value={position + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-wide admin-actions">
          <SaveButton
            className="admin-btn-ghost"
            pendingLabel="Wird verschickt …"
          >
            Testmail senden
          </SaveButton>
        </div>
      </div>
    </form>
  );
}
