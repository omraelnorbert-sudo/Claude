"use client";

import Image from "next/image";
import { useState } from "react";
import { calculateNahual, isValidBirthDate } from "@/lib/nahual";

/** Kleines Prüfwerkzeug: Datum eingeben, Ergebnis der Berechnung sehen. */
export default function NahualTester() {
  const [value, setValue] = useState("");

  const parts = value.split("-").map(Number);
  const valid =
    parts.length === 3 && isValidBirthDate(parts[2], parts[1], parts[0]);
  const result = valid ? calculateNahual(parts[2], parts[1], parts[0]) : null;

  return (
    <div className="admin-form">
      <div className="field">
        <label htmlFor="test-date">Datum</label>
        <input
          id="test-date"
          type="date"
          value={value}
          min="1830-01-01"
          max="2099-12-31"
          onChange={(event) => setValue(event.target.value)}
        />
        <p className="admin-field-hint">
          Die Berechnung deckt 1830 bis 2099 ab.
        </p>
      </div>

      <div className="admin-form-wide">
        {value && !valid && (
          <p className="admin-note admin-note-error">
            Dieses Datum liegt außerhalb des gültigen Bereichs.
          </p>
        )}

        {result && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <Image
              src={result.glyphSrc}
              alt=""
              width={72}
              height={72}
              className="admin-glyph"
            />
            <div>
              <div className="admin-text-index">Ergebnis</div>
              <div style={{ fontSize: 34, lineHeight: 1.1 }}>
                {result.number} {result.name}
              </div>
              <div className="admin-text-index">
                Schwingungszahl {result.number} · Nahual {result.index} von 20
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
