"use client";

import { useState } from "react";
import MayaNumber from "@/components/MayaNumber";
import NahualGlyph from "@/components/NahualGlyph";
import {
  MAYA_CROSS_POSITION_KEYS,
  type MayaCrossPosition,
  type MayaCrossPositionKey,
  type MayaCrossResult,
} from "@/lib/maya-cross";
import { MAYA_CROSS_TEXTS } from "@/lib/maya-cross-texts";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";

/**
 * Darstellung des Maya-Kreuzes. Enthält bewusst keine Kalenderlogik — das
 * fertige Ergebnis kommt aus `calculateMayaCross()` in `lib/maya-cross.ts`.
 *
 * Desktop: echte Kreuzanordnung (Ursprung oben, männlich links, weiblich
 * rechts, Reife unten). Mobil: dieselben fünf Karten untereinander in der
 * Reihenfolge Ursprung → männlich → Zentrum → weiblich → Reife.
 */
export default function MayaCross({ cross }: { cross: MayaCrossResult }) {
  const [selected, setSelected] = useState<MayaCrossPositionKey>("birth");
  const position = cross.positions[selected];
  const text = MAYA_CROSS_TEXTS.positions[selected];
  const nahual = NAHUAL_DESCRIPTIONS[position.nawalName];

  return (
    <section className="cross" aria-labelledby="cross-title">
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Erweitertes Horoskop
      </div>
      <h2 id="cross-title" className="cross-title">
        {MAYA_CROSS_TEXTS.title}
      </h2>
      <p className="cross-lead">{MAYA_CROSS_TEXTS.lead}</p>

      <div className="cross-grid">
        {/* Reine Zierlinien des Kreuzes, nur im Desktop-Layout sichtbar. */}
        <span className="cross-beam cross-beam-x" aria-hidden="true" />
        <span className="cross-beam cross-beam-y" aria-hidden="true" />

        {MAYA_CROSS_POSITION_KEYS.map((key) => (
          <CrossCell
            key={key}
            position={cross.positions[key]}
            active={key === selected}
            onSelect={() => setSelected(key)}
          />
        ))}
      </div>

      <p className="cross-hint">{MAYA_CROSS_TEXTS.hint}</p>

      <article className="cross-detail" aria-live="polite">
        <div className="cross-detail-glyph">
          <NahualGlyph src={position.glyphSrc} alt={position.nawalName} />
        </div>
        <div className="cross-detail-body">
          <div className="eyebrow">{text.title}</div>
          <div className="cross-detail-head">
            <MayaNumber value={position.number} />
            <span className="cross-detail-name">
              {position.number} {position.nawalName}
            </span>
          </div>
          <p className="cross-detail-meaning">{text.description}</p>
          {nahual ? (
            <>
              <p className="cross-detail-summary">{nahual.summary}</p>
              <p className="cross-detail-meta">
                <strong>Krafttier:</strong> {nahual.krafttier}
              </p>
            </>
          ) : (
            <p className="cross-detail-meta">
              Zu diesem Nahual liegt noch keine Beschreibung vor.
            </p>
          )}
          <p className="cross-detail-meta">
            <strong>Gerechneter Tag:</strong> {position.gregorianDate} (
            {formatOffset(position.offsetDays)})
          </p>
        </div>
      </article>

      <p className="cross-disclaimer">{MAYA_CROSS_TEXTS.disclaimer}</p>
    </section>
  );
}

function CrossCell({
  position,
  active,
  onSelect,
}: {
  position: MayaCrossPosition;
  active: boolean;
  onSelect: () => void;
}) {
  const text = MAYA_CROSS_TEXTS.positions[position.key];
  const isCenter = position.key === "birth";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "cross-cell",
        `cross-cell-${position.key}`,
        isCenter ? "cross-cell-center" : "",
        active ? "is-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="cross-cell-label">{text.short}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="cross-cell-glyph"
        src={position.glyphSrc}
        alt=""
        aria-hidden="true"
      />
      <span className="cross-cell-figure">
        <MayaNumber value={position.number} />
      </span>
      <span className="cross-cell-name">
        {position.number} {position.nawalName}
      </span>
      <span className="cross-cell-offset">
        {formatOffset(position.offsetDays)}
      </span>
    </button>
  );
}

function formatOffset(offsetDays: number): string {
  if (offsetDays === 0) return "Geburtstag";
  const sign = offsetDays < 0 ? "−" : "+";
  return `${sign}${Math.abs(offsetDays)} Tage`;
}
