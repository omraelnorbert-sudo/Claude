import SpendenKnopf from "@/components/SpendenKnopf";

// Spenden für Hospital und Sozialprogramme der Stiftung Paz Mundo, direkt im
// Payrexx-Fenster (lädt erst beim Klick). Steht auf den Paz-Mundo-Seiten.
// Payrexx hat keine englische Fassung — Englisch öffnet die deutsche.

const TEXTE = {
  de: {
    titel: "Spenden für Hospital und Sozialprogramme",
    text: "Die MAYA Friedensstiftung trägt das Hospital Paz Mundo und die Sozialprogramme im Hochland von Sololá. Deine Spende kommt direkt dort an.",
    knopf: "Online spenden",
    fenster: "https://stiftung.pazmundo.org/#vereine-konten",
    mehr: { href: "https://stiftung.pazmundo.org/#spenden", label: "Mehr zur MAYA Friedensstiftung" },
  },
  en: {
    titel: "Donate to the hospital and social programmes",
    text: "The Paz Mundo Foundation runs the Paz Mundo hospital and the social programmes in the highlands of Sololá. Your donation goes straight there.",
    knopf: "Donate online",
    fenster: "https://stiftung.pazmundo.org/#vereine-konten",
    mehr: { href: "https://stiftung.pazmundo.org/es#spenden", label: "More about the foundation (Spanish)" },
  },
  es: {
    titel: "Donar para el hospital y los programas sociales",
    text: "La Fundación Paz Mundo sostiene el Hospital Paz Mundo y los programas sociales en el altiplano de Sololá. Tu donación llega directamente allí.",
    knopf: "Donar en línea",
    fenster: "https://stiftung.pazmundo.org/es#vereine-konten",
    mehr: { href: "https://stiftung.pazmundo.org/es#spenden", label: "Más sobre la fundación" },
  },
} as const;

export default function SpendenBlock({ sprache }: { sprache: keyof typeof TEXTE }) {
  const t = TEXTE[sprache];
  return (
    <div className="card" style={{ marginTop: "var(--space-5)", padding: "var(--space-3) var(--space-4)" }}>
      <h2 style={{ marginTop: 0, fontSize: 24 }}>{t.titel}</h2>
      <p style={{ marginBottom: "var(--space-3)" }}>{t.text}</p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)" }}>
        <SpendenKnopf href={t.fenster}>{t.knopf}</SpendenKnopf>
        <a href={t.mehr.href}>{t.mehr.label} →</a>
      </div>
    </div>
  );
}
