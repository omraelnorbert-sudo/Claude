import type { Metadata } from "next";
import Link from "next/link";
import { getPublicExternalLinks } from "@/lib/public-data";

const description =
  "Todas las ofertas de Paz Mundo y Omrael Norbert Muigg en un solo lugar: Coaching del Alma MAYA, eventos, libros, podcasts y el calendario MAYA.";

export const metadata: Metadata = {
  title: "Paz Mundo",
  description,
  alternates: { canonical: "/es/paz-mundo" },
  openGraph: { title: "Paz Mundo", description, url: "/es/paz-mundo" },
};

export default async function PazMundoPageEs() {
  const links = await getPublicExternalLinks();

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Más información
      </div>
      <h1>Paz Mundo</h1>
      <p>Todas las ofertas de Paz Mundo y Omrael Norbert Muigg en un solo lugar.</p>

      {links.length === 0 ? (
        <p className="empty-state">Pronto encontrarás aquí los enlaces de Paz Mundo.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "var(--space-3)",
            marginTop: "var(--space-4)",
          }}
        >
          {links.map((link) => {
            const isInternal = link.url.startsWith("/");
            const cardStyle = {
              display: "flex" as const,
              flexDirection: "column" as const,
              gap: 8,
              textDecoration: "none",
              color: "inherit",
              marginBottom: 0,
              padding: "var(--space-2) var(--space-3)",
            };
            const cardContent = (
              <>
                {link.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={link.image_url}
                    alt=""
                    style={{ width: "100%", height: 90, objectFit: "cover" }}
                  />
                )}
                <h3 style={{ margin: 0, fontSize: 20 }}>{link.title}</h3>
                {link.description && (
                  <p style={{ margin: 0, fontSize: 15 }}>{link.description}</p>
                )}
              </>
            );

            return isInternal ? (
              <Link key={link.id} href={link.url} className="card" style={cardStyle}>
                {cardContent}
              </Link>
            ) : (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={cardStyle}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
