"use client";

import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import {
  createExternalLinkAction,
  deleteExternalLink,
  saveExternalLink,
  type ActionResult,
} from "@/app/admin/actions";
import type { ExternalLink } from "@/lib/admin-data";

export function CreateLinkForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    createExternalLinkAction,
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
          <label htmlFor="link-title">Titel</label>
          <input id="link-title" name="title" type="text" required />
        </div>

        <div className="field">
          <label htmlFor="link-url">URL</label>
          <input
            id="link-url"
            name="url"
            type="url"
            placeholder="https://…"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="link-image">Bild-URL</label>
          <input
            id="link-image"
            name="image_url"
            type="url"
            placeholder="optional"
          />
        </div>

        <div className="field">
          <label htmlFor="link-order">Reihenfolge</label>
          <input id="link-order" name="sort_order" type="number" defaultValue={0} />
        </div>

        <div className="field admin-form-wide">
          <label htmlFor="link-description">Beschreibung</label>
          <textarea id="link-description" name="description" />
        </div>

        <div className="admin-form-wide admin-actions">
          <SaveButton pendingLabel="Wird angelegt …">Anlegen</SaveButton>
        </div>
      </div>
    </form>
  );
}

export function LinkTable({ links }: { links: ExternalLink[] }) {
  if (links.length === 0) {
    return <p className="admin-empty">Noch nichts angelegt.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Titel</th>
            <th>URL</th>
            <th>Beschreibung</th>
            <th style={{ width: 90 }}>Reihenfolge</th>
            <th style={{ width: 150 }}></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <LinkRow key={link.id} link={link} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkRow({ link }: { link: ExternalLink }) {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [description, setDescription] = useState(link.description ?? "");
  const [imageUrl, setImageUrl] = useState(link.image_url ?? "");
  const [sortOrder, setSortOrder] = useState(link.sort_order);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const dirty =
    title !== link.title ||
    url !== link.url ||
    description !== (link.description ?? "") ||
    imageUrl !== (link.image_url ?? "") ||
    sortOrder !== link.sort_order;

  function save() {
    startTransition(async () => {
      const result = await saveExternalLink(
        link.id,
        title,
        url,
        description,
        imageUrl,
        sortOrder,
      );
      setFailed(!result.ok);
      setMessage(result.message);
    });
  }

  function remove() {
    startTransition(async () => {
      const result = await deleteExternalLink(link.id);
      setFailed(!result.ok);
      setMessage(result.message);
      setConfirming(false);
    });
  }

  return (
    <tr>
      <td>
        <div className="field">
          <label htmlFor={`link-title-${link.id}`} className="sr-only">
            Titel
          </label>
          <input
            id={`link-title-${link.id}`}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      </td>
      <td>
        <div className="field">
          <label htmlFor={`link-url-${link.id}`} className="sr-only">
            URL
          </label>
          <input
            id={`link-url-${link.id}`}
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
      </td>
      <td style={{ minWidth: 220 }}>
        <div className="field">
          <label htmlFor={`link-desc-${link.id}`} className="sr-only">
            Beschreibung
          </label>
          <textarea
            id={`link-desc-${link.id}`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </td>
      <td>
        <div className="field">
          <label htmlFor={`link-order-${link.id}`} className="sr-only">
            Reihenfolge
          </label>
          <input
            id={`link-order-${link.id}`}
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(Number(event.target.value))}
          />
        </div>
      </td>
      <td>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className="admin-btn-ghost admin-btn-small"
            onClick={save}
            disabled={isPending || !dirty}
          >
            {isPending ? "…" : "Speichern"}
          </button>
          {confirming ? (
            <button
              type="button"
              className="admin-btn-small"
              onClick={remove}
              disabled={isPending}
            >
              Wirklich löschen
            </button>
          ) : (
            <button
              type="button"
              className="admin-btn-ghost admin-btn-small"
              onClick={() => setConfirming(true)}
            >
              Löschen
            </button>
          )}
        </div>
        {message && (
          <div
            className="admin-save-state"
            data-state={failed ? "error" : "saved"}
            role="status"
          >
            {message}
          </div>
        )}
      </td>
    </tr>
  );
}
