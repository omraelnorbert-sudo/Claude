/**
 * Maya-Kreuz ("Cruz Maya") auf Basis des 260-tägigen Cholq'ij/Tzolk'in-Kalenders.
 *
 * Diese Datei enthält KEINE eigene Kalenderlogik für die Cholq'ij-Kombination.
 * Zahl (1–13) und Nahual werden ausschließlich über die bereits vorhandene
 * Berechnung in `lib/nahual.ts` ermittelt (portiert von pazmundo.com). Neu ist
 * hier nur die Datums-Arithmetik: das Verschieben des Geburtsdatums um reale
 * Kalendertage und das Zusammensetzen der fünf Kreuz-Positionen.
 *
 * ---------------------------------------------------------------------------
 * Verwendete Korrelation
 * ---------------------------------------------------------------------------
 * `calculateNahual()` bildet intern einen fortlaufenden Tageszähler `sum`, für
 * den über den gesamten unterstützten Bereich gilt:
 *
 *     sum = JDN − 2 389 453
 *
 * Damit entspricht die Berechnung exakt der klassischen GMT-Korrelation
 * 584283 (Ausgangstag der Langen Zählung = 4 Ajaw/Ajpu). Nachgerechnet:
 *
 *     D           = JDN − 584283
 *     number      = mod(D + 3, 13) + 1
 *     yucatecIdx  = mod(D + 19, 20)          // 0 = Imix … 19 = Ajaw
 *     nahualIndex = mod(yucatecIdx − 10, 20) + 1   // 1 = B'aatz' … 20 = Tz'i'
 *
 * Ein erschöpfender Vergleich über alle 98 616 Tage von 1830-01-01 bis
 * 2099-12-31 ergab null Abweichungen (siehe `tests/maya-cross.test.ts`,
 * "GMT-584283-Äquivalenz"). Die Verschiebung um −10 Positionen kommt allein
 * daher, dass `NAHUALES` in `lib/nahual.ts` bei B'aatz' beginnt (K'iche'-
 * Zählweise) und nicht bei Imix/Imox.
 *
 * JDN-Konvention: ganzzahlige Julian Day Number mit Tagesbeginn um
 * Mitternacht — kein astronomisches JD mit Tagesbeginn um 12 Uhr. Es wird
 * ausschließlich mit ganzen Zahlen gerechnet, nie mit `Date`, damit die
 * Zeitzone des Servers oder des Browsers das Ergebnis nicht um einen Tag
 * verschieben kann.
 *
 * Hinweis auf mögliche Abweichungen: Rechner, die eine andere Korrelation
 * verwenden (z. B. 584285 nach Lounsbury oder lokale Zählweisen einzelner
 * Ajq'ijab'), können ein um ein bis zwei Tage verschobenes Ergebnis liefern.
 */

import {
  NAHUALES,
  calculateNahual,
  glyphSrcForIndex,
  isValidBirthDate,
} from "@/lib/nahual";

// ---------------------------------------------------------------------------
// Konfiguration — die einzige Stelle, an der Korrelation und Offsets stehen
// ---------------------------------------------------------------------------

export const MAYA_CALENDAR_CONFIG = {
  /** Klassische GMT-Korrelation; siehe Kopfkommentar. */
  correlation: 584283,
  /** JDN des Tages, an dem der Zähler in `lib/nahual.ts` bei sum = 0 steht. */
  countEpochJdn: 2_389_453,
  cycleLength: 260,
  numberCycleLength: 13,
  nawalCycleLength: 20,
  /** Verschiebung in realen Kalendertagen gegenüber dem Geburtstag. */
  crossOffsets: {
    conception: -8,
    masculine: -6,
    birth: 0,
    feminine: 6,
    maturity: 8,
  },
  /** Bereich, den die Berechnung in `lib/nahual.ts` abdeckt. */
  supportedYears: { from: 1830, to: 2099 },
} as const;

export const MAYA_CROSS_POSITION_KEYS = [
  "conception",
  "masculine",
  "birth",
  "feminine",
  "maturity",
] as const;

export type MayaCrossPositionKey = (typeof MAYA_CROSS_POSITION_KEYS)[number];

/**
 * Weil das Kreuz bis zu 8 Tage über das Geburtsdatum hinausgreift, ist der
 * nutzbare Bereich an beiden Enden um 8 Tage kleiner als der von
 * `isValidBirthDate()`.
 */
export const MAYA_CROSS_DATE_RANGE = {
  min: "1830-01-09",
  max: "2099-12-23",
} as const;

// ---------------------------------------------------------------------------
// Fehler
// ---------------------------------------------------------------------------

export type MayaCrossErrorCode =
  | "invalidDate"
  | "dateOutOfRange"
  | "unknownNahual";

export class MayaCrossError extends Error {
  readonly code: MayaCrossErrorCode;

  constructor(code: MayaCrossErrorCode, message?: string) {
    super(message ?? code);
    this.name = "MayaCrossError";
    this.code = code;
  }
}

// ---------------------------------------------------------------------------
// Datums-Grundlagen (reine Ganzzahl-Arithmetik, zeitzonenunabhängig)
// ---------------------------------------------------------------------------

export interface CalendarDate {
  year: number;
  month: number; // 1–12
  day: number; // 1–31
}

/** Modulo, das auch bei negativen Werten ein Ergebnis in [0, divisor) liefert. */
export function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

/** Prüft, ob ein Datum als Kalendertag überhaupt existiert (inkl. Schaltjahre). */
export function isRealCalendarDate({ year, month, day }: CalendarDate): boolean {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1) return false;
  return day <= daysInMonth(year, month);
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return leap ? 29 : 28;
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/**
 * Liest ein reines Kalenderdatum im Format `YYYY-MM-DD` ein — ohne `Date`,
 * damit kein Zeitzonen-Offset das Datum auf den Vor- oder Folgetag schiebt.
 */
export function parseCalendarDate(input: string): CalendarDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.trim());
  if (!match) {
    throw new MayaCrossError("invalidDate", `Kein Datum im Format YYYY-MM-DD: ${input}`);
  }
  const date = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
  if (!isRealCalendarDate(date)) {
    throw new MayaCrossError("invalidDate", `Diesen Kalendertag gibt es nicht: ${input}`);
  }
  return date;
}

/** Gegenstück zu `parseCalendarDate` — immer `YYYY-MM-DD`. */
export function formatCalendarDate({ year, month, day }: CalendarDate): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Gregorianisches Datum → ganzzahlige Julian Day Number (Tagesbeginn
 * Mitternacht). Standardformel nach Fliegel/Van Flandern.
 */
export function gregorianToJulianDay({ year, month, day }: CalendarDate): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/** Umkehrung von `gregorianToJulianDay`. */
export function julianDayToGregorian(jdn: number): CalendarDate {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

/** Verschiebt ein Kalenderdatum um ganze Tage — über Monats- und Jahresgrenzen. */
export function addCalendarDays(date: CalendarDate, offset: number): CalendarDate {
  return julianDayToGregorian(gregorianToJulianDay(date) + offset);
}

// ---------------------------------------------------------------------------
// Cholq'ij-Kombination eines einzelnen Tages
// ---------------------------------------------------------------------------

export type NahualName = (typeof NAHUALES)[number];

export interface CholqijDay {
  /** Schwingungszahl 1–13. */
  number: number;
  /** Position im 20er-Zyklus, 1–20, passend zu `NAHUALES` in `lib/nahual.ts`. */
  nawalIndex: number;
  /** Name aus `NAHUALES` — zugleich der Schlüssel der vorhandenen Beschreibungen. */
  nawalName: NahualName;
  /** Pfad zur vorhandenen Glyphe in /public/nahuales. */
  glyphSrc: string;
}

/**
 * Berechnet Zahl und Nahual für genau einen Kalendertag.
 *
 * Delegiert vollständig an `calculateNahual()`; jede Position des Kreuzes
 * durchläuft dadurch den kompletten kontinuierlichen Tageszähler und wird nie
 * durch bloßes Verschieben eines Array-Index bestimmt.
 */
export function calculateCholqijForDate(date: CalendarDate): CholqijDay {
  if (!isRealCalendarDate(date)) {
    throw new MayaCrossError("invalidDate", `Diesen Kalendertag gibt es nicht: ${formatCalendarDate(date)}`);
  }
  if (!isValidBirthDate(date.day, date.month, date.year)) {
    throw new MayaCrossError(
      "dateOutOfRange",
      `${formatCalendarDate(date)} liegt außerhalb des berechenbaren Bereichs ` +
        `(${MAYA_CALENDAR_CONFIG.supportedYears.from}–${MAYA_CALENDAR_CONFIG.supportedYears.to}).`,
    );
  }

  const result = calculateNahual(date.day, date.month, date.year);
  const name = NAHUALES[result.index - 1];
  if (!name) {
    throw new MayaCrossError("unknownNahual", `Kein Nahual zu Index ${result.index}.`);
  }

  return {
    number: result.number,
    nawalIndex: result.index,
    nawalName: name,
    glyphSrc: result.glyphSrc || glyphSrcForIndex(result.index),
  };
}

// ---------------------------------------------------------------------------
// Das Kreuz
// ---------------------------------------------------------------------------

export interface MayaCrossPosition extends CholqijDay {
  key: MayaCrossPositionKey;
  offsetDays: number;
  /** Das tatsächlich gerechnete Kalenderdatum dieser Position, `YYYY-MM-DD`. */
  gregorianDate: string;
}

export interface MayaCrossResult {
  birthDate: string;
  correlation: number;
  positions: Record<MayaCrossPositionKey, MayaCrossPosition>;
}

/**
 * Berechnet alle fünf Positionen des Maya-Kreuzes.
 *
 *                     EMPFÄNGNIS (−8)
 *                            │
 *     MÄNNLICH (−6) ─── GEBURT (0) ─── WEIBLICH (+6)
 *                            │
 *                       REIFE (+8)
 *
 * @param birthDate Geburtsdatum als `YYYY-MM-DD` oder als `CalendarDate`.
 */
export function calculateMayaCross(
  birthDate: string | CalendarDate,
): MayaCrossResult {
  const birth =
    typeof birthDate === "string" ? parseCalendarDate(birthDate) : birthDate;

  if (!isRealCalendarDate(birth)) {
    throw new MayaCrossError("invalidDate", "Ungültiges Geburtsdatum.");
  }

  const positions = {} as Record<MayaCrossPositionKey, MayaCrossPosition>;

  for (const key of MAYA_CROSS_POSITION_KEYS) {
    const offsetDays = MAYA_CALENDAR_CONFIG.crossOffsets[key];
    const date = addCalendarDays(birth, offsetDays);
    positions[key] = {
      key,
      offsetDays,
      gregorianDate: formatCalendarDate(date),
      ...calculateCholqijForDate(date),
    };
  }

  return {
    birthDate: formatCalendarDate(birth),
    correlation: MAYA_CALENDAR_CONFIG.correlation,
    positions,
  };
}

/** Liegen alle fünf Kreuz-Daten im berechenbaren Bereich? */
export function isSupportedCrossBirthDate(
  birthDate: string | CalendarDate,
): boolean {
  try {
    calculateMayaCross(birthDate);
    return true;
  } catch {
    return false;
  }
}
