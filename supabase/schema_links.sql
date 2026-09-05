-- Externe Links, die als Karten auf der öffentlichen Seite /links erscheinen.
-- Im Supabase SQL Editor ausführen. Setzt schema_admin.sql voraus (is_admin()).
-- Ist idempotent: kann gefahrlos erneut laufen.

create table if not exists external_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table external_links enable row level security;

drop policy if exists "external_links_public_read" on external_links;
create policy "external_links_public_read" on external_links
  for select using (true);

drop policy if exists "external_links_admin_write" on external_links;
create policy "external_links_admin_write" on external_links
  for all using (is_admin()) with check (is_admin());
