import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import TextEditor, { type EditorRow } from "@/components/admin/TextEditor";
import { getTexts } from "@/lib/admin-data";
import { NAHUALES, glyphSrcForIndex } from "@/lib/nahual";
import { LANGUAGES, LANGUAGE_LABELS, type Lang } from "@/lib/tzolkin";

export const dynamic = "force-dynamic";

const KINDS = {
  tag: {
    table: "day_sign_texts" as const,
    title: "Tagestexte",
    description:
      "Ein Text je Tageszeichen: Was bedeutet dieser Tag? Erscheint auf der öffentlichen Nahual-Seite und geht an einem Tag an alle Nutzer.",
    placeholder: "Was bringt dieser Tag? Worauf lohnt es sich zu achten?",
  },
  zusatz: {
    table: "nahual_traits" as const,
    title: "Persönliche Zusätze",
    description:
      "Ein Text je Geburts-Nahual. Er wird an den Tagestext angehängt und macht die Botschaft persönlich.",
    placeholder:
      "Was zeichnet Menschen mit diesem Geburtsnahual aus? Was heißt das für ihren Tag?",
  },
};

type KindKey = keyof typeof KINDS;

export default async function TextePage({
  searchParams,
}: {
  searchParams: { art?: string; lang?: string };
}) {
  const kindKey: KindKey =
    searchParams.art === "zusatz" ? "zusatz" : "tag";
  const kind = KINDS[kindKey];

  const lang: Lang = LANGUAGES.includes(searchParams.lang as Lang)
    ? (searchParams.lang as Lang)
    : "de";

  const { rows, error } = await getTexts(kind.table, lang);
  const byIndex = new Map(rows.map((row) => [row.nahual_index, row.text]));

  const editorRows: EditorRow[] = NAHUALES.map((name, position) => {
    const nahualIndex = position + 1;
    return {
      nahualIndex,
      name,
      glyphSrc: glyphSrcForIndex(nahualIndex),
      text: byIndex.get(nahualIndex) ?? "",
    };
  });

  const filled = editorRows.filter((row) => row.text.trim().length > 0).length;

  return (
    <>
      <PageHead
        eyebrow="Inhalte"
        title={kind.title}
        description={kind.description}
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          alignItems: "center",
          marginBottom: "var(--space-4)",
        }}
      >
        <div className="admin-tabs">
          {(Object.keys(KINDS) as KindKey[]).map((key) => (
            <Link
              key={key}
              href={`/admin/texte?art=${key}&lang=${lang}`}
              aria-current={key === kindKey ? "true" : undefined}
            >
              {KINDS[key].title}
            </Link>
          ))}
        </div>

        <div className="admin-tabs">
          {LANGUAGES.map((code) => (
            <Link
              key={code}
              href={`/admin/texte?art=${kindKey}&lang=${code}`}
              aria-current={code === lang ? "true" : undefined}
            >
              {LANGUAGE_LABELS[code]}
            </Link>
          ))}
        </div>

        <span className="admin-pill admin-pill-off">
          {filled} von 20 gefüllt
        </span>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-body">
          <TextEditor
            table={kind.table}
            lang={lang}
            rows={editorRows}
            placeholder={kind.placeholder}
          />
        </div>
      </section>
    </>
  );
}
