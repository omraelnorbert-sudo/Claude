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

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const NAHUAL_SLUGS = NAHUALES.map(slugify);

// Glyphen-Bilddateien liegen in /public/glyphen, benannt nach demselben Slug
// wie das Nahual selbst, z.B. "Ak'ab'al" -> akabal.webp. Eigener Pfad, nicht
// /nahuales: dort liegen die Seitenrouten, und die dürfen die langen
// Cache-Header der Bilder nicht abbekommen (siehe netlify.toml).
//
// Die Originale sind 625px breit, daneben liegen verkleinerte Varianten —
// Rad und Kachelraster zeigen die Glyphen deutlich kleiner, dort wäre die
// volle Auflösung reine Ladezeit.
export type GlyphSize =
  /** 160px — Rad-Knoten (max. 78px) und Geburtsvorschau (82px). */
  | "thumb"
  /** 320px — Kachelraster auf /nahuales (max. ~155px). */
  | "card"
  /** 625px — Detailseite, Maya-Kreuz, Vorschaubild für Google. */
  | "full";

const GLYPH_DIR: Record<GlyphSize, string> = {
  thumb: "/glyphen/thumb",
  card: "/glyphen/card",
  full: "/glyphen",
};

/** Pfad zur Glyphe eines Nahuals (1-20), unabhängig von einem Geburtsdatum. */
export function glyphSrcForIndex(index: number, size: GlyphSize = "full"): string {
  const slug = NAHUAL_SLUGS[index - 1];
  return slug ? `${GLYPH_DIR[size]}/${slug}.webp` : "";
}

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

  return {
    number,
    index,
    name: NAHUALES[index - 1],
    glyphSrc: glyphSrcForIndex(index),
  };
}
