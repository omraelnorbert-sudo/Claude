-- Neue Karte "Healing Resort" auf /paz-mundo, ans Ende der Liste angehängt.
insert into external_links (title, url, description, sort_order)
select
  'Healing Resort',
  'https://healingresort.pazmundo.com/',
  'Maya-Schamanismus, Seelenbegleitung, Naturheilkunde, alte Maya-Heilmethoden',
  coalesce(max(sort_order), 0) + 1
from external_links;
