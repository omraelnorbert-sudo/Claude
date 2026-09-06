"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  NAHUALES,
  calculateNahual,
  glyphSrcForIndex,
  isValidBirthDate,
  slugForIndex,
} from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";
import { nahualOfToday } from "@/lib/tzolkin";
import MayaNumber from "@/components/MayaNumber";

const RADIUS_PERCENT = 42.3;

const ITEMS = NAHUALES.map((name, position) => {
  const index = position + 1;
  const description = NAHUAL_DESCRIPTIONS[name];
  return {
    index,
    pad: String(index).padStart(2, "0"),
    name,
    slug: slugForIndex(index),
    glyphSrc: glyphSrcForIndex(index),
    kurz: description.kurz,
    summary: description.summary,
    krafttier: description.krafttier,
  };
});

function parseBirthInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day || !isValidBirthDate(day, month, year)) return null;
  return { day, month, year };
}

export default function CholqijHome() {
  const today = useMemo(() => nahualOfToday(), []);
  const todayItem = ITEMS[today.index - 1];

  const [activeIndex, setActiveIndex] = useState(today.index - 1);
  const [birth, setBirth] = useState("");

  const active = ITEMS[activeIndex];

  const birthDate = parseBirthInput(birth);
  const birthResult = birthDate ? calculateNahual(birthDate.day, birthDate.month, birthDate.year) : null;
  const birthItem = birthResult ? ITEMS[birthResult.index - 1] : null;

  const birthLabel = birthDate
    ? new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(birthDate.year, birthDate.month - 1, birthDate.day),
      )
    : "Datum wählen";

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Cholq&apos;ij · Der heilige Kalender
      </div>
      <h2
        style={{
          fontSize: "clamp(38px, 6.5vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          margin: "0 0 8px",
        }}
      >
        Die 20 Nahuales
      </h2>
      <p style={{ maxWidth: "62ch" }}>
        13 Schwingungszahlen und 20 Nahuales laufen wie zwei Räder weiter und ergeben
        zusammen 260 Tage. Wähle ein Zeichen — das Rad dreht es nach oben.
      </p>

      <div className="cholqij-grid">
        <div>
          <div className="cholqij-detail-index">Nahual {active.pad} / 20</div>
          <div className="cholqij-detail-name">{active.name}</div>
          <div className="cholqij-detail-kurz">{active.kurz}</div>
          <div className="cholqij-detail-rule" />
          <p className="cholqij-detail-summary">{active.summary}</p>
          <p className="cholqij-detail-krafttier">
            <strong>Krafttier:</strong> {active.krafttier}
          </p>
          <Link href={`/nahuales/${active.slug}`} className="cholqij-detail-link">
            Zeichen ansehen
          </Link>
        </div>

        <div className="cholqij-wheel">
          <div className="cholqij-ring-outer" />
          <div className="cholqij-ring-inner" />
          <div className="cholqij-hub" />
          <div className="cholqij-pointer" />
          {ITEMS.map((item, position) => {
            const angle =
              ((-90 + (((position - activeIndex) % 20) + 20) % 20 * 18) * Math.PI) / 180;
            const isActive = position === activeIndex;
            const width = isActive ? 52 : 40;
            const height = Math.round(width / 0.78);
            return (
              <button
                key={item.name}
                type="button"
                className={`cholqij-node${isActive ? " is-active" : ""}`}
                onClick={() => setActiveIndex(position)}
                aria-label={item.name}
                aria-pressed={isActive}
                style={{
                  left: `calc(50% + ${(Math.cos(angle) * RADIUS_PERCENT).toFixed(2)}%)`,
                  top: `calc(50% + ${(Math.sin(angle) * RADIUS_PERCENT).toFixed(2)}%)`,
                  width,
                  height,
                  marginLeft: -width / 2,
                  marginTop: -height / 2,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.glyphSrc} alt="" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="cholqij-chips">
        {ITEMS.map((item, position) => (
          <button
            key={item.name}
            type="button"
            className={`cholqij-chip${position === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(position)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="dot-rule" role="presentation" />

      <div id="horoskop" className="birth-hero">
        <div className="birth-hero-text">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Dein Geburtshoroskop
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6.5vw, 64px)", letterSpacing: "-0.025em", marginBottom: 18 }}>
            Welches Nahual
            <br />
            trägt dich?
          </h1>
          <p>
            Dein Geburtsdatum verrät dein Nahual, deine Schwingungszahl und dein
            Maya-Kreuz. Ein Datum genügt.
          </p>

          <div className="birth-form">
            <input
              type="date"
              className="birth-date-input"
              value={birth}
              onChange={(event) => setBirth(event.target.value)}
              min="1830-01-01"
              max="2099-12-31"
              aria-label="Geburtsdatum"
            />
            <Link href="/horoskop" className="btn">
              Horoskop berechnen
            </Link>
          </div>
          <div className="birth-note">Kostenlos · ohne Anmeldung</div>
        </div>

        <div className="birth-preview">
          <div className="birth-preview-label">Vorschau</div>
          <div className="birth-preview-date">{birthLabel}</div>

          {birthItem && birthResult ? (
            <div className="birth-preview-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={birthItem.glyphSrc} alt={birthItem.name} className="birth-preview-glyph" />
              <div>
                <MayaNumber value={birthResult.number} />
                <div className="birth-preview-name">
                  {birthResult.number} {birthItem.name}
                </div>
                <div className="birth-preview-kurz">{birthItem.kurz}</div>
              </div>
            </div>
          ) : (
            <p className="empty-state" style={{ margin: 0 }}>
              Gib dein Geburtsdatum ein, um dein Nahual zu sehen.
            </p>
          )}

          <div className="birth-preview-divider" />
          <div className="birth-preview-today">
            Heute läuft{" "}
            <span style={{ color: "var(--accent)" }}>
              {today.number} {todayItem.name}
            </span>
          </div>
        </div>
      </div>

      <div className="dot-rule" role="presentation" />

      <div className="closing-cta">
        <div>
          <h3>Dein persönliches Maya-Horoskop</h3>
          <p>
            Geburtsnahual, Schwingungszahl und das Maya-Kreuz mit den vier Zeichen,
            die dich begleiten — berechnet aus deinem Geburtsdatum.
          </p>
        </div>
        <Link href="/horoskop" className="btn">
          Geburtshoroskop erstellen
        </Link>
      </div>
    </>
  );
}
