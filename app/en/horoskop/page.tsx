"use client";

import { useEffect, useState } from "react";
import MayaCrossEn from "@/components/MayaCrossEn";
import MayaNumber from "@/components/MayaNumber";
import NahualGlyph from "@/components/NahualGlyph";
import { calculateNahual, isValidBirthDate, type NahualResult } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS_EN } from "@/lib/nahual-descriptions-en";
import {
  MayaCrossError,
  calculateMayaCross,
  type CalendarDate,
  type MayaCrossResult,
} from "@/lib/maya-cross";
import { MAYA_CROSS_TEXTS_EN } from "@/lib/maya-cross-texts-en";

type Mode = "nahual" | "cross";

interface Computed {
  nahual: NahualResult;
  cross: MayaCrossResult | null;
  crossError: string | null;
}

/** Calculates both variants from a verified date. */
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
        MAYA_CROSS_TEXTS_EN.errors[code as keyof typeof MAYA_CROSS_TEXTS_EN.errors] ??
        MAYA_CROSS_TEXTS_EN.errors.calculationFailed,
    };
  }
}

export default function HoroskopPageEn() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mode, setMode] = useState<Mode>("nahual");
  const [computed, setComputed] = useState<Computed | null>(null);
  const [error, setError] = useState<string | null>(null);

  const valid = isValidBirthDate(Number(day), Number(month), Number(year));

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("datum");
    if (!value) return;

    const [y, m, d] = value.split("-").map(Number);
    if (!isValidBirthDate(d, m, y)) return;

    setDay(String(d));
    setMonth(String(m));
    setYear(String(y));
    setComputed(compute({ day: d, month: m, year: y }));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setComputed(
        compute({ day: Number(day), month: Number(month), year: Number(year) }),
      );
      setError(null);
    } catch {
      setComputed(null);
      setError(MAYA_CROSS_TEXTS_EN.errors.invalidDate);
    }
  }

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        MAYA horoscope
      </div>
      <h1>Your Nahual</h1>
      <p>
        Calculate your birth Nahual according to the sacred 260-day MAYA
        calendar (Tzolk&apos;in). Enter your date of birth to learn your
        vibrational number and your Nahual sign.
      </p>

      <div
        className="mode-switch"
        role="group"
        aria-label="Scope of the horoscope"
      >
        <button
          type="button"
          aria-pressed={mode === "nahual"}
          onClick={() => setMode("nahual")}
        >
          Birth Nahual only
        </button>
        <button
          type="button"
          aria-pressed={mode === "cross"}
          onClick={() => setMode("cross")}
        >
          Extended horoscope
        </button>
      </div>
      <p className="mode-note">
        Both are freely accessible for now. The extended horoscope will later
        be available only to registered users.
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
          <label htmlFor="day">Day</label>
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
          <label htmlFor="month">Month</label>
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
          <label htmlFor="year">Year</label>
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
          Calculate
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
            <div className="eyebrow">Your birth Nahual</div>
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
              {NAHUAL_DESCRIPTIONS_EN[computed.nahual.name].summary}
            </p>
            <p style={{ fontSize: 15, color: "var(--text-muted)", margin: 0 }}>
              <strong>Power animal:</strong>{" "}
              {NAHUAL_DESCRIPTIONS_EN[computed.nahual.name].krafttier}
            </p>
          </div>
        </div>
      )}

      {computed && mode === "cross" && computed.cross && (
        <MayaCrossEn cross={computed.cross} />
      )}

      {computed && mode === "cross" && computed.crossError && (
        <p style={{ color: "var(--accent-dark)", marginTop: 32 }}>
          {computed.crossError}
        </p>
      )}
    </>
  );
}
