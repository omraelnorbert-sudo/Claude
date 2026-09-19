import type { Metadata } from "next";

const description =
  "How the ancient knowledge of the 20 Nahuales connects with life today.";

export const metadata: Metadata = {
  title: "Bridges to modern life",
  description,
  alternates: { canonical: "/en/nahuales/bruecken-zur-moderne" },
  openGraph: {
    title: "Bridges to modern life",
    description,
    url: "/en/nahuales/bruecken-zur-moderne",
  },
};

const THEME_GROUPS = [
  {
    title: "Yourself and inner change",
    themes: ["Self-love", "Paths in life", "A foundation of respect for peace"],
  },
  {
    title: "Partnership and sexuality",
    themes: [
      "Partnerships",
      "Sexuality",
      "New forms of relationship and partnership",
      "Preparing for marriage",
      "Support through divorce",
      "Death and transition",
    ],
  },
  {
    title: "Family and children",
    themes: [
      "Pregnancy and birth",
      "Family conflicts",
      "Setting boundaries with children and teenagers",
      "Bullying",
      "Community in change",
      "Protective strength for the family",
    ],
  },
  {
    title: "Work and livelihood",
    themes: [
      "Conflicts in everyday working life",
      "Independence — founding a business",
      "Economic abundance — a poverty mindset",
    ],
  },
  {
    title: "The spiritual world and ancestors",
    themes: [
      "Working with ancestors and the deceased",
      "Black magic",
      "Contact with spiritual forces",
    ],
  },
];

export default function BrueckenZurModernePageEn() {
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Bridges to modern life</h1>
      <p>
        The central themes of our everyday lives don't affect us only as
        individuals. They are part of our humanity and of the life themes
        laid down in all of us, which we often carry as karmic soul burdens
        and which we should overcome.
      </p>
      <p>
        The <strong>MAYA calendar</strong> was designed by the{" "}
        <strong>ancient MAYA sages</strong> in such a way that precisely
        these themes can be resolved in connection with awareness,
        responsibility and understanding, and with the{" "}
        <strong>Nahuales</strong> created for human development.
      </p>
      <p>
        Here are some central life themes you can approach, in{" "}
        <strong>connection</strong> with the <strong>MAYA Nahuales</strong>,
        for your <strong>inner change</strong>.
      </p>

      <div className="theme-groups">
        {THEME_GROUPS.map((group) => (
          <div key={group.title} className="theme-group">
            <div className="theme-group-title">{group.title}</div>
            <div className="theme-card-grid">
              {group.themes.map((theme) => (
                <div key={theme} className="theme-card">
                  {theme}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="empty-state" style={{ marginTop: "var(--space-4)" }}>
        Texts and videos will be added here soon — to help you find your
        inner peace.
      </p>

      <div className="si-section" style={{ marginTop: "var(--space-6)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Your feedback, your experience
        </div>
        <p className="si-lead">
          Which of these themes speaks to you right now? Write to us with
          your questions, your experiences, or your thoughts on Bridges to
          modern life — we'd love to hear from you.
        </p>
        <div className="si-cta-row">
          <a
            href="mailto:kontakt@pazmundo.com?subject=Feedback%20Bridges%20to%20modern%20life"
            className="btn"
          >
            Send feedback →
          </a>
        </div>
      </div>
    </>
  );
}
