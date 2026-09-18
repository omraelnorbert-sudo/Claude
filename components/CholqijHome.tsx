"use client";

import { useEffect, useMemo, useState } from "react";
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
const TONE_RADIUS_PERCENT = 27;

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

  const [activeIndex, setActiveIndex] = useState(today.index - 1);
  const [birth, setBirth] = useState("");
  const [seelencoachingOpen, setSeelencoachingOpen] = useState(false);

  useEffect(() => {
    if (!seelencoachingOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSeelencoachingOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [seelencoachingOpen]);

  const active = ITEMS[activeIndex];

  // Beide Räder greifen ineinander: das gewählte Zeichen liegt delta Schritte
  // hinter/vor heute, die Schwingungszahl wandert um denselben Betrag mit.
  const delta = (activeIndex - (today.index - 1) + 20) % 20;
  const activeTone = ((today.number - 1 + delta) % 13) + 1;

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
          <div className="cholqij-detail-name">
            {activeTone} {active.name}
          </div>
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
          {Array.from({ length: 13 }, (_, k) => {
            const toneAngle =
              ((-90 + (((k - (activeTone - 1) + 13) % 13) * (360 / 13))) * Math.PI) / 180;
            const isActiveTone = k + 1 === activeTone;
            return (
              <div
                key={k}
                className={`cholqij-tone-node${isActiveTone ? " is-active" : ""}`}
                style={{
                  left: `calc(50% + ${(Math.cos(toneAngle) * TONE_RADIUS_PERCENT).toFixed(2)}%)`,
                  top: `calc(50% + ${(Math.sin(toneAngle) * TONE_RADIUS_PERCENT).toFixed(2)}%)`,
                }}
              >
                {k + 1}
              </div>
            );
          })}
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
            Dein Geburts-Nahual
          </h1>
          <p>
            Dein Geburtstag bestimmt deinen Herznahual, deine Schwingungszahl
            und dein Maya-Kreuz. Dein Geburtsdatum genügt.
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
              Gib dein Geburtsdatum ein, um deinen Nahual zu berechnen.
            </p>
          )}
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
          <button
            type="button"
            className="underline-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onClick={() => setSeelencoachingOpen(true)}
          >
            Friedenswerk &amp; Seelencoaching →
          </button>
        </div>
      </div>

      {seelencoachingOpen && (
        <div className="nahual-overlay-backdrop" onClick={() => setSeelencoachingOpen(false)}>
          <div className="nahual-overlay-card" onClick={(event) => event.stopPropagation()}>
            <div className="nahual-overlay-head">
              <span>Seelencoaching · Seelenschau</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setSeelencoachingOpen(false)}
                aria-label="Schliessen"
              >
                Schliessen ✕
              </button>
            </div>

            <div className="nahual-overlay-body">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                Paz Mundo Team · Omrael Norbert &amp; Laura Soraya
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 24px",
                }}
              >
                Eine Reise in die Tiefe der Seele
              </h2>

              <div className="si-modal-section">
                <h3>Was ist Seelen-Coaching?</h3>
                <p>
                  Seelen-Coaching ist ein tiefgründiges, spirituelles Wahrnehmungswerk, in dem
                  deine Seele „spürbar und sichtbar“ gemacht wird – ihre Geschichte, ihre
                  Themen, ihre Wunden und ihre Schönheit. Omrael Norbert, sein Team und
                  Geistige Begleiter verbinden sich mit deinem Seelennetzwerk und dessen
                  Störungen.
                </p>
                <p>
                  Das Seelen-Coaching ist kein übliches Coaching-Gespräch. Es ist vielmehr ein
                  heiliger Raum des medialen Schauens, Erkennens und Annehmens – für all das,
                  was du bist, warst und mit Möglichkeiten, wohin deine weitere Lebensreise
                  gehen könnte.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Was ist Seelenschau?</h3>
                <p>
                  Seelenschau ist ein ganzheitlicher Begleitungsprozess, der weit über
                  klassisches Coaching hinausgeht. Er verbindet tiefe spirituelle Wahrnehmung
                  mit einem liebevollen, klaren Blick auf die Lebensthemen, Muster und
                  Blockaden, die dich in deiner Entfaltung hindern.
                </p>
                <p>
                  In unserer Seelenschau Paz Mundo arbeiten wir auf mehreren Ebenen
                  gleichzeitig: energetisch, therapeutisch, spirituell und praktisch. Deine
                  Seele wird gesehen, gehört und in ihren Anlagen und Aufgaben begleitet. Dafür
                  ist keine persönliche Begegnung notwendig.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Was umfasst die Seelenschau?</h3>
                <ul className="si-modal-steps">
                  <li>
                    <strong>Seelenschau – Das Fundament</strong>
                    <p>
                      Eine umfassende Wahrnehmung deines Energiefeldes, deiner Seelenthemen,
                      der karmischen Ahnenbelastungen und deiner abgetrennten Seelenanteile
                      aus früheren Leben.
                    </p>
                  </li>
                  <li>
                    <strong>Workout – Der Praxisteil</strong>
                    <p>
                      Ein auf dich abgestimmtes Arbeitsprogramm aus Ritualen, Meditationen,
                      Kerzenarbeit und Übungszyklen, das du eigenständig zu Hause durchführen
                      kannst.
                    </p>
                  </li>
                  <li>
                    <strong>Begleitung – weitere Lebensthemen</strong>
                    <p>
                      Begleitung in deinem Erlösungsprozess über die Heilungs-Altäre Paz
                      Mundo, mit Anpassungen und Erweiterungen des Workouts für weitere
                      Lebensthemen.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Themen im Seelencoaching</h3>
                <ul className="si-modal-list">
                  <li>Seelenauftrag und Lebensthemen erkennen</li>
                  <li>Karmische Muster und Ahnenthemen auflösen</li>
                  <li>Heilung von Wunden in Beziehung, Familie, Partnerschaft</li>
                  <li>Stärkung von Selbstwert, innerer Mitte und Lebensfreude</li>
                  <li>Verbindung mit dem Göttlich Weiblichen und Männlichen</li>
                  <li>Energetische Reinigung und Schutz des Energiefeldes</li>
                  <li>Arbeit mit geistigen Begleitern und Krafttieren</li>
                  <li>Seelencoaching für Tiere und Tier-Mensch-Beziehungen</li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Ablauf eines Seelencoachings</h3>
                <ul className="si-modal-steps">
                  <li>
                    <strong>Vorbereitung &amp; Heiliger Raum</strong>
                    <p>
                      Omrael Norbert öffnet den heiligen Raum, verbindet sich mit dem Paz
                      Mundo Altar und seinem Team. Verbunden mit deinem Schreiben und einem
                      aktuellen Bild von dir stimmen sich die Beteiligten auf deine Seele ein.
                    </p>
                  </li>
                  <li>
                    <strong>In die Tiefen Schauen</strong>
                    <p>
                      In gemeinsamer Abstimmung entfaltet sich die mediale Seelenschau durch
                      das Paz-Mundo-Medium Laura Soraya, verbunden mit einer geistigen
                      Präsenz. Omrael Norbert ergänzt diese Einsicht durch seine
                      Wahrnehmungen, Bilder und Botschaften. Die Seelenschau bekommst du per
                      Mail zugeschickt.
                    </p>
                  </li>
                  <li>
                    <strong>Zusammenfassung &amp; Weg</strong>
                    <p>
                      Du erhältst eine schriftliche Zusammenfassung der wesentlichen
                      Einsichten und im Workout konkrete Empfehlungen für deinen weiteren Weg
                      – Rituale, Meditationen, Gebete.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Für wen ist das Seelen-Coaching?</h3>
                <p>
                  Das Seelen-Coaching eignet sich für Menschen, die an einem Wendepunkt
                  stehen, sich nach tieferer Selbsterkenntnis sehnen, an wiederkehrenden
                  Mustern arbeiten möchten oder einfach spüren: in mir ist mehr – ich möchte
                  dies erkennen, angehen und lösen.
                </p>
              </div>

              <div className="si-modal-quote">
                „Deine Seele wartet darauf, endlich wahrgenommen und in ihren Aufgaben
                erkannt zu werden.“
                <div className="si-modal-quote-author">
                  Omrael Norbert, Laura Soraya, Paz Mundo Team
                </div>
              </div>

              <div className="si-cta-row" style={{ marginTop: "var(--space-4)" }}>
                <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
                  Anfrage senden →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
