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
import NahualesOverview from "@/components/NahualesOverview";
import type { NahualOverviewItem } from "@/lib/public-data";

const RADIUS_PERCENT = 42.3;

const YOUTUBE_CHANNEL = "https://www.youtube.com/@norbertmuiggmaya-pazmundo7830";
const YOUTUBE_SERIES = `${YOUTUBE_CHANNEL}/search?query=${encodeURIComponent("Der Mayakalender im Zeitgeist")}`;

const LINK_CARDS = [
  { title: "Paz Mundo", href: "https://www.pazmundo.com", label: "www.pazmundo.com →" },
  { title: "Norbert Muigg auf YouTube", href: YOUTUBE_SERIES, label: "Der Mayakalender im Zeitgeist →" },
  { title: "Healing Resort", href: "https://healingresort.pazmundo.com/", label: "healingresort.pazmundo.com →" },
  { title: "Veranstaltungen", href: "https://www.pazmundo.com/veranstaltungen", label: "pazmundo.com/veranstaltungen →" },
];

const ITEMS = NAHUALES.map((name, position) => {
  const index = position + 1;
  const description = NAHUAL_DESCRIPTIONS[name];
  return {
    index,
    pad: String(index).padStart(2, "0"),
    name,
    slug: slugForIndex(index),
    glyphSrc: glyphSrcForIndex(index, "thumb"),
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

export default function CholqijHome({ overviewItems }: { overviewItems: NahualOverviewItem[] }) {
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
        Paz Mundo · Der sakrale Mayakalender
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
        20 Nahuales in der Moderne
      </h2>
      <a
        href={YOUTUBE_SERIES}
        target="_blank"
        rel="noopener noreferrer"
        className="listen-link"
      >
        <span className="listen-link-icon" aria-hidden="true" />
        Mayakalender anhören
      </a>
      <div className="listen-link-note">
        „Der Mayakalender im Zeitgeist“ · Deutsche Fassung · YouTube-Kanal Norbert Muigg
      </div>
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
          <Link href={`/nahuales/${active.slug}`} className="underline-link">
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
            // Prozent statt Pixel, sonst schrumpft nur der Abstand (an % der
            // Wheel-Breite gebunden) mit dem Container, während die Knoten
            // gleich groß blieben — das führte bei schmaleren Containern
            // (z.B. im zweispaltigen Grid) zu Überlappungen.
            const widthPercent = isActive ? 15 : 7.7;
            const heightPercent = widthPercent / 0.78;
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
                  width: `${widthPercent}%`,
                  height: `${heightPercent.toFixed(2)}%`,
                  marginLeft: `${(-widthPercent / 2).toFixed(2)}%`,
                  marginTop: `${(-heightPercent / 2).toFixed(2)}%`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.glyphSrc} alt="" width={160} height={205} decoding="async" />
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

      <div id="nahuales-uebersicht">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Kosmovision Maya
        </div>
        <h2
          style={{
            fontSize: "clamp(34px, 6vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            margin: "0 0 8px",
          }}
        >
          Alle Zeichen im Überblick
        </h2>
        <p style={{ maxWidth: "58ch" }}>
          Jeder Nahual ist polar angelegt und trägt seine eigene Energie, seine
          eigenen Qualitäten und Stärken, sein eigenes Krafttier, die entsprechende
          Körperverbindung und die Vernetzung in den Kosmos. Der Nahual im
          Unbewussten ist seine dunkle Seite, seine Lichtseite liegt im wachsenden
          Bewusstsein. Wähle hier einen Nahual, um mehr zu erfahren.
        </p>
        <NahualesOverview items={overviewItems} />
      </div>

      <div className="dot-rule" role="presentation" />

      <div id="horoskop" className="birth-hero">
        <div className="birth-hero-text">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Dein Geburtshoroskop
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6.5vw, 64px)", letterSpacing: "-0.025em", marginBottom: 18 }}>
            Welcher Nahual
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
            {/* Ein gültiges Datum reist im Link mit, damit die Horoskop-Seite
                gleich das Ergebnis zeigt statt eines leeren Formulars. */}
            <Link href={birthDate ? `/horoskop?datum=${birth}` : "/horoskop"} className="btn">
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
              <img
                src={birthItem.glyphSrc}
                alt={birthItem.name}
                className="birth-preview-glyph"
                width={82}
                height={105}
                decoding="async"
              />
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

      <div id="links" className="links-section">
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Links
        </div>
        <div className="link-card-grid">
          {LINK_CARDS.map((card) => (
            <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="link-card">
              <span className="link-card-title">{card.title}</span>
              <span className="link-card-url">{card.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div id="si" className="si-section">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          SI · Seelenintelligenz
        </div>
        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 6px",
          }}
        >
          Reise in die Tiefe der Seele
        </h2>
        <div className="si-subline">Paz Mundo · Omrael Norbert &amp; Team, Laura Soraya</div>

        <p className="si-lead">
          Seelen-Coaching ist ein tiefgründiges, spirituelles Wahrnehmungswerk, in
          dem deine Seele „spürbar und sichtbar“ gemacht wird – ihre Geschichte,
          ihre Themen, ihre Wunden und ihre Schönheit.
        </p>
        <p className="si-text">
          Es ist kein gewöhnliches Coaching-Gespräch, sondern ein heiliger Raum des
          medialen Schauens, Erkennens und Annehmens – für all das, was du bist,
          warst, und mit Möglichkeiten, wohin deine weitere Lebensreise gehen sollte.
        </p>
        <p className="si-text">
          Omrael Norbert und sein Team verbinden sich mit deinem energetischen Feld
          – durch dein Schreiben und ein aktuelles Foto. Du erhältst eine
          schriftliche Seelenschau mit Zusammenfassung und persönlichem Workout.
        </p>

        <div className="si-cta-row">
          <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
            Anfrage senden →
          </a>
          <a
            href="https://www.pazmundo.com/omrael-norbert-muigg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link"
          >
            Friedenswerk &amp; Seelencoaching →
          </a>
        </div>
      </div>
    </>
  );
}
