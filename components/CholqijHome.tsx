"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
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
  { title: "Omrael Norbert Muigg auf YouTube", href: YOUTUBE_SERIES, label: "Der Mayakalender im Zeitgeist →" },
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
        „Der Mayakalender im Zeitgeist“ · Deutsche Fassung · YouTube-Kanal Omrael Norbert Muigg
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
          Geburtskonstellation berechnen
        </Link>
      </div>

      <div style={{ textAlign: "center", marginTop: "var(--space-4)" }}>
        <a
          href="https://pazmundo-fundraising.payrexx.com/de/pay?cid=eae6f0e7&hide_description=1"
          className="btn btn-payrexx-modal"
        >
          <span>Spende für die Mayaweisen</span>
        </a>
      </div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0/jquery.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://media.payrexx.com/modal/v1/modal.min.js?v=2.0"
        strategy="afterInteractive"
        onLoad={() => {
          (window as unknown as { jQuery?: (selector: string) => { payrexxModal: () => void } })
            .jQuery?.(".btn-payrexx-modal")
            .payrexxModal();
        }}
      />

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
        <div className="si-subline">Paz Mundo · Omrael Norbert Muigg &amp; Team, Laura Soraya</div>

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
          Omrael Norbert Muigg und sein Team verbinden sich mit deinem energetischen Feld
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
              <span>Paz Mundo Seelen-Coaching</span>
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
                Paz Mundo Team · Omrael Norbert Muigg &amp; Laura Soraya
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
                  Themen, ihre Wunden und ihre Schönheit.
                </p>
                <p>
                  Omrael Norbert Muigg und sein Team verbinden sich mit deinem energetischen
                  Feld, durch dein Schreiben und ein aktuelles Foto von dir.
                </p>
                <p>
                  Wir gestalten dein Seelen-Coaching in ausführlicher Art, mit ca. 10 Seiten,
                  mit Zusammenfassung, Workout, Bildern, wenn nötig Gebeten und Meditationen –
                  oder bezogen auf wenige, konkrete Lebensthemen.
                </p>
                <p>
                  Dies geschieht in Verbindung mit „geistigen Seelenbegleitern“, dir vielleicht
                  unbewussten geistigen Kräften. Diese bringen in einem umfassenden, medial aus
                  unserem Team entstandenen Schreiben ans Licht, was verborgen darauf wartet,
                  von dir erkannt und geheilt zu werden.
                </p>
                <p>
                  Das Seelen-Coaching ist kein gewöhnliches Coaching-Gespräch. Es ist vielmehr
                  ein heiliger Raum des medialen Schauens, Erkennens und Annehmens – für all
                  das, was du bist, warst, und mit Möglichkeiten, wohin deine weitere
                  Lebensreise gehen sollte.
                </p>
                <p>
                  Die Form der Seelenheilung steht eng verbunden mit „alten“ Heilmethoden der
                  Maya und ihrer Vorstellung, dass Verhaltensänderung und das Empfinden von
                  Liebe, Respekt und Würde nur durch seelisch-karmische Befreiungsarbeit
                  möglich wird.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Was wird sichtbar?</h3>
                <ul className="si-modal-list">
                  <li>Deine Seelenmuster und deine karmischen Themen</li>
                  <li>Dein Seelenauftrag und deine tiefste Berufung</li>
                  <li>
                    Energetische Blockaden und karmische Bindungen, die dich zurückhalten
                  </li>
                  <li>Die geistigen Begleiter, die derzeit an deiner Seite wirken</li>
                  <li>Zu erlösende Themen aus Ahnen- und Familienlinien</li>
                  <li>Deine Ressourcen, Stärken und dein Seele-Geistwesen</li>
                  <li>Handlungsempfehlungen – Workout für deinen weiteren Seelenweg</li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Wie läuft ein Seelen-Coaching ab?</h3>
                <ul className="si-modal-steps">
                  <li>
                    <strong>Vorbereitung &amp; heiliger Raum</strong>
                    <p>
                      Omrael Norbert Muigg öffnet den heiligen Raum, verbindet sich mit dem Paz
                      Mundo Altar und seinem Team, meist mit dem Medium Laura Soraya. Verbunden
                      mit deinem Schreiben und einem aktuellen Bild von dir, stimmen wir uns
                      auf deine Seele ein und lassen Kräfte über deine Seelenthemen und
                      Aufgaben sprechen.
                    </p>
                  </li>
                  <li>
                    <strong>Das Schauen</strong>
                    <p>
                      In gemeinsamer Abstimmung mit Omrael Norbert Muigg entfaltet sich die
                      mediale Seelenschau. Omrael Norbert Muigg ergänzt diese Einsicht durch
                      seine Wahrnehmungen, Bilder und Botschaften. Die Seelenschau und das
                      Workout bekommst du per Mail zugeschickt.
                    </p>
                  </li>
                  <li>
                    <strong>Zusammenfassung &amp; Weg</strong>
                    <p>
                      Du erhältst eine schriftliche Zusammenfassung der wesentlichen
                      Einsichten sowie konkrete Empfehlungen für deinen weiteren Weg – Rituale,
                      Meditationen, Gebete mit deinem persönlichen Workout, bei dem deine
                      zentralen Themen von dir mitbearbeitet und gelöst werden.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Für wen ist das Seelen-Coaching?</h3>
                <p>
                  Das Seelen-Coaching eignet sich für Menschen, die an einem Wendepunkt
                  stehen, sich nach tieferer Selbsterkenntnis sehnen, an wiederkehrenden
                  Mustern arbeiten möchten oder einfach spüren: Da ist mehr – ich möchte meine
                  Seelenaufgaben erkennen, angehen und lösen.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Angebot &amp; Kontakt</h3>
                <ul className="si-modal-list">
                  <li>
                    Seelen-Coaching beginnt mit deiner Anfrage, Themenbeschreibung und einem
                    Bild von dir.
                  </li>
                  <li>
                    Es wird mit deinem Seele-Geistwesen auf dem Paz Mundo Altar geistiger
                    Kontakt zu dir und deinen Seelenbegleitern aufgebaut.
                  </li>
                  <li>
                    Diese sprechen über deine Seelengeschichte, deine karmischen Themen und
                    deine besonderen seelischen Aufgaben, Gaben und Möglichkeiten.
                  </li>
                  <li>
                    Omrael Norbert Muigg verfasst eine schriftliche Zusammenfassung der
                    Seelenschau und arbeitet in Workouts an Möglichkeiten, weiter an dir selbst
                    zu arbeiten.
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Dein Beitrag</h3>
                <p>
                  Dein finanzieller Ausgleich geht in das Friedensprojekt Paz Mundo Guatemala.
                  Bitte vor Beginn des Seelen-Coachings überweisen.
                </p>
                <p>
                  Sende deine Info per Mail mit kurzer Themenbeschreibung und aktuellem Foto
                  an{" "}
                  <a href="mailto:kontakt@pazmundo.com" className="underline-link">
                    kontakt@pazmundo.com
                  </a>
                  .
                </p>

                <div className="si-modal-price-grid">
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Gesamt-Seelen-Coaching</div>
                    <div className="si-modal-price-desc">
                      Zusammenfassung, Materialliste, Gesamtworkout · ca. 13 Seiten
                    </div>
                    <div className="si-modal-price-amount">€ 490,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Seelen-Coaching mit Workout</div>
                    <div className="si-modal-price-desc">
                      Bezogen auf wenige, blockierende Lebensthemen · ca. 6 Seiten
                    </div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Für Tiere</div>
                    <div className="si-modal-price-desc">Seelen- und Wesenscoaching</div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                </div>

                <p className="si-modal-note">
                  Weitere Seelen-Coachings können angemeldet werden, wenn zu einem späteren
                  Zeitpunkt zusätzliche Themen von dir bearbeitet werden möchten.
                </p>

                <div className="si-modal-bank">
                  <div>
                    <strong>Überweisung</strong> · Bitte mit dem Hinweis „Guatemala“
                  </div>
                  <div>Norbert Muigg</div>
                  <div>IBAN: AT94 3633 9000 0005 8370 · Kennwort: Guatemala</div>
                </div>
              </div>

              <div className="si-modal-quote">
                In Liebe — Paz Mundo Team
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
