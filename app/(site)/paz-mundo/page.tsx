import { getPublicExternalLinks } from "@/lib/public-data";

export const metadata = {
  title: "Paz Mundo — Cosmovision Maya",
};

export default async function PazMundoPage() {
  const links = await getPublicExternalLinks();

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Weiterführend
      </div>
      <h1>Paz Mundo</h1>
      <p>Alle Angebote von Paz Mundo und Norbert Muigg an einem Ort.</p>

      {links.length === 0 ? (
        <p className="empty-state">Bald findest du hier die Paz-Mundo-Links.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "var(--space-3)",
            marginTop: "var(--space-4)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                textDecoration: "none",
                color: "inherit",
                marginBottom: 0,
                padding: "var(--space-2) var(--space-3)",
              }}
            >
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
            </a>
          ))}
        </div>
      )}
    </>
  );
}
