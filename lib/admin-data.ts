import { createClient } from "@/lib/supabase/server";
import type { Lang } from "@/lib/tzolkin";

export type SendSettings = {
  enabled: boolean;
  send_hour: number;
  timezone: string;
  from_name: string;
  from_email: string | null;
  reply_to: string | null;
  subject_template: string;
  updated_at: string | null;
};

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  birth_date: string | null;
  nahual_number: number | null;
  nahual_index: number | null;
  preferred_language: Lang;
  email_opt_in: boolean;
  created_at: string;
};

export type TextRow = {
  nahual_index: number;
  lang: Lang;
  text: string | null;
};

export type VideoRow = {
  nahual_index: number;
  youtube_video_id: string | null;
  title: string | null;
};

export type EmailLogRow = {
  id: string;
  email: string | null;
  day_nahual_index: number | null;
  lang: string | null;
  status: "sent" | "failed" | "skipped";
  error: string | null;
  created_at: string;
};

export const DEFAULT_SEND_SETTINGS: SendSettings = {
  enabled: false,
  send_hour: 7,
  timezone: "Europe/Zurich",
  from_name: "Paz Mundo",
  from_email: null,
  reply_to: null,
  subject_template: "Dein Tag im Zeichen {nahual}",
  updated_at: null,
};

/**
 * Fehlt eine Tabelle, ist meist nur das Schema noch nicht eingespielt.
 * Die Seiten sollen das erklären statt abzustürzen.
 */
function describe(error: { message: string; code?: string } | null): string | null {
  if (!error) return null;
  if (error.code === "42P01" || error.message.includes("does not exist")) {
    return "Das Schema ist noch nicht eingespielt. Führe supabase/schema_admin.sql im Supabase SQL Editor aus.";
  }
  return error.message;
}

export async function getSendSettings(): Promise<{
  settings: SendSettings;
  error: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("send_settings")
    .select("*")
    .eq("id", true)
    .maybeSingle();

  return {
    settings: (data as SendSettings | null) ?? DEFAULT_SEND_SETTINGS,
    error: describe(error),
  };
}

export async function getProfiles(): Promise<{
  profiles: Profile[];
  error: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return { profiles: (data as Profile[]) ?? [], error: describe(error) };
}

export async function getTexts(
  table: "day_sign_texts" | "nahual_traits",
  lang: Lang,
): Promise<{ rows: TextRow[]; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select("nahual_index, lang, text")
    .eq("lang", lang)
    .order("nahual_index");

  return { rows: (data as TextRow[]) ?? [], error: describe(error) };
}

export async function getVideos(): Promise<{
  videos: VideoRow[];
  error: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("nahual_videos")
    .select("nahual_index, youtube_video_id, title")
    .order("nahual_index");

  return { videos: (data as VideoRow[]) ?? [], error: describe(error) };
}

export async function getEmailLog(limit = 100): Promise<{
  rows: EmailLogRow[];
  error: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("email_log")
    .select("id, email, day_nahual_index, lang, status, error, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  return { rows: (data as EmailLogRow[]) ?? [], error: describe(error) };
}

/** Zählt, wie viele der 20 × 3 Textfelder schon gefüllt sind. */
export async function getTextCompletion(): Promise<{
  dayTexts: number;
  traits: number;
  total: number;
  error: string | null;
}> {
  const supabase = createClient();

  const [days, traits] = await Promise.all([
    supabase.from("day_sign_texts").select("text"),
    supabase.from("nahual_traits").select("text"),
  ]);

  const filled = (rows: { text: string | null }[] | null) =>
    (rows ?? []).filter((row) => row.text && row.text.trim().length > 0).length;

  return {
    dayTexts: filled(days.data),
    traits: filled(traits.data),
    total: 60, // 20 Nahuales × 3 Sprachen
    error: describe(days.error ?? traits.error),
  };
}
