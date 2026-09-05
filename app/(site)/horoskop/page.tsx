"use client";

import { useState } from "react";
import MayaCross from "@/components/MayaCross";
import MayaNumber from "@/components/MayaNumber";
import NahualGlyph from "@/components/NahualGlyph";
import { calculateNahual, isValidBirthDate, type NahualResult } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";
import {
  MayaCrossError,
  calculateMayaCross,
  type CalendarDate,
  type MayaCrossResult,
} from "@/lib/maya-cross";
import { MAYA_CROSS_TEXTS } from "@/lib/maya-cross-texts";

type Mode = "nahual" | "cross";

interface Computed {
  nahual: NahualResult;
  cross: MayaCrossResult | null;
  crossError: string | null;
}

/** Rechnet beide Varianten aus einem geprüften Datum. */
function compute(date: CalendarDate): Computed {
  const nahual = calculateNahual(date.day, date.month, date.year);

  try {
    return { nahual, cross: calculateMayaCross(date), crossError: null };
  } catch (error) {
    const code = error instanceof MayaCrossError ? error.code : "calculationFailed";
    return {
      nahual,
      cross: null,
      crossError:
        MAYA_CROSS_TEXTS.errors[code as keyof typeof MAYA_CROSS_TEXTS.errors] ??
        MAYA_CROSS_TEXTS.errors.calculationFailed,
    };
  }
}

export default function HoroskopPage() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState<Mode>("nahual");
  const [computed, setComputed] = useState<Computed | null>(null);
  const [error, setError] = useState<string | null>(null);

  const valid = isValidBirthDate(Number(day), Number(month), Number(year));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setComputed(
        compute({ day: Number(day), month: Number(month), year: Number(year) }),
      );
      setError(null);
    } catch {
      setComputed(null);
      setError(MAYA_CROSS_TEXTS.errors.invalidDate);
    }
  }

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Maya-Horoskop
      </div>
      <h1>Dein Nahual</h1>
      <p>
        Berechne dein Geburtsnahual nach dem heiligen 260-Tage-Kalender der
        Maya (Tzolk&apos;in). Gib dein Geburtsdatum ein, um deine
        Schwingungszahl und dein Nahual-Zeichen zu erfahren.
      </p>

      <div
        className="mode-switch"
        role="group"
        aria-label="Umfang des Horoskops"
      >
        <button
          type="button"
          aria-pressed={mode === "nahual"}
          onClick={() => setMode("nahual")}
        >
          Nur Geburtsnahual
        </button>
        <button
          type="button"
          aria-pressed={mode === "cross"}
          onClick={() => setMode("cross")}
        >
          Erweitertes Horoskop
        </button>
      </div>
      <p className="mode-note">
        Beides ist zurzeit frei zugänglich. Das erweiterte Horoskop wird später
        nur noch für angemeldete Nutzer verfügbar sein.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: 16,
          alignItems: "end",
          border: "1px solid var(--line-card)",
          background: "var(--card)",
          padding: 24,
          marginBottom: 32,
        }}
      >
        <div className="field">
          <label htmlFor="day">Tag</label>
          <input
            id="day"
            type="number"
            min={1}
            max={31}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="month">Monat</label>
          <input
            id="month"
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="year">Jahr</label>
          <input
            id="year"
            type="number"
            min={1830}
            max={2099}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!valid}>
          Berechnen
        </button>
      </form>

      {error && <p style={{ color: "var(--accent-dark)" }}>{error}</p>}

      {computed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
            alignItems: "center",
            border: "1px solid var(--line-card)",
            background: "var(--card)",
            padding: 32,
          }}
        >
          <NahualGlyph src={computed.nahual.glyphSrc} alt={computed.nahual.name} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="eyebrow">Dein Geburtsnahual</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <MayaNumber value={computed.nahual.number} />
              <div
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {computed.nahual.number} {computed.nahual.name}
              </div>
            </div>
            <p style={{ fontSize: 17, margin: 0 }}>
              {NAHUAL_DESCRIPTIONS[computed.nahual.name].summary}
            </p>
            <p style={{ fontSize: 15, color: "var(--text-muted)", margin: 0 }}>
              <strong>Krafttier:</strong>{" "}
              {NAHUAL_DESCRIPTIONS[computed.nahual.name].krafttier}
            </p>
          </div>
        </div>
      )}

      {computed && mode === "cross" && computed.cross && (
        <MayaCross cross={computed.cross} />
      )}

      {computed && mode === "cross" && computed.crossError && (
        <p style={{ color: "var(--accent-dark)", marginTop: 32 }}>
          {computed.crossError}
        </p>
      )}
    </>
  );
}
