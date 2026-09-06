import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
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
