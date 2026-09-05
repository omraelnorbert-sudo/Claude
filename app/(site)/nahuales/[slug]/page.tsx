import { notFound } from "next/navigation";
import NahualGlyph from "@/components/NahualGlyph";
import { NAHUALES, glyphSrcForIndex, indexForSlug } from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS } from "@/lib/nahual-descriptions";
import { getNahualContent } from "@/lib/public-data";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const index = indexForSlug(params.slug);
  const name = index ? NAHUALES[index - 1] : null;
  return { title: name ? `${name} — Cosmovision Maya` : "Nahual" };
}

export default async function NahualDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const nahualIndex = indexForSlug(params.slug);
  if (!nahualIndex) notFound();

  const name = NAHUALES[nahualIndex - 1];
  const description = NAHUAL_DESCRIPTIONS[name];
  const content = await getNahualContent(nahualIndex);

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahual {nahualIndex} / 20
      </div>
      <h1>{name}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(200px, 280px) 1fr",
          gap: "var(--space-4)",
          alignItems: "start",
          marginBottom: "var(--space-5)",
        }}
      >
        <NahualGlyph src={glyphSrcForIndex(nahualIndex)} alt={name} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0 }}>{description.summary}</p>
          <p style={{ margin: 0, fontSize: 15, color: "var(--text-muted)" }}>
            <strong>Krafttier:</strong> {description.krafttier}
          </p>
        </div>
      </div>

      {content.dayText && (
        <section style={{ marginBottom: "var(--space-4)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Tagesqualität
          </div>
          <p>{content.dayText}</p>
        </section>
      )}

      {content.traitText && (
        <section style={{ marginBottom: "var(--space-4)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Für Menschen mit diesem Geburtsnahual
          </div>
          <p>{content.traitText}</p>
        </section>
      )}

      {content.videoId && (
        <section style={{ marginBottom: "var(--space-4)" }}>
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
