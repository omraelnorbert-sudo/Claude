import SpendenKnopf from "@/components/SpendenKnopf";

// Spenden für Hospital und Sozialprogramme der Stiftung Paz Mundo, direkt im
// Payrexx-Fenster (lädt erst beim Klick). Steht auf den Paz-Mundo-Seiten.
// Payrexx hat keine englische Fassung — Englisch öffnet die deutsche.
// „projekt“: Formular „Fundraising Naturheilpraxis PAZ MUNDO“ (Omrael, 24.10.2026).

const TEXTE = {
  de: {
    titel: "Spenden für Hospital und Sozialprogramme",
    text: "Die MAYA Friedensstiftung trägt das Hospital Paz Mundo und die Sozialprogramme im Hochland von Sololá. Deine Spende kommt direkt dort an.",
    knopf: "Online spenden",
    fenster: "https://pazmundoshop.payrexx.com/de/pay?tid=8ca9886c&hide_description=1",
    projekt: { label: "Projekt 2027: Für die Naturheilpraxis spenden", fenster: "https://pazmundoshop.payrexx.com/de/pay?cid=abb46b4f&hide_description=1" },
    mehr: { href: "https://stiftung.pazmundo.org/#spenden", label: "Mehr zur MAYA Friedensstiftung" },
  },
  en: {
    titel: "Donate to the hospital and social programmes",
    text: "The Paz Mundo Foundation runs the Paz Mundo hospital and the social programmes in the highlands of Sololá. Your donation goes straight there.",
    knopf: "Donate online",
    fenster: "https://pazmundoshop.payrexx.com/de/pay?tid=8ca9886c&hide_description=1",
    projekt: { label: "Project 2027: Donate to the natural medicine practice", fenster: "https://pazmundoshop.payrexx.com/de/pay?cid=abb46b4f&hide_description=1" },
    mehr: { href: "https://stiftung.pazmundo.org/es#spenden", label: "More about the foundation (Spanish)" },
  },
  es: {
    titel: "Donar para el hospital y los programas sociales",
    text: "La Fundación Paz Mundo sostiene el Hospital Paz Mundo y los programas sociales en el altiplano de Sololá. Tu donación llega directamente allí.",
    knopf: "Donar en línea",
    fenster: "https://pazmundoshop.payrexx.com/es/pay?tid=8ca9886c&hide_description=1",
    projekt: { label: "Proyecto 2027: donar para el consultorio natural", fenster: "https://pazmundoshop.payrexx.com/es/pay?cid=abb46b4f&hide_description=1" },
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
        <SpendenKnopf href={t.projekt.fenster}>{t.projekt.label}</SpendenKnopf>
        <a href={t.mehr.href}>{t.mehr.label} →</a>
      </div>
    </div>
  );
}
