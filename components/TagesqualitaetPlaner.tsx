"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateNahual, glyphSrcForIndex, isValidBirthDate, slugForIndex } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";
import { NAHUAL_DESCRIPTIONS_EN } from "@/lib/nahual-descriptions-en";
import { NAHUAL_DESCRIPTIONS_ES } from "@/lib/nahual-descriptions-es";
import { dateInTimeZone, formatDate, type Lang } from "@/lib/tzolkin";
import MayaNumber from "@/components/MayaNumber";

export const MAYAKALENDER_2027_URL = "https://www.pazmundo.com/kopie-mayakalender-2017";

// Wie viele Tage ab dem gewählten Datum gezeigt werden — eine Woche zum Planen.
const DAYS = 7;

const DESCRIPTIONS = { de: NAHUAL_DESCRIPTIONS, en: NAHUAL_DESCRIPTIONS_EN, es: NAHUAL_DESCRIPTIONS_ES };
const NAHUAL_BASE = { de: "/nahuales", en: "/en/nahuales", es: "/es/nahuales" };

const TEXTS = {
  de: {
    eyebrow: "Tagesqualität planen",
    title: "Welcher Nahual wirkt an welchem Tag?",
    intro:
      "Jeder Tag steht unter einem Nahual und einer Schwingungszahl. Wähle ein beliebiges Datum — etwa für ein Gespräch, eine Reise oder eine Zeremonie — und sieh die Tagesqualität dieses Tages und der folgenden sechs Tage.",
    label: "Datum",
    today: "Heute",
    reset: "Zurück zu heute",
    more: "Nahual ansehen →",
    calendar: "Den Paz Mundo Mayakalender 2027 für das ganze Jahr bestellen →",
  },
  en: {
    eyebrow: "Plan with the day energy",
    title: "Which Nahual is at work on which day?",
    intro:
      "Every day stands under a Nahual and a vibration number. Choose any date — for a conversation, a journey or a ceremony — and see the quality of that day and the six days that follow.",
    label: "Date",
    today: "Today",
    reset: "Back to today",
    more: "View Nahual →",
    calendar: "Order the Paz Mundo MAYA calendar 2027 for the whole year (German) →",
  },
  es: {
    eyebrow: "Planificar con la energía del día",
    title: "¿Qué Nahual actúa en qué día?",
    intro:
      "Cada día está bajo un Nahual y un número de vibración. Elige cualquier fecha — para una conversación, un viaje o una ceremonia — y descubre la energía de ese día y de los seis días siguientes.",
    label: "Fecha",
    today: "Hoy",
    reset: "Volver a hoy",
    more: "Ver Nahual →",
    calendar: "Pedir el calendario maya Paz Mundo 2027 para todo el año (en alemán) →",
  },
};

type Day = { day: number; month: number; year: number };

function toInput({ day, month, year }: Day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseInput(value: string): Day | null {
  const [year, month, day] = value.split("-").map(Number);
  return isValidBirthDate(day, month, year) ? { day, month, year } : null;
}

function addDays({ day, month, year }: Day, offset: number): Day {
  // Mittags rechnen, damit eine Zeitumstellung nie den Tag verschiebt.
  const date = new Date(year, month - 1, day + offset, 12);
  return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
}

export default function TagesqualitaetPlaner({ lang }: { lang: Lang }) {
  const t = TEXTS[lang];
  const descriptions = DESCRIPTIONS[lang];

  // Erst nach dem Laden gesetzt: die Seite wird vorab statisch erzeugt, „heute“
  // ist aber der Tag des Besuchs, nicht der Tag des Builds.
  const [todayValue, setTodayValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const today = toInput(dateInTimeZone());
    setTodayValue(today);
    setValue(today);
  }, []);

  const start = parseInput(value);
  const days = start
    ? Array.from({ length: DAYS }, (_, offset) => {
        const date = addDays(start, offset);
        return isValidBirthDate(date.day, date.month, date.year)
          ? { date, value: toInput(date), nahual: calculateNahual(date.day, date.month, date.year) }
          : null;
      }).filter((entry) => entry !== null)
    : [];

  return (
    <div id="tagesqualitaet" className="planer">
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {t.eyebrow}
      </div>
      <h2 className="planer-title">{t.title}</h2>
      <p style={{ maxWidth: "62ch" }}>{t.intro}</p>

      <div className="planer-form">
        <input
          type="date"
          className="birth-date-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          min="1830-01-01"
          max="2099-12-31"
          aria-label={t.label}
        />
        {todayValue && value !== todayValue && (
          <button type="button" className="underline-link planer-reset" onClick={() => setValue(todayValue)}>
            {t.reset}
          </button>
        )}
      </div>

      <ol className="planer-list">
        {days.map(({ date, value: dayValue, nahual }, position) => (
          <li key={dayValue} className={`planer-day${position === 0 ? " is-first" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={glyphSrcForIndex(nahual.index, "thumb")}
              alt=""
              className="planer-glyph"
              width={56}
              height={72}
              decoding="async"
            />
            <div className="planer-day-text">
              <div className="planer-date">
                {dayValue === todayValue && <span className="planer-today">{t.today}</span>}
                {formatDate(date, lang)}
              </div>
              <div className="planer-name">
                {nahual.number} {nahual.name}
              </div>
              <div className="planer-kurz">{descriptions[nahual.name].kurz}</div>
              {position === 0 && (
                <Link href={`${NAHUAL_BASE[lang]}/${slugForIndex(nahual.index)}`} className="underline-link planer-more">
                  {t.more}
                </Link>
              )}
            </div>
            <MayaNumber value={nahual.number} />
          </li>
        ))}
      </ol>

      <a href={MAYAKALENDER_2027_URL} target="_blank" rel="noopener noreferrer" className="underline-link">
        {t.calendar}
      </a>
    </div>
  );
}
