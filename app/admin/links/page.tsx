import PageHead from "@/components/admin/PageHead";
import { CreateLinkForm, LinkTable } from "@/components/admin/LinkManager";
import { getExternalLinks } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const { links, error } = await getExternalLinks();

  return (
    <>
      <PageHead
        eyebrow="Inhalte"
        title="Links"
        description="Was hier steht, erscheint als Karten auf der öffentlichen Seite /links."
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Neu anlegen</h2>
          </div>
        </div>
        <div className="admin-panel-body">
          <CreateLinkForm />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Alle Links</h2>
          </div>
          <span className="admin-pill admin-pill-off">{links.length}</span>
        </div>
        <div className="admin-panel-body">
          <LinkTable links={links} />
        </div>
      </section>
    </>
  );
}
