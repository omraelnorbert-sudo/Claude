-- Deutsche Erstentwürfe für die Tagestexte und die persönlichen Zusätze.
-- Erzeugt am 5. September 2026. Deutsch ist die Quellsprache;
-- Englisch und Spanisch werden später daraus übersetzt.
--
-- Sicherheitsnetz: Es wird nur geschrieben, wo das Feld noch leer ist.
-- Eigene Überarbeitungen im Dashboard werden also nie überschrieben,
-- auch wenn dieses Skript versehentlich ein zweites Mal läuft.

-- 1. B'aatz'
update day_sign_texts set text = 'Heute wird der Faden neu gesponnen. B''aatz'' ist ein guter Tag, um etwas zu beginnen, das Zeit braucht — ein Vorhaben, eine Beziehung, eine Arbeit an dir selbst. Nimm dir Raum für etwas Schöpferisches und schau, was aus dir heraus entstehen will.', updated_at = now()
  where nahual_index = 1 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als B''aatz''-Mensch hältst du den Faden in der Hand: Du kannst Anfänge machen, die andere noch gar nicht sehen, und zwischen verschiedenen Welten vermitteln. Achte darauf, nicht alles kontrollieren zu wollen — manche Fäden spinnen sich besser von selbst.', updated_at = now()
  where nahual_index = 1 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 2. Ee
update day_sign_texts set text = 'Ee ist der Tag des Weges. Frag dich heute, wohin du eigentlich unterwegs bist — nicht diese Woche, sondern in deinem Leben. Ein guter Tag für Aufbrüche, für erste Schritte und für Gespräche, die dir eine Richtung zeigen.', updated_at = now()
  where nahual_index = 2 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Dein Geburtsnahual Ee macht dich zum Wegweiser: Du findest Richtung, auch wenn andere den Überblick verlieren. Pass nur auf, dass du auf deinem Weg nicht allein bleibst.', updated_at = now()
  where nahual_index = 2 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 3. Aaj
update day_sign_texts set text = 'Aaj richtet den Blick auf die Menschen, zu denen du gehörst. Heute lohnt es sich, etwas in die Beziehungen zu legen, die dich tragen: ein Anruf, ein offenes Wort, gemeinsame Zeit. Was du heute säst, wächst langsam, aber verlässlich.', updated_at = now()
  where nahual_index = 3 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Mit Aaj als Geburtsnahual bist du jemand, bei dem andere ankommen dürfen. Deine Kraft liegt im Fürsorgen — deine Aufgabe darin, selbst verwurzelt zu bleiben.', updated_at = now()
  where nahual_index = 3 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 4. I'x
update day_sign_texts set text = 'I''x bringt dich zurück auf den Boden. Ein Tag, um draußen zu sein, mit den Händen zu arbeiten, dich an einen Ort zu stellen, der dir Kraft gibt. Nimm dir diese Kraft — und gib der Erde etwas zurück, sei es nur deine Aufmerksamkeit.', updated_at = now()
  where nahual_index = 4 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'I''x gibt dir Bodenhaftung und eine ungewöhnliche Nähe zur Natur. Diese Kraft trägt weit, kann aber in Sturheit kippen, wenn du sie nicht in Bewegung hältst.', updated_at = now()
  where nahual_index = 4 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 5. Tz'ikin
update day_sign_texts set text = 'Tz''ikin schenkt den Blick von oben. Heute erkennst du leichter, was wirklich zählt und was nur laut war. Ein günstiger Tag für Entscheidungen, für Geld und Geschäfte — und dafür, großzügig zu sein.', updated_at = now()
  where nahual_index = 5 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als Tz''ikin-Mensch siehst du weiter als die meisten und ziehst Glück an. Bleib dabei großzügig — deine Fülle wächst gerade dann, wenn du sie teilst.', updated_at = now()
  where nahual_index = 5 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 6. Ajmaq
update day_sign_texts set text = 'Ajmaq ist der Tag des Verzeihens. Denk an jemanden, mit dem etwas offen geblieben ist — vielleicht auch an dich selbst. Du musst heute nichts klären, was noch nicht reif ist; es genügt, den Groll für einen Tag abzulegen.', updated_at = now()
  where nahual_index = 6 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Dein Geburtsnahual Ajmaq macht dich feinfühlig für das, was andere nicht aussprechen. Das ist eine Gabe und eine Last zugleich: Achte darauf, fremde Lasten nicht zu deinen zu machen.', updated_at = now()
  where nahual_index = 6 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 7. Noj
update day_sign_texts set text = 'Noj bringt Verstand und Herz zusammen. Ein guter Tag zum Lernen, Nachdenken und Entscheiden — besonders dann, wenn du beide zu Rate ziehst und nicht nur den Kopf. Was du heute wirklich verstehst, bleibt.', updated_at = now()
  where nahual_index = 7 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Noj schenkt dir einen klaren Kopf und ein gutes Gedächtnis. Deine Stärke ist das Erklären — vergiss nur nicht, dass nicht jede Frage sofort eine Antwort braucht.', updated_at = now()
  where nahual_index = 7 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 8. Tijaax
update day_sign_texts set text = 'Tijaax schneidet klar. Heute darfst du beenden, was dir nicht guttut, und deutlich sagen, was du denkst. Schau dabei auch auf deine eigenen Schattenseiten — Klarheit fängt bei dir selbst an.', updated_at = now()
  where nahual_index = 8 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als Tijaax-Mensch sprichst du aus, was gesagt werden muss, und stellst dich gegen Unrecht. Deine Klarheit hilft anderen am meisten, wenn sie mit Wärme kommt.', updated_at = now()
  where nahual_index = 8 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 9. Kawoq
update day_sign_texts set text = 'Kawoq stärkt die Gemeinschaft. Heute geht es um das größere Ganze: Familie, Nachbarschaft, alle, für die du Verantwortung trägst. Spannungen dürfen sich entladen wie ein Gewitter — danach ist die Luft klar.', updated_at = now()
  where nahual_index = 9 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Kawoq macht dich zu jemandem, der Verantwortung für die Gruppe übernimmt. Achte darauf, dass du dabei auch dein eigenes Feuer hütest.', updated_at = now()
  where nahual_index = 9 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 10. Ajpuu
update day_sign_texts set text = 'Ajpuu ist der Sonnentag. Zeig dich, sprich aus, was du willst, und steh zu dem, was du bist. Ein Tag mit gutem Licht für alles, was Mut verlangt.', updated_at = now()
  where nahual_index = 10 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Dein Geburtsnahual Ajpuu gibt dir eine Wärme, auf die sich andere verlassen. Wo du bist, wird es heller — sorge dafür, dass auch jemand dich wärmt.', updated_at = now()
  where nahual_index = 10 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 11. Imox
update day_sign_texts set text = 'Imox öffnet das Wasser in dir. Heute liegen die Gefühle näher an der Oberfläche als sonst — nimm sie ernst, aber lass dich nicht von ihnen forttragen. Achte auf deine Träume und auf das, was du einfach spürst.', updated_at = now()
  where nahual_index = 11 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Imox verbindet dich mit dem, was unter der Oberfläche liegt: Träume, Ahnungen, Gefühle. Vertraue ihnen — und lass dich zugleich nicht von ihnen überfluten.', updated_at = now()
  where nahual_index = 11 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 12. Iq'
update day_sign_texts set text = 'Iq'' ist Wind. Heute geht dir vieles leicht von der Hand, was mit Reden, Schreiben und Denken zu tun hat. Nutze das — und achte zugleich auf deine Worte, der Wind trägt sie weiter, als du glaubst.', updated_at = now()
  where nahual_index = 12 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als Iq''-Mensch denkst du schnell und findest die richtigen Worte. Diese Leichtigkeit ist deine Gabe; bleib dabei bei dem, was du wirklich meinst.', updated_at = now()
  where nahual_index = 12 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 13. Ak'ab'al
update day_sign_texts set text = 'Ak''ab''al ist der Moment kurz vor dem Hellwerden. Wenn du gerade in einem Übergang steckst, ist heute ein guter Tag für den nächsten Schritt — auch wenn du das Ziel noch nicht siehst. Aus Dunkel wird Licht, nicht umgekehrt.', updated_at = now()
  where nahual_index = 13 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Ak''ab''al macht dich zum Brückenbauer zwischen Dunkel und Licht. Du weckst in anderen etwas auf — gönn dir dafür die Rückzüge, die du brauchst.', updated_at = now()
  where nahual_index = 13 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 14. Kat
update day_sign_texts set text = 'Kat knüpft Fäden. Heute lohnt es sich, Menschen zusammenzubringen und Verbindungen zu pflegen. Und dort, wo sich etwas verheddert hat, darfst du in Ruhe entwirren.', updated_at = now()
  where nahual_index = 14 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Mit Kat als Geburtsnahual entsteht in deiner Nähe Geborgenheit. Du hältst Gruppen zusammen — achte nur darauf, dich nicht selbst im Netz zu verfangen.', updated_at = now()
  where nahual_index = 14 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 15. Kaan
update day_sign_texts set text = 'Kaan bringt Lebenskraft in Bewegung. Heute hast du Energie für Veränderung — körperlich wie in deinem Leben. Hör auf deinen Körper, er sagt dir heute deutlicher als sonst, was er braucht.', updated_at = now()
  where nahual_index = 15 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Kaan gibt dir viel Lebenskraft und einen wachen Verstand. Diese Energie will genutzt werden; bleibt sie stehen, wird sie unruhig.', updated_at = now()
  where nahual_index = 15 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 16. Keme
update day_sign_texts set text = 'Keme ist kein Tag zum Fürchten, sondern zum Loslassen. Etwas darf zu Ende gehen, damit Neues Platz bekommt. Denk an die, die vor dir da waren — du stehst auf ihren Schultern.', updated_at = now()
  where nahual_index = 16 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Dein Geburtsnahual Keme verbindet dich mit den Ahnen und mit allem, was übergeht. Du kannst andere durch schwere Zeiten begleiten wie kaum jemand sonst.', updated_at = now()
  where nahual_index = 16 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 17. Kiej
update day_sign_texts set text = 'Kiej sucht das Gleichgewicht. Schau heute, ob deine vier Seiten im Lot sind: Körper, Gefühl, Verstand und Geist. Ein guter Tag, um Verantwortung zu übernehmen — auch für dich selbst.', updated_at = now()
  where nahual_index = 17 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als Kiej-Mensch bist du wach und übernimmst gerne Führung. Deine eigentliche Aufgabe ist die Balance — vier Beine tragen nur, wenn alle gleich lang sind.', updated_at = now()
  where nahual_index = 17 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 18. Q'anil
update day_sign_texts set text = 'Q''anil ist ein Tag der Fülle. Was du jetzt beginnst, hat gute Aussichten zu wachsen. Setz den Samen — und hab dann Geduld, Wachstum lässt sich nicht beschleunigen.', updated_at = now()
  where nahual_index = 18 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Q''anil macht dich zu jemandem, der Ideen tatsächlich zum Wachsen bringt. Setz weiter Samen — und lass ihnen ihre Zeit.', updated_at = now()
  where nahual_index = 18 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 19. Tooj
update day_sign_texts set text = 'Tooj erinnert ans Danken. Heute ist der Tag, etwas zurückzugeben: Zeit, Aufmerksamkeit, Hilfe. Wer gibt, macht Platz für das, was kommen will — achte nur darauf, dich dabei nicht selbst zu übergehen.', updated_at = now()
  where nahual_index = 19 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Tooj macht dich großzügig und ausgleichend. Achte beim Geben darauf, dich selbst nicht zu übersehen — auch du darfst empfangen.', updated_at = now()
  where nahual_index = 19 and lang = 'de'
    and (text is null or btrim(text) = '');

-- 20. Tz'i'
update day_sign_texts set text = 'Tz''i'' fragt nach Aufrichtigkeit. Heute geht es darum, es richtig zu machen: Versprechen halten, Offenes klären, gerade bleiben. Ein guter Tag für alles Rechtliche und alles, was Ordnung braucht.', updated_at = now()
  where nahual_index = 20 and lang = 'de'
    and (text is null or btrim(text) = '');
update nahual_traits set text = 'Als Tz''i''-Mensch bist du treu und hast einen feinen Sinn für Recht und Unrecht. Bleib bei deinen Werten — und halte zugleich Raum für die Fehler anderer.', updated_at = now()
  where nahual_index = 20 and lang = 'de'
    and (text is null or btrim(text) = '');
