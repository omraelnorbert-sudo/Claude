// Tzolk'in-Berechnung, portiert von pazmundo.com (Paz Mundo Mayakalender).
// Anker/Reihenfolge kreuzvalidiert gegen den Claude Design Stylebook-Kalender
// ("1. Januar 2027 = 6 Kat").

export const NAHUALES = [
  "B'aatz'",
  "Ee",
  "Aaj",
  "I'x",
  "Tz'ikin",
  "Ajmaq",
  "Noj",
  "Tijaax",
  "Kawoq",
  "Ajpuu",
  "Imox",
  "Iq'",
  "Ak'ab'al",
  "Kat",
  "Kaan",
  "Keme",
  "Kiej",
  "Q'anil",
  "Tooj",
  "Tz'i'",
] as const;

// Zuordnung Nahual-Index (1-20, siehe NAHUALES) -> Glyphen-Bilddatei in /public/nahuales
const GLYPH_FILE_BY_INDEX: Record<number, string> = {
  1: "03",
  2: "02",
  3: "06",
  4: "01",
  5: "05",
  6: "04",
  7: "07",
  8: "08",
  9: "09",
  10: "10",
  11: "11",
  12: "17",
  13: "20",
  14: "19",
  15: "18",
  16: "14",
  17: "16",
  18: "15",
  19: "12",
  20: "13",
};

/** Pfad zur Glyphe eines Nahuals (1-20), unabhängig von einem Geburtsdatum. */
export function glyphSrcForIndex(index: number): string {
  const fileNum = GLYPH_FILE_BY_INDEX[index];
  return fileNum ? `/nahuales/${fileNum}.png` : "";
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const NAHUAL_SLUGS = NAHUALES.map(slugify);

/** URL-Slug eines Nahuals (1-20), z.B. "ak'ab'al" -> "akabal". */
export function slugForIndex(index: number): string {
  return NAHUAL_SLUGS[index - 1] ?? "";
}

/** Nahual-Index (1-20) zu einem URL-Slug, oder null wenn unbekannt. */
export function indexForSlug(slug: string): number | null {
  const position = NAHUAL_SLUGS.indexOf(slug.toLowerCase());
  return position === -1 ? null : position + 1;
}

export interface NahualResult {
  number: number; // Schwingungszahl 1-13
  index: number; // Position im 20er-Zyklus
  name: (typeof NAHUALES)[number]; // zugleich Schlüssel der Nahual-Beschreibungen
  glyphSrc: string;
}

export function isValidBirthDate(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return false;
  }
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1830 || year >= 2100) {
    return false;
  }
  if (day === 31 && [2, 4, 6, 9, 11].includes(month)) {
    return false;
  }
  const isLeapYear = year % 4 === 0;
  if (month === 2 && day > (isLeapYear ? 29 : 28)) {
    return false;
  }
  return true;
}

export function calculateNahual(day: number, month: number, year: number): NahualResult {
  if (!isValidBirthDate(day, month, year)) {
    throw new Error("Ungültiges Geburtsdatum");
  }

  const n1 = year - 1830;
  const n2 = Math.round(n1 / 4 - 0.001);
  const n3 = 365 * n1 + n2;
  const isLeapYear = year % 4 === 0;
  const febDays = isLeapYear ? 29 : 28;

  const daysBeforeMonth = [
    0, // ungenutzt (Monate sind 1-indiziert)
    0, // Januar
    31, // Februar
    31 + febDays, // März
    62 + febDays, // April
    92 + febDays, // Mai
    123 + febDays, // Juni
    153 + febDays, // Juli
    184 + febDays, // August
    215 + febDays, // September
    245 + febDays, // Oktober
    276 + febDays, // November
    306 + febDays, // Dezember
  ];

  let sum = n3 + daysBeforeMonth[month] + day;
  if (sum > 25626) {
    sum -= 1; // 1900-Korrektur (mod-4-Schaltjahrregel trifft 1900 fälschlich als Schaltjahr)
  }

  let kin = sum % 260;
  if (kin === 0) kin = 260;

  let number = (kin + 7) % 13;
  if (number === 0) number = 13;

  let index = kin % 20;
  if (index === 0) index = 20;

  const fileNum = GLYPH_FILE_BY_INDEX[index];

  return {
    number,
    index,
    name: NAHUALES[index - 1],
    glyphSrc: `/nahuales/${fileNum}.png`,
  };
}
