create table content_items (
  id uuid primary key default gen_random_uuid(),
  type text check (type in ('ritual', 'workout')),
  title text not null,
  description text,
  theme text,
  created_at timestamptz default now()
);

alter table content_items enable row level security;

create policy "Public read access"
  on content_items for select
  using (true);

insert into content_items (type, title, description, theme) values
  ('ritual', 'Begrüßung der vier Himmelsrichtungen', 'Ein Morgenritual, das Ost, West, Nord und Süd ehrt und den Tag im Einklang mit dem Kosmos beginnt.', 'Verbindung'),
  ('workout', 'Erdungs-Sequenz', 'Sanfte Steh- und Atemübungen, die die Verbindung zur Erde vor dem Ritual stärken.', 'Verbindung');
