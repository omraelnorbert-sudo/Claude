"use client";

import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import {
  createUserAction,
  deleteUser,
  updateProfile,
  type ActionResult,
} from "@/app/admin/actions";
import type { Profile } from "@/lib/admin-data";
import { LANGUAGES, LANGUAGE_LABELS, nahualNameByIndex, type Lang } from "@/lib/tzolkin";

export function CreateUserForm({ canCreate }: { canCreate: boolean }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    createUserAction,
    null,
  );

  return (
    <form action={formAction}>
      {!canCreate && (
        <p className="admin-note admin-note-error">
          Ohne <code>SUPABASE_SERVICE_ROLE_KEY</code> lassen sich keine Konten
          anlegen. Den Schlüssel findest du im Supabase-Dashboard unter{" "}
          <em>Project Settings → API</em>. Er gehört in <code>.env.local</code>{" "}
          und in die Netlify-Umgebungsvariablen — niemals ins Repository.
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
          <label htmlFor="new-email">E-Mail-Adresse</label>
          <input
            id="new-email"
            name="email"
            type="email"
            required
            placeholder="person@beispiel.ch"
          />
        </div>

        <div className="field">
          <label htmlFor="new-name">Name</label>
          <input id="new-name" name="display_name" type="text" />
        </div>

        <div className="field">
          <label htmlFor="new-birth">Geburtsdatum</label>
          <input id="new-birth" name="birth_date" type="date" />
          <p className="admin-field-hint">
            Daraus wird das Nahual automatisch berechnet.
          </p>
        </div>

        <div className="field">
          <label htmlFor="new-lang">Sprache</label>
          <select id="new-lang" name="preferred_language" defaultValue="de">
            {LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_LABELS[code]}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-wide">
          <label className="admin-check">
            <input type="checkbox" name="send_invite" defaultChecked />
            <span>
              Einladung per E-Mail schicken. Ohne Haken wird das Konto still
              angelegt und die Person meldet sich später selbst an.
            </span>
          </label>
        </div>

        <div className="admin-form-wide admin-actions">
          <SaveButton pendingLabel="Wird angelegt …">Nutzer anlegen</SaveButton>
        </div>
      </div>
    </form>
  );
}

export function UserTable({ profiles }: { profiles: Profile[] }) {
  if (profiles.length === 0) {
    return <p className="admin-empty">Noch keine Nutzer vorhanden.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Person</th>
            <th>Geburtsdatum</th>
            <th>Nahual</th>
            <th>Sprache</th>
            <th>Post</th>
            <th>Seit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <UserRow key={profile.id} profile={profile} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ profile }: { profile: Profile }) {
  const [birthDate, setBirthDate] = useState(profile.birth_date ?? "");
  const [lang, setLang] = useState<Lang>(profile.preferred_language);
  const [optIn, setOptIn] = useState(profile.email_opt_in);
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function apply(fields: Parameters<typeof updateProfile>[1]) {
    startTransition(async () => {
      const result = await updateProfile(profile.id, fields);
      setFailed(!result.ok);
      setNote(result.message);
    });
  }

  function remove() {
    startTransition(async () => {
      const result = await deleteUser(profile.id);
      setFailed(!result.ok);
      setNote(result.message);
      setConfirming(false);
    });
  }

  return (
    <tr>
      <td>
        <strong>{profile.display_name || "—"}</strong>
        <div className="admin-text-index">{profile.email}</div>
        {note && (
          <div
            className="admin-save-state"
            data-state={failed ? "error" : "saved"}
            role="status"
          >
            {note}
          </div>
        )}
      </td>

      <td>
        <div className="field">
          <label htmlFor={`birth-${profile.id}`} className="sr-only">
            Geburtsdatum
          </label>
          <input
            id={`birth-${profile.id}`}
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            onBlur={() => {
              if (birthDate !== (profile.birth_date ?? "")) {
                apply({ birth_date: birthDate });
              }
            }}
          />
        </div>
      </td>

      <td className="num">
        {profile.nahual_index
          ? `${profile.nahual_number} ${nahualNameByIndex(profile.nahual_index)}`
          : "—"}
      </td>

      <td>
        <div className="field">
          <label htmlFor={`lang-${profile.id}`} className="sr-only">
            Sprache
          </label>
          <select
            id={`lang-${profile.id}`}
            value={lang}
            onChange={(event) => {
              const value = event.target.value as Lang;
              setLang(value);
              apply({ preferred_language: value });
            }}
          >
            {LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </td>

      <td>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={optIn}
            onChange={(event) => {
              setOptIn(event.target.checked);
              apply({ email_opt_in: event.target.checked });
            }}
          />
          <span className="sr-only">Möchte tägliche Post</span>
        </label>
      </td>

      <td className="num">
        {new Date(profile.created_at).toLocaleDateString("de-CH")}
      </td>

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
