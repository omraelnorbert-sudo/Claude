import { NAHUALES, calculateNahual, type NahualResult } from "@/lib/nahual";

export const LANGUAGES = ["de", "en", "es"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Lang, string> = {
  de: "Deutsch",
  en: "English",
  es: "Español",
};

export const DEFAULT_TIMEZONE = "Europe/Zurich";

/** Kalenderdatum in einer bestimmten Zeitzone — nicht in der des Servers. */
export function dateInTimeZone(
  timeZone: string = DEFAULT_TIMEZONE,
  at: Date = new Date(),
): { day: number; month: number; year: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);

  const [year, month, day] = parts.split("-").map(Number);
  return { day, month, year };
}

export function hourInTimeZone(
  timeZone: string = DEFAULT_TIMEZONE,
  at: Date = new Date(),
): number {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    }).format(at),
  );
}

/** Das Tageszeichen von heute — für alle Nutzer dasselbe. */
export function nahualOfToday(
  timeZone: string = DEFAULT_TIMEZONE,
  at: Date = new Date(),
): NahualResult & { date: { day: number; month: number; year: number } } {
  const date = dateInTimeZone(timeZone, at);
  return { ...calculateNahual(date.day, date.month, date.year), date };
}

export function nahualNameByIndex(index: number): string {
  return NAHUALES[index - 1] ?? `#${index}`;
}

export function formatDate(
  date: { day: number; month: number; year: number },
  lang: Lang = "de",
): string {
  const locale = { de: "de-DE", en: "en-GB", es: "es-ES" }[lang];
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date.year, date.month - 1, date.day));
}

/**
 * Setzt die Tagesbotschaft zusammen: ein Text zum heutigen Tageszeichen plus
 * der persönliche Zusatz zum Geburts-Nahual der Person.
 */
export function composeMessage(options: {
  dayNahualIndex: number;
  dayNumber: number;
  birthNahualIndex: number | null;
  dayText: string | null;
  traitText: string | null;
  subjectTemplate: string;
  displayName?: string | null;
  lang: Lang;
}): { subject: string; paragraphs: string[] } {
  const dayName = nahualNameByIndex(options.dayNahualIndex);

  const subject = options.subjectTemplate
    .replaceAll("{nahual}", dayName)
    .replaceAll("{zahl}", String(options.dayNumber))
    .replaceAll("{name}", options.displayName ?? "");

  const paragraphs: string[] = [];
  if (options.dayText?.trim()) paragraphs.push(options.dayText.trim());
  if (options.traitText?.trim()) paragraphs.push(options.traitText.trim());

  return { subject, paragraphs };
}
