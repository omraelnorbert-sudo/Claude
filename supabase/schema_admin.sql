-- Cosmovision Maya — Schema für Nutzer, Inhalte und E-Mail-Versand.
-- Im Supabase SQL Editor ausführen. Ist idempotent: kann gefahrlos erneut laufen.

-- ---------------------------------------------------------------------------
-- Admin-Kennung
-- ---------------------------------------------------------------------------

create table if not exists admins (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into admins (email) values ('omraelnorbert@gmail.com')
  on conflict (email) do nothing;

-- Prüft, ob die eingeloggte Person Admin ist. Wird in allen Policies benutzt.
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------------------------------------------------------------------------
-- Nutzerprofile
-- ---------------------------------------------------------------------------

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  display_name text,
  birth_date date,
  nahual_number int check (nahual_number between 1 and 13),
  nahual_index int check (nahual_index between 1 and 20),
  preferred_language text not null default 'de'
    check (preferred_language in ('de', 'en', 'es')),
  email_opt_in boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Legt automatisch ein Profil an, sobald sich jemand registriert.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- Inhalte: Videos, Tagestexte, Nahual-Zusätze
-- ---------------------------------------------------------------------------

create table if not exists nahual_videos (
  nahual_index int primary key check (nahual_index between 1 and 20),
  youtube_video_id text,
  title text,
  updated_at timestamptz not null default now()
);

-- Ein Text je Tageszeichen und Sprache: "Was bedeutet der heutige Tag?"
create table if not exists day_sign_texts (
  nahual_index int not null check (nahual_index between 1 and 20),
  lang text not null check (lang in ('de', 'en', 'es')),
  text text,
  updated_at timestamptz not null default now(),
  primary key (nahual_index, lang)
);

-- Persönlicher Zusatz je Geburts-Nahual und Sprache.
create table if not exists nahual_traits (
  nahual_index int not null check (nahual_index between 1 and 20),
  lang text not null check (lang in ('de', 'en', 'es')),
  text text,
  updated_at timestamptz not null default now(),
  primary key (nahual_index, lang)
);

-- ---------------------------------------------------------------------------
-- Versand
-- ---------------------------------------------------------------------------

-- Einzelne Einstellungszeile (id ist fest auf true, daher nur eine Zeile möglich).
create table if not exists send_settings (
  id boolean primary key default true check (id),
  enabled boolean not null default false,
  send_hour int not null default 7 check (send_hour between 0 and 23),
  timezone text not null default 'Europe/Zurich',
  from_name text not null default 'Paz Mundo',
  from_email text,
  reply_to text,
  subject_template text not null default 'Dein Tag im Zeichen {nahual}',
  updated_at timestamptz not null default now()
);

insert into send_settings (id) values (true) on conflict (id) do nothing;

create table if not exists email_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  email text,
  day_nahual_index int,
  lang text,
  status text not null check (status in ('sent', 'failed', 'skipped')),
  error text,
  provider_id text,
  created_at timestamptz not null default now()
);

create index if not exists email_log_created_at_idx on email_log (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table admins enable row level security;
alter table profiles enable row level security;
alter table nahual_videos enable row level security;
alter table day_sign_texts enable row level security;
alter table nahual_traits enable row level security;
alter table send_settings enable row level security;
alter table email_log enable row level security;

-- Profile: jeder sieht und ändert nur die eigene Zeile, Admins sehen alles.
drop policy if exists "profiles_select_own_or_admin" on profiles;
create policy "profiles_select_own_or_admin" on profiles
  for select using (auth.uid() = id or is_admin());

drop policy if exists "profiles_update_own_or_admin" on profiles;
create policy "profiles_update_own_or_admin" on profiles
  for update using (auth.uid() = id or is_admin())
  with check (auth.uid() = id or is_admin());

drop policy if exists "profiles_insert_own_or_admin" on profiles;
create policy "profiles_insert_own_or_admin" on profiles
  for insert with check (auth.uid() = id or is_admin());

drop policy if exists "profiles_delete_admin" on profiles;
create policy "profiles_delete_admin" on profiles
  for delete using (is_admin());

-- Inhalte: öffentlich lesbar (die Website braucht sie), Änderungen nur Admin.
drop policy if exists "videos_public_read" on nahual_videos;
create policy "videos_public_read" on nahual_videos for select using (true);
drop policy if exists "videos_admin_write" on nahual_videos;
create policy "videos_admin_write" on nahual_videos
  for all using (is_admin()) with check (is_admin());

drop policy if exists "day_texts_public_read" on day_sign_texts;
create policy "day_texts_public_read" on day_sign_texts for select using (true);
drop policy if exists "day_texts_admin_write" on day_sign_texts;
create policy "day_texts_admin_write" on day_sign_texts
  for all using (is_admin()) with check (is_admin());

drop policy if exists "traits_public_read" on nahual_traits;
create policy "traits_public_read" on nahual_traits for select using (true);
drop policy if exists "traits_admin_write" on nahual_traits;
create policy "traits_admin_write" on nahual_traits
  for all using (is_admin()) with check (is_admin());

-- Alttabelle content_items: stammt aus schema.sql und wird von der Website
-- nicht mehr benutzt. Falls sie noch existiert, bekommt sie die Admin-Regel;
-- fehlt sie, wird der Block einfach übersprungen, damit dieses Skript auch
-- in einem frischen Projekt durchläuft.
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'content_items'
  ) then
    execute 'drop policy if exists "content_items_admin_write" on content_items';
    execute 'create policy "content_items_admin_write" on content_items
             for all using (is_admin()) with check (is_admin())';
  end if;
end $$;

-- Versand und Admin-Liste: ausschließlich Admins.
drop policy if exists "settings_admin_only" on send_settings;
create policy "settings_admin_only" on send_settings
  for all using (is_admin()) with check (is_admin());

drop policy if exists "log_admin_read" on email_log;
create policy "log_admin_read" on email_log for select using (is_admin());

drop policy if exists "admins_admin_only" on admins;
create policy "admins_admin_only" on admins
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- Leere Zeilen für alle 20 Nahuales × 3 Sprachen anlegen,
-- damit im Dashboard sofort alle Felder zum Ausfüllen erscheinen.
-- ---------------------------------------------------------------------------

insert into day_sign_texts (nahual_index, lang)
select i, l
from generate_series(1, 20) as i
cross join unnest(array['de', 'en', 'es']) as l
on conflict (nahual_index, lang) do nothing;

insert into nahual_traits (nahual_index, lang)
select i, l
from generate_series(1, 20) as i
cross join unnest(array['de', 'en', 'es']) as l
on conflict (nahual_index, lang) do nothing;

insert into nahual_videos (nahual_index)
select generate_series(1, 20)
on conflict (nahual_index) do nothing;
