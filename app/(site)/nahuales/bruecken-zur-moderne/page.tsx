import type { Metadata } from "next";

const description =
  "Wie sich das jahrtausendealte Wissen der 20 Nahuales mit dem heutigen Leben verbindet.";

export const metadata: Metadata = {
  title: "Brücken zur Moderne",
  description,
  alternates: { canonical: "/nahuales/bruecken-zur-moderne" },
  openGraph: {
    title: "Brücken zur Moderne",
    description,
    url: "/nahuales/bruecken-zur-moderne",
  },
};

type Theme = {
  name: string;
  href?: string;
  hint?: string;
};

type ThemeGroup = {
  title: string;
  themes: Theme[];
};

const THEME_GROUPS: ThemeGroup[] = [
  {
    title: "Selbst & innerer Wandel",
    themes: [
      {
        name: "Selbstliebe",
        href: "/downloads/selbstliebe-arbeitsprogramm.pdf",
        hint: "PDF zum Ausdrucken",
      },
      { name: "Lebenswege" },
      { name: "Respekt-Basis für Frieden" },
    ],
  },
  {
    title: "Partnerschaft & Sexualität",
    themes: [
      { name: "Partnerbeziehungen" },
      { name: "Sexualität" },
      { name: "Neue Beziehungs- und Partnerformen" },
      { name: "Vorbereitung für Hochzeit" },
      { name: "Begleitung bei Scheidung" },
      { name: "Tod und Übergang" },
    ],
  },
  {
    title: "Familie & Kinder",
    themes: [
      { name: "Schwangerschaft und Geburt" },
      { name: "Familienkonflikte" },
      { name: "Abgrenzung der Kinder und Jugendlichen" },
      { name: "Mobbing im Schulbereich" },
      { name: "Gemeinschaft im Wandel" },
      { name: "Schutzkraft für die Familie" },
    ],
  },
  {
    title: "Beruf & Existenz",
    themes: [
      { name: "Konflikte im Berufsalltag" },
      { name: "Selbstständigkeit — Betriebsgründung" },
      { name: "Geldfülle — Armutsbewusstsein" },
    ],
  },
  {
    title: "Geistige Welt & Ahnen",
    themes: [
      { name: "Arbeit mit Ahnen und Verstorbenen" },
      { name: "Schwarze Magie" },
      { name: "Kontakte zu geistigen Kräften" },
    ],
  },
];

export default function BrueckenZurModernePage() {
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Brücken zur Moderne</h1>
      <p>
        Zentrale Themen unseres Alltagslebens berühren nicht nur uns einzelne
        Menschen. Sie sind Teil unserer Menschheit und der in uns allen
        angelegten Lebensthemen, die wir oft auch als karmische
        Seelenbelastungen in uns tragen und bewältigen sollten.
      </p>
      <p>
        Der <strong>Mayakalender</strong> wurde von den{" "}
        <strong>alten Weisen der Maya</strong> so ausgelegt, dass eben diese
        Themen in Verbindung mit Bewusstheit, Verantwortung und Einsicht und
        den für die menschliche Entwicklung geschaffenen{" "}
        <strong>Nahuales</strong> gelöst werden können.
      </p>
      <p>
        Hier einige zentrale Lebensthemen, mit denen du{" "}
        <strong>in Verbindung</strong> mit den <strong>Maya-Nahuales</strong>{" "}
        deinen <strong>inneren Wandel</strong> angehen kannst.
      </p>

      <div className="theme-groups">
        {THEME_GROUPS.map((group) => (
          <div key={group.title} className="theme-group">
            <div className="theme-group-title">{group.title}</div>
            <div className="theme-card-grid">
              {group.themes.map((theme) =>
                theme.href ? (
                  <a
                    key={theme.name}
                    href={theme.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-card theme-card--file"
                  >
                    {theme.name}
                    {theme.hint ? (
                      <span className="theme-card-hint">{theme.hint}</span>
                    ) : null}
                  </a>
                ) : (
                  <div key={theme.name} className="theme-card">
                    {theme.name}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "var(--space-4)" }}>
        Zum Thema <strong>Selbstliebe</strong> steht das erste Arbeitsprogramm
        bereit: sechs Schritte mit den dazugehörigen Nahuales, als PDF zum
        Herunterladen und Ausdrucken. Klicke dafür auf das Feld{" "}
        <strong>Selbstliebe</strong>.
      </p>

      <p className="empty-state">
        Zu den weiteren Themen bekommst du nach und nach Texte und Videos.
        Mögen sie dir Hilfe für deinen inneren Frieden geben.
      </p>

      <div className="si-section" style={{ marginTop: "var(--space-6)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Dein Feedback, deine Erfahrung
        </div>
        <p className="si-lead">
          Welches dieser Themen berührt dich gerade? Schreib uns deine Fragen,
          deine Erfahrungen oder dein Feedback zu den Brücken zur Moderne — wir
          freuen uns von dir zu hören.
        </p>
        <div className="si-cta-row">
          <a
            href="mailto:kontakt@pazmundo.com?subject=Feedback%20Br%C3%BCcken%20zur%20Moderne"
            className="btn"
          >
            Feedback senden →
          </a>
        </div>
      </div>
    </>
  );
}
