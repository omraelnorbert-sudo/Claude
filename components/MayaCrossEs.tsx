"use client";

import { useState } from "react";
import MayaNumber from "@/components/MayaNumber";
import {
  MAYA_CROSS_POSITION_KEYS,
  parseCalendarDate,
  type MayaCrossPosition,
  type MayaCrossPositionKey,
  type MayaCrossResult,
} from "@/lib/maya-cross";
import { MAYA_CROSS_TEXTS_ES } from "@/lib/maya-cross-texts-es";
import { NAHUAL_DESCRIPTIONS_ES } from "@/lib/nahual-descriptions-es";

/** Versión en español de MayaCross.tsx — misma lógica y clases CSS, solo texto. */
export default function MayaCrossEs({ cross }: { cross: MayaCrossResult }) {
  const [selected, setSelected] = useState<MayaCrossPositionKey>("birth");
  const position = cross.positions[selected];
  const text = MAYA_CROSS_TEXTS_ES.positions[selected];
  const nahual = NAHUAL_DESCRIPTIONS_ES[position.nawalName];

  return (
    <section className="cross" aria-labelledby="cross-title">
      <header className="cross-head">
        <div className="eyebrow">Horóscopo ampliado</div>
        <h2 id="cross-title" className="cross-title">
          {MAYA_CROSS_TEXTS_ES.title}
        </h2>
        <p className="cross-lead">{MAYA_CROSS_TEXTS_ES.lead}</p>
      </header>

      <div className="cross-plate">
        <div className="cross-grid">
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
      </div>

      <p className="cross-hint">
        <span className="cross-hint-action">Haz clic en una posición</span> para
        leerla. {MAYA_CROSS_TEXTS_ES.hint}
      </p>

      <article className="cross-detail" aria-live="polite">
        <div className="cross-detail-bar">
          <span className="cross-detail-position">{text.title}</span>
          <span className="cross-detail-date">
            {formatSpanish(position.gregorianDate)} ·{" "}
            {formatOffset(position.offsetDays)}
          </span>
        </div>

        <div className="cross-detail-body">
          <figure className="cross-detail-figure">
            <span className="cartouche cartouche-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={position.glyphSrc} alt={position.nawalName} />
            </span>
            <figcaption className="cross-detail-caption">
              <MayaNumber value={position.number} />
              <span className="cross-detail-name">
                {position.number} {position.nawalName}
              </span>
            </figcaption>
          </figure>

          <div className="cross-detail-text">
            <p className="cross-detail-meaning">{text.description}</p>
            {nahual ? (
              <>
                <p className="cross-detail-summary">{nahual.summary}</p>
                <p className="cross-detail-meta">
                  <strong>Animal de poder:</strong> {nahual.krafttier}
                </p>
              </>
            ) : (
              <p className="cross-detail-meta">
                Todavía no hay una descripción para este Nahual.
              </p>
            )}
          </div>
        </div>
      </article>

      <p className="cross-disclaimer">{MAYA_CROSS_TEXTS_ES.disclaimer}</p>
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
  const text = MAYA_CROSS_TEXTS_ES.positions[position.key];
  const nahual = NAHUAL_DESCRIPTIONS_ES[position.nawalName];
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

      <span className="cartouche">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={position.glyphSrc} alt="" aria-hidden="true" />
      </span>

      <span className="cross-cell-coefficient">
        <MayaNumber value={position.number} />
      </span>

      <span className="cross-cell-name">
        {position.number} {position.nawalName}
      </span>

      {nahual && <span className="cross-cell-kurz">{nahual.kurz}</span>}

      <span className="cross-cell-offset">
        {formatOffset(position.offsetDays)}
      </span>
    </button>
  );
}

function formatOffset(offsetDays: number): string {
  if (offsetDays === 0) return "Cumpleaños";
  const sign = offsetDays < 0 ? "−" : "+";
  return `${sign}${Math.abs(offsetDays)} días`;
}

/** Fecha completa — con `timeZone: "UTC"`, para que el día no salte. */
function formatSpanish(isoDate: string): string {
  const { year, month, day } = parseCalendarDate(isoDate);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
