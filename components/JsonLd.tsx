/**
 * Strukturierte Daten (schema.org) als JSON-LD im Seitenkopf.
 *
 * Google liest daraus, worum es auf der Seite geht — das ist die Grundlage
 * für Rich Results (Sitelinks, Suchfeld, Artikel-Karten).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
