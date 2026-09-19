-- 1) "Maya Seelencoaching"-Karte entfernen (Inhalt ist jetzt auf der Startseite)
delete from external_links where title = 'Maya Seelencoaching';

-- 2) "Maya Seelen-Intelligenz SI" auf den vollständigen Text der Startseite verlinken
update external_links set url = '/#si' where title = 'Maya Seelen-Intelligenz SI';
