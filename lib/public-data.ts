import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { NAHUALES, glyphSrcForIndex, slugForIndex } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";
import { NAHUAL_DESCRIPTIONS_ES } from "@/lib/nahual-descriptions-es";
import type { Lang } from "@/lib/tzolkin";

export type ExternalLinkCard = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  image_url: string | null;
};

export async function getPublicExternalLinks(): Promise<ExternalLinkCard[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("external_links")
    .select("id, title, url, description, image_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) return [];
  return (data as ExternalLinkCard[]) ?? [];
}

export type NahualVideoEntry = {
  nahualIndex: number;
  videoId: string;
  title: string | null;
};

/** Alle Nahuales, denen im Dashboard ein YouTube-Video zugeordnet wurde. */
export async function getAllNahualVideos(): Promise<NahualVideoEntry[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("nahual_videos")
    .select("nahual_index, youtube_video_id, title")
    .not("youtube_video_id", "is", null)
    .order("nahual_index");

  if (error) return [];

  return (data ?? [])
    .filter((row) => row.youtube_video_id)
    .map((row) => ({
      nahualIndex: row.nahual_index as number,
      videoId: row.youtube_video_id as string,
      title: row.title as string | null,
    }));
}

export type NahualLongText = {
  heading: string | null;
  directions: string | null;
  body: string[];
  ceremonies: string[];
  bodyLevel: string | null;
  powerAnimal: string | null;
};

/** Langfassung aller 20 Nahuales (Quelle: "Die 20 NAHUALES des MAYA", Paz Mundo). */
export async function getAllNahualLongTexts(
  lang: Lang = "de",
): Promise<Record<number, NahualLongText>> {
  if (!isSupabaseConfigured()) return {};

  const supabase = createClient();
  const { data, error } = await supabase
    .from("nahual_long_texts")
    .select("nahual_index, heading, directions, body, ceremonies, body_level, power_animal")
    .eq("lang", lang);

  if (error || !data) return {};

  const byIndex: Record<number, NahualLongText> = {};
  for (const row of data) {
    if (!row.heading && !row.body?.length) continue; // leere en/es-Platzhalterzeilen überspringen
    byIndex[row.nahual_index as number] = {
      heading: row.heading as string | null,
      directions: row.directions as string | null,
      body: (row.body as string[] | null) ?? [],
      ceremonies: (row.ceremonies as string[] | null) ?? [],
      bodyLevel: row.body_level as string | null,
      powerAnimal: row.power_animal as string | null,
    };
  }
  return byIndex;
}

export type NahualOverviewItem = {
  index: number;
  name: string;
  slug: string;
  cardSrc: string;
  fullSrc: string;
  kurz: string;
  summary: string;
  krafttier: string;
  longText: NahualLongText | null;
};

/** Alle 20 Nahuales mit Kurztext + Langfassung, für Übersichtsraster (Startseite, /nahuales). */
export async function getNahualOverviewItems(lang: Lang = "de"): Promise<NahualOverviewItem[]> {
  const longTexts = await getAllNahualLongTexts(lang);
  const descriptions = lang === "es" ? NAHUAL_DESCRIPTIONS_ES : NAHUAL_DESCRIPTIONS;

  return NAHUALES.map((name, position) => {
    const index = position + 1;
    const desc = descriptions[name];
    return {
      index,
      name,
      slug: slugForIndex(index),
      cardSrc: glyphSrcForIndex(index, "card"),
      fullSrc: glyphSrcForIndex(index, "full"),
      kurz: desc.kurz,
      summary: desc.summary,
      krafttier: desc.krafttier,
      longText: longTexts[index] ?? null,
    };
  });
}

export type NahualContent = {
  videoId: string | null;
  videoTitle: string | null;
  dayText: string | null;
  traitText: string | null;
};

const EMPTY_NAHUAL_CONTENT: NahualContent = {
  videoId: null,
  videoTitle: null,
  dayText: null,
  traitText: null,
};

/** Von der Admin-Redaktion gepflegte Inhalte zu einem Nahual (Video + Texte). */
export async function getNahualContent(
  nahualIndex: number,
  lang: Lang = "de",
): Promise<NahualContent> {
  if (!isSupabaseConfigured()) return EMPTY_NAHUAL_CONTENT;

  const supabase = createClient();

  const [video, dayText, trait] = await Promise.all([
    supabase
      .from("nahual_videos")
      .select("youtube_video_id, title")
      .eq("nahual_index", nahualIndex)
      .maybeSingle(),
    supabase
      .from("day_sign_texts")
      .select("text")
      .eq("nahual_index", nahualIndex)
      .eq("lang", lang)
      .maybeSingle(),
    supabase
      .from("nahual_traits")
      .select("text")
      .eq("nahual_index", nahualIndex)
      .eq("lang", lang)
      .maybeSingle(),
  ]);

  return {
    videoId: video.data?.youtube_video_id ?? null,
    videoTitle: video.data?.title ?? null,
    dayText: dayText.data?.text ?? null,
    traitText: trait.data?.text ?? null,
  };
}
