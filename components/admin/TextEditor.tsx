"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { saveText } from "@/app/admin/actions";
import type { Lang } from "@/lib/tzolkin";

export type EditorRow = {
  nahualIndex: number;
  name: string;
  glyphSrc: string;
  text: string;
};

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

const STATE_LABEL: Record<SaveState, string> = {
  idle: "",
  dirty: "Nicht gespeichert",
  saving: "Speichert …",
  saved: "Gespeichert",
  error: "Fehler",
};

export default function TextEditor({
  table,
  lang,
  rows,
  placeholder,
}: {
  table: "day_sign_texts" | "nahual_traits";
  lang: Lang;
  rows: EditorRow[];
  placeholder: string;
}) {
  return (
    <div>
      {rows.map((row) => (
        <TextRow
          key={`${table}-${lang}-${row.nahualIndex}`}
          table={table}
          lang={lang}
          row={row}
          placeholder={placeholder}
        />
      ))}
    </div>
  );
}

function TextRow({
  table,
  lang,
  row,
  placeholder,
}: {
  table: "day_sign_texts" | "nahual_traits";
  lang: Lang;
  row: EditorRow;
  placeholder: string;
}) {
  const [value, setValue] = useState(row.text);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function save() {
    if (value === row.text && state !== "dirty") return;
    setState("saving");

    startTransition(async () => {
      const result = await saveText(table, row.nahualIndex, lang, value);
      if (result.ok) {
        setState("saved");
        setError("");
      } else {
        setState("error");
        setError(result.message);
      }
    });
  }

  return (
    <div className="admin-text-row">
      <div className="admin-text-meta">
        <Image
          src={row.glyphSrc}
          alt=""
          width={64}
          height={64}
          className="admin-glyph"
        />
        <div>
          <div className="admin-text-name">{row.name}</div>
          <div className="admin-text-index">Nahual {row.nahualIndex}</div>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`text-${table}-${row.nahualIndex}`} className="sr-only">
          Text für {row.name}
        </label>
        <textarea
          id={`text-${table}-${row.nahualIndex}`}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            setValue(event.target.value);
            setState("dirty");
          }}
          onBlur={save}
        />
        <div className="admin-actions" style={{ marginTop: 8 }}>
          <button
            type="button"
            className="admin-btn-ghost admin-btn-small"
            onClick={save}
            disabled={isPending || state === "idle" || state === "saved"}
          >
            Speichern
          </button>
          <span
            className="admin-save-state"
            data-state={state}
            role={state === "error" ? "alert" : "status"}
          >
            {state === "error" ? `Fehler: ${error}` : STATE_LABEL[state]}
          </span>
        </div>
      </div>
    </div>
  );
}
