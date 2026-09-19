import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import NahualGlyph from "@/components/NahualGlyph";
import { NAHUALES, glyphSrcForIndex, indexForSlug } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS_EN } from "@/lib/nahual-descriptions-en";
import { getNahualContent } from "@/lib/public-data";
import { nahualArticleSchema } from "@/lib/structured-data";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const index = indexForSlug(params.slug);
  const name = index ? NAHUALES[index - 1] : null;
  if (!name) return { title: "Nahual" };

  const description = `${name}: meaning, power animal and energy of this Nahual in the MAYA Tzolk'in calendar.`;
  return {
    title: name,
    description,
    alternates: { canonical: `/en/nahuales/${params.slug}` },
    openGraph: { title: name, description, url: `/en/nahuales/${params.slug}` },
  };
}

export default async function NahualDetailPageEn({
  params,
}: {
  params: { slug: string };
}) {
  const nahualIndex = indexForSlug(params.slug);
  if (!nahualIndex) notFound();

  const name = NAHUALES[nahualIndex - 1];
  const description = NAHUAL_DESCRIPTIONS_EN[name];
  const content = await getNahualContent(nahualIndex, "en");

  return (
    <>
      <JsonLd
        data={nahualArticleSchema({
          index: nahualIndex,
          slug: params.slug,
          name,
          description: description.summary,
        })}
      />
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahual {nahualIndex} / 20
      </div>
      <h1>{name}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-4)",
          alignItems: "start",
          marginBottom: "var(--space-5)",
        }}
      >
        <NahualGlyph src={glyphSrcForIndex(nahualIndex)} alt={name} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0 }}>{description.summary}</p>
          <p style={{ margin: 0, fontSize: 15, color: "var(--text-muted)" }}>
            <strong>Power animal:</strong> {description.krafttier}
          </p>
          {content.videoId && (
            <a href="#video" className="underline-link" style={{ alignSelf: "flex-start" }}>
              Watch video
            </a>
          )}
        </div>
      </div>

      {content.dayText && (
        <section style={{ marginBottom: "var(--space-4)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Quality of the day
          </div>
          <p>{content.dayText}</p>
        </section>
      )}

      {content.traitText && (
        <section style={{ marginBottom: "var(--space-4)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            For people with this birth Nahual
          </div>
          <p>{content.traitText}</p>
        </section>
      )}

      {content.videoId && (
        <section id="video" style={{ marginBottom: "var(--space-4)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {content.videoTitle || "Video"}
          </div>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              border: "1px solid var(--line-card)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${content.videoId}`}
              title={content.videoTitle || name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
