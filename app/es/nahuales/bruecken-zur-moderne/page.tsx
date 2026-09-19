import type { Metadata } from "next";

const description =
  "Cómo el conocimiento milenario de los 20 Nahuales se conecta con la vida actual.";

export const metadata: Metadata = {
  title: "Puentes hacia la modernidad",
  description,
  alternates: { canonical: "/es/nahuales/bruecken-zur-moderne" },
  openGraph: {
    title: "Puentes hacia la modernidad",
    description,
    url: "/es/nahuales/bruecken-zur-moderne",
  },
};

const THEME_GROUPS = [
  {
    title: "Uno mismo y el cambio interior",
    themes: ["Amor propio", "Caminos de vida", "Base de respeto para la paz"],
  },
  {
    title: "Pareja y sexualidad",
    themes: [
      "Relaciones de pareja",
      "Sexualidad",
      "Nuevas formas de relación y pareja",
      "Preparación para la boda",
      "Acompañamiento en el divorcio",
      "Muerte y tránsito",
    ],
  },
  {
    title: "Familia e hijos",
    themes: [
      "Embarazo y nacimiento",
      "Conflictos familiares",
      "Establecer límites con niños y jóvenes",
      "Acoso escolar",
      "Comunidad en cambio",
      "Fuerza protectora para la familia",
    ],
  },
  {
    title: "Trabajo y existencia",
    themes: [
      "Conflictos en el día a día laboral",
      "Independencia — fundación de empresa",
      "Abundancia económica — conciencia de pobreza",
    ],
  },
  {
    title: "Mundo espiritual y ancestros",
    themes: [
      "Trabajo con ancestros y difuntos",
      "Magia negra",
      "Contactos con fuerzas espirituales",
    ],
  },
];

export default function BrueckenZurModernePageEs() {
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Puentes hacia la modernidad</h1>
      <p>
        Los temas centrales de nuestra vida cotidiana no nos afectan solo
        como personas individuales. Son parte de nuestra humanidad y de los
        temas de vida depositados en todos nosotros, que a menudo llevamos
        también como cargas anímicas kármicas y que deberíamos superar.
      </p>
      <p>
        El <strong>calendario MAYA</strong> fue diseñado por los{" "}
        <strong>antiguos sabios MAYA</strong> de tal manera que precisamente
        estos temas puedan resolverse en conexión con la conciencia, la
        responsabilidad y la comprensión, y con los{" "}
        <strong>Nahuales</strong> creados para el desarrollo humano.
      </p>
      <p>
        Aquí van algunos temas centrales de vida con los que puedes abordar,
        en <strong>conexión</strong> con los <strong>Nahuales MAYA</strong>,
        tu <strong>cambio interior</strong>.
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
        Pronto encontrarás aquí textos y videos. Que te ayuden a encontrar tu
        paz interior.
      </p>

      <div className="si-section" style={{ marginTop: "var(--space-6)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Tu opinión, tu experiencia
        </div>
        <p className="si-lead">
          ¿Cuál de estos temas te toca en este momento? Escríbenos tus
          preguntas, tus experiencias o tu opinión sobre los Puentes hacia la
          modernidad — nos alegra saber de ti.
        </p>
        <div className="si-cta-row">
          <a
            href="mailto:kontakt@pazmundo.com?subject=Feedback%20Puentes%20hacia%20la%20modernidad"
            className="btn"
          >
            Enviar comentario →
          </a>
        </div>
      </div>
    </>
  );
}
