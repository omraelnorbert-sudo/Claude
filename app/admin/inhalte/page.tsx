import PageHead from "@/components/admin/PageHead";
import {
  ContentTable,
  CreateContentForm,
} from "@/components/admin/ContentManager";
import { getContentItems } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function InhaltePage() {
  const [rituale, workouts] = await Promise.all([
    getContentItems("ritual"),
    getContentItems("workout"),
  ]);

  return (
    <>
      <PageHead
        eyebrow="Inhalte"
        title="Rituale & Workouts"
        description="Was hier steht, erscheint direkt auf den öffentlichen Seiten /rituale und /workouts."
      />

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Neu anlegen</h2>
          </div>
        </div>
        <div className="admin-panel-body">
          <CreateContentForm />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Rituale</h2>
          </div>
          <span className="admin-pill admin-pill-off">{rituale.length}</span>
        </div>
        <div className="admin-panel-body">
          <ContentTable items={rituale} />
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>Workouts</h2>
          </div>
          <span className="admin-pill admin-pill-off">{workouts.length}</span>
        </div>
        <div className="admin-panel-body">
          <ContentTable items={workouts} />
        </div>
      </section>
    </>
  );
}
