import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type ContentItem = {
  id: string;
  type: "ritual" | "workout";
  title: string;
  description: string | null;
  theme: string | null;
  created_at: string;
};

export async function getContentItems(type: ContentItem["type"]) {
  if (!supabase) {
    console.warn("Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY fehlen).");
    return [];
  }

  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("type", type)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Failed to load ${type} items:`, error.message);
    return [];
  }

  return data as ContentItem[];
}
