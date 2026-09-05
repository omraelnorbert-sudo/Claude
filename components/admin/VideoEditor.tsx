"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { saveVideo } from "@/app/admin/actions";

export type VideoEditorRow = {
  nahualIndex: number;
  name: string;
  glyphSrc: string;
  videoId: string;
  title: string;
};

export default function VideoEditor({ rows }: { rows: VideoEditorRow[] }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: 56 }}>Glyphe</th>
            <th>Nahual</th>
            <th>YouTube-Link oder ID</th>
            <th>Titel</th>
            <th style={{ width: 150 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <VideoRow key={row.nahualIndex} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VideoRow({ row }: { row: VideoEditorRow }) {
  const [videoId, setVideoId] = useState(row.videoId);
  const [title, setTitle] = useState(row.title);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const dirty = videoId !== row.videoId || title !== row.title;

  function save() {
    startTransition(async () => {
      const result = await saveVideo(row.nahualIndex, videoId, title);
      setFailed(!result.ok);
      setMessage(result.message);
    });
  }

  return (
    <tr>
      <td>
        <Image
          src={row.glyphSrc}
          alt=""
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </td>
      <td>
        <strong>{row.name}</strong>
        <div className="admin-text-index">Nr. {row.nahualIndex}</div>
      </td>
      <td>
        <div className="field">
          <label htmlFor={`video-${row.nahualIndex}`} className="sr-only">
            Video für {row.name}
          </label>
          <input
            id={`video-${row.nahualIndex}`}
            type="text"
            value={videoId}
            placeholder="https://youtu.be/…"
            onChange={(event) => setVideoId(event.target.value)}
          />
        </div>
        {row.videoId && (
          <a
            href={`https://www.youtube.com/watch?v=${row.videoId}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13 }}
          >
            Video ansehen
          </a>
        )}
      </td>
      <td>
        <div className="field">
          <label htmlFor={`title-${row.nahualIndex}`} className="sr-only">
            Titel für {row.name}
          </label>
          <input
            id={`title-${row.nahualIndex}`}
            type="text"
            value={title}
            placeholder="Titel des Videos"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      </td>
      <td>
        <button
          type="button"
          className="admin-btn-ghost admin-btn-small"
          onClick={save}
          disabled={isPending || !dirty}
        >
          {isPending ? "…" : "Speichern"}
        </button>
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
