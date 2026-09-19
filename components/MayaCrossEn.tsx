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
import { MAYA_CROSS_TEXTS_EN } from "@/lib/maya-cross-texts-en";
import { NAHUAL_DESCRIPTIONS_EN } from "@/lib/nahual-descriptions-en";

/** English version of MayaCross.tsx — same logic and CSS classes, text only. */
export default function MayaCrossEn({ cross }: { cross: MayaCrossResult }) {
  const [selected, setSelected] = useState<MayaCrossPositionKey>("birth");
  const position = cross.positions[selected];
  const text = MAYA_CROSS_TEXTS_EN.positions[selected];
  const nahual = NAHUAL_DESCRIPTIONS_EN[position.nawalName];

  return (
    <section className="cross" aria-labelledby="cross-title">
      <header className="cross-head">
        <div className="eyebrow">Extended horoscope</div>
        <h2 id="cross-title" className="cross-title">
          {MAYA_CROSS_TEXTS_EN.title}
        </h2>
        <p className="cross-lead">{MAYA_CROSS_TEXTS_EN.lead}</p>
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
        <span className="cross-hint-action">Click on a position</span> to read
        it. {MAYA_CROSS_TEXTS_EN.hint}
      </p>

      <article className="cross-detail" aria-live="polite">
        <div className="cross-detail-bar">
          <span className="cross-detail-position">{text.title}</span>
          <span className="cross-detail-date">
            {formatEnglish(position.gregorianDate)} ·{" "}
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
                  <strong>Power animal:</strong> {nahual.krafttier}
                </p>
              </>
            ) : (
              <p className="cross-detail-meta">
                No description is available for this Nahual yet.
              </p>
            )}
          </div>
        </div>
      </article>

      <p className="cross-disclaimer">{MAYA_CROSS_TEXTS_EN.disclaimer}</p>
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
  const text = MAYA_CROSS_TEXTS_EN.positions[position.key];
  const nahual = NAHUAL_DESCRIPTIONS_EN[position.nawalName];
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
  if (offsetDays === 0) return "Birthday";
  const sign = offsetDays < 0 ? "−" : "+";
  return `${sign}${Math.abs(offsetDays)} days`;
}

/** Full date — with `timeZone: "UTC"`, so the day doesn't shift. */
function formatEnglish(isoDate: string): string {
  const { year, month, day } = parseCalendarDate(isoDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
