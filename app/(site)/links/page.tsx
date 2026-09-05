import { getPublicExternalLinks } from "@/lib/public-data";

export const metadata = {
  title: "Links — Cosmovision Maya",
};

export default async function LinksPage() {
  const links = await getPublicExternalLinks();

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Weiterführend
      </div>
      <h1>Links</h1>
      <p>Ausgewählte Seiten und Angebote rund um die Kosmovision Maya.</p>

      {links.length === 0 ? (
        <p className="empty-state">Bald findest du hier weiterführende Links.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
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
                gap: 10,
                textDecoration: "none",
                color: "inherit",
                marginBottom: 0,
              }}
            >
              {link.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={link.image_url}
                  alt=""
                  style={{ width: "100%", height: 140, objectFit: "cover" }}
                />
              )}
              <h3 style={{ margin: 0 }}>{link.title}</h3>
              {link.description && <p style={{ margin: 0 }}>{link.description}</p>}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
