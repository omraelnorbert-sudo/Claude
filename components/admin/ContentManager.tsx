"use client";

import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import {
  createContentItem,
  deleteContentItem,
  type ActionResult,
} from "@/app/admin/actions";
import type { ContentItem } from "@/lib/supabaseClient";

export function CreateContentForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    createContentItem,
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
        <div className="field">
          <label htmlFor="content-type">Art</label>
          <select id="content-type" name="type" defaultValue="ritual">
            <option value="ritual">Ritual</option>
            <option value="workout">Workout</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="content-title">Titel</label>
          <input id="content-title" name="title" type="text" required />
        </div>

        <div className="field">
          <label htmlFor="content-theme">Thema</label>
          <input
            id="content-theme"
            name="theme"
            type="text"
            placeholder="z. B. Verbindung"
          />
          <p className="admin-field-hint">
            Gleiches Thema verbindet Ritual und Workout miteinander.
          </p>
        </div>

        <div className="field admin-form-wide">
          <label htmlFor="content-description">Beschreibung</label>
          <textarea id="content-description" name="description" />
        </div>

        <div className="admin-form-wide admin-actions">
          <SaveButton pendingLabel="Wird angelegt …">Anlegen</SaveButton>
        </div>
      </div>
    </form>
  );
}

export function ContentTable({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return <p className="admin-empty">Noch nichts angelegt.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Thema</th>
            <th>Beschreibung</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ContentRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentRow({ item }: { item: ContentItem }) {
  const [confirming, setConfirming] = useState(false);
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();

  function remove() {
    startTransition(async () => {
      const result = await deleteContentItem(item.id);
      setNote(result.ok ? "" : result.message);
      setConfirming(false);
    });
  }

  return (
    <tr>
      <td>
        <strong>{item.title}</strong>
        {note && (
          <div className="admin-save-state" data-state="error" role="alert">
            {note}
          </div>
        )}
      </td>
      <td>{item.theme || "—"}</td>
      <td style={{ maxWidth: 420 }}>{item.description || "—"}</td>
      <td>
        {confirming ? (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="admin-btn-small"
              onClick={remove}
              disabled={isPending}
            >
              Wirklich löschen
            </button>
            <button
              type="button"
              className="admin-btn-ghost admin-btn-small"
              onClick={() => setConfirming(false)}
            >
              Abbrechen
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="admin-btn-ghost admin-btn-small"
            onClick={() => setConfirming(true)}
          >
            Löschen
          </button>
        )}
      </td>
    </tr>
  );
}
