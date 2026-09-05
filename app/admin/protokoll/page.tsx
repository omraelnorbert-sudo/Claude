import PageHead from "@/components/admin/PageHead";
import { getEmailLog } from "@/lib/admin-data";
import { nahualNameByIndex } from "@/lib/tzolkin";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  sent: "admin-pill-ok",
  failed: "admin-pill-error",
  skipped: "admin-pill-off",
};

const STATUS_LABEL: Record<string, string> = {
  sent: "verschickt",
  failed: "fehlgeschlagen",
  skipped: "übersprungen",
};

export default async function ProtokollPage() {
  const { rows, error } = await getEmailLog(200);

  const sent = rows.filter((row) => row.status === "sent").length;
  const failed = rows.filter((row) => row.status === "failed").length;

  return (
    <>
      <PageHead
        eyebrow="Versand"
        title="Protokoll"
        description="Jede verschickte, fehlgeschlagene und übersprungene E-Mail — die letzten 200 Einträge."
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <div className="admin-grid">
        <div className="admin-tile">
          <span className="admin-tile-label">Verschickt</span>
          <span className="admin-tile-value">{sent}</span>
        </div>
        <div className="admin-tile">
          <span className="admin-tile-label">Fehlgeschlagen</span>
          <span className="admin-tile-value">{failed}</span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-body">
          {rows.length === 0 ? (
            <p className="admin-empty">
              Noch keine Einträge. Sobald der Versand läuft, erscheint hier
              jede einzelne Sendung.
            </p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Zeitpunkt</th>
                    <th>Empfänger</th>
                    <th>Tageszeichen</th>
                    <th>Sprache</th>
                    <th>Status</th>
                    <th>Anmerkung</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="num">
                        {new Date(row.created_at).toLocaleString("de-CH")}
                      </td>
                      <td>{row.email ?? "—"}</td>
                      <td>
                        {row.day_nahual_index
                          ? nahualNameByIndex(row.day_nahual_index)
                          : "—"}
                      </td>
                      <td className="num">
                        {row.lang?.toUpperCase() ?? "—"}
                      </td>
                      <td>
                        <span
                          className={`admin-pill ${STATUS_STYLE[row.status] ?? "admin-pill-off"}`}
                        >
                          {STATUS_LABEL[row.status] ?? row.status}
                        </span>
                      </td>
                      <td>{row.error ?? ""}</td>
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
