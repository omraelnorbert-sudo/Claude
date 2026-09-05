import { getContentItems } from "@/lib/supabaseClient";

export const revalidate = 0;

export default async function WorkoutsPage() {
  const workouts = await getContentItems("workout");

  return (
    <>
      <h1>Workouts</h1>
      {workouts.length === 0 ? (
        <p className="empty-state">
          Noch keine Workouts in Supabase hinterlegt. Füge Zeilen in der
          Tabelle <code>content_items</code> mit <code>type = &apos;workout&apos;</code> hinzu.
        </p>
      ) : (
        workouts.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.title}</h3>
            {item.theme && <p><em>{item.theme}</em></p>}
            <p>{item.description}</p>
          </div>
        ))
      )}
    </>
  );
}
