"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin";
import { createDataClient } from "@/lib/supabase/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDevBypassActive } from "@/lib/dev-bypass";
import { calculateNahual, isValidBirthDate } from "@/lib/nahual";
import {
  composeMessage,
  nahualNameByIndex,
  nahualOfToday,
  type Lang,
} from "@/lib/tzolkin";

export type ActionResult = { ok: boolean; message: string };

/**
 * Fassungen für useFormState: React reicht dort den vorherigen Zustand als
 * erstes Argument mit, das die eigentlichen Aktionen nicht brauchen.
 */
export async function saveSendSettingsAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return saveSendSettings(formData);
}

export async function createUserAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return createUser(formData);
}

export async function sendTestEmailAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return sendTestEmail(formData);
}

/** Jede Aktion prüft zuerst die Admin-Rolle — auch die mit Service-Role-Rechten. */
async function requireAdmin(): Promise<string | null> {
  const { user, isAdmin, viaDevBypass } = await getAdminSession();
  if (!user && !viaDevBypass) return "Nicht angemeldet.";
  if (!isAdmin) return "Keine Admin-Berechtigung.";
  return null;
}

/**
 * Übersetzt Datenbankfehler in eine Erklärung, mit der man etwas anfangen kann.
 *
 * Der häufigste Fall beim Entwickeln: die lokale Abkürzung ist aktiv, aber es
 * fehlt der Service-Role-Schlüssel. Dann sieht die Datenbank niemanden und
 * lehnt jedes Schreiben ab — die rohe Meldung dazu ist wenig hilfreich.
 */
function describeWriteError(error: { message: string; code?: string }): string {
  const isRlsViolation =
    error.code === "42501" ||
    error.message.includes("row-level security policy");

  if (!isRlsViolation) return error.message;

  if (isDevBypassActive()) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "Die Datenbank hat das Schreiben abgelehnt, obwohl der Service-Role-Schlüssel gesetzt ist. Prüfe die Policies in supabase/schema_admin.sql."
      : "Speichern ist im Abkürzungsmodus nicht möglich: Ohne Anmeldung braucht es SUPABASE_SERVICE_ROLE_KEY in .env.local. Alternativ oben rechts richtig anmelden — dann funktioniert es ohne diesen Schlüssel.";
  }

  return "Die Datenbank hat das Schreiben abgelehnt. Ist dein Konto in der Tabelle admins eingetragen?";
}

// ---------------------------------------------------------------------------
// Versand-Einstellungen
// ---------------------------------------------------------------------------

export async function saveSendSettings(
  formData: FormData,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const hour = Number(formData.get("send_hour"));
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return { ok: false, message: "Die Uhrzeit muss zwischen 0 und 23 liegen." };
  }

  const supabase = createDataClient();
  const { error } = await supabase
    .from("send_settings")
    .update({
      enabled: formData.get("enabled") === "on",
      send_hour: hour,
      timezone: String(formData.get("timezone") ?? "Europe/Zurich"),
      from_name: String(formData.get("from_name") ?? "Paz Mundo"),
      from_email: String(formData.get("from_email") ?? "").trim() || null,
      reply_to: String(formData.get("reply_to") ?? "").trim() || null,
      subject_template: String(formData.get("subject_template") ?? "").trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/versand");
  revalidatePath("/admin");
  return { ok: true, message: "Einstellungen gespeichert." };
}

// ---------------------------------------------------------------------------
// Texte und Videos
// ---------------------------------------------------------------------------

export async function saveText(
  table: "day_sign_texts" | "nahual_traits",
  nahualIndex: number,
  lang: Lang,
  text: string,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const supabase = createDataClient();
  const { error } = await supabase.from(table).upsert(
    {
      nahual_index: nahualIndex,
      lang,
      text: text.trim() || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "nahual_index,lang" },
  );

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/texte");
  revalidatePath("/admin");
  return { ok: true, message: "Gespeichert" };
}

export async function saveVideo(
  nahualIndex: number,
  youtubeValue: string,
  title: string,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const supabase = createDataClient();
  const { error } = await supabase.from("nahual_videos").upsert(
    {
      nahual_index: nahualIndex,
      youtube_video_id: extractYoutubeId(youtubeValue),
      title: title.trim() || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "nahual_index" },
  );

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/videos");
  return { ok: true, message: "Gespeichert" };
}

/** Nimmt eine volle YouTube-URL oder direkt die ID entgegen. */
function extractYoutubeId(value: string): string | null {
  const input = value.trim();
  if (!input) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/(?:embed|shorts|live)\/)([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }

  return /^[\w-]{11}$/.test(input) ? input : input;
}

// ---------------------------------------------------------------------------
// Nutzer
// ---------------------------------------------------------------------------

export async function createUser(formData: FormData): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      message:
        "SUPABASE_SERVICE_ROLE_KEY fehlt. Ohne diesen Schlüssel lassen sich keine Konten anlegen.",
    };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { ok: false, message: "E-Mail-Adresse fehlt." };

  const displayName = String(formData.get("display_name") ?? "").trim();
  const language = String(formData.get("preferred_language") ?? "de") as Lang;
  const birthDate = String(formData.get("birth_date") ?? "").trim();
  const invite = formData.get("send_invite") === "on";

  const nahual = birthDate ? nahualFromIsoDate(birthDate) : null;
  if (birthDate && !nahual) {
    return { ok: false, message: "Das Geburtsdatum ist ungültig." };
  }

  const { data, error } = invite
    ? await admin.auth.admin.inviteUserByEmail(email, {
        data: { full_name: displayName || undefined },
      })
    : await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { full_name: displayName || undefined },
      });

  if (error) return { ok: false, message: describeWriteError(error) };

  const userId = data.user?.id;
  if (userId) {
    // Der Trigger legt die Profilzeile an; hier kommen die Zusatzangaben dazu.
    await admin.from("profiles").upsert({
      id: userId,
      email,
      display_name: displayName || null,
      birth_date: birthDate || null,
      nahual_number: nahual?.number ?? null,
      nahual_index: nahual?.index ?? null,
      preferred_language: language,
      updated_at: new Date().toISOString(),
    });
  }

  revalidatePath("/admin/nutzer");
  revalidatePath("/admin");
  return {
    ok: true,
    message: invite
      ? `Einladung an ${email} verschickt.`
      : `Konto für ${email} angelegt.`,
  };
}

export async function updateProfile(
  id: string,
  fields: {
    display_name?: string;
    birth_date?: string;
    preferred_language?: Lang;
    email_opt_in?: boolean;
  },
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (fields.display_name !== undefined) {
    patch.display_name = fields.display_name.trim() || null;
  }
  if (fields.preferred_language !== undefined) {
    patch.preferred_language = fields.preferred_language;
  }
  if (fields.email_opt_in !== undefined) {
    patch.email_opt_in = fields.email_opt_in;
  }
  if (fields.birth_date !== undefined) {
    const value = fields.birth_date.trim();
    if (value) {
      const nahual = nahualFromIsoDate(value);
      if (!nahual) return { ok: false, message: "Das Geburtsdatum ist ungültig." };
      patch.birth_date = value;
      patch.nahual_number = nahual.number;
      patch.nahual_index = nahual.index;
    } else {
      patch.birth_date = null;
      patch.nahual_number = null;
      patch.nahual_index = null;
    }
  }

  const supabase = createDataClient();
  const { error } = await supabase.from("profiles").update(patch).eq("id", id);

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/nutzer");
  return { ok: true, message: "Gespeichert" };
}

export async function deleteUser(id: string): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      message: "SUPABASE_SERVICE_ROLE_KEY fehlt — Löschen nicht möglich.",
    };
  }

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/nutzer");
  revalidatePath("/admin");
  return { ok: true, message: "Konto gelöscht." };
}

/** Rechnet ein ISO-Datum (JJJJ-MM-TT) in Schwingungszahl und Nahual um. */
function nahualFromIsoDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!isValidBirthDate(day, month, year)) return null;
  return calculateNahual(day, month, year);
}

// ---------------------------------------------------------------------------
// Externe Links
// ---------------------------------------------------------------------------

export async function createExternalLinkAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!title) return { ok: false, message: "Ein Titel wird gebraucht." };
  if (!url) return { ok: false, message: "Eine URL wird gebraucht." };

  const supabase = createDataClient();
  const { error } = await supabase.from("external_links").insert({
    title,
    url,
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/paz-mundo");
  revalidatePath("/paz-mundo");
  return { ok: true, message: `„${title}" angelegt.` };
}

export async function saveExternalLink(
  id: string,
  title: string,
  url: string,
  description: string,
  imageUrl: string,
  sortOrder: number,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  if (!title.trim()) return { ok: false, message: "Ein Titel wird gebraucht." };
  if (!url.trim()) return { ok: false, message: "Eine URL wird gebraucht." };

  const supabase = createDataClient();
  const { error } = await supabase
    .from("external_links")
    .update({
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/paz-mundo");
  revalidatePath("/paz-mundo");
  return { ok: true, message: "Gespeichert" };
}

export async function deleteExternalLink(id: string): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const supabase = createDataClient();
  const { error } = await supabase.from("external_links").delete().eq("id", id);
  if (error) return { ok: false, message: describeWriteError(error) };

  revalidatePath("/admin/paz-mundo");
  revalidatePath("/paz-mundo");
  return { ok: true, message: "Gelöscht." };
}

// ---------------------------------------------------------------------------
// Testmail
// ---------------------------------------------------------------------------

export async function sendTestEmail(formData: FormData): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return { ok: false, message: denied };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      message: "RESEND_API_KEY fehlt. Trage ihn in .env.local und bei Netlify ein.",
    };
  }

  const { email: adminEmail } = await getAdminSession();
  const recipient =
    String(formData.get("recipient") ?? "").trim() || adminEmail || "";
  if (!recipient) return { ok: false, message: "Keine Empfängeradresse." };

  const lang = (String(formData.get("lang") ?? "de") || "de") as Lang;
  const birthIndex = Number(formData.get("birth_nahual_index")) || 1;

  const supabase = createDataClient();
  const { settings } = await import("@/lib/admin-data").then((module) =>
    module.getSendSettings(),
  );

  if (!settings.from_email) {
    return {
      ok: false,
      message: "Es ist keine Absenderadresse hinterlegt.",
    };
  }

  const today = nahualOfToday(settings.timezone);

  const [dayText, traitText] = await Promise.all([
    supabase
      .from("day_sign_texts")
      .select("text")
      .eq("nahual_index", today.index)
      .eq("lang", lang)
      .maybeSingle(),
    supabase
      .from("nahual_traits")
      .select("text")
      .eq("nahual_index", birthIndex)
      .eq("lang", lang)
      .maybeSingle(),
  ]);

  const { subject, paragraphs } = composeMessage({
    dayNahualIndex: today.index,
    dayNumber: today.number,
    birthNahualIndex: birthIndex,
    dayText: dayText.data?.text ?? null,
    traitText: traitText.data?.text ?? null,
    subjectTemplate: settings.subject_template,
    displayName: null,
    lang,
  });

  if (paragraphs.length === 0) {
    return {
      ok: false,
      message: `Für ${nahualNameByIndex(today.index)} (${lang.toUpperCase()}) ist noch kein Text hinterlegt.`,
    };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `${settings.from_name} <${settings.from_email}>`,
    to: recipient,
    replyTo: settings.reply_to ?? undefined,
    subject: `[Test] ${subject}`,
    text: paragraphs.join("\n\n"),
  });

  if (error) return { ok: false, message: describeWriteError(error) };

  return { ok: true, message: `Testmail an ${recipient} verschickt.` };
}
