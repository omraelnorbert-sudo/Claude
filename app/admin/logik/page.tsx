import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import NahualTester from "@/components/admin/NahualTester";
import { getSendSettings } from "@/lib/admin-data";
import { createClient } from "@/lib/supabase/server";
import { isServiceRoleConfigured } from "@/lib/supabase/admin";
import { NAHUALES, glyphSrcForIndex } from "@/lib/nahual";
import {
  LANGUAGES,
  LANGUAGE_LABELS,
  composeMessage,
  formatDate,
  hourInTimeZone,
  nahualNameByIndex,
  nahualOfToday,
  type Lang,
} from "@/lib/tzolkin";

export const dynamic = "force-dynamic";

export default async function LogikPage({
  searchParams,
}: {
  searchParams: { nahual?: string; lang?: string };
}) {
  const { settings, error } = await getSendSettings();
  const today = nahualOfToday(settings.timezone);

  const birthIndex = Math.min(
    20,
    Math.max(1, Number(searchParams.nahual) || 1),
  );
  const lang: Lang = LANGUAGES.includes(searchParams.lang as Lang)
    ? (searchParams.lang as Lang)
    : "de";

  const supabase = createClient();
  const [dayText, traitText] = await Promise.all([
    supabase
      .from("day_sign_texts")
      .select("text")
      .eq("nahual_index", today.index)
      .eq("lang", lang)
      .maybeSingle(),
    supabase
      .from("nahual_traits")
      .select("text")
      .eq("nahual_index", birthIndex)
      .eq("lang", lang)
      .maybeSingle(),
  ]);

  const preview = composeMessage({
    dayNahualIndex: today.index,
    dayNumber: today.number,
    birthNahualIndex: birthIndex,
    dayText: dayText.data?.text ?? null,
    traitText: traitText.data?.text ?? null,
    subjectTemplate: settings.subject_template,
    displayName: "Maria",
    lang,
  });

  const currentHour = hourInTimeZone(settings.timezone);
  const hoursUntilSend = (settings.send_hour - currentHour + 24) % 24;

  const checks = [
    {
      label: "Supabase",
      ok: true,
      hint: "Verbindung steht — diese Seite liest gerade daraus.",
    },
    {
      label: "Datenbank-Schema",
      ok: !error,
      hint: error ?? "Alle Tabellen vorhanden.",
    },
    {
      label: "Service-Role-Schlüssel",
      ok: isServiceRoleConfigured(),
      hint: isServiceRoleConfigured()
        ? "Nutzer anlegen und löschen ist möglich."
        : "SUPABASE_SERVICE_ROLE_KEY fehlt — Konten lassen sich nicht anlegen.",
    },
    {
      label: "Resend",
      ok: Boolean(process.env.RESEND_API_KEY),
      hint: process.env.RESEND_API_KEY
        ? "API-Schlüssel ist hinterlegt."
        : "RESEND_API_KEY fehlt — wird erst für den Versand gebraucht.",
    },
    {
      label: "Absenderadresse",
      ok: Boolean(settings.from_email),
      hint: settings.from_email ?? "Unter Versand → Einstellungen hinterlegen.",
    },
  ];

  return (
    <>
      <PageHead
        eyebrow="System"
        title="Logik & Status"
        description="Wie die Berechnung funktioniert, was heute gilt, und woran es gerade noch fehlt."
      />

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Heute</h2>
            <p>
              Das Tageszeichen gilt für alle gleich. Es wechselt um Mitternacht
              in der eingestellten Zeitzone.
            </p>
          </div>
        </div>
        <div className="admin-panel-body">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              flexWrap: "wrap",
            }}
          >
            <Image
              src={today.glyphSrc}
              alt=""
              width={96}
              height={96}
              className="admin-glyph"
              style={{ width: 96, height: 96 }}
            />
            <dl className="admin-kv">
              <dt>Datum</dt>
              <dd>
                {formatDate(today.date)} · {settings.timezone}
              </dd>
              <dt>Tageszeichen</dt>
              <dd>
                {today.number} {today.name} (Nahual {today.index} von 20)
              </dd>
              <dt>Nächster Versand</dt>
              <dd>
                {settings.enabled
                  ? `in ${hoursUntilSend} Stunden, um ${String(settings.send_hour).padStart(2, "0")}:00`
                  : "ausgeschaltet"}
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>So entsteht eine Botschaft</h2>
          </div>
        </div>
        <div className="admin-panel-body">
          <ol style={{ fontSize: 17, lineHeight: 1.6, paddingLeft: "1.2em" }}>
            <li>
              Aus dem heutigen Datum wird das Tageszeichen berechnet — heute{" "}
              <strong>
                {today.number} {today.name}
              </strong>
              .
            </li>
            <li>
              Dazu wird der <Link href="/admin/texte?art=tag">Tagestext</Link>{" "}
              dieses Zeichens in der Sprache der Person geladen.
            </li>
            <li>
              Aus dem Geburtsdatum der Person ergibt sich ihr Geburtsnahual,
              dazu kommt der{" "}
              <Link href="/admin/texte?art=zusatz">persönliche Zusatz</Link>.
            </li>
            <li>
              Beide Texte zusammen ergeben die E-Mail. Fehlt einer, wird nichts
              verschickt — lieber keine Post als eine halbe.
            </li>
          </ol>

          <p className="admin-note">
            Die Berechnung selbst stammt aus <code>lib/nahual.ts</code> und ist
            von pazmundo.com übernommen. 13 Schwingungszahlen und 20 Nahuales
            ergeben zusammen den 260-Tage-Zyklus des Tzolk&apos;in.
          </p>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Vorschau</h2>
            <p>So sähe die heutige Botschaft aus.</p>
          </div>
        </div>
        <div className="admin-panel-body">
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              flexWrap: "wrap",
              marginBottom: "var(--space-3)",
            }}
          >
            <div className="admin-tabs">
              {LANGUAGES.map((code) => (
                <Link
                  key={code}
                  href={`/admin/logik?nahual=${birthIndex}&lang=${code}`}
                  aria-current={code === lang ? "true" : undefined}
                >
                  {LANGUAGE_LABELS[code]}
                </Link>
              ))}
            </div>

            <div className="field">
              <label htmlFor="preview-nahual" className="sr-only">
                Geburtsnahual
              </label>
              <form
                action="/admin/logik"
                method="get"
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <input type="hidden" name="lang" value={lang} />
                <select
                  id="preview-nahual"
                  name="nahual"
                  defaultValue={String(birthIndex)}
                >
                  {NAHUALES.map((name, position) => (
                    <option key={name} value={position + 1}>
                      Geburtsnahual: {name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="admin-btn-ghost admin-btn-small"
                >
                  Anzeigen
                </button>
              </form>
            </div>
          </div>

          <div className="admin-preview">
            <div className="admin-preview-subject">
              Betreff: {preview.subject}
            </div>
            {preview.paragraphs.length === 0 ? (
              <p className="admin-empty">
                Für {nahualNameByIndex(today.index)} ist auf{" "}
                {LANGUAGE_LABELS[lang]} noch kein Text hinterlegt.
              </p>
            ) : (
              preview.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Berechnung prüfen</h2>
            <p>
              Ein beliebiges Datum eingeben und das Ergebnis mit deiner eigenen
              Tabelle vergleichen.
            </p>
          </div>
        </div>
        <div className="admin-panel-body">
          <NahualTester />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Systemstatus</h2>
          </div>
        </div>
        <div className="admin-panel-body">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <tbody>
                {checks.map((check) => (
                  <tr key={check.label}>
                    <td style={{ width: 200 }}>{check.label}</td>
                    <td style={{ width: 120 }}>
                      <span
                        className={`admin-pill ${check.ok ? "admin-pill-ok" : "admin-pill-warn"}`}
                      >
                        {check.ok ? "bereit" : "offen"}
                      </span>
                    </td>
                    <td>{check.hint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
