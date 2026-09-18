-- Langfassung der 20 Nahuales — Textquelle: "Die 20 NAHUALES des MAYA",
-- Omrael Norbert Muigg / Paz Mundo. Im Supabase SQL Editor ausführen.
-- Idempotent: kann gefahrlos erneut laufen (überschreibt die Texte).

create table if not exists nahual_long_texts (
  nahual_index int not null check (nahual_index between 1 and 20),
  lang text not null check (lang in ('de', 'en', 'es')),
  heading text,          -- z. B. "AK'AB'AL (Akbal), sprich Akabál"
  directions text,       -- Himmelsrichtungen, z. B. "O Osten – Sonnenaufgang"
  body text[],           -- Absätze der Langfassung, in Reihenfolge
  ceremonies text[],     -- Absätze des Abschnitts "Zeremonien"
  body_level text,       -- Körperebene
  power_animal text,     -- Krafttier
  updated_at timestamptz not null default now(),
  primary key (nahual_index, lang)
);

alter table nahual_long_texts enable row level security;

drop policy if exists "long_texts_public_read" on nahual_long_texts;
create policy "long_texts_public_read" on nahual_long_texts for select using (true);

drop policy if exists "long_texts_admin_write" on nahual_long_texts;
create policy "long_texts_admin_write" on nahual_long_texts
  for all using (is_admin()) with check (is_admin());

-- Leere Zeilen für en/es anlegen, damit im Dashboard alle Felder erscheinen.
insert into nahual_long_texts (nahual_index, lang)
select i, l
from generate_series(1, 20) as i
cross join unnest(array['en', 'es']) as l
on conflict (nahual_index, lang) do nothing;

-- ---------------------------------------------------------------------------
-- Deutsche Langfassung
-- ---------------------------------------------------------------------------

-- 01 · B'aatz'
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  1, 'de',
  'B’AATZ (Chuen)',
  'O A’KAB‘AL, W KAWOQ, S KAAN, N NO‘J',
  array[
    'B’AATZ ist die Nabelschnur zum Göttlichen in allen Aspekten des Lebens, die sich im individuellen Zeitrhythmus entfaltende Spiritualität (el hilo del tiempo), der rote Faden durch Räume, Dimensionen und Zeiten, der Quell aller Weisheit – alles öffnet sich für jeden Menschen zum für ihn richtigen Zeitpunkt.',
    'B‘AATZ ist die menschliche Entwicklung, die sich aus den vier Kraft- und Weisheitsquellen der vier Himmelsrichtungen ergibt.',
    'B’AATZ ist die Zeit und die sich daraus entwickelnde Erkenntnis, die für jeden Wandel notwendige Reife, das sich entfaltende Bewusstsein. Er ist die Kraft, die alles miteinander verbindet: Mann und Frau, die Ahnen, die Nabelschnur des Babys, die Verbindung zwischen den Wesen und Kräften.',
    'B’AATZ ist der rote Faden, der die Welten, Zeitentore und Dimensionen in Liebe miteinander verbindet, der die geistigen Wege öffnet und daraus den Sinn unseres Lebens entfaltet.',
    'B’AATZ ist der Hüter der Kunst und der Kultur, die Ausdruck der verschiedenen Bewusstseinsstufen im Menschsein sind. Die höchste Form der Kunst ist das Schaffen des Menschen aus seiner göttlichen Verbindung.',
    'Im Zeichen 8 B’AATZ entfalten sich die 20 Kräfte des heiligen Maya-Kalenders. An diesem Tag entfaltet sich das Heilige Jahr der Maya, das über 9 EE sich seinen Weg bahnt. Das Maya-Jahr beinhaltet 260 Tage aus der Verbindung von kosmischer Schwingung (bezeichnet mit den Zahlen von 1 bis 13) und der Qualität des Tages im Ausdruck der 20 Nahuales.',
    'Das Heilige Mayajahr ist auch verbunden mit den 9 Monaten einer Schwangerschaft, mit der Wiedergeburt einer Seele, die aus der sich entfaltenden Zeit und Reife ihre weitere Entwicklung auf dem Planeten Erde beginnt. B’AATZ ist die Nabelschnur des Menschen hin zu seinem Schöpfer, der ihn auf dieser Reise nährt und ihm Geborgenheit und Wachstum gibt. Er verbindet uns mit der Mutterqualität, der leiblichen Mutter, der geistigen Mutter, der planetarischen Mutter, die uns aus unseren Wurzeln nährt und kräftigt. So steht B’AATZ als Verbindungskraft für die uns zur Verfügung stehende Energie der Erde und des Kosmos.',
    'B‘AATZ ist auch die Kraft des Vertrauens auf unsere Führung, er nährt die Kraft des Glaubens. Ohne dieses Vertrauen, ohne Glauben schaffen wir uns Isolation und Einsamkeit, wir verlieren Halt und Schutz. Menschen ohne Vertrauen und Glauben sind Zweifeln und Ängsten ausgesetzt, die sie aus dem kosmischen Gesetz fallen lassen. So verlieren Menschen ohne Glauben und Vertrauen die tief in jedem Wesen angelegte Verbindung in die geistige Welt und vergessen die Aufgabe, die sich die innewohnende Seele für das Menschsein bereits in anderen Seinszuständen gestellt hat. Dieser Verbindungsfaden nach oben und unten gibt uns Halt zwischen den Ober- und Unterwelten.',
    'B’AATZ ist auch in unsere Kleidung eingeflochten, die uns nicht nur Wärme, sondern auch Schutz, Schönheit und geistige Verbindung gibt. Wir kleiden uns, verbunden mit der schöpferischen Kraft, mit Phantasie und Lebendigkeit und geben damit auchunserer inneren Lebendigkeit und Schöpferkraft Ausdruck.',
    'Der Nahual B’AATZ steht als Symbol für den Menschen und die Humanität. Er aktiviert die menschliche Intelligenz und entfaltet die Weisheit und Kraft der 20 Nahuales und lässt diese auf unserem Planeten für uns Menschen wirksam werden.',
    'Deshalb beginnt in Maya aus seiner Qualität das Heilige Jahr. Es erinnert an die Heiligkeit des Menschen, der als göttliches Wesen mit allem SEIN in Verbindung steht.',
    'B’AATZ ruft im Rhythmus der Zeit, im Erdenleben gegeben aus dem Wechsel von Tag und Nacht den beginnenden Tag, die wiederkehrende Sonne und übergibt uns der heiligen Nacht. Er bewegt die sich gegen den Uhrzeigersinn drehende Spirale der kosmischen Kraft. Die Maya tanzen 13 Mal gegen den Uhrzeigersinn um das Feuer und zum Ende der Zeremonie öffnet sich der Tanz in den Uhrzeigersinn, um die sich entfaltende Zeit in B’AATZ bewusst zu machen und in unsere Entwicklung einzubetten.',
    'B’AATZ ruft den jeweiligen Tagesnahual in das Kraftfeld des Ostens. Er lädt die Weisheit der Ahnen für die Entwicklung jeweilig inkarnierter Generationen ein. In der menschlichen Kreativität zeigt er sich als Kunst- und Kulturschaffender. Der Mensch kann als Schaffender nur das im Feinstofflichen bereits Geschaffene in die Form bringen. Somit ist jeder physische Schöpfungsakt bereits vorher feinstofflich geschaffen.',
    'Wir sind uns am Tag B‘AATZ bewusst, dass wir gleich einem Kind über die Nabelschnur in ständigem Kontakt mit den vier geistigen Toren unseres Planeten sind. Im weißen Norden sind wir mit der Klarheit des göttlichen Geistes, mit den Meisterräten und Lichtboten Gottes in Verbindung. Im roten Osten stehen wir mit der Kraft des höheren, göttlichen Willens und mit der Liebe verbunden. Im gelben Süden empfangen wir die reinen und liebevollen Gefühle im Ausdruck des Mitgefühls und der Barmherzigkeit.',
    'Im schwarzen Westen verbinden wir uns mit der Lebensweisheit, Kraft und Begleitung KEME‘s, des Bruder Tod, der alles stets im Wandel hält. Über ihn erhalten wir auch die Verbindung zur Seelengemeinschaft der Vorfahren, die sich über uns ausdrücken.',
    'Über B’AATZ sind wir auch durch den GOLDENEN STRAHL mit dem HERZEN GOTTES verbunden. Dieser Strahl gibt uns als kosmische Essenz die Befreiung von alten Verhaltensmustern, überholten Glaubensvorstellungen und von den im Menschsein wirkenden und oft behindernden Programmen.',
    'Die Stärken der B’AATZ-Geborenen sind ihre besondere Verbindung zu anderen Seinsebenen, Besonnenheit, Wachsamkeit und Achtsamkeit, Sicherheit aus dem göttlichen Vertrauen und Glauben. Daraus kreiert sich der Mensch ein Leben in Fülle und Kraft. Aus diesem Grunde sind B’AATZ-Geborene gute Schamanen. Sie sind angelegt, Raum und Zeit in sich zu entfalten und damit zu Reisenden durch die Dimensionen zu werden. B’AATZ-Geborene sind sehr gute Brückenbauer zu anderen Seinsebenen, Kulturen, Religionen, zu verschiedenen Energien und Kraftfeldern, die sie aus ihrer Grundanlage leicht in sich und damit im Feinstofflichen und im Materiellen miteinander verknüpfen.',
    'Die Schwächen der B’AATZ-Geborenen zeigen sich in Arroganz, Überheblichkeit, Zynismus und Unpünktlichkeit, starke Anbindung an die Schattenreiche, Schöpfende im Dienste von manipulierenden Wesen aus den Licht- oder Schattenwelten, mit einem Hang zu Hochmut und persönlicher Macht und Kontrolle.'
  ],
  array[
    'Am Tage B’AATZ bitten wir um unsere göttliche Begleitung, um die Verbindung zum GOLDENEN STRAHL GOTTES, wir bitten um Begleitung aller geistigen Kräfte, die uns aus unserer Seelenkonstellation für unsere Lebensaufgabe nahe sind. In Ritualen bitten auch Musiker und Künstler um Zugänge in höhere Schöpfungsebenen, aus denen sie durch ihr Schaffen Botschafts- und Energieträger sind. Sie sollten erkennen, dass sie mit ihrer besonderen Gabe der Kreativität den Schöpfergeist Gottes auf dem Planeten manifestieren.',
    'Dadurch sind sie Mittler der kosmischen Kräfte, die sich in ihrer Vielfalt, in ihren Licht- und Schattenanteilen über Kunst und Musik ausdrücken. Über das geschaffene Werk berühren sie die Menschen in ihren Licht- und auch Schattenanteilen. Beide Anteile tragen in sich die Kraft der Erkenntnis und die daraus sich ergebende Befreiung und Erlösung in sich. Am Tage B’AATZ erbitten wir jegliche Form von Verbindung im Sinne der menschlichen Gemeinschaft, wir schließen an diesem Tage den Bund der Ehe, wir bitten um eine heilsame Verbindung zu unseren Kindern und Angehörigen.',
    'Man hält auch Zeremonien für einen kraftvollen Beginn eines Projekts und für die heilvolle und sanfte Geburt eines Kindes. Wir erbitten die Kraft unserer Seele, das Erkennen unserer Seelenbestimmung und die Begleitung der 20 Nahuales für die Erfüllung unseres Lebenswerkes. B’AATZ ist ein sehr guter Tag, um Wohlergehen und göttliche Begleitung für die gesamte Menschheit zu erbitten. Möge sich der Mensch in seinen vielfältigen Arbeitsbereichen seiner göttlichen Begleitung und Führung bewusst sein.'
  ],
  'Venen, Arterien und die Gefäße',
  'der Affe als Symbol der Weisheit, der Künste und der Beweglichkeit'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 02 · Ee
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  2, 'de',
  'EE ( Eb), sprich E',
  'O KAT, W AJPUU, S KEME, N TIJAAX',
  array[
    'EE ist der heilige Nahual des menschlichen Lebens- und Entwicklungsweges, er führt den Menschen auf seiner Heimkehr zu GOTT, bestimmt aus der Urabsicht und Leitkraft der Seele und deren Aufgabe.',
    'EE hütet damit auch das Mysterium des Schicksals, der Geburt, auch des Zeitpunktes des Todes. Über den gegebenen Lebensweg, aus der Seelenanlage, in der jeweiligen Seelenkonstellation ergibt sich der Lebenslauf, zeigen sich Dichte oder auch Öffnung und Befreiung. Über EE erfahren wir unsere ursprüngliche Absicht, uns zu inkarnieren. EE steht somit auch in enger Verbindung zu KEME, dem „Weißen Tod“, der aus der Seelenanlage des Menschen den Körper formt und für die Erdenwanderung freigibt.',
    'Der menschliche Weg beinhaltet die für die menschliche Erkenntnis notwendigen Hindernisse und das vom Menschen in Abstimmung mit dem göttlichen Willen ins Auge gefasste Ziel. Der auf GOTT eingestimmte menschliche Entwicklungsweg wird in Maya begleitet von den 20 Nahuales, die sich aus dem Nahual B’AATZ entfalten.',
    'Der nächste folgende Tag im Kalender ist EE, er steht in der Dynamik des sich auf der Wanderschaft entfaltenden Lebens. Wir erfahren das Leben in seinen Licht- und Schattenseiten aus den Impulsen unserer Seele im Symbol des Lebensweges. So beginnen wir den Weg der Erkenntnis stets im Rhythmus der heiligen 20 in B’AATZund beenden ihn am Tage der Klarheit und des kosmischen Gesetzes der Liebe, am Tag TZ‘I. Die Spirale entfaltet sich auf höherer Ebene, auf dem sich hebend nach oben strebenden Erkenntnisweg, zu neuen Erfahrungen, durch neue Räume und Zeiten, in das Licht GOTTES.',
    'Was auch immer der Mensch auf seinem Wege visualisiert und manifestiert, sollte mit EE, dem in der Seele angelegten Wegweiser, in Einklang gebracht werden.',
    'Daraus ergibt sich die geistige Führung, die uns vor Umwegen bewahrt und die daran interessiert ist, dass wir aus den notwendigen Erfahrungen unsere Schlüsse ziehen. Dieser Weg gleicht den Stufen einer Pyramide als Symbol der Entwicklung und des zu erreichenden Ziels, aber auch der Verbindung des Göttlichen zum Menschen.',
    'EE führt den Menschen damit auch durch die Ebenen des Schattenreiches, mit all den Erfahrungen, die sich aus abgetrennten Seelenanteilen auf der Lebenswanderschaft öffnen. Zugleich festigt sich der Mensch im Kraftfeld der Erde durch die Erfahrung von Verdichtung und Leichtigkeit.',
    'Aus dieser Verbindung wird der Mensch durch die von innen heraus wirksame Kraft und Autorität ermächtigt, die Absicht des göttlichen Plans aus seiner Seele auf dem Planeten Erde als Lebensaufgabe umzusetzen. Hat ein Mensch seinen Lebensweg vergessen, hat er sich zu sehr in die Materie, in das Irdische verstrickt, so erinnert die Verbindung zu EE an die Rückkehr zur ursprünglichen Absicht der Seele, heimzukehren. Dieser Hilferuf der verkümmerten Seele nach Umkehr kann schmerzvolle Schicksalsschläge auslösen.',
    'Am Tage EE öffnen sich die Wege für geistige, aber auch physische Vorhaben, für die Gründung einer Firma, eines Vereins, eines Lebensbundes, einer Familie. Gute und Heil bringende Absichten, in die Hände des göttlichen Kosmos gelegt, werden von diesen Kräften mitgetragen. Dies bedeutet Schutz, Begleitung, Fülle und Segen.',
    'Somit ist EE auch ein guter Tag für Geschäfte, für Projekte, für die Verbindung mit dem unsichtbaren „GEISTIGEN RAT“, der eine Vision segnet und für gut oder auch weniger gut befindet.',
    'Am Tage EE verbindet sich der Maya auch mit den Planeten, Sternen, mit Sonnensystemen und Galaxien, um den Lebensweg eines Menschen, seine Entwicklung im Kraftfeld der Planeten und Sternenkonstellationen zu erkennen und die Wesenheiten der außerirdischen Welten für die Öffnung seines Weges einzuladen. Die Seele erinnert sich an ihren Heimatplaneten und die damit verbundenen Grundanlagen, die Wegweiser für die Heimkehr zu GOTT.',
    'EE ist der Hüter der sich stets bewegenden und verändernden menschlichen Geschichte, des Lebensrads, aus dessen Bewegung die menschliche Entwicklung getragen ist. Somit steht EE auch im jetzigen Zeitenwandel des Solzyklus, am Tage 4 AJPUU, am 21.12.2012, als Nahual des bisherigen Entwicklungsweges der Menschheit mit der heiligen 9 im Osten.',
    'Die Stärken der EE-Geborenen sind ihre individuelle Persönlichkeit, klare Erkenntnis aus der seelisch-geistigen Führung, hohe Beweglichkeit und Bereitschaft, sich geistig führen zu lassen, Bereitschaft, mit anderen zu teilen, Wegweiser für andere zu sein, gut geeignet für geistige Berufe, gute spirituelle Führer und Priester, derenbesondere Fähigkeit es ist, Menschen in ihrer Kapazität zu erkennen und ihnen den Weg zu öffnen, besondere Zugänge zu Kindern und Neigung für Berufe, die mit Kindern und Jugendlichen zu tun haben.',
    'Die Schwächen der EE-Geborenen ergeben aus ihrer fehlenden Hinwendung an die geistige Begleitung Isolation, Einsamkeit, Schutzlosigkeit auf dem Lebensweg, Irreführung anderer, Egoismen auf dem Berufs- und Lebensweg, Besserwisserei, Macht, Selbstherrlichkeit bei erreichten Zielen, durch fehlende Einsichten Behinderung der Lebenswege anderer in Kindererziehung, Beruf, Beurteilung und Verurteilung derer, die ihren eigenen Weg gehen.'
  ],
  array[
    'EE ist der Tag des Glücks und des Erkennens der Lebensbestimmung.',
    'Wir erbitten an diesem Tag unsere geistige Entwicklung, das Erkennen unserer Seelenbestimmung und unserer Lebensaufgabe. Wir rufen im Ritual diesen großen Lebensbegleiter und Wanderer EE, Behinderungen auf unserem Weg auszuräumen.',
    'Wir lösen Leid und Schmerz als Ausdruck dieser Behinderungen durch Vertrauen und Hingabe auf.',
    'Wir bitten EE um geistigen Schutz auf der Wanderschaft, auf einer Reise, bei einem Vorhaben.',
    'Wir bitten EE um einen Lebenspartner, der unsere geistige Entwicklung achtet und bereit und fähig ist, unseren Lebensweg mit uns zu teilen.',
    'Wir zeichnen eine Lebensstraße des Weißen Weges „camino blanco“ mit jeweils 7 oder 13 Kerzen, gleich einer Allee weißer Kerzen, streuen Zucker in diese Allee für die Süße des Weges, für Freude und Glück und verbinden uns mit unserer eigenen Seelenabsicht oder auch mit der Seele eines verstorbenen oder im Leben verlorenen Menschen. Wir bitten damit verbunden um die Öffnung und Erkenntnis des von der Seele geführten Weges für uns selbst und für andere. Die Segnung des Weges Jesu durch Maria von Magdala, die Salbung der Füße geben uns Hinweise, den Weg eines Menschen auf gleiche Weise zu segnen, für den individuellen oder auch für einen gemeinsamen Weg.'
  ],
  'Fußsohlen, Fuß, Segnung des Weges durch Salbung, feinenergetische Reinigung der Füße und Beine',
  'Wildkatze, der Weiße Jaguar (Schutztier für den Weißen Weg), Luchs, der Weiße Wolf'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 03 · Aaj
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  3, 'de',
  'AAJ (Ben), sprich Ach',
  'O KAAN, W IMOX S KIEJ, N KAWOQ',
  array[
    'AAJ ist das Symbol für den Mais, für die Aussaat, für die Gemeinschaft der Tiere, für die Familiengemeinschaft.',
    'AJ ist im Symbol des Lebensbaumes die sich wie aus einer Baumkrone entwickelnde Spiritualität. Es ist ein Tag der sich vervielfältigenden zwischenmenschlichen Kräfte, die aus der Gemeinschaft erwachsen und sich im WIR-Bewusstsein des Einzelnen integrieren. Daraus entsteht auch gemeinsames Glück und Freude. Der Mensch sätden Samen seiner Lebenshaltung und erntet stets die Früchte seines zwischenmenschlichen Verhaltens.',
    'AAJ gibt dieser menschlichen Aussaat die Hinwendung zum Guten und Heilvollen, er gibt seine Kraft und seinen Schutz, wenn wir auf die Gemeinschaft ausgerichtet sind und diese in ihrer Vielfalt auch als Abbild der Göttlichen Gemeinschaften aus Seelen und Wesen auf unterschiedlichsten Bewusstseinsebenen erkennen.',
    'Männer und Frauen, Lebensgefährten, Ehepaare, allein stehende Menschen, sie alle tragen den tiefen Wunsch in sich, Teil der menschlichen aber auch Teil der geistigen Gemeinschaften zu sein. Wir alle wünschen uns Geborgenheit, das Gefühl des Angenommenseins, des Geliebt Werdens und sollten erkennen, dass wir dafür den Samen in uns selbst setzen müssen.',
    'AAJ ist der Nahual, in dessen Verbindung und Führung wir erkennen können, dass die Liebe zu uns selbst, die Aufmerksamkeit, die wir uns selbst geben die Nahrung für unsere eigene Seele ist. Aus einer genährten Seele nährt sich in hoher Intensität die Persönlichkeit des Menschen, eine Kraft, die im Dienen, in der Verbindung zum Gemeinsamen liegen sollte.',
    'AAJ zeigt sich in der Gemeinschaft auf den Ebenen der geistigen Familien und auf der Ebene der Erdenfamilie. Je nach Haltung wirkt seine Kraft aus der Polarität immer von zwei Seiten, der Seite des Glücks und der Lebensfreude oder der Seite unserer Schwächen und Unvollkommenheiten.',
    'AAJ steht damit als Archetyp für die Lebensveränderung, die wir durch bewusstes Erkennen herbeiführen können. Wir erheben uns aus schweren Lebensumständen durch das Erkennen, wer wir sind und wofür wir auf diese Erde gekommen sind.',
    'Somit führt uns AAJ auf dem Weg der Erkenntnis zur Ausrichtung auf das Gemeinwohl. Es ist der Tag der Reinigung in zwischenmenschlichen Konflikten, der Bewusstwerdung eines egoistischen Verhaltens, der Tag der Erneuerung, der Klarheit und der Erkenntnis, dass wir als Menschen Teil der kosmischen Gemeinschaft sind. Die Inkarnation ist ein Herauslösen einer Seele aus der geistigen Gemeinschaft und damit verbunden der Eintritt in die physische Gemeinschaft des Menschseins. Dies zeigt sich im Symbol des Lebensbaumes, der von unten wie oben gleichermaßen genährt ist für sein Wachstum.',
    'In der Natur finden wir AAJ in der Kraft der Eiche, in Maya im heiligen Baum Ceiba.',
    'Die Festigkeit des Menschen, sein Vertrauen auf die göttliche Weisheit und Führung bilden die Basis, auf welcher der Mensch von der geistigen Welt ermächtigt werden kann. Somit übergibt der AJKIEJ, der Mayapriester, dem bewussten Menschen das Symbol für diese Macht, die heilige Vara, den Kraftstock für die Aufgaben in der Gemeinschaft. Die Vara wiederum ist ein Symbol für die Rückkehr des Menschen zu seinen Wurzeln, zu seiner geistigen Seelenfamilie, zur wahren Gemeinschaft in GOTT.',
    'AAJ ist der Tag der Studenten, Lehrer und Erfinder, der Seelsorger und Sozialarbeiter. Sie stehen ganz besonders in der Aufgabe, Weisheit und göttliche Intuition in der menschlichen Gemeinschaft zu manifestieren und neue Erkenntnisse und Einsichten zu vermitteln.',
    'Die Stärken der AAJ-Geborenen äußern sich in Menschen, die gesegnet sind mit großer Schaffenskraft und Gemeinschaftsorientierung, sie sind fürsorglich, in der Teamarbeit integrativ und gut geeignet für Führungspositionen. Sie zeigen besondere Qualitäten in der Elternschaft, sind gute Heiler und Schamanen, oft auchgesegnet mit Glück, Fülle und Zuneigung anderer. Sie stehen in heilsamer Verbindung mit den Naturreichen und haben eine besondere Verbindung zum Geist der Tiere.',
    'Die Schwächen der AAJ-Geborenen zeigen sich in einer desorientierten Lebenshaltung, in gestörten Verbindungen zu Familie und Sippe, in einer gestörten Verbindung zum Lebensumfeld. Unbeständigkeit, ungezügelte Leidenschaften, Selbstsucht, fehlende Verwurzelung, Oberflächlichkeit, fehlende Festigkeit und Beständigkeit und charakterliche Labilität geben den Menschen das Gefühl, aus dem Leben ausgeschlossen zu sein, eben so wie sie selbst Menschen ausschließen.'
  ],
  array[
    'AAJ gibt Kraft und schafft die Verbindung eines Menschen mit den planetarischen Gemeinschaften, mit dem Mineralien-, Pflanzen-, Tier- und Menschenreich. Wir bitten um den Schutz für das Leben, die Begleitung aus der Gemeinschaft der Ahnen, erbitten Schutz und Begleitung aus der Gemeinschaft der Engel und Schutzwesen, die Verbindung zur Gemeinschaft der Naturwesen, zu den Gemeinschaften der geistigen Räte.',
    'Es ist ein Tag des Dankes für das gegebene Schicksal, das sich aus dem Wirken der Seelengemeinschaften mitformt. Wir bitten in Ritualen mit AAJ um den Schutz für Heim und Familie, um den integrativen Lebensweg für unsere Kinder, um eine harmonische Partnerschaft, um ein friedvolles Arbeitsumfeld und lösen zugleich auch Behinderungen und Energien von Hass, Neid und Missgunst in der Gemeinschaft auf.',
    'Am Tage AAJ erhalten wir Verbindung zur Gemeinschaft der Tiere, zu den Hütern des Tierreiches, die nährende und schützende Kommunikation mit den Krafttieren.',
    'Wir bitten um Rückzug der Schaden verursachenden Tiere aus dem menschlichen Lebensumfeld. Mit dem Zucker (Symbol für AAJ), den wir in die Zeremonie mit einfließen lassen, erbitten wir die Süße des Lebens für uns selbst, für belastete Familienmitglieder, für die Seelengemeinschaft auf anderen Seinsebenen, im Verstorbenenreich und in den Lichtwelten.'
  ],
  'Wirbelsäule, Klärung des Knochenmarkes von alten, in der Gemeinschaft wirkenden Programmierungen',
  'Kraft der Wale und Delphine, Gemeinschaftsverhalten anderer Tiergemeinschaften'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 04 · I'x
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  4, 'de',
  'IX (IX), sprich Isch',
  'O KEME, W IQ, S Q’ANIL, N AJPUU',
  array[
    'I‘X steht als Archetyp für die kreative, mütterliche Kraft des Universums. Diese Kraft ist verbunden mit den Göttinnen, die unterschiedliche Qualitäten des Frauseins repräsentieren und damit auch Mittler zu diesen Kräften für die Frau aber auch für den Mann sind. Im Christlichen werden diese Göttinnen in der einen Göttin, der Kosmischen Mutter Maria ausgedrückt, aber auch in den unterschiedlichen Heiligen, den gesegneten Meisterinnen und Frauen.',
    'I‘X ist manifestiert in der Heiligkeit der Mutter Erde und den Naturreichen, dem Mineralien-, Pflanzen- und Tierreich. I‘X repräsentiert somit die Kraft der Berge, der Bäume, der Wasseraltäre, der Luftorte, besondere Zeremonienorte der Maya sowie der Kelten und anderer Kulturen und ihre Altäre in der Natur.',
    'I‘X, Ausdruck der Mutter Erde, entspricht dem Herzen unseres Planeten „Corazon de la Tierra“, dem weiblichen Uterus, der menschlichen Empfängnis, der weiblichen Fruchtbarkeit im Menschen, im Tier- und Pflanzenreich. Damit verbunden steht auch der Mond, der diese Aspekte der weiblichen Schöpferkraft in sich trägt und in der Natur anregt und ausdrückt.',
    'Im Kraftfeld I‘X stehen wir im Energiefeld unseres Planeten mit all seiner Weisheit und Kraft und mit den Naturorten in der Polarität von lichten und auch dunklen Plätzen. Somit stehen auch Natur und Mensch in der Unvollkommenheit und in der Aufgabe, Balance zu halten. Diese Harmonie wird durch das achtlose Wirken des Menschen sehr erschwert oder behindert.',
    'Mit I‘X stehen wir auch in Verbindung mit dem Kraftfeld der vier Elemente und deren Einfluss auf Natur und Menschsein. Durch den Erdmagnetismus sind wir im Menschsein wie festgehalten. Diesen Zustand spüren Menschen, wenn sie mit diesem Energiefeld zu wenig verbunden sind, deren Seele noch nicht in Resonanz steht mit den Energiefeldern der Erde. Somit sollten wir ankommende Kinder mit I‘X segnen und um ihre Aufnahme im Kraftfeld der Erde bitten.',
    'Kinder erfahren daraus Naturliebe, Geborgenheit, Reinigung und Heilung, den mütterlichen Schutz und den Zugang zu der Vielfalt der Naturwesen. Sagen, Märchen und Geschichten haben vielfach die Aufgabe, den Kindern diese Brücken zu den verdichteten Energiefeldern des Lebens auf Erden zu bauen.',
    'Nachdem I‘X auch verbunden werden kann mit dem Geist eines Ortes, auch eines Wohnhauses, bedarf es einer Zeremonie am Tage I‘X, die Unstimmigkeiten in der Familie und Zwischenmenschlichkeit auch dadurch zu klären, dass der Geist eines Ortes oder des Hauses um Harmonie, Schutz und gegenseitigen Respekt gebeten wird. Diese Kräfte stehen auch in Verbindung mit gebundenen Naturwesen, die sich durch bauliche Eingriffe verdrängt fühlen, denen man ihr Heim ungefragt genommen hatte. Ihnen sollten wir in Abstimmung einen neuen Wohnort anbieten.',
    'Wir leben oft in Kraftfeldern derer, die vor uns den Planeten bewohnt, geliebt und verehrt aber auch abgelehnt und verletzt haben. Somit bedarf es der Achtsamkeit, diese Orte zu reinigen, um Einlass zu bitten und eine integrative Lösung für eine gemeinsame Koexistenz zu suchen.',
    'I‘X steht für die Kraft und Intelligenz des Schwarzen Jaguars, der sich in Klarheit und Furchtlosigkeit in der Dunkelheit der Nacht und somit auch in den Ebenen der Unterwelt bewegt. I‘X ist somit eine kraftvolle Wesenheit zum Schutz eines Ortes oder eines Menschen. Mit I‘X, dem Schwarzen Jaguar, ist es möglich, ohne Gefahren durch die Ebenen der Unterwelten zu wandern.',
    'Belasteten Menschen, aber auch Gefahren im Leben können wir durch I‘X mit Wachheit, Intuition und verständnisvoller Kraft und im Schutze der Erdenmutter vor Zerstörung (durch Katastrophen) begegnen. Im Schutze von I‘X vermag es die Heilerin, Schamanin, der Schamane zusammen mit den Erdkräften, mit den Pflanzen und Tieren, für den Menschen heilsam zu wirken, indem sie den desorientierten und von der Mutter Erde getrennten Menschen wieder zu seinen Wurzeln, zur Mutter Erde zurückführen.',
    'Die Stärken der I’X-Geborenen sind Kraft, Festigkeit, Dynamik und Vitalität. Sie sindgroße Naturliebhaber mit Zugang zur Weisheit und Heilkraft der Natur. Sie schöpfen aus Heil-Quellen der Naturreiche, sind gesegnet mit einer starken Sexualkraft, die sie als Schöpferkraft vielseitig einsetzen können. I’X-Geborene haben in der Symbolik des Schwarzen Jaguars auch besondere Zugänge zu den Unterwelten, zu den Seinsebenen der Verdichtung, sie lieben die physische Arbeit, stehen damit auch in der Fülle und pflegen einen Heil bringenden Umgang mit materiellen Dingen.',
    'Die Schwächen der I’X-Geborenen zeigen sich in ihrem Hang zu Aggressionen aus fehlgeleiteter, oft auf sich selbst oder auf andere gerichtete verunreinigter Kraft, aus der oftmals auch ein Missbrauch der Naturkräfte entsteht: negativ wirkende Hexenenergie, Schadensmagie, Starrheit, Einfältigkeit, Sturheit, Einzelgängertum, physische Zerstörungssucht, die Vereinnahmung aus einbindender Mutterenergie, die Beeinflussung anderer durch zentrierte Kraft und Macht.'
  ],
  array[
    'Am Tage I’X ehren und heiligen wir die Mutter Erde, ihre Meisterinnen und Göttinnen und bitten um Öffnung der Qualitäten des Weiblichen im Menschsein.',
    'Wir können um Vergebung dafür bitten, dass wir die Mutter Natur ausnützen und ohne zu geben uns bedienen. Wir können bitten um das Keimen der Pflanzen, um reiche Ernte und um den Schutz der Mutter Erde vor Unwettern.',
    'Auch die Bitte um ein harmonisches Familienleben, der Schutz von Haus und Familie vor Unwettern und Katastrophen wäre an diesem Tag möglich.',
    'I’X ist der Tag des Dankes an die Ahnen für das Hinterlassen ihres Erbguts, ihrer Weisheit, der bereits geschaffenen Materie vom Anbeginn der Erde.',
    'Nachdem die Reichtümer unseres Planeten über die vier Elemente auch im Menschen selbst angelegt sind, ist der Tag I’X ein besonders guter Tag, unseren inneren Reichtum zu erkennen und aus dem Herzen der Mutter Erde Zugang zu ihren vier Toren, den vier Himmelsrichtungen und Elementen zu bitten.',
    'Im Außen manifestieren wir I’X, die Schöpferkraft Gottes, in der physischen Schönheit und Fülle, im Ideenreichtum, in unserer Liebe, unserem Willen, in unserer Dynamik und Kraft, in einer aus dem Herzen gelebten Sexualität.',
    'Aus dem Herzen der Mutter Erde gegeben erbitten wir unsere physischen Kräfte für das Wohl der Erde und der damit verbundenen Naturreiche, für ein harmonisches Ganzes.'
  ],
  'Muskeln und Bänder, der Bewegungsapparat',
  'der Schwarze Jaguar'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 05 · Tz'ikin
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  5, 'de',
  'TZ’IKIN (Men) (sprich Tsiki´n)',
  'O KIEJ, W A’KAB‘AL, S TOOJ, N IMOX',
  array[
    'Der Nahual TZ’IKIN zeigt sich im Krafttier des Adlers, des Kondors, des Quetzals, in den Vögeln. Er ist ein Symbol für Fülle, Lebendigkeit, Beweglichkeit und Lebensfreude. Dem Element Luft zugeordnet verbindet uns TZ’IKIN mit dieser Beweglichkeit, aus der heraus wir die Schönheit und Lebendigkeit unseres Planeten aus dem Blickwinkel von oben in Erfahrung bringen können. TZ’IKIN steht für das Glück, für den Geldfluss, für materielle und zugleich spirituelle Stabilität, für heilsamen Reichtum und Lebensfreude, für die Leichtigkeit der Herzensliebe, für dieaus dem Geistesblitz sich ergebende Entscheidung, etwas zu tun oder etwas zu unterlassen.',
    'TZ’IKIN fungiert als Botschafter des göttlichen Universums. Wie sich der Adler in die Höhe tragen lässt, haben wir Menschen die Möglichkeit, uns in die Höhen und Tiefen des Seins tragen zu lassen. Aus diesen für viele Menschen nicht mehr für wahr genommenen unsichtbaren Ebenen gewinnen wir den Zugang zu Seinsebenen, aus denen wir Führung, Hilfe, Weisheit und Kraft beziehen können.',
    'So steht TZ’IKIN für die Gabe des Sehens, für den scharfen und umsichtigen Beobachter, für die Gabe der Medialität, für die Verbindung von Corazon del Cielo, Corazon de la Tierra, für Gucumatz, der Schlange im Federkleid. Diese ist wiederum ein Symbol für die Verbindung von Geist (Federkleid) und Schlange (Transformation) und für die sich entfaltende Schöpferkraft. Über die Transformation und Erkenntnis, über unsere Gabe, uns immerwährend zu häuten, erreichen wir den Zustand der Leichtigkeit, der Unbeschwertheit, der Klarheit und Reinheit des Geistes.',
    'Die Kommunikation zwischen Gott, seinen Mittlern und dem Menschen ist für all jene möglich, die sich ihrer Leichtigkeit und zugleich Festigkeit bewusst sind. Die Verbindung von planetarischen und kosmischen Schwingungen und Kraftfeldern spiegelt sich im kosmischen Menschen, der gleich dem Adler mit scharfem Blick das Geschehen beobachtet und daraus seine Entscheidungen trifft und Verantwortung übernimmt. Aus der von oben gesehenen Schönheit unserer Erde sollte der Mensch durch Erkenntnis und Liebe in Fülle und Freude aus seiner inneren Kraft und Lebendigkeit schöpfen.',
    'Die Federn des Quetzals erinnern uns an die Farbenprächtigkeit des innerlich freien und liebenden Menschen. Die Federn des Guacamaya, dem Papagei Ara, sind in COPAN, Honduras, ein Symbol für die Gottheit der Schönheit des Menschen, für die Farbenpracht seiner Seele, für seine lichtvolle Ausstrahlung und Heilkraft. Adler und Kondor lassen uns göttlich gegebene Ermächtigung in der menschlichen Übersicht erfahren. Die Vielfalt der Vogelwelt spiegelt den Lauf des Geldes, die Freuden, die auch mit der Materie in Verbindung stehen.',
    'TZ’IKIN weist uns den Weg zu spiritueller und materieller Fülle und Einheit.',
    'Die Stärken der TZ’IKIN-Geborenen sind ein klarer Geist, Zentriertheit, geistige Führung, das Vertrauen zum Getragensein im Leben. Klarheit, Erkenntnis und Übersicht schaffen einen umsichtigen Einblick in tiefere Welten. Sie schaffen es, auch in der Dichte des Lebens über den Dingen stehen zu können, bewegen zu gleichen Anteilen materielle und spirituelle Fülle, sie sind großzügig und leben eine heilsame, mit dem Geist und dem Herzen verbundene Medialität. Aus diesen Wahrheitsquellen erhalten sie Visionen, den Segen der Propheten, aus dem Überblick Vertrauen, Lebensfreude, Fülle und Glück.',
    'Die Schwächen der TZ’IKIN-Geborenen sind der fehlende Ausgleich zwischen den materiellen und spirituellen Anteilen im Leben, die dunkle Seite TZ’IKINS zeigt sich im Ausdruck eines Armutsbewusstseins, in der Gier, im Egoismus, in Selbstüberschätzung und Fehleinschätzung, in einer überheblichen, fehlgeleiteten Medialität, aus der unreine Wesen den Menschen und sein Umfeld beeinflussen.'
  ],
  array[
    'In TZ’IKIN erbitten wir die Präsenz und Zusammenarbeit mit den Engelwelten, diestets mit Flügeln in ihrer Reinheit und Leichtigkeit dargestellt werden.',
    'Wir bitten an diesem Tag um ein reiches Leben, um Zentriertheit und um geistige Führung, um Vertrauen und Getragensein im Leben, um materielle und zugleich spirituelle Fülle, um die Schönheit des Geistes und des Körpers und um die in Fülle sich entfaltenden Lebensfreude.',
    'Wir richten uns an GOTT aus Corazon del Cielo, aus Corazon de la Tierra, an Gucumatz, der uns Leben gab und der uns als Gefiederte Schlange in einem ständigen Wandel höher und höher trägt und uns dabei die Lebendigkeit und Vielfalt des Kosmos nahe bringt.',
    'TZ’IKIN wird gerufen für die Kraft der Vision, für die Verbindung hin zum Göttlichen, für den Flug durch die Ebenen des Seins, für das Austreten aus dem physischen Körper und die damit verbundene Erkenntnis und Weisheit.',
    'Mit der Feder des Raben erbitten wir die Leichtigkeit auf der Wanderung durch die Schattenreiche. Heiler und Schamanen erbitten mit der Feder die Auflösung von verdichteten und schwer auf dem Menschen lastenden Energiefeldern.',
    'Mit der Feder des Adlers erbitten wir Klarheit in Sprache und in unseren täglichen Lebensäußerungen. Aus der Leichtigkeit des Geistes erheben wir uns in TZ’IKIN, aus dem Wirken der Engelsboten und Lichtwesen in die Ebenen des göttlichen Lichts und der Liebe.'
  ],
  'die Augen und der innere Blick, die Hellsichtigkeit und die Intuition des Geistes',
  'Adler, Quetzal, Kondor, Guacamaya, die Vögel, der Schmetterling'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 06 · Ajmaq
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  6, 'de',
  'AJMAQ (Cib), sprich Achmak',
  'O QANIL, W KAT, S TZ‘I, N IQ',
  array[
    'AJMAQ ist der Tag der Ahnen, der Tag der Verstorbenen, aber auch ein Tag der Unvollkommenheiten unseres Menschseins, der Lasten, unter deren Bürde Seelen in dieser und der Anderswelt leiden.',
    'AJMAQ ist verbunden mit Bewusstsein, Lebensweisheit der Ahnen, Gleichgewicht, Talent, Anlage, Sensibilität und Ideenreichtum.',
    'AJMAQ ist der Tag des violetten Strahls der Heilung und Veränderung, der Tag des Vergebens. AJMAQ führt uns zu auch in früheren Leben abgetrennten Seelenanteilen, in unsere unreinen Unterwelten, über das Aufspüren dieser Seelenanteile öffnet sich die Heilungsarbeit. AJMAQ führt zu Erfahrungen und zur Bereitschaft, sich diesen Anhaftungen aus Altlasten zu stellen, um Heilung und Ganzwerdung der Seele zu erlangen.',
    'AJMAQ als Aspekt des BRUDER KEME führt uns gleichsam als Mittler zu den Schwächen und Unvollkommenheiten unseres Seins. Unsere Ahnen aus verschiedenen Inkarnationen und Kulturen und auch wir selbst haben viele Leben hinter uns, die Erfahrungen auf allen Ebenen beinhalten. Aus AJMAQ begleiten uns die Ahnen mit ihrer Lebensweisheit, sie sind uns Schutz durch Freud und Leid.',
    'AJMAQ erinnert uns daran, dass jeder Schritt menschlicher Entfaltung mit anderen Reichen verbunden steht und eine starke Auswirkung auf alle Beteiligten, auch auf die Seelen im Verstorbenenreich hat. So ist unser Leben die wunderbare Möglichkeit, Anhaftungen, Bindungen und Behinderungen für uns und zugleich für unsere Vorfahren auflösen zu können. Was der Mensch durch seine Absicht, durch bewusstes Denken, Fühlen und Handeln im Dienen bewegt, hat Auswirkungen aufsein gesamtes Umfeld, auf einen Wandel im Verstorbenenreich, auf eine besser Wiederkehr der Seele auf diese Erde, auf den Zustand des bewussten, befreiten Menschen im Jetzt und auf seine sich entfaltende Zukunft.',
    'Für den unbewussten Menschen zeigt sich die Wesenheit AJMAQ von der Seite der Schwere und Last, die wir von unseren Ahnen übernehmen und oft bewusst oder unbewusst auch für sie hier auf Erden abtragen. Deshalb sind AJMAQ-Geborene in ihren Lebensumständen oftmals Behinderungen durch zu starken Einfluss der Ahnen ausgesetzt. Sie tragen diese Schwere häufig mit Selbstmitleid und wundern sich über die Ungerechtigkeit des Lebens. Allerdings haben sie sich aber schon vor ihrer Geburt bereit erklärt, altes eigenes Karma und das Karma der Seelengemeinschaft, in der sie stehen, abzutragen. So schleppen sie häufig die Lasten anderer mit sich und übernehmen damit auch Leid und Schuldgefühle anderer.',
    'Unsere Schwächen zeigen sich im göttlichen Kosmos als schwarze Wolke, die uns die Sicht auf das Göttliche verschleiert. So verschleiert AJMAQ die Sicht, um den betroffenen Menschen an seinen Auftrag zu erinnern, den er beim Eintritt in das Erdenleben freiwillig übernommen hat: die eigene Befreiung und die Befreiung anderer.',
    'Die Stärken der AJMAQ-Geborenen sind ihre Hilfsbereitschaft, eine besondere Herzqualität, großer Spürsinn für die Nöte anderer. Sie sind sehr sensibel und dünnhäutig und dadurch auch sehr medial angelegt. Sie haben aus ihrer Grundanlage besondere Zugänge ins Verstorbenenreich, stehen verbunden mit der Kraft und Weisheit der Ahnen, mit den Weisen alter Völker und Kulturen. Ihre Bereitschaft zu dienen und für andere da zu sein geht oft soweit, dass sie auf sich selbst vergessen.',
    'Die Schwächen der AJMAQ-Geborenen tragen die Gefahr in sich, von üblen Gewohnheiten und sündhaften Lastern, von Schwere und Unbeweglichkeit geleitet und bestimmt zu werden. Sie tragen oft auch die Lasten von Verstorbenen auf ihrem Rücken und haben das Gefühl, etwas bewältigen zu müssen, das nicht das Ihre ist.',
    'Sie geben anderen gerne die Schuld für ihre Schwächen, sind unausgeglichen und übertragen ihre eigenen Lernaufgaben, ihre Unvollkommenheit oft auf andere.',
    'Unverlässlichkeit, Desorientierung im Leben, die Gefahr der Verstrickung, ein Magnetismus zu unreinen Orten und Kraftfeldern, der Hang zu betrügen und andere zu verführen sind Zeichen der dunklen Seite AJMAQs.'
  ],
  array[
    'An diesem Tag erbitten wir die Befreiung der Verstorbenen von allen Anhaftungen aus dem Erdenleben. Im violetten Strahl arbeiten wir mit unseren Angehörigen im Totenreich, bitten um Vergebung, heilen und integrieren Ausgeschlossene, Verräter, Missbrauchende und Missbrauchte.',
    'Wir bitten AJMAQ um seine Fürsprache und Hilfe, um Erkenntnis, um die Heilung von Abartigkeiten, Leidenschaften, Schwere, Depressionen, physischen und psychischen Krankheiten, die mit Anhaftungen von belasteten Seelenanteilen zu tun haben.',
    'In Gebeten und Zeremonien beziehen wir an diesem Tag besonders die Unvollkommenheiten der Verstorbenen mit ein, segnen sie, öffnen ihnen den Weg in die Befreiung, indem wir sie einladen, mit uns im Wandel mitzugehen.',
    'In der Maya-Tradition werden an diesem Tag durch die Düfte der Speisen (banquete) die Verstorbenen an ein freudvolles Essen im Leben erinnert. Sie werden zum Festmahl des Lebens in die Gemeinschaft der Lebenden wieder mit eingeladen, ein Symbol der gemeinsamen Freude und des Friedens im Beisammensein.',
    'Zeremonien am Tage AJMAQ können auch für die Befreiung von gebundenen Seelen an alten Kraftorten, aber auch an Unfallorten, in Häusern und an Orten der Gewalt und Zerstörung sowie in Friedhöfen und dergleichen gemacht werden. Auch schwarzmagische Besetzungen können am Tage AJMAQ gut erkannt und aufgelöst werden.'
  ],
  'Sexualorgane, Emotionalkörper, in der Wirbelsäule und in den Knochen angelegte Programmierungen und Erfahrungen des Menschen',
  'Uhu, Biene, Insekten, Moskitos'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 07 · Noj
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  7, 'de',
  'NOJ (Caban), sprich Noch',
  'O TOJ, W KAAN, S B‘AATZ, N A’KAB‘AL',
  array[
    'Das menschliche Gehirn in Verbindung mit dem Herzen ist der Tempel der göttlichen Weisheit. NOJ ist der Hüter dieser Weisheit, die sich dem Menschen dann zu erschließen beginnt, wenn er sein Herz und seinen Geist zunehmend reinigt und klärt.',
    'Über die heilige SIEBEN stehen wir in NOJ in Verbindung mit dem Schöpferplan Gottes, den heiligen Sieben Strahlen in ihren 7 Grundqualitäten des Lichts und der 6 Ruhe- und Integrationsphasen.',
    'NOJ ist der Tag der Weisheit, der aktiven Intelligenz, des Wissens und der Ermächtigung, der Motivation in allem Tun, das mit der göttlichen Absicht in Verbindung stehen sollte.',
    'Der Weihrauch steht für diese heilige Verbindung des Menschen mit dem Willen Gottes. Gleich dem sich erhebenden Duft verbinden sich Himmel und Erde, Geist und Materie miteinander.',
    'Eine besondere Weise der Schöpferkraft ist unsere Fähigkeit, Denken zu können und unsere Gedanken zu lenken. Die Kreativität ist der Ausdruck der menschlichen Verbindung mit der göttlichen Schöpferkraft. Wir können nur erfinden, was im Kosmos bereits auf feinstofflicher Ebene besteht. Somit ist der schöpfende Mensch angewiesen auf die kosmische Bibliothek, in der alles bereits erschaffen ist und für die dreidimensionale Welt zugänglich gemacht werden kann. Der Mensch fügt dieses in höheren Ebenen eingelagerte Wissen nach seinem eigenen Gutdünken zusammen und setzt es im Zeichen des Dienens oder auch Zerstörens ein.',
    'NOJ erinnert daran, dass wir die göttliche Intelligenz nur in Verbindung mit unserem Herzen und zum Wohle der Menschheit und des Planeten Erde einsetzen sollten. Er hütet das Geheimnis der kosmischen Weisheit, zentriert sich in unserer kühlen Mentalkraft, die stets durch das Herz erwärmt werden sollte.',
    'Somit steht NOJ auch im Kraftfeld der Magie, wenn mental starke Menschen allein durch die Ausrichtung ihrer Gedankenkraft Schwingungsfelder erzeugen, Menschen und Lebenssituationen bewusst oder unbewusst beeinflussen – zum Wohle, oder in der dunklen Seite NOJs zum Schaden anderer.',
    'NOJ hilft aus der Kraft des Erkennens dem Menschen in der Bewältigung seiner Lebensaufgabe. Aus seinen Impulsen, aus der Erkenntnis des Geistes, offenbaren sich Erinnerungen an altes Wissen und Weisheit, an geistige Zugänge und die damit verbundenen, medialen Quellen der kosmischen Weisheit. So hatte Jesus seinen Begleitern symbolisch aus NOJ die Zugänge zum „Heiligen Geist“ geöffnet, aus denen sie vieles neu erkennen und erfassen konnten.',
    'Im Zeitenwandel zeigt sich NOJ in der menschlichen Erkenntnis, die Spreu vom Weizen auch in den Schriften und im Wissen der Religionen und Kulturen trennen zu können. Vieles an geistigen Schriften und Botschaften wurde von Menschenhand, aber auch von unreinen Einflüssen und Kräften anderer Welten über die Zeitenzyklen beeinflusst und verändert. Damit wurde in Religionen und Glaubensrichtungen aus manipulierten Botschaften Unwahrheit, Intoleranz, Krieg und Unfriede zwischen den Glaubensrichtungen geschaffen.',
    'In NOJ zentrieren sich die verschiedenen Weisheitsquellen aus unterschiedlichen Seinsebenen zu einer gemeinsamen Wahrheit, der göttlichen Erkenntnis. Dieses Wissen ist aus den verschiedenen Bewusstseinsebenen und Reifegraden des Menschen fassbar. Es formt sich in Verbindung mit dem kosmischen Strahl der Weisheit und Liebe, mit dem Strahl der kosmischen Intelligenz und dem alles durchdringenden Geist in NOJ zu einer gemeinsamen, alles verbindenden Wahrheit.',
    'Die Stärken der NOJ-Geborenen sind ihre vielfältigen guten Ideen, die verbunden stehen mit der göttlichen Einsicht und Intuition. Sie zeigen großes, kreatives Talent, agieren mit Gerechtigkeitssinn und einem starken Gedächtnis für das Wesentliche.',
    'Es sind hervorragende Weisheitsboten und Lehrer, Menschen mit großem Geist und offenem Herzen. Sie verteidigen humanistische Ideen und orientieren sich in ihrem Tun an den alten Traditionen, die sie wieder in die Jetztzeit einbinden.',
    'Unter ihnen findet man große Heiler und Ärzte, weise Geschäftsleute und hervorragende Intellektuelle, Schriftsteller, Musiker, Weisheitslehrer und Politiker. Sie haben besonders starke magische Fähigkeiten und spirituelle Anlagen, die bewusst mit dem Herzen eingesetzt werden sollten. Somit sind NOJ-Geborene oft aus göttlichen Quellen genährte Autoren und Priester der göttlichen Wahrheit.',
    'Die Schwächen der NOJ-Geborenen zeigen sich in jenen Menschen, die häufig stolz, hochmütig und überheblich sind und fehlendes Einfühlungsvermögen haben. Sie agieren isoliert von der Herzenswahrheit und ihren inneren, lichtvollen Anlagen. Sie verstricken sich damit oft als Diener von Kräften, die ihr Reich auf Erden erhalten wollen und ihre niederen Plänen und Erkenntnisse verwirklichen möchten. Häufig agieren sie im Dienste von Sternenwesen, die, dem Göttlichen fern, ihre Qualitäten als kaltes, vom Göttlichen isoliertes Wissen in das Menschsein einbringen und damit zugleich den Menschen als Informations- und Kraftquelle, als Erfinder und im Dienste von Wissenschaft, Kunst und Religion missbrauchen.'
  ],
  array[
    'Zeremonien an diesem Tag sind besonders wirkungsvoll, um Ideen und Vorstellungen aufzulösen, die in negativen Emotionen und Gedanken aus niederen Welten kreiert wurden.',
    'An diesem Tag ist es auch möglich, unreine Ideen und Vorstellungen sowie üble Gewohnheiten aufzulösen und Ungerechtigkeiten, z. B. einen ungerechtfertigten Schuldspruch oder schlechte Nachrede aus der Reinheit des Geistes zu transformieren.',
    'Gleichfalls besteht die Möglichkeit, Personen und Wesen mit unreinen Absichten zeremoniell zurückzuweisen, indem wir den Schutz NOJs erbitten.',
    'An diesem Tage reicht der gute Gedanke, das reine Herz, die reine Sprache, mit denen man um die heilige Verbindung zur göttlichen Kraft und Weisheit bittet und sie im Leben auszudrücken beginnt.',
    'Große Wirkung zeigt am Tage NOJ die mit dem Herzen verbundene Hingabe einer Frau, einer Schamanin oder Priesterin und die damit verbundene Geburt des Neuen, des Erhabenen und Reinen im Symbol der Geburt des Gotteskindes, der Manifestation der kosmischen Liebe.',
    'An diesem Tag erbitten wir die universelle Weisheit, die Verbindung zu den Ebenen des Seins, um Herz und Verstand zu vereinen. Wir können uns an diesem Tag ganz besonders dem Lebenssinn und Ziel unserer Seele nähern. Es ist ein guter Tag, Ideen und Vorstellungen in Form von Projekten und Vorhaben mit einem Geistigen Rat zu verbinden. Auch kann die Mithilfe der Engel- und Meisterkräfte in der Verwirklichung einer Vision erbeten werden.',
    'Am Tage NOJ bitten wir um die gelebte Lebensweisheit und Kraft der Ahnen für unsere Lebenswanderschaft. NOJ ist der Tag des Consejo Invisibile, des unsichtbaren Geistigen Rats, dem Wirken der aufgestiegenen Meisterinnen und Meister der „Weißen Schwestern- und Bruderschaften“.'
  ],
  'Gehirn, die Weisheit des Herzens',
  'Affe, Specht, Coyote, Weißer Adler, Weißer Jaguar'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 08 · Tijaax
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  8, 'de',
  'TIJAAX (Eznab), sprich Tichasch',
  'O TZ‘I, W KEME, S EE, N KAT',
  array[
    'Die Tagesqualität von TIJAAX steht in erster Linie mit der Kraft der Frau verbunden.',
    'Hat die Frau ihre Qualitäten integriert, repräsentiert sie Unmittelbarkeit, Klarheit, Kraft, Intuition, verbunden mit Sanftmut, Güte, Mitgefühl und einer verbindenden und alles nährenden Herzenswärme. Auf feinstofflichen Ebenen drücken sich diese Qualitäten auch im Bild der Schwarzen Göttin unterschiedlicher Kulturen und Religionen aus.',
    'Die polare Kraft von Licht und Dunkel fordert den Menschen heraus, beide Anteile zu verbinden und in Harmonie miteinander zu bringen. TIJAAX ist der Kontrast, das doppelschneidige Schwert, Schärfe und Weichheit, die Kraft der Unterscheidung, die im gegebenen Moment Weichheit in Klarheit und Schärfe verwandelt.',
    'TIJAAX regiert mit dem Schwert der Klarheit und Gerechtigkeit und trennt als Herzenskriegerin die Wahrheit von der Unwahrheit. Sie ist bereit, als Heilerin in die Tiefen des unbewussten und dunklen Menschseins hinab zu steigen, um die menschliche Seele zu befreien für den Weg ins Licht.',
    'In TIJAAX überwinden wir eine reduzierte Lebensschau, wir erweitern die einengende Betrachtungsweise der Beurteilung von Lebenssituationen in schwarz und weiß, gut und böse, Licht und Schatten. In Maya zeigen sich die Schattierungen des Lichts stets ohne Bewertung und Beurteilung, als Teil der göttlichen Schöpfung, als Auswirkungen eines Lichtscheins in der Polarität. Darin liegen viele Möglichkeiten für den Menschen, sich in diesem Spannungsfeld zu erfahren und zu entfalten.',
    'Wir erkennen und befreien in TIAAX den Zusammenhang zwischen dem energetischen Kreislauf, in dem sich Täter und Opfer befinden. Beide stehen sich stets in derselben Thematik, oft über viele Inkarnationen hinweg, und bewegen und begegnen sich im Kreislauf von auf sie einwirkenden, niederen Kräften und Wesen.',
    'Die Kraft des Schwertes ist eine besondere Aufgabe für denjenigen, der damit verbunden ist. Es richtet sich bei Missbrauch gegen den Träger selbst.',
    'TIJAAX ist in diesen unbewussten und unklaren Aspekten des Menschseins somit auch ein Tag der Seelenwunden, der Verletzungen, der Herzensschmerzen, der Schwere und des Leids. In Maya wird TIJAAX aus diesem Grunde mit dem Übergang in die Unterwelt in Verbindung gebracht. Schadensmagier arbeiten an diesem Tag mit dem Schwert, um zu zerstören und Trennung zu schaffen.',
    'Das Schwert, in göttlicher Bewusstheit und Liebe getragen, trennt Unklares, Unreines und Unwahres und bringt den Menschen somit Reinheit, Heilung und Erkenntnis. Die menschliche Seele erhebt sich aus den vernebelten, unbewussten Anteilen des Dunkels und strebt über die sich im Schwerthieb öffnenden schwarzen Nebel in das Licht der Erkenntnis.',
    'TIJAAX ist verbunden mit der Qualität des Obsidians, der brüchig, scharf und schwer zu bearbeiten ist. Wer allerdings den Obsidian mit Geduld und Einfühlungsvermögen geschliffen hat, erkennt seine Möglichkeiten, aus der Sanftheit des Schattenreiches die behütende Stille, die nächtliche, ausstrahlende Wärme, Schutz und Harmonie zu entfalten.',
    'So repräsentiert TIJAAX auch die harmonische, wärmende und behütende sakrale Unterwelt. Im Schein des Mondes gibt TIJAAX im Kraftfeld der Mondgöttin IXCHEL Geborgenheit, Schutz und Mysterium.',
    'Die Stärken der TIJAAX-Geborenen leben optimistische Menschen, sie halten die menschlichen Werte hoch, sie arbeiten gerne im Teamgeist zusammen. Sie lassen sich von Leidenschaften nicht verwirren und sind in Liebe und in Freundschaften verlässlich. Sie übernehmen gerne die Probleme anderer und treten vehement gegen jegliche Gewalt und Ungerechtigkeit auf. Sie sprechen und agieren bei Ungerechtigkeit mit dem Schwert, kämpfen gerne um ihr Recht und um die Würde anderer und ergreifen dadurch schnell Partei. Somit sind sie aber auch anfällig für Fanatismus und Rechthaberei.',
    'TIJAAX-Geborene sind meist auch starke Heilerpersönlichkeiten. Sie kämpfen oft mit all ihrer Kraft um das Wohl eines Menschen und setzen ihre Fähigkeit des Unterscheidens zur Orientierung und Bewusstwerdung anderer Menschen ein (Missionsgedanke). Sie arbeiten im Heilungsbereich gerne mit dem Schwert der Klarheit und trennen Energieverbindungen, die den Menschen auf seinem Weg behindern. Sie sind gute Brückenbauer zwischen Licht und Dunkel, wenn sie selbst gelernt haben, beide Welten und Weisheitsquellen in sich in Harmonie zu bringen.',
    'Die Schwächen der TIJAAX-Geborenen sind Zorn, Aggression, Hang zu Ungerechtigkeit und Härte, zu Fanatismus und Verurteilung. Sie verstehen wenig Spaß und vernachlässigen oft mit großer Kälte Familie und Partner, sind sehr unruhig und rechthaberisch. Ihr Kampf um das Gute wendet sich in dem Moment, wo sie sich selbst zum Hüter der Wahrheit erheben und alle Mittel einsetzen, zu ihrem Recht zu kommen. Sie kämpfen mit dem Schwert um ihre Glaubenseinsichten und sind bereit, für die Wahrheit zu töten und selbst in den Tod zu gehen.',
    'Somit stehen sie in der großen Gefahr, aus niederen Ebenen, aus den eigenen Verstrickungen mit der Macht (die sie selbst jedoch in den Menschen verurteilen) oftmals im Namen Gottes dieses Schwert zu erheben, im Glauben, dies für GOTT tun zu müssen.'
  ],
  array[
    'An diesem Tag erbitten wir die Erlösung von Anhaftungen und Lasten, die innere Befreiung von Gefühlen der Feindschaft, die Lösung von schlechten Freunden, von Bindungen und Abhängigkeiten, von physischen oder geistigen Bindungen. Wir selbst lösen uns von Schuld und Opferbewusstsein, von behindernden Gewohnheiten und einengenden Glaubenslehren und von Fanatismus. Jegliche Befreiung von Bindung und Unfreiheit, von übermäßigem Materialismus, von in uns angelegten Katastrophen und Unfällen sollte im Einklang mit der Aufgabe unserer Seele geschehen. So bitten wir zuallererst um die Öffnung des lichtvollen Seelenweges aus den dunklen Nebeln der Unterwelten.',
    'Über TIJAAX bitten wir um Freiheit, Gesundheit, Unabhängigkeit und Erkenntnis für unseren Lebensweg. Möge alles Bindende, jegliche Blockierung im Erkennen unserer Lebensaufgabe, unserer damit verbundenen Seelenanteile erkannt und durch Vergeben und göttliche Hinwendung aufgelöst werden. An diesem Tag bitten wir unsere Geistführer, Überheblichkeit zu erkennen und in Demut aufzulösen.',
    'TIJAAX ist aber auch ein sehr guter Tag, uns in Ritualen über die Illusionen von Gut und Böse zu erheben und Licht- und Schattenreich in uns in Harmonie zu bringen.',
    'Die Frau wird in TIJAAX an ihre große Aufgabe als Hüterin und Nährende erinnert und als Liebende und Geliebte, als Hüterin ihres Mysteriums und als Tempel der Göttin geehrt.'
  ],
  'Zähne, Zunge, Finger- und Zehennägel',
  'Schwertfisch, Hai'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 09 · Kawoq
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  9, 'de',
  'KAWOQ (Cauac), sprich Kawok',
  'O B‘AATZ, W KIEJ, S AAJ, N KAAN',
  array[
    'KAWOQ hütet die menschliche Gemeinschaft, das Gruppenbewusstsein des Menschen, der im Dienste des Mitmenschen und vor allem im Dienste Gottes seine nährende Aufgabe vollbringt. Er ist der Nahual der im Miteinander wirkenden Dorfgemeinschaft, der für das Gemeinwohl ausgerichteten Staatengemeinschaft, der planetarischen Familie, des wachsenden Lebensbaumes und der Hüter der unterschiedlichen Lebensetappen.',
    'KAWOQ ist die Kraft des Wassers und des Feuers zugleich, im Naturreich des Gewitters und Unwetters, die Kraft der Hexen und Naturkräfte, die auf die Gemeinschaft einwirken. Wie der Regen und das über die atmosphärische Spannung sich entladende Gewitter die Luft reinigt, abkühlt, Klarheit schafft und zugleich das Wachstum nährt, so sollte auch der Mensch gleichsam in Feuer und Wasser Reinigender, Nährender und Gebender sein.',
    'KAWOQ ist der Nahual der mentalen und emotionalen Verbindung im Menschen.',
    'Eine der besonderen Gottheiten in Maya im Zeichen KAWOQ ist CHAK, der Regengott der Maya. Aus ihm fließt alles Nährende und Reinigende, er steht für die Lebenssäfte und für die Fruchtbarkeit, aus ihm entladen sich Verdichtung und Spannung, er bringt damit Harmonie und Klarheit ins Menschsein. CHAK wirkt aus den vier Himmelsrichtungen in unterschiedlichen Qualitäten.',
    'Damit nährt KAWOQ auch als Nahual der Fruchtbarkeit in einer Harmonie von männlichem Feuer und weiblichem Wasser. Wenn der Regen den Samen keimen lässt, bringt ihn das Feuer der Sonne und die nährende Erde zum Wachstum. Die Kraft des Sturms und das Feuer des Blitzes verbunden mit KAWOQ verstärken das menschliche Wirken mit der ungeheuren Kraft und Urgewalt eines Sturms, der Blitzschläge, gefolgt von klarer, gereinigter Atmosphäre und einer genährten Natur.',
    'In unseren Breiten zeigt sich KAWOQ in den auf den Menschen einwirkenden Naturkräften und Wesen, die uns in Sagen und Erzählungen oft kostbare Hinweise auf die Qualitäten der uns umgebenden Natur geben. Die Effizienz eines Menschen, der verbunden mit KAWOQ seinen Lebensweg beschreitet, ist damit entsprechendhoch. In der gleichen Gewalt kann allerdings dieser Nahual auch einen unbewussten, selbstsüchtigen und selbstherrlichen Menschen in sein eigenes Unglück verstricken.',
    'Die Stärken der KAWOQ-Geborenen zeigen sich in ihrer Bereitschaft für die Übernahme von Verantwortung in sozialen Berufen, sie sind Führungspersönlichkeiten im politischen Geschehen wie in der Teamarbeit. Zugleich sind sie besondere Naturmenschen und Liebende der Naturwesen, damit auch sehr gute Naturheiler, Kräuterfrauen und Heiler. Sie sind wach, gemeinschaftsorientiert, mit großem Einfühlungsvermögen, sie haben eine sehr starke Intuition, geistige Schau und Vorahnung.',
    'Als Schamanen und Heiler sind sie durch ihre Grundanlagen stark, erkranken kaum, lassen sich kaum von anderen Menschen und Situationen beeinflussen oder einschüchtern und irreführen. Sie sind aus Wasser und Feuer geboren und damit oft auch sehr sensibel, einfühlsam und großherzig, und in anderen Situationen wiederum eigensinnig, direkt und selbstherrlich.',
    'KAWOQ-Geborene sind durch ihre starke Intuition und Sensibilität in Verbindung mit der Kraft des Feuers hervorragende Medien und Kanäle aus den Zugängen, die ihnen in Wasser und Feuer gegeben sind. Es ist wichtig für sie, Klarheit und Reinheit in ihre Gefühlswelt zu bekommen. Jeder offene Konflikt verstärkt sich aus ihren Grundanlagen und lässt menschliche Gewitter entstehen. Aus Klarheit, Spontaneität, Kraft und Herzenswärme entwickelt sich im KAWOQ-Geborenen eine starke, in sich ruhende und kraftvolle Persönlichkeit.',
    'Die Schwächen der KAWOQ-Geborenen: Sie mischen sich gerne in Angelegenheiten ein, die sie nichts angehen, sie übernehmen Verantwortung, wo es nicht angebracht ist. Durch Überheblichkeit und Selbstüberschätzung – ihre Kraft aus dem verunreinigten Feuer, der Macht – übertünchen sie ihre Schwächen und ihre gefühlsbetonte Grundanlage.',
    'Sie sind emotionell leicht manipulierbar und anfällig für Krankheiten, die sich aus ihrer unterdrückten und unbewussten Kraft manifestieren. In der Familie sind es Mütter und Väter, die das Leben ihrer Kinder leben möchten, sie manipulieren und neidvoll daran leiden, dass andere Menschen ihre eigenen Wege gehen.',
    'Verunreinigte Gedanken und Gefühle bringen sehr viel Unheil und Konflikt in die Gemeinschaft.'
  ],
  array[
    'Am Tage KAWOQ erbitten wir die Heilung und Harmonisierung der menschlichen Gemeinschaft sowie der bestehenden Spannungen und des Unfriedens. Wir bitten um die Auflösung von emotionellen oder aus der Macht anderer bestehenden Widerständen, die eine Gruppe oder Gemeinschaft in ihrer Entwicklung behindern.',
    'Wir beten um die geistige Hilfe und Führung für diejenigen, die tragende Funktionen in der Politik und in Führungspositionen haben. Wir erwecken in KAWOQ unseren sozialen Geist, unsere Selbstliebe, wir richten unsere Aufmerksamkeit auf Zwischenmenschlichkeit und Nächstenliebe, auf gegenseitige Hilfe und Fürsorge, auf das Erkennen und Umsetzen unserer individuellen aber auch gemeinsamen Lebensaufgabe.',
    'In KAWOQ entfalten wir aus Feuer und Wasser eine auf den göttlichen Schöpfergeist ausgerichtete Sexualität, aus dem Feuer der Kundalinikraft und einer gefühlvollen Herzenswärme. Wir bitten KAWOQ um eine Heil bringende Sexualität und die Heilung von Unfruchtbarkeit, Impotenz, Krankheit.',
    'Wir bitten um den Regen und die Fruchtbarkeit für unsere Aussaat, die Unterstützung für alle Projekte, die der menschlichen Gemeinschaft dienen, um vielfältige Ideen für eine vitale und vielseitige Gesellschaft und Gemeinschaft (Gedankenimpulse, Gedankenblitze). Wir erbitten die gesunde Entwicklung der Ungeborenen und bei der Geburt um ihre Integration in die Familie und in die Erdengemeinschaft.',
    'Zeremonien an diesem Tag sind besonders für die Transformation von persönlicher Macht und emotionellen Ausbrüchen, die eine menschliche Gemeinschaft, eine Partnerschaft belasten. Über das Wasser reinigen wir negative Gefühle wie Neid, Hass, Missgunst, Eifersucht, Krankheit, Schuldgefühle, ungerechtfertigte Anklagen, schlechte Nachrede, Tratsch, mentale und emotionelle (magische) Verwünschungen, Stress, Mobbing am Arbeitsplatz u.a. Wir geben die Bereitschaft, in Ausgewogenheit beider Elemente an einer harmonischen, sich entwickelnden Menschheit mitzuarbeiten.'
  ],
  'Herz, Verstand, Blut, Nervensystem',
  'Schildkröte'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 10 · Ajpuu
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  10, 'de',
  'AJPUU (Ahau), sprich Achpuu',
  'O EE, W QANIL, S I’X, N KEME',
  array[
    'AJPUU ist die Sonnenkraft, das solare Feuer als Symbol für den göttlichen Vater GRAN AJAU, der das Lebensprinzip verkörpert und gibt. AJPUU steht für materielle und spirituelle Sicherheit, für die in jedem Moment des Lebens präsente Kraft des göttlichen Schöpfers, der uns in unserer Entwicklung unterstützt und anregt, zu seinem Ebenbilde zu werden.',
    'In AJPUU begeben wir uns auf die Reise Leben, mit der Absicht, das Göttliche in uns erfahrbar werden zu lassen. Wir tragen den Stab der Ermächtigung und die Lanze als Schutz vor allen behindernden Mächten, die uns von unserem Ziel abbringen möchten.',
    'AJPUU ist der Jäger, der zielgerichtet seine Absicht verfolgt und alles, was sich ihm in den Weg stellt, besiegt und überwindet. AJPUU ist der Märchenheld, der weiß was er will und die Kraft des Herzens einsetzt, um noch schneller ans Ziel zu kommen.',
    'HUN AJPUU ist eine der legendären Maya-Persönlichkeiten, ebenso wie IXBALAMQUE. Sie sind geboren aus Licht und Schatten, aus Ober- und Unterwelt, aus dem Sonnengott und der Mondgöttin. So konnten sie als Zwillinge mit List, Tapferkeit, Weisheit und Zielgerichtetheit die Proben und Prüfungen der Herren der Maya-Unterwelt bestehen und dadurch die Höhen des göttlichen Lichts erreichen.',
    'AJPUU ist die Kraft des Herzenskriegers, der Hüter des menschlichen, auf GOTT abgestimmten Willens und der auf das Dienen gerichteten Absicht. So wie die Sonne am Morgen aufgeht und dem Tag Licht und Wärme spendet, so spendet der Nahual AJPUU Leben und Wärme für all jene, die ein klares Ja zum planetarischen Leben und zur Verbindung mit GOTT sagen.',
    'AJPUU weitet und öffnet unser Bewusstsein und befreit uns von den Beschwerden eines unbewusst gelebten Lebens. Wie er die Dunkelheit der Nacht auflöst und im Morgengrauen den erwachenden Tag ankündigt, so löst AJPUU unsere unbewussten Ängste und Abhängigkeiten im erwachenden Bewusstsein auf. Das Feuer der Sonne lässt uns die Vielfalt des Leben erkennen, wir werden mit Wärme und Licht versorgt und gehen mit Bestimmtheit unser Lebenswerk an, das erfüllt seinmöchte.',
    'AJPUU ist der Nahual der männlichen Kraft, der physischen und geistigen Fruchtbarkeit, der Regeneration, des Kriegers, der mit Weisheit und Erkenntnis den Lebensweg beschreitet. Im Bilde des Regenbogenkriegers steht AJPUU für die Verbindung von Mut, Tapferkeit und der Weisheit des Herzens. AJPUU steht in Verbindung mit dem Krieger Orion, der im Einfluss der Plejadenkräfte seine Härte und Zerstörungskraft verliert. Aus diesem Grunde repräsentiert AJPUU auch den kosmischen Menschen, er repräsentiert im Christlichen den göttlichen Boten Jesus, Ausdruck des Göttlichen, verbunden mit dem kosmischen Feuer und der Kraft der Hingabe an GOTTES Wille.',
    'Die Stärken der AJPUU-Geborenen leben Menschen, die sicher sind, intelligent, klar, wach und liebenswürdig. Sie strahlen Wärme und Lichtvolles aus und haben die Kapazität, aus ihrer Gottverbundenheit die kosmische Weisheit und die feinstofflichen Ebenen in Licht und Schatten zu erfassen und deren Kräfte hand zu haben. Sie besitzen ein sonniges Wesen, sind gute Freunde und verlässliche Partner.',
    'Durch ihre Qualitäten besitzen sie inneren und äußeren Reichtum, sie sind angelegt für Freude, Glück und Fülle. Aus dieser Quelle schöpfend sind sie wertvoll in Führungspositionen, aber auch als Mitarbeiter sehr verantwortungsbewusst und verlässlich. Sie finden durch ihre intuitiven Einsichten in die Anderswelten gute Problemlösungen und überzeugen mit ihrer Sicherheit. In ihrer Grundanlage tragen sie die Zugänge zum Reiche der Verstorbenen und sind hervorragende Heiler für Hilfe und Heilung suchende Seelen.',
    'Die Schwächen der AJPUU-Geborenen zeigen sich in ihrem Hang zu Macht, zu Überheblichkeit, zu Hochmut und Selbstherrlichkeit. Sie sind sehr wählerisch im Umgang mit Freunden und haben stets die Tendenz, sich über andere zu erheben, sie zu beeinflussen, zu korrigieren und zu kontrollieren. Sie bestimmen, wo immer es ihnen möglich ist, und halten ihre Wahrheit für die einzig richtige. Sie weisen aus ihrem Machtanspruch jegliche Form von Kritik zurück und bestehen darauf, dass man seine Meinung der ihren unterordnet. Somit verstricken sie sich in Machtmissbrauch, ergötzen sich an der Unterdrückung anderer und missbrauchen ihre Kraft, um andere auszunützen.'
  ],
  array[
    'An diesem Tag wirkt besonders die Weisheit des Sonnengottes der Indianervölker.',
    'Aus AJPUU ergibt sich der Zyklus der vier Jahreszeiten, ein stetes Spiel des Wandels in Geburt, Tod und Auferstehung.',
    'Es ist ein besonders guter Tag, um unser Leben zu analysieren, neu zu überdenken, eine Veränderung einzuleiten, sich neu zu zentrieren auf die gestellte Lebensaufgabe.',
    'AJPUU ist ein kostbarer Tag für Frau und Mann, das Männliche zu heiligen und zu ehren. Aus diesem Grunde kann an diesem Tag auch die Bitte einer Frau ausgesprochen werden, in die Heiligkeit des männlichen Kraftfeldes aufgenommen zu werden. In Ritualen könnten wir das Männliche um Vergebung bitten und so die Heilung der Ehe oder Partnerschaft erbitten.',
    'Es ist der Tag der emotionellen, intellektuellen und mentalen Sicherheit und des klaren Erkennens unseres Lebensweges und unserer Lebensaufgabe.',
    'Wir sagen Dank an den Großvater Sonne für seine Segnungen, für das Erwecken unseres Bewusstseins, das gleich der aufgehenden Sonne unser Sein erhellt undzum Lebensende sich in die anderen Reiche zurückzieht.',
    'Wir sagen zum Tag AJPUU Dank für die Segnungen des sich aus unserer Seelenanlage öffnenden Alltags, für unsere täglichen Erfahrungen und für unsere Willenskraft. Aus AJPUU wandelt sich Macht in geistige Ermächtigung, persönlicher Wille zu Gottes Willen.',
    'Am Tage AJPUU können wir unseren Ängsten, Zweifeln und all den behindernden Kräften auf unserer Lebenswanderschaft eine Absage erteilen. Diese haben als Wesen und Kräfte die Aufgabe, uns unser wahres Sein bewusst zu machen, uns selbst zu erkennen und unser Menschsein zu festigen.',
    'Zeremonien am Tage AJPUU könnten auch zu Sonnenaufgang abgehalten werden.',
    'Ein klares JA zu unserem Leben, die aus dem Herzen kommende Absicht, sich selbst näher kommen zu wollen und die Bereitschaft, sich dafür einzusetzen sind Voraussetzung, wenn wir AJPUU in unser Leben einladen möchten.'
  ],
  'Brust, Augen, Herz, Blut',
  'Löwe Nahual: der Löwe, im Ausdruck der göttlichen Menschen'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 11 · Imox
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  11, 'de',
  'IMOX (Imix), sprich Imosch',
  'O AAJ, W TOOJ, S TZ’IKIN, N KIEJ',
  array[
    'IMOX ist die Kraft des Wassers, die gebende mütterliche Brust, die Quelle und der Fluss des Lebens, das Wasser des Lebens, Hormone und Verdauungssäfte und Essenzen der Fruchtbarkeit. Aus IMOX formen sich Visionen, Wünsche, Träume und das Mysterium der sich manifestierenden Gefühle und niederen Emotionen im menschlichen Leben.',
    'Das Element Wasser steht im menschlichen Sein für die Existenz der Gefühlswelten und Emotionen, für die emotionellen Verhaftungen und Bindungen, für die Programme und Erfahrungen des Emotionalkörpers. Wir reagieren aus der Qualität emotioneller Muster, Vorstellungen und Glaubensimages, die nach der Kosmovision Maya feinstofflich ausgeprägte, über uns wirkende Wesen sind. Je nach Qualität und Zuordnung in Licht- oder Schattenreich leiten sie den Menschen im heilvoll Positiven oder auch im trennend Negativen.',
    'Somit steht IMOX für die aus dem Emotionalkörper wirkenden „Illusionskräfte“. Wir können diese von Menschen selbst geschaffenen Wesen und Welten wieder auflösen, heilen und ersetzen durch heilvolle und lichtvolle aus höheren Ebenen wirkenden Kräften. IMOX ist uns Mittler zu diesen aus den inneren Erfahrungsschichten, aus dem Emotionalkörper wirkenden Kräften und Wesen.',
    'Die Kostbarkeit von Gefühlselementalen und höheren Wesen zeigt sich in der Reinheit unserer inneren Wasserwelt, in Mitgefühl, Barmherzigkeit und Liebe. Wenn Menschen Gefühle verdrängen, wenn sie vorwiegend aus ihren mentalen Kräften, aus Verstand und Intellekt agieren, versteinert das Herz und die damit verbundenen Qualitäten der Mitmenschlichkeit verkümmern. Verdrängte und unreine Emotionen lenken die Energien oft in Süchte, Abhängigkeiten, Abartigkeiten, in Aggressionen, in Macht und Kontrollmechanismen.',
    'Somit wird ein verkümmertes Gefühlsleben aus IMOX auch in Verbindung gebracht mit der Verrücktheit, dem Wahnsinn und Irrsinn, mit dem Zerstörerischen, das den Menschen beherrscht. Im Fluss des Lebens zu sein bedeutet, nicht an Altem anzuhaften, loszulassen, sich dem kosmischen Treiben anzuvertrauen, wissend, dass der Lebensfluss seine Absicht und sein Ziel hat. IMOX ist die Kraft, die uns durch die Turbulenzen des Lebens führt, hält und leitet und der wir uns vertrauensvoll hingeben dürfen.',
    'IMOX nährt unsere weibliche Seite, die Intuition, das innere Wissen, dass all unsere Erfahrungen dem Wohle unserer seelischen Entwicklung dienen. IMOX ist uns Mittler zu den Wesenheiten der Gewässer, zu den Wesen der Quellen, Bäche, Flüsse, Seen und Meere.',
    'So ist IMOX auch verbunden mit der Göttin des Mondes, mit Chak, der Maya- Regengottheit, und mit Maria, der christlichen Mutter der Heilwässer. In Verbindung mit den Gewässern, die sich aus dem heiligen Regen nähren, gedeiht die Reinheit des Menschen wie das Wachstum der Mutter Natur. Im Zeichen IMOX rufen wir den Regen, erbitten wir die Verbindung zum heiligen Element Wasser. Im Zeichen IMOX segnen wir das Wasser, das sich dadurch zur Heilungsessenz wandelt.',
    'Wasser wird zum physischen und geistigen Lebenssaft, der aus dem Herzen Gottes alles versorgt, im Symbol des Blutes Christi. Die Heilquellen sind eine lebendig gewordene Verbindung von Lichtwesen und Wasserwesen. Beide wirken auf den Menschen durchlichtend, heilend und nährend ein.',
    'Die Stärken der IMOX-Geborenen: Sie lassen ihre Gefühle aus ihrem Herzen wirken und ihre Seele in Mitgefühl und Mitmenschlichkeit sprechen. Sie sind sehr hilfsbereit, ordnungsliebend, aber auch gute Geschäftsleute mit Durchsetzungsvermögen, sehr anregend und motivierend, visionär und telepathisch veranlagt. Sie nehmen die kosmischen Botschaften mit Leichtigkeit auf. Sie arbeiten mit Vorliebe im Okkulten und Geheimnisvollen, sind sehr stark erdverbunden und aus diesem Grunde auch mit beiden Füssen auf dem Boden. Dadurch fällt es ihnen auch leicht, den Alltag mit all seinen Problemen zu bewältigen.',
    'Sie haben eine tiefe Verbindung zu Mutter Natur, zu allem Natürlichen, zu den Reichen der Natur, zur Mondgöttin, zum Element Wasser, aber auch zu den Mineralien, Pflanzen und Tieren. Sie sind meist starke spirituelle Heiler.',
    'Die Schwächen der IMOX-Geborenen treten zutage, wenn sie sich zu sehr von ihren Gefühlen leiten lassen. Der unbewusste Mensch verstrickt sich dadurch in ein inneres Chaos, in Verrücktheit, agiert chaotisch, wird misstrauisch, rechthaberisch, unsicher und unentschlossen.',
    'IMOX-Geborene lösen durch ihr labiles Verhalten gerne Verwirrung aus. Ihre Gefühlswelten bewegen sich in einem intensiven Auf und Ab und verunsichern damit die Mitmenschen. Aus einem unreinen Emotionalkörper erwachsen unreine und trennende Gedanken, Gefühle und Handlungen. Über das Wasser, über Emotionen und Gefühle sind diese Menschen sehr leicht beeinflussbar.'
  ],
  array[
    'Am Tag IMOX erbitten wir die Botschaften von den Wesen der Gewässer. Wir regen die Wachsamkeit unseres Geistes an, um in die heilige Verbindung mit den Wesenheiten des Wassers und der Naturreiche treten zu können. Wir erbitten Botschaften über unsere Träume.',
    'An diesem Tag können wir das Herz der Mutter Erde darum bitten, uns wieder Kraft und Verbindung, Festigkeit und Beständigkeit für unsere zu labilen Gefühle zu geben. Auf diese Weise können Menschen wieder in einen Status der inneren Harmonie und Verbindung gelangen. Mögen wir geistige Nahrung in Form von kreativer Inspiration erhalten und diese zum Wohle unseres Planeten Erde einsetzen.',
    'Wir bitten IMOX um die Reinigung unserer Emotionen, um die Auflösung von Verhaltensmustern und Prägungen, die uns auch aus früheren Existenzen behindern.',
    'Wir heilen am Tage IMOX die emotionelle Unruhe, das innere Ungleichgewicht, die Verrücktheiten und Streitigkeiten in der Gemeinschaft und die daraus entstehenden mentalen Probleme und Fehlvorstellungen.',
    'Wir bitten um die Reinigung der Körpersäfte, um die Ausgewogenheit im Hormonhaushalt, für den inneren Frieden und für die innere Ausgewogenheit.',
    'In IMOX segnen wir das Wasser als Heilungsessenz. Gesegnetes Wasser kann am Arbeitsplatz, im Wohnbereich und in Schlafzimmern (besonders für Kinder wichtig) niedere, auf uns einwirkende Kräfte einbinden und uns dadurch Schutz geben.'
  ],
  'Blut, Ganglien, Sexualessenzen, Hormone',
  'Krokodil, Leguan, Hai, Echsenwesen'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 12 · Iq'
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  12, 'de',
  'IQ (Ik), sprich IK',
  'O I’X, W TZ’I, S AJMAC, N QANIL',
  array[
    'IQ ist die Luft, der reinigende Wind, die Kraft des Donners, der Klang und die Bewegungskraft der Musik, die Kraft der heiligen Mathematik. Er zeigt sich in der Reinheit und Klarheit des Kristalls, in Geist, Intellekt, in der geistigen Regsamkeit und Bewusstheit, in der menschlichen Mentalkraft. Auffassungsgabe, Erkenntnisfähigkeit und Vielseitigkeit des Menschen sind Ausdruck dieser kosmischen Kraft, die sich im blauen Strahl auch in den geistigen Hierarchien als Kräfte und Wesen mit der Klarheit des Schwertes zeigt. Über den in uns fließenden Atem bewegen sich besonders auch die Energien in unserem Körper.',
    'Der Nahual IQ drückt sich auf der planetarischen Ebene als heilige Kraft der Lüfte aus. Die Maya-Pocomames bezeichnen ihn auch als SANTA MAJOM, die Urgewalt des Windes, des Sturms, der den gesamten Planeten in seinem Energiefeld bewegt, reinigt und das Wettergeschehen stark beeinflusst. Aus IQ zentrieren sich an sensiblen und verunreinigten Orten die Kräfte und Stürme und entladen sich in Hurrikans und Zyklonen.',
    'Im Kraftfeld des heiligen Windes erhalten wir die Reinigung unserer Gedanken- und Mentalwelt und ordnen und harmonisieren unsere Absichten und Vorstellungen.',
    'Nachdem das Element Luft unserem Mentalkörper zugeordnet ist, verbinden wir feinstofflich unsere Gedankenwelt, unsere Visionen und unsere Lebensabsichten mit IQ. Sind unsere Gedanken verbunden mit niedrigen Absichten und Emotionen, manifestieren wir aus der Ebene des Mentalkörpers Kräfte, die uns auf unserem Lebensweg behindern, uns und anderen sogar schaden. Unreinen Gedanken folgen unreine Emotionen und Trennung schaffende Handlungen, die in uns wiederum Seelenverunreinigung, Anhaftungen und Abhängigkeiten schaffen.',
    'Auf dem Lebensweg trachtet der geistig suchende Mensch danach, den reinen Geist in einen reinen Körper einzubetten und damit dem Göttlichen Geist Ausdruck zu verleihen. Aus diesem reinen Geist schöpft der Mensch kosmische Erkenntnis und Weisheit. Ein reiner Geist ist beweglich und anpassungsfähig, er durchdringt die Nebelschichten der Unklarheit und Unreinheit. Diese Qualität ist im Wandel der Zeit für uns Menschen besonders wichtig.',
    'Gleich der Klarheit eines Kristalls sollte auch unser Geist sich erheben und in die göttliche Einheit streben. IQ ist die Kraft, die uns in die Ebenen des Geistes erhebt, die uns feinstofflich von niedrigen Gedanken reinigt und aus Verirrungen und Unklarheiten immer wieder Klarheit und Einsicht bringt. Aus dieser Klarheit, verbunden mit der Weisheit des Herzens, formt sich ein beweglicher, umsichtiger und verantwortungsbewusster Mensch.',
    'Ausdruck dieser Klarheit ist in Aspekten der Verstand, der Intellekt, der in Verbindung mit IQ auch die Schöpferkraft und den Erfindungsgeist des Wissenschaftlers darstellt. Wissen in Verbindung mit IQ steht im Dienste des Mitmenschen, weil IQ, der Nahual der Kühle und Klarheit des Denkens, stets mit dem göttlichen Geist in Verbindung steht und aus den göttlichen Quellen bewegt wird. Dies wäre der Schlüssel für ein heilvolles Wirken unserer Erkenntnisse und Erfindungen zum Wohle des Menschen, verbunden mit dem Herzen.',
    'Das Licht der Weisheit gibt uns Klarheit in der Wahrnehmung.',
    'Gleicherweise zeigt sich IQ in seiner unreinen Form für all jene Menschen, die den Verstand und ihr Streben in Machtstrukturen und Kontrolle einsetzen und dadurch Trennung in sich und in der Menschheit schaffen.',
    'Die Stärken der IQ-Geborenen sind ihre sehr klaren Ideen und Vorstellungen. Sie können neue Einsichten, Erkenntnisse, Gegebenheiten, Vorstellungen, Haltungen und Einstellungen durch die Beweglichkeit ihres Geistes rasch erfassen und umsetzen und damit auch anderen Menschen neue Erkenntnisse vermitteln und sie von ihrer Wahrheit überzeugen.',
    'IQ-Geborene setzen Ideen leicht in die Tat um und sind durch ihren Durchblick auch gute Problemanalytiker und Problemlöser. Sie haben die Fähigkeit, ihre Aufmerksamkeit zu zentrieren, Unklarheiten wahrzunehmen und die Verirrungen gefühlsbetonter Menschen zu erkennen. Als mentale Heiler helfen sie, Gefühlsausbrüche und übermäßige Emotionen unter Kontrolle zu bringen und sie in Klarheit zu fassen.',
    'Durch Erkenntnis und Bewusstwerdung bewegen sie die Vorstellungskraft und damit den Schöpfergeist Gottes. IQ-Geborene sind sehr kraftvoll, erfüllt mit der Kraft des geistigen Windes, dem Atem Gottes. Sie bewegen sich in Leichtigkeit durch die Erschwernisse des Lebens, weil sie vieles aus einem höheren Blickwinkel betrachten können.',
    'Die Schwächen der IQ-Geborenen sind Vergesslichkeit, Oberflächlichkeit und Zerstreutheit. Sie sind unverlässlich und leichtsinnig und haben einen starken Hang zum Hochmut. Große Gefahren der IQ-Geborenen sind die Überheblichkeit, das starke Ego und die Verhaftung mit einem eingeschränkten Verstand. Menschen mit kaltem mentalen Ausdruck sind isoliert von der Herzenswärme und den göttlichen Tugenden. Diese Eigenschaften werden von ihnen oft sogar als Schwächen definiert.',
    'Die Schärfe des Intellekts und des Verstandes werden von IQ-Geborenen in einer selbst angeeigneten, aus dem Hochmut stammenden Vormachtstellung und Macht ausgedrückt. Aufgrund ihrer Mentalstärke können IQ-Geborene bereits durch negative Gedanken und Absichten ihren Mitmenschen schaden.',
    'Gleicherweise schaden sich diese Menschen auch selbst, indem sie ihre geistige Kraft gegen sich selbst richten und unter Ablehnung, Selbstsucht und fehlendem Gemeinschaftsgeist leiden.'
  ],
  array[
    'Am Tage IQ erbitten wir die Klärung und Zentrierung unseres Geistes, die Integration und Verbindung unseres Verstandes und Intellekts mit dem Herzen. Wir bitten den Nahual der Lüfte um Erkenntnis und Einsicht bei der Manifestation unserer Absichten, die wir in die geistige Welt richten.',
    'Wir erbitten die Kraft des Windes, um uns von Unreinheiten zu befreien und unsere Seele zu durchlichten. So schiebt IQ die Vernebelungen unseres Bewusstseins beiseite, gibt uns Klarheit und Einsicht in unsere Seelenaufgabe. Wir bitten den Bruder Wind um Reinigung und Klärung unserer feinenergetischen Körper, die sich in unserem Umfeld immer wieder verunreinigen. Mögen sich die dunklen Geister und negativen Energien, Krankheit, Leid und Not mit der Kraft IQ aus unserem Sein (Körper, Haus, Familie) lösen. Das Räuchern, aber auch die Belüftung unserer Wohnstätten kann mit IQ zu einem besonderen Reinigungsakt werden. Wir erbitten aus IQ die Reinheit der Luft, die wir atmen.',
    'Als Träger des Klanges bewegt und trägt IQ die Schwingungen der Musik. Sie bewegt, wandelt, heilt und reinigt unsere feinstofflichen Körper und unser Umfeld.',
    'Über die Schwingung des Klanges bewegen sich auch geistige Kräfte und Wesen in unser Sein und unser Umfeld.'
  ],
  'Lunge, Atmungswege, Atem',
  'Vogelwesen, Falke, Kolibri, Taube, Adler, Insekten und Mosquitos'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 13 · Ak'ab'al
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  13, 'de',
  'AK’AB’AL (Akbal), sprich Akabál',
  'O TZ‘IKIN, W B’AATZ, S NOJ, N TOOJ',
  array[
    'A’KAB‘AL ist der BRÜCKEN-NAHUAL des Übergangs von einem zu einem anderen Zustand. In der Natur sind es Dämmerung und Morgengrauen, im Menschsein die Übergänge von Kindheit zu Jugend und Erwachsenendasein. Im Feinstofflichen repräsentiert A’KAB’AL Übergänge in Krankheit – Heilung, Tod – Auferstehung, Verhaftung im Schattenreich – Befreiung ins Licht, die Heilung, Befreiung und Neugeburt im Wandel der Seele, die vor die Persönlichkeit tritt und den Menschen leitet, das Licht, das die Dunkelheit der Materie auf unserem Planeten zu erhellen beginnt.',
    'A’KAB’AL ist der Nahual des Übergangs vom Licht zum Dunkel und vom Dunkel zum Licht. Er führt uns in das Geheimnis des Neuen, des erwachenden Tages und der eintretenden Nacht. A’KAB’AL lässt uns Menschen diesen Übergang erkennen, er gibt uns den Zugang zum Geheimnis des Dunkels, aus dem wir Mystik, Stille, Geborgenheit und Ruhe schöpfen.',
    'Über den Hüter der Schwelle A’KAB’AL gelangen wir auch für die Heilung und Erlösung in tiefere Ebenen der Unterwelt. Durch die Integration unserer Schattenwelten, durch Heilung und Rückholung unserer abgetrennten Seelenanteile bringen wir Licht und Schatten in Ausgleich. Damit schaffen wir innere und äußere Harmonie und den ersehnten inneren Frieden.',
    'A’KAB’AL kann nur von Menschen erkannt und integriert werden, die das Geheimnis der sakralen Dunkelheit bereit sind anzunehmen. Gleich einer Brücke führt A’KAB’AL vom Licht in die Ebenen des Schattenreiches von KEME. Die dort wirkenden Kräfte und ruhenden Seelenanteile öffnen ihre Kraft und Lebensweisheit denen, die sie respektieren und lieben. In A’KAB’AL ehren und wertschätzen wir auch die Reiche der Ahnen und Verstorbenen. Über die Brücke A’KAB’AL können durch unsere Hilfe die Seelen derer, die uns vorangegangen sind, in das Licht wandern und erlöst werden.',
    'Beim erwachenden Tag weckt uns A’KAB’AL, um uns der Aktivität des Alltags zu übergeben. Wir hoffen und wünschen uns täglich einen friedvollen und glücklichen Tag. Somit steht A’KAB’AL auch in Verbindung mit der Kraft der Hoffnung, aus der wir den Neubeginn schöpfen. Er steht auch als Zeichen des Alterns, des Lebensabends und zugleich für den Neubeginn des Lebens auf anderen Seinsebenen.',
    'Das Gebetshaus der Maya sind u.a. auch unterirdische Räume und Höhlen. Sie zeigen sehr bildhaft die Ebenen der Mayaunterwelten XIBALBA, durch die man reinen Herzens und mit heilvollen Absichten Zugang und Führung zu den eigenen unreinen Seelenanteilen und denen von Verstorbenen findet. A’KAB’AL öffnet uns die Tore in diese Erfahrungsbereiche, die allein für Heilung und Segnung betreten werden sollten.',
    'Die vertrauensvolle Kraft und Wesenheit A’KAB’AL gibt uns über den Schwarzen Jaguar Schutz und Begleitung in den Übergängen der Tiefen der Schattenreiche.',
    'In A’KAB’AL verbinden wir uns auch mit den Kraftfeldern der vier nächtlichen Energien: Dämmerung, Nacht, Mitternacht, Morgengrauen. Jedes dieser Kraftfelder hat in uns Menschen seine eigene Bedeutung und Wirksamkeit, steht aber auch verbunden mit dem Wirken unterschiedlicher Energiefelder.',
    'Die vier Lichtboten der Maya baten an einem Tag A’KAB’AL 8 den göttlichen Schöpfer um das Sonnenlicht für den Planeten und die Menschheit.',
    'Die Stärken der A‘KAB´AL-Geborenen: Sie sind starke Brückenbauer zwischen Licht- und Schattenreich. Sie haben die besondere Qualität, das Licht in ihren Mitmenschen zu wecken und zu stärken. Sie erhalten sich in der eigenen Bewegung auf der Brücke eine immerwährende innere Jugend. Im Allgemeinen wirken sie aus einem Mysterium und sind in vielem eher zurückhaltend. Sie lieben es, für sich zu sein und aus der Stille heraus zu wirken.',
    'Im Alltag sind sie aus ihren dunklen Anteilen aber auch Realisten, die bereit sind, Verantwortung zu übernehmen. Sie haben in ihren Aktivitäten Glück und werden von ihrer Umgebung auch sehr als Heiler und Brückenbauer geschätzt. Widersachern gegenüber agieren sie sehr heftig und stark, indem sie ihnen klare Grenzen aufzeigen.',
    'A’KAB’AL-Geborene sind sehr medial veranlagt, aus dieser Einsicht und dem Zugang in andere Welten können sie Hilfe und Heilung geben. Sie haben gleich ihrem Nahual die Fähigkeit, Dimensionen und Räume zu wechseln, sich neuen Seinszuständen anzupassen. Sie sind sehr starke Mystiker und Magier, starke Heiler und Schamanen, die aus den Quellen von Licht und Dunkel gleichermaßen heilen und Menschen von ihren Anhaftungen befreien können.',
    'Die Schwächen der A’KAB’AL-Geborenen zeigen sich in ihrer oftmals sehr großen Leidensbereitschaft. Wenn sie ihre eigene Dunkelheit nicht annehmen können, leiden sie in hohem Maße darunter. Sie lehnen sich innerlich und oft auch äußerlich als anders ab, empfinden sich als unrein und dunkel, sie leiden unter Phänomenen, die sie sich nicht erklären können und verstricken sich dadurch in starke Ängste und Abhängigkeit. Unheilvolle Gedanken, Gefühle und Konflikte ziehen A’KAB’AL Geborene unmittelbar in die Tiefen ihrer eigenen Unterwelten.',
    'Ihre Aufgabe ist es, sich stets mit dem Licht, der Liebe und dem Mitgefühl verbunden zu wissen. Aus ihrer Grundanlage stehen sie immer in einem eher diffusen Licht, hier liegt ihre Herausforderung, hier liegt auch die Erkenntnis der eigenen Lebenszusammenhänge, der Ansatz zu Selbsterkenntnis und Heilung.'
  ],
  array[
    'Am Tag A’KAB’AL erbitten wir die Öffnung und Klärung unseres Lebensweges, unserer Lebensaufgabe, wir bitten um die Erlösung von wirksamen Seelenanteilen im Schattenreich, um Durchlichtung unseres Unbewussten. Wir erbitten Stabilität auf unserem Weg, in unserer Existenz, in unserer Arbeit durch die Ausgewogenheit von Licht und Schatten.',
    'Im aufgehenden Licht erbitten wir die Führung und Heilung aus Liebe und Erkenntnis, wir bitten um Gesundheit und um die Heilung unserer Seele.',
    'A’KAB‘AL ist der Tag, an dem wir um eine neue Sichtweise, um das Erkennen der größeren und tieferen Zusammenhänge von Unfällen und Krankheiten beten können.',
    'Wir bitten zum Sonnenaufgang um Glück und Frieden für unsere Familien, um die Heilung der Familie und Gemeinschaft.',
    'Zu Sonnenuntergang, in der hereinbrechenden Nacht, bitten wir um die Auflösung von negativen Gefühlen und Gedanken, um die Auflösung einer Verwünschung, um Schutz vor schwarzmagischen Handlungen, um die Heilung der Verstorbenen von ihren unreinen Seelenanteilen, um den Frieden und den Schutz der einbrechenden Nacht. Wir bitten um den Schutz und die Begleitung KEME’s auf unserer Wanderschaft durch die Nacht, für unseren Schlaf.',
    'In A’KAB’AL werden die Hände des Heilers gesegnet und für den Strom der Heilenergie geöffnet.'
  ],
  'Magen',
  'Fledermaus, Eule, Geier, Rabe, Papagei (Guacamaya)'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 14 · Kat
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  14, 'de',
  'KAT (Kan), sprich Kat',
  'O AJMAC, W EE, S TIJAAX, N TZ’I',
  array[
    'KAT ist das Netzwerk, das Gitternetz der Erde, die Kraft der Zusammenführung, der heilvollen Zusammenarbeit, die Qualität des aus dem Herzen wirkenden Menschenfischers, das Symbol der Kugel, die Kraft der verbindenden Gemeinsamkeit, das Teamwork und Network, die Möglichkeiten der Wissensvernetzung (Internet), die Kraft des gemeinsamen Wachstums, aber auch die Kraft der negativen Verstrickung und Vernetzung, das Unheil der Familienverstrickungen, emotionelle oder mentale Bindungen und Abhängigkeiten, unheilvolle, magische Bindungen, Flüche, Verwünschungen und Schwüre, Abhängigkeit und Fehlleitung durch feinstoffliche außerirdischer Welten.',
    'Der Nahual KAT könnte auch bezeichnet werden als der Hüter und Begleiter der menschlichen Gemeinschaft. Er verbindet aus seiner magnetisch wirkenden Herzenskraft und ist somit ein Symbol für das Zusammenhalten der Materie aus dem Magnetfeld der Erde, das uns in einer gemeinsamen Aufgabe als Menschen verbunden hält.',
    'Seine Eigenschaft als Bindeglied wird auf vielen physischen und feinstofflichen Ebenen spürbar. Er verbindet Kulturen, Völker, Rassen, Staatenverbände in gleicher Weise wie er als Hüter eines Teamworks oder einer Interessensfamilie wirksam ist. Aus ihm wirkt der Magnetismus zwischen Mann und Frau, in Freundschaften und Beziehungen jeglicher Art.',
    'Maya hat für alle zwischenmenschlichen Phänomene ein Ebenbild und eine Meisterkraft auf feinstofflicher Ebene. Als Archetyp der menschlichen Gemeinschaft ist KAT somit auch Hüter der Vielfalt der miteinander verbundenen Arten im Pflanzen- und Tierreich. Er spendet durch seine Kraft Leben und lässt Menschen, die sich dieser Verbindungen zu Natur und Kosmos bewusst sind, in der Gruppenenergie wachsen.',
    'KAT ist vergleichbar mit dem Fischernetz, das uns an Jesus, den Menschenfischer, erinnert. Menschen kommen als Interessensgemeinschaft zusammen und suchen ihresgleichen auf ihrem Weg. Im Fischezeitalter war auch die Missionierung die adäquate Form der Verbreitung spiritueller Weisheit. Im Wassermannzeitalter erkennen wir, dass die einengende Form des Überredens und des massiven Überzeugt-Werdens in vielen Lebensbereichen ihre Gültigkeit verloren hat.',
    'KAT zeigt sich somit im Kleide der sich in Freiheit und aus der Wahrheit formierenden und entfaltenden Gemeinschaft.',
    'In seiner dunklen Seite repräsentiert KAT die Formen der Abhängigkeiten, das Gefangensein in Emotions- und Gedankenmustern, die sexuelle und gefühlsmäßige Abhängigkeit von Partnern, die Bindungen zu Verstorbenen, Abartigkeiten in Gemeinschaft und Familie, die zerstörend auf die Gemeinschaft einwirken.',
    'KAT steht auch für die Fallen und Erprobungen auf dem Lebensweg, aus der physischen und spirituellen Abhängigkeit, im Symbol des Gefangenseins im Netz der Spinne.',
    'Die Stärken der KAT-Geborenen eignen sich besonders dafür, im Team zu arbeiten.',
    'Sie sind oft sehr feinfühlend und ordnungsliebend. Es geht ein besonderer Magnetismus für das Miteinander von ihnen aus. Sie schaffen im Beisammensein das Gefühl von Geborgenheit, verbinden Familienzwistigkeiten und lenken durch ihre Präsenz heilvoll das Gruppenbewusstsein.',
    'In diesem Sinne sind sie besonders auch kostbar für die Manifestation der kosmischen Kraft der alles verbindenden Herzensliebe zwischen den drei Naturreichen und dem Menschenreich, aber auch zwischen Seelengemeinschaften anderer Seinsebenen.',
    'Sie sind hervorragende Erbauer von Netzwerken und kostbare Mitglieder in spirituellen Gemeinschaften und in der Berufswelt. Sie haben stets ein offenes Ohr für die Probleme anderer und fühlen sich im Dienste Heil und Frieden bringender Kräfte. Man findet sie gerne in Heilberufen und in der Sozialarbeit tätig. Auch die Familienanalysen und Aufstellungen erhalten ihre Wirksamkeit im Kraftfeld von KAT.',
    'Aus unreinen und verstrickten Seelenanteilen werden unheilvoll wirkende Kräfte in KAT aufgezeigt und bewusst macht. Aus den geistigen Zugängen des Heilers zu diesen Seelenanteilen werden Menschen geheilt und erlöst.',
    'Die Schwächen der KAT-Geborenen weisen darauf hin, dass sie sich besonders um inneren Ausgleich bemühen sollten. Sie leiden häufig an ihrem eigenen Verhalten, sie binden andere in ihre Absichten ein und schaffen damit oft Abhängigkeiten. Es besteht aus der Unreinheit ihres Wesens die Gefahr, dass sie auch spirituelle oder physische Abhängigkeiten schaffen.',
    'KAT-Geborene sind besonders dazu aufgefordert, sich selbst zu beobachten und die Früchte ihrer Arbeit kritisch zu betrachten. Sie tun sich aus innerer Unausgewogenheit und dem Hang zu eigener Verstrickung schwer, Pläne zu verwirklichen, sich selbst richtig einzuschätzen, ihre Lebenssituation zu analysierenund daraus zu lernen. Sie haben die Tendenz, das Leben in seiner Intensität zu genießen, aber sich auch mit derselben Intensität Abhängigkeiten zu schaffen und daran zu leiden.',
    'KAT-Geborene stehen in Gefahr, andere zu bevormunden, zu kontrollieren und einzuengen, wie sie sich selbst nicht ungern einengen durch beschränkte Vorstellungen und ihre Gabe, sich selbst das Handwerk zu legen.'
  ],
  array[
    'Am Tag KAT bitten wir darum, unheilvoll wirkende Kräfte und Menschen erkennen zu können, Abhängigkeiten und Verstrickungen zu lösen. Wir bitten um Hilfe für unterdrückte und depressive Menschen, die oft unter massiven Einwirkungen des eigenen Umfeldes leiden. Wir bitten um die Befreiung feinstofflicher und grobstofflicher Abhängigkeiten (Süchte), um die Befreiung von emotionellen und mentalen Bindungen und Verstrickungen mit Menschen, aber auch von Abhängigkeiten und Beeinflussungen aus unreinen feinstofflichen Ebenen, um Loslösung von gottesfernen Welten und Wesen.',
    'Wir bitten um das gesunde geistige, spirituelle aber auch physische Wachstum unserer Kinder, um den liebenden Beistand der Familie und der Gemeinschaft. Wir erbitten das Erkennen und Befreien der gegenseitigen Bindungen aus alten, wirkenden Verhaltensnormen und aus karmischen Verstrickungen.',
    'Wir bitten um Erfolg in unserer Arbeit, die Befreiung von Hindernissen, Blockierungen und mentalen Verwünschungen von Mitarbeitern. Wir lösen am Tage KAT auch die Bindung des Kriminellen an niedere Wesen, die ihn lenken. Wir bitten um die Freiheit der Gefangenen, die aus Abhängigkeiten oder Anhaftungen von Wesen und Kräften Trennung in die Gemeinschaft bringen. Wir bitten um die Freiheit und den Frieden für jene, die für das Recht und die menschliche und göttliche Ordnung auf Erden sich hingeben und verurteilt werden.'
  ],
  'Nieren, Rippen, Wirbel, Bindegewebe, Sehnen, Bänder',
  'Eidechse, Spinne, Tiere, die sich einspinnen und dann transformiert neu geboren werden'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 15 · Kaan
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  15, 'de',
  'KAAN (Chiccan), sprich Kan',
  'O NOJ, W AAJ, S KAWOQ, N B’AATZ',
  array[
    'KAAN ist die Kraft und Weisheit der Schlange, die in Schwingungen und Tönen sich zeigende schlangenförmige Bewegung, die Kraft des sich erhebenden Feuers in der Kundalinikraft, die Bewegungen des Biorhythmus, die Bewegung und Kraft im männlichen Samen, das Urprogramm unserer Gene, die sich in der Doppelhelix bewegende DNA, die damit verbundenen galaktischen Energien, die Schöpfer und Formgebenden Diener und Kräfte GOTTES in MAYA, Hun-Ra-Kaan, Huracan del Cielo, Huracan de la Tierra, das innere Feuer, die Lebenskraft, die sich aus den Tiefen erhebende Weisheit der Ahnen, der Rhythmus in den Zyklen der Zeit, das große Wirken der Gefiederten Schlange im Geburtsakt des Neuen Menschen und der Neuen Erde – aus KU-KUUL-KAAN.',
    'KAAN ist der Nahual der feinstofflichen, menschlichen Transformation, aber auch der Tonschwingung, des Schalls. Über KAAN stehen die Maya in Verbindung mit den Wesen außerirdischer Welten.',
    'Die kosmische Musik gleicht dem Zusammenwirken einer kosmischen Familie, die in orchestraler Weise mit Tiefen, Mitteltönen und Höhen den göttlichen Plan der EINHEIT aus dem Neuen Menschen und der Neuen Erde verwirklicht. Unser Planet Erde ist eingehüllt von dieser kosmischen Klangfülle, die uns in ständiger Veränderung hält.',
    'KU-KUUL-KAAN ist eine Gottheit der Maya, die die Verbindung von Mensch und geistiger Welt im Kraftfeld und Symbol der geistigen Schlange, aus der Gottheit des Windes repräsentiert. Als Feuerdrache in den Unterwelten erhebt sie sich durch die Mittelwelt der Natur und des Menschseins in die luftigen Höhen, in das feinstoffliche Federkleid des göttlichen Geistes. Die tiefen Frequenzen gehen von den eigenen menschlichen Tiefen aus, die der Reinigung bedürfen.',
    'Die Mitteltöne entsprechen unserem Leben in der Mittelwelt, der Erde, und die Hochtöne sind die Schwingung unserer göttlichen Seele. Diese Frequenzen prägen den Klang jedes Einzelnen. Sie geben dem geistigen und physischen Werk eines Menschen Klangfülle, Schönheit und Reinheit.',
    'KAAN ist das kosmische Licht, das sich spiralförmig in die Galaxien ausdehnt und das uns mit der göttlichen Weisheit in unterschiedlichsten Ebenen und Seinszuständen verbindet.',
    'KAAN führt uns den Weg durch den Rhythmus des Lebens (Biorhythmus), ein ständiges Auf und Ab, ein immerwährendes Verdichten und Erweitern, ein Kommen und Gehen in einem steten Wandel unserer Seinsform. Im Kraftfeld der Transformation erheben wir über unsere lichtvolle Seele unseren Geist und kehren zurück in die hohen Schwingungen des göttlichen Kosmos, eingebettet in die göttliche Familie.',
    'Die Rückkehr Maya wird getragen von diesem Nahual, der auch die Gefiederte Schlange Quetzalcoatl (GUKUMAZ) darstellt. KAAN erhebt uns in die Spirale der kosmischen Energie, er trägt uns über die Grenzen von Raum und Zeit und aktiviert die kosmische Energie in unserem Körper als Kundalini-Energie. Das kosmische Feuer reinigt unseren Geist, verbindet uns mit kosmischer Lebenskraft und öffnet uns die Tore in die Ebenen Corazón del Cielo, Corazón de la Tierra.',
    'So werden wir aus dem Rachen der Schlange stets neu geboren. In der Bewegung KAANS, in der sich erhebenden Schlange erfahren wir uns selbst als kosmische Wesen. Wir manifestieren aus den in Maya gegebenen Zugängen zu diesen Schöpferkräften das Wesen des Geistes und die in allem schwingende göttliche LIEBE.',
    'Menschen am Tag KAAN geboren haben viel Lebenskraft. Sie sind sehr intelligent und agil und gerne bereit, ihre Kraft für die Gemeinschaft einzusetzen, dem Nächsten zu dienen. Sie sind fähig, die Traditionen zu erhalten und diese mit dem Neuen zu verknüpfen.',
    'KAAN-Geborene tragen Qualitäten wie Gerechtigkeit, Harmonie, Transformation, Liebe und Weisheit in sich. Sie vertreten oft das Recht, Ehre und Gerechtigkeit. Sie lieben Technik und Wissenschaft, sind sehr intelligent und bewegen sich gerne in engeren Strukturen, ernten liebend gerne Lob und Anerkennung. Sie bauen ihr Lebenswerk auf eine solide und feste Basis. Im Heilungsbereich schöpfen sie oft unbewusst aus ihrer Sexual- und Schöpfungskraft. Sie bedienen sich als Heiler und Veränderer gerne des heilvollen und sehr intensiv bewegenden und transformierenden sexuellen Feuers.',
    'KAAN-Geborene haben leicht Kontakt zu anderen Seinsebenen und Welten. Sie bewegen sich über die Verbindung zu ihren Chakren, über die Kraft der sich hebenden Kraft in der Wirbelsäule in die kosmischen Welten. Die dunkle Seite dieses Nahual´s ist gezeichnet vom Missbrauch der sexuellen Kraft.',
    'KAAN-Geborene, die sich ihrer Wurzeln und ihrer großen Kraft und magischen Zugänge nicht bewusst sind, werden oftmals getrieben von ihrer Sexualität. Sie richten damit viel Schaden an und missbrauchen diese Kraft auch dafür, andere in sexuelle Abhängigkeit und Abartigkeiten zu bringen. Sie werden von der ungezügelten Kraft KAAN´s in Höhen und Tiefen gezogen und leiden dadurch an ständiger Unstetigkeit im Leben. Das Feuer der Schlange zehrt sie aus, Organe und Körpersysteme leiden unter dem ungezügelten Feuer KAAN’s. Ihr medialer Kanal in andere Welten ist in Gefahr, von Wesen vereinnahmt zu werden, die verleiten, missbrauchen und manipulieren.'
  ],
  array[
    'Am Tag KAAN erbitten wir die spirituelle Entwicklung, das Sich Erheben aus den Tiefen der leidvollen, menschlichen Erfahrungen. Wir bitten um Heilung und Reinigung unserer Seele, um Unterstützung aus dem göttlichen Kosmos. Auf dem geistig-spirituellen Weg bitten wir darum, die wahren Licht- und Liebesboten erkennen zu können. Wir bitten aus dem reinen Feuer des Geistes KAAN (die Feuerszungen zu Pfingsten) um Erkenntnis, Einsicht, Weisheit, Gesundheit und Wohlergehen, Wahrheit und Gerechtigkeit, Gleichgewicht und innere Harmonie.',
    'Wir halten Zeremonien für die Heilung von Krankheiten, die aus einem ungezügelten Sexualverhalten entstehen. Wir erbitten die Stärkung und Heilung des Nervensystems, das unter dem Feuer der Leidenschaft leiden kann. Wir bitten das heilige Feuer um die Reinigung unserer Beziehungen zu Mitmenschen, zu anderen Ebenen und Wesen. Wir erbitten für unsere Wanderschaft die Weisheit des göttlichen Kosmos.',
    'Zeremonien in KAAN aktivieren das göttliche Feuer, das Wirken des feinstofflichen Feuers auf unsere Seele. Symbolisch verbindet sich der Schamane im Feuerritual mit dem Licht und der Wärme der göttlichen Sonne.'
  ],
  'Nervensystem, Wirbelsäule',
  'Schlange, Drache'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 16 · Keme
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  16, 'de',
  'KEME (Cimi), sprich Kemé',
  'O TIJAAX, W I’X, S AJPUU, N EE',
  array[
    'KEME ist der Bruder, die Schwester Tod, der Hüter der menschlichen Seelenanteile in den Verstorbenenreichen, die Kraft der Transformation, des Wandels vor der Neugeburt.',
    'KEME ist göttliche Gnade und Barmherzigkeit, wirksam in den Maya Unterwelten.',
    'Sanftmut, Harmonie, Stille und friedvoll eingebettetes Ruhen sind Ausdruck der sakralen Unterwelt.',
    'Aus KEME öffnen sich Zugänge zu den verlorenen Seelenanteilen, aus denen wir im Leben Erfahrungen machen, geleitet und verleitet sind. Der Weg der Weihe geht durch die Reiche KEME’s und führt durch das Tor der Dichte in die göttlichen, lichtvollen Dimensionen. KEME ist Schutz vor den niederen Welten, die Erinnerung an die Kraft des Vergebens, Hinweis auf Erlösung von negativen Gefühlen und Seelenanteilen des Hasses, der Missgunst, des Neids und anderer, niederer emotioneller Zustände. KEME ist die Lebensweisheit der Ahnen, die im Menschsein wirkende Kraft und Weisheit der Kristallschädel.',
    'Der Nahual KEME ist der Meister, der das Reich der Toten und damit unsere in diesen Reichen existierenden Seelenanteile hütet. Wir können auch vom Bruder und der Schwester Tod sprechen. KEME ist als Begleiter des Menschen der physischen Seinsebene sehr nahe. Er greift über unsere Seele in unser menschliches Leben als Form gebende aber auch Form nehmende Kraft ein.',
    'KEME steht ganz besonders in der Polarität von Licht und Schatten. Die vielen Gesichter des Todes zeigen sich dem Menschen entsprechend seiner Beziehung, die er dem Tod und seiner eigene Seele gegenüber einnimmt. Erkenne ich KEME in seiner liebenden, sanftmütigen, gütigen Form, so wird er wahrlich zum Bruder, Begleiter und Mittler hin in das Reich der Verstorbenen, hin zu den eigenen Lernaufgaben, die uns die Seele stellt. Lehne ich KEME ab, dann zeigt er das Gesicht des Aggressiven, des Sensenmannes, der den Uneinsichtigen in Schicksalsschlägen aus den Impulsen der Seele, die er hütet, schüttelt und aufweckt.',
    'Schwester Tod ist die Formgebende Kraft, die uns als Fötus wieder in die menschliche Form bringt, aber auch zu Lebzeiten die „Neugeburt“ im Menschsein einleitet und begleitet. Beide, Schwester und Bruder Tod stehen in unmittelbarem Kontakt mit unserer Seele und reagieren all-ein auf ihre Impulse.',
    'Maya arbeitet mit beiden Wesenheiten, dem Weißen und dem Schwarzen Tod. Als Mittler in die Ebenen der Dunkelheit führt uns KEME in das Geheimnis und Mysterium des Schattenreiches, in dem wir mit einem Teil unseres Seins verbunden stehen. Er führt uns über die Brücke vom Dunkel ins Licht und öffnet uns die Tore in das erlösende, göttliche Licht. Aus der Verbindung zu unseren Licht- und Schattenanteilen ist es uns möglich, mediale Kontakte zu unseren Ahnen, aber auch zu unseren wahren, göttlichen Heimstätten zu pflegen.',
    'Aus unserer Verbindung in das Totenreich erhalten wir tiefe Lebensweisheit und Lebenserfahrung von denen, die vor uns gelebt haben. KEME schafft dem Heiler und Schamanen auch Zugänge in die Tiefen der trennenden, dämonischen Unterwelten, die vom Heiler allein im Dienste der Seelen für Heilung und Friede geöffnet werden sollten.',
    'Menschen am Tag KEME geboren haben eine starke Verbindung in die Anderswelten. Aus diesem Grunde besitzen sie die Gabe der Voraussage, mediale Fähigkeiten, sie sind sehr intuitiv, sehr integrativ und sozial. Sie sind Personen mit viel Charisma, mit viel Herz und Harmoniebedürfnis. Sie haben Kontrolle über sich selbst, weil sie aus ihrem inneren spirituellen und emotionalen Frieden zu schöpfen vermögen. KEME-Menschen sind sehr sensibel, „dünnhäutig“ und sehr starke Heiler.',
    'Sie finden häufig ihre Aufgabe in der Mitarbeit KEME’s als Wandler, Transformatoren, als Wegbegleiter von Menschen, als Heiler der menschlichen Seele.',
    'Die dunkle Seite des KEME-Geborenen sind Aggression, Gefühlskälte, Herzlosigkeit.',
    'KEME-Geborene, die sich ihrer selbst nicht bewusst sind, neigen zu Lügen und Verrat. Sie haben die Gabe, was andere mühsam aufgebaut hatten zu zerstören, Missgunst und Zwietracht in Gemeinschaften zu säen. Sie schaffen durch ihr Verhalten aus ihren unkontrollierten Unterweltenzugängen aber auch aus ihren medialen Einsichten bewusst oder unbewusst Trennung und Zerstörung, weil sie stark aus ihren unerlösten und unreinen Seelenanteilen gleich einer zerstörenden Todesenergie geleitet sind.'
  ],
  array[
    'Über KEME haben wir die Möglichkeit, durch Rituale, Gebete und Meditationen heilend und befreiend in das Totenreich zu wirken. Zeremonien am Tag KEME werden zur Beruhigung und Harmonisierung negativer Gedanken und Gefühle abgehalten. Wir können die Befreiung von Sucht, von Leid und schmerzvollen Erfahrungen, von Lüge und Verrat erbitten. Wir bitten um die Beendigung eines Streits, einer Auseinandersetzung, eines Kriegs.',
    'Zeremonien am Tag KEME sollten in der Stille und besonders mit dem violetten Strahl der Transformation abgehalten werden. Orte der Zeremonien wären eine Höhle, aber auch ein für das Ritual aufgebauter, dunkler Altar oder ein stiller Ort im Keller. Man kann eine schwarze Kerze anzünden und aus der Stille und Ruhe sich mit KEME in Verbindung setzen. An diesem Tag ist es möglich, mit den Verstorbenen Kontakte aufzunehmen, sie um Hilfe und Rat zu bitten, oder sie durch Gebet und Meditation zu heilen, zu beglücken und von belastenden Bindungen an das Erdenleben zu befreien.',
    'KEME öffnet dabei die Ebenen, von wo aus die unreinen Seelenanteile der Verstorbenen wirken. Diese Seelenanteile in Liebe, Gnade und göttliche Barmherzigkeit des Herzens KEME’s einzutauchen verschafft tiefgehende Heilung und Erlösung der Seelenanteile. KEME öffnet den verstrickten Seelenanteilen eines Menschen den Weg in die Befreiung in das göttliche Licht.',
    'Am Tag KEME erbitten wir den Kontakt und den geistigen Rat für den Schutz unseres Lebensumfeldes, um den Schutz des Lebens. Wir bitten um innere Kraft und Stärke, um die innere Ruhe und den inneren Frieden. Aus der Heilung unserer Seelenanteile ergeben sich die Klärung unseres Lebensweges und unserer Lebensbestimmung. Vor allem bitten wir die vorangegangenen Generationen um ihre integrierte Lebensweisheit für die Bewältigung, Öffnung und für den Schutz unseres Lebensweges.'
  ],
  'der physische Tod',
  'Rabe, Geier, Eule und andere Nachttiere'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 17 · Kiej
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  17, 'de',
  'KIEJ (Manik), sprich Kiäch',
  'O KAWOQ, W TZ‘IKIN, S IMOX, N AAJ',
  array[
    'KIEJ ist das Ineinanderwirken der Kraftfelder der vier Himmelsrichtungen und der vier Elemente, der dynamische Rhythmus des Lebens, KIEJ ist der auf unser Menschsein einwirkende Geist der Hügel, Berge, Flüsse, Seen und Landschaften, das auf den Menschen einwirkende Kraftfeld der indianischen und keltischen Krafttiere.',
    'KIEJ ist der auf den vier Beinen stehende Hirsch im Symbol von Instinkt und Intuition, die physisch uns stärkenden Energien der Naturkräfte, die elektro-magnetische Kraft unseres Planeten, die Intensität der menschlichen Umsetzungskraft, die den Menschen verankernde Schwerkraft, das Expandieren und Zusammenziehen der Kraft im Symbol des Herzpulses, die Aktion und die folgende Reaktion, der Jäger und das gejagte Tier, die symbolisch stehen für Leben und Tod.',
    'Der Nahual KIEJ ist besonders verbunden mit dem Kraftfeld der vier Himmelsrichtungen, die miteinander in Harmonie stehen. Es sind die vier Säulen, auf denen unsere Existenz, aber auch unser Planet ruht. Das Wild als Krafttier dieses Nahual’s steht mit den vier Beinen in den vier Himmelsrichtungen. Es ist wendig, kraftvoll, intuitiv (instinktiv) und wachsam. Aus diesen Qualitäten heraus überlebt es und behält es seine Freiheit.',
    'Auch die vier Elemente Feuer, Erde, Luft und Wasser sollten stets in Balance miteinander stehen. Diese Harmonie soll auch der Mensch in sich halten. Er schwingt in dieser Harmonie im Rhythmus des Lebens. Die vier Elemente zeigen sich im Menschen in Körper – Geist – Gefühl – Wille. Sie vereinen sich im alles verbindenden, liebenden und klaren Herzen.',
    'Damit steht der Mensch auch im Zentrum des Mayakreuzes, das vom Nahual KIEJ gehütet wird. Die Heilung des Menschen erfolgt stets in der Harmonisierung der Gedanken (Luft), der Emotionen (Wasser), des Willens (Feuer) und der Körperlichkeit (Erde), in der sich die Elemente im menschlichen Bewusstsein manifestieren.',
    'KIEJ ist der Nahual, aus dessen Kraft heraus wir uns stets in Bewegung halten.',
    'Wann immer der Mensch sich in Unausgewogenheit befindet, hat er die Möglichkeit, die Dominanz einer oder auch mehrerer Elemente in sich zu erkennen und miteinander in Harmonie zu bringen. Daraus entsteht der innerlich freie Mensch, der aus dieser Ermächtig Herr über Leben und Tod wird.',
    'Die Verbindung zu den vier Elementen bedeutet, dass wir im Einklang mit den Hütern der Elemente wahrlich Berge versetzen können. Aus diesem Grunde ist KIEJ eine der stärksten, physisch wirksamen Kräfte im heiligen Kalender der Maya. Er erinnert uns daran, uns der Kraftquellen der Naturreiche wieder bewusst zu werden und die Wesen der Naturreiche für die Gestaltung unseres Lebens, für die Heilung unseres Planeten in Respekt und den Aufgaben entsprechend einzusetzen.',
    'In dieser Verbindung wird unsere Mutter Erde wieder geheiligt, Menschenreich und Naturreiche werden sich so wieder ineinander fügen und sich gegenseitig Kraft und Dynamik für ein heilvolles Leben geben.',
    'Menschen im Zeichen KIEJ geboren sind agil, stark, verantwortungsbewusst, intelligent und in innerem Gleichgewicht mit sich selbst. Sie stehen aber besonders im äußeren Gleichgewicht mit den Naturwesen und Elementen. Sie übernehmen aus ihrer Festigkeit und Dynamik Verantwortung, stehen oft in Führungspositionen, lieben Anerkennung und öffentliche Positionen. Sie besitzen einen offenen Geist, sind weitsichtig, geistig beweglich und intuitiv.',
    'Der KIEJ-Geborene ist dadurch auch stark gefordert, sich dieser Kraftquellen bewusst zu bleiben und sie mit Erkenntnis und im Ausgleich zu nähren und zu pflegen. So sind KIEJ-Geborene gute Psychologen, Richter und Rechtsanwälte und besonders gut geeignet in Sozialberufen.',
    'Schwächen des KIEJ-Geborenen sind seine Reserviertheit. Sich seiner Wurzeln nicht bewusst zu sein bedeutet für den KIEJ-Geborenen, dass sich dieselben Kräfte in Form von Aggressionen, Hass und Trennung gegen ihn selbst richten. Aus diesem Grunde neigen sie dazu, nur den eigenen Vorteil zu sehen und auf andere mit Kontrolle und Macht zu reagieren. Ihre innere Unausgeglichenheit zeigt sich dann in übertriebenem Stolz, in Überheblichkeit und in einer starken Unausgewogenheit des Gefühlslebens.',
    'Das Körperwesen steht oft dominierend vor allen anderen menschlichen Qualitäten, übertriebener Körperkult, eine rein auf die Lustbefriedigung ausgerichtete Sexualität sind Folgen dieser Körper betonten Einseitigkeit.',
    'Eine zu starke Verbindung zu den Naturkräften schafft in diesen Menschen eine ungeschliffene, rohe Kraft, unter der die Mitmenschen leiden.'
  ],
  array[
    'Wir erbitten am Tag KIEJ die Ermächtigung aus den Naturreichen, die Stärkung der physischen und auf das physische Leben, auf den Beruf ausgerichteten Kraft. Wir bitten um Erkenntnis, Wertschätzung am Arbeitsplatz, um Authentizität und Sicherheit, um die Umsetzung unserer Lebensaufgabe.',
    'In KIEJ bitten wir um den Ausgleich der vier Elemente in uns. Wir erbitten die Befreiung von negativen Einflüssen dritter Personen, die Befreiung von Stolz und Hochmut. Wir bitten um Wohlergehen, um die Kraft in Händen und Beinen, um Freude an der Arbeit, um Heilkraft für unsere Hände.',
    'Am Tage KIEJ können wir auch um das Glück im Leben bitten, wenn wir bereit sind, die Basis dafür in uns zu schaffen. Diese Basis formt sich aus einer sich entfaltenden Liebe zur Natur und zu den Mitmenschen, aus der Liebe zu GOTT und seinen Helfern. Wir bitten in KIEJ um Stärke und Harmonie in allen Lebensbereichen und um die Ausgewogenheit und den Frieden mit der physischen, materiellen Welt.'
  ],
  'Arme und Beine, Hände und Füße',
  'Hirsch, Pferd, indianische und keltische Krafttiere'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 18 · Q'anil
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  18, 'de',
  'Q’ANIL (Lamat), sprich Kaníl',
  'O AJPUU, W AJMAC, S IQ, N I‘X',
  array[
    'Q’ANIL ist die Kraft der Verbindung von Samen und Eizelle, die Befruchtung und Fruchtbarkeit, die Schöpferkraft Gottes in der Sexualität, die aus dieser kosmischen Kraft sich ergebende Verwirklichung und Umsetzung von Ideen, Projekten und Visionen, das sich aus dem Schöpfungsplan neu entfaltende Leben, die aus den sieben Schöpferstrahlen Gottes sich manifestierende planetarische Fruchtbarkeit, das feinstoffliche Schaffen von Formen und Wesen, spirituelle und materielle Fülle und Wachstum, die sich mit dem Schöpfungsplan verbindenden Wesen anderer Welten, neue Formen des Zusammenwirkens und Zusammenlebens des kosmisch ausgerichteten Menschen, das im Herzen Q’ANIL‘s sich öffnende Programm der NEUEN ERDE UND DES NEUEN MENSCHEN.',
    'Der Nahual Q’ANIL aktiviert die innere und äußere Schöpferkraft des Menschen. So beinhaltet dieser Nahual das Lebensprogramm des Menschen in Einklang mit dem Wachstum in den Naturreichen. Q‘ANIL steht in ständiger Verbindung mit den Gottheiten des Schöpfungsplanes Gottes. Er ist das kosmischen Gesetz der Liebe, aus dessen Kraftfeld sich Samen und Eizelle miteinander verbinden, um neues Leben und andere Seinszustände in den Anderswelten zu schaffen.',
    'So steht Q’ANIL in Maya im Einflussbereich und Kraftfeld der Schönheit und Fülle gebenden Venus. Wir kreieren mit unseren Gedanken, Gefühlen und durch unser Handeln unsere eigene Realität.',
    'Q’ANIL ist der in uns angelegte Samen, der in Verbindung mit dem Weiblichen unsere Ideen und Vorstellungen befruchtet. Q’ANIL repräsentiert die Fülle und Formenvielfalt der Schöpfung und den Reichtum, die im Menschen angelegt sind.',
    'Gleich der Schönheit und Vielfalt unseres Planeten Erde ist es dem Menschen möglich, das Ebenbild des Planeten in sich zu entfalten und die Schönheit und Fülle auch im Außen zu manifestieren.',
    'Q’ANIL liegt als Wachstumssame des Menschen im fruchtbaren Erdelement. Dieser braucht für das Wachstum das Licht und Wärme spendende Sonnenfeuer des Ostens, das Fülle und Heil bringende Wasser des Südens und die reine, klare Luftdes Nordens. So gedeiht auch unsere Persönlichkeit aus denselben Qualitäten:',
    'Unsere innere Kraft und Schönheit entspringt der Reinheit der Gefühle und der Gedanken und bedarf des Wärme und Licht spendenden menschlichen Feuers. All diese Qualitäten zeigen sich im Menschen als Glück, Freude, Fülle, Erhabenheit und Schönheit. Q’ANIL ist das Sprießen dieses Samens, die sich in Liebe öffnende Erfüllung unseres Erdendaseins.',
    'So sind am Tage Q’ANIL die Kräfte der vier Himmelsrichtungen und die sieben Schöpferstrahlen Gottes besonders wirksam. In seiner Kraft heilen wir auch die menschliche Unfruchtbarkeit und Probleme in der Sexualität.',
    'An einem Tag Q’ANIL ist der ideale Zeitpunkt gegeben, Leben, Visionen, Projekte zu schaffen. Auch die Fruchtbarkeit und Kraft eines ausgelaugten Bodens kann mit QANIL über feinstoffliche Nahrung wieder gewonnen werden.',
    'Menschen am Tag Q’ANIL geboren sind sehr intuitiv, in ihren Ideen und Vorstellungen wirken sie anregend und motivierend. Sie haben besondere Gaben, Materie zu schaffen und mit geistigen Inhalten zu füllen. Sie sind verantwortungsbewusst und beliebte Mitarbeiter und Umsetzer von Ideen.',
    'Q’ANIL-Geborene machen den Eindruck von Schüchternheit, schöpfen aber versteckt aus großer innerer Kraft, sind gute Liebhaber mit Einfühlungsvermögen und Kraft. Sie nützen ihre tiefe Verbindung zur Sexual- und Schöpfungsenergie für ein kreatives und vitales Lebensumfeld und sind dadurch auch gute Unternehmer, besondere Künstler und Musiker. Im Heilungsbereich wissen sie ihre Kraft und Dynamik in den Dienst der göttlichen Schöpferkräfte zu stellen.',
    'Schwächen der Q’ANIL-Geborenen sind Leichtgläubigkeit, Labilität und Unverlässlichkeit. Wenn sie sich ihrer Kraft nicht bewusst sind, kreieren sie sich aus unreinen Gedanken und Gefühlen ein Lebenschaos, ohne sich selbst als Verursacher dieses Chaos zu erkennen. Verbunden mit ihrer anregenden Sexualkraft sind sie gerne auch Opfer ihrer eigenen Leidenschaften und geraten leicht in die Abhängigkeit anderer. Der Missbrauch ihrer fehlgeleiteten Schöpfungskraft verstrickt sie gerne in Unternehmungen, die aus Egoismen, aus Überheblichkeit, aus Hochmut und aus einem übersteigerten Machtstreben entstehen, die dann aber sehr bald wieder in sich zerfallen.'
  ],
  array[
    'Am Tag Q’ANIL erbitten wir die Fruchtbarkeit für Menschen, für Tiere, für die Erde, für unsere Visionen und Projekte. Wir bitten um ein gesundes Wachstum der Pflanzen, um Energie für unsere Nahrungsmittel, um den nährenden Segen in der Landwirtschaft, um eine reichhaltige Ernte.',
    'Wir erbitten das Gelingen einer Idee, einer Vision, eines Vorhabens, eines Projekts, das Gelingen unserer Aufgaben im Leben, um den Erfolg in unserer Arbeitswelt. Wir bitten Q’ANIL um einen guten Neubeginn nach einer Kündigung, einem Berufswechsel, einem persönlichen Niedergang und Wandel. Wir erbitten das gesunde Wachstum unserer Kinder und die Kraft und Beständigkeit für die Lebensvisionen der Jugendlichen.',
    'Am Tag Q’ANIL bitten wir im Heilungsbereich um die Befreiung und Heilung von Impotenz und Frigidität, um Heilung für die damit verbundenen Seelenanteile aus früheren Leben. Wir bitten um Heilung und Erlösung von sexuell missbrauchten Menschen.',
    'Wir bitten (in Verbindung mit dem Nahual AAJ) in der Landwirtschaft um die Befreiung von Schädlingen auf bebautem Boden, um Befreiung von Krankheiten der Tiere und Pflanzen und um die nährende Gesundheit des Bodens.'
  ],
  'Eierstöcke, Gebärmutter, männliches Sperma, Sexualorgane',
  'Kaninchen, Hase'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 19 · Tooj
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  19, 'de',
  'TOOJ (Muluc), sprich Toch',
  'O IMOX, W NOJ, S A’KAB’AL, N TZ’IKIN',
  array[
    'TOOJ ist der Ausgleich im Rad des Lebens, die Gabe und Hingabe, die mir zufließende göttliche Gnade, das Gebende in der Vergebung, der Ausgleich von Geben und Erhalten, das Opfer im Prinzip der Bereitschaft zu geben. TOOJ ist auch die Gabe in den Riten, der TOOJ einer Mayazeremonie, die Gabe und das Geschenk für das, was wir im Kreislauf aus den geistigen Quellen erbitten, TOOJ ist der Lebensstrom, der aus dem gebenden Prinzip alles in Bewegung und Fluss hält.',
    'TOOJ ist die heilige Kraft des Herzsteins Jade, der Stein des Lebens und der Weisheit der Maya.',
    'T OOJ ist der Nahual, der den Kreislauf des Gebens und Erhaltens schließt. Was auch immer wir aus der geistigen Welt erbitten, (hängt auch damit zusammen) ist verbunden mit dem, was wir bereit sind zu geben. TOOJ ist die Kraft der Liebe im Geben. Durch unsere Bereitschaft zu geben öffnen sich die Tore für das, was uns zugeführt werden kann. Wenn wir Materie und Wissen anhäufen, geschieht dies oft auf Kosten anderer. Dadurch richtet sich auch das, was wir uns geschaffen haben, gegen uns und unseren Lebensfluss. Wer zur Fülle des Lebens dadurch gelangt, dass er bereit ist zu geben, der schafft in sich den Magnetismus, dass ihm auch entsprechende Fülle zufließen kann.',
    'Der Mayapriester gibt in den Feuerzeremonien den sagrado TOOJ in Form einer großen Fülle kostbarer Zeremonienmaterialien. Damit bezahlt der Schamane im wahrsten Sinne des Wortes für das, was sich der betroffene Mensch und Heil Suchende aus Unkenntnis manifestiert hat. Somit steht TOOJ als Symbol für den Ausgleich, für das Auffüllen eines inneren Vakuums, das durch Habgier oder durch beengendes Armutsbewusstsein an Blockierung geschaffen wurde. In TOOJ gleichen wir Schuld und Unvollkommenheit durch das aus, was wir bereit sind zu geben.',
    'Man könnte TOOJ auch bezeichnen als den Hüter des offenen Karmas, das nach Ausgleich drängt. Dieses Geben bedeutet in unserem Kulturkreis die Bereitschaft, für ein soziales Projekt zu spenden, durch Arbeitsleistung in den Dienst eines Sozialprojekts zu gehen und dergleichen mehr. Konflikte und Auseinandersetzungen in der Gemeinschaft lassen sich auch durch einen TOOJ in der Form ausgleichen, dass der machtgierige Mensch konsensbereit eine gemeinsame Lösung sucht. TOOJ steht auch für diesen Konsens und hält dadurch auch die Gemeinschaft zusammen.',
    'Er kann verglichen werden mit einer rotierenden Energie, die uns in ständiger Bewegung hält und zum Geben auffordert.',
    'Aus der Gabe und Hingabe ist im Lebensrad auch die Basis für ein spirituell sich entfaltendes Leben gegeben. Durch unsere Aufmerksamkeit und Wachheit halten wir im Geben den Kontakt zu den unsichtbaren Ebenen, die uns in Dankbarkeit den Weg zur Erfüllung und zur Fülle bahnen. Im Christentum ist TOOJ die Kraft des Opfers, des Fastens, der Bereitschaft zu spenden und sich anderer Menschen anzunehmen.',
    'TOOJ steht in seiner dunklen Seite für die Auswirkungen unserer niederen Emotionen und Gedanken als Folge unserer Haltung. Er zieht uns in Krankheit, Schmerz, Leid und Schuldbehaftung, wenn wir uns seines gebenden Wesens nicht bewusst sind und nur Nehmende und Ausnützer sind. Dadurch ist TOOJ auch ein Tag des Schwarzmagiers, der an diesem Tag seine Rituale gestaltet und seine Gaben der dunklen und zerstörerischen Seite TOOJ´s anbietet und damit Kräfte für seine zerstörerischen Absichten einbindet.',
    'Menschen am Tag TOOJ geboren sind in ihren Grundeigenschaften gelassen, phlegmatisch, respektvoll, voller Lebensfreuden, gemeinschaftsorientiert mit dem Bedürfnis, sich von den anderen durch besondere Hinwendung und durch Geschenke abzuheben. Sie wirken in der Gemeinschaft ausgleichend und harmonisierend und sind aus diesem Grunde auch sehr geschätzt. TOOJ-Geborene sind sehr sensitiv und emotionell, was ihnen auch zum Nachteil gereichen kann, wenn sie nicht bewusst damit umgehen. Ihre Bereitschaft zu geben ist Zeichen dafür, dass sie bereit sind, Materie loszulassen und Raum zu schaffen für Neues.',
    'Schwächen der TOOJ-Geborenen sind ein labiler und unruhiger Charakter, in ihren Handlungen sind sie durch ihre Einseitigkeit und durch ihre Nehmerhaltung kurzsichtig, destruktiv, allein auf den eigenen Vorteil bedacht. Sie sind materialistisch veranlagt und neigen zu Unfällen. Sie haben die Tendenz, anderer Schuld zu übernehmen, mitzuleiden oder Mitleid zu erregen und in Selbstmitleid zu schmachten.',
    'TOOJ-Geborene haben in ihrer Seelenanlage oft die Aufgabe, etwas für ihre Ahnen oder auch für ihre eigene frühere Lebenshaltung in Ausgleich zu bringen. Dies bringt sie oft in intensive Lebenslagen und lässt sie immer wieder das Erarbeitete verlieren.',
    'Ihre Haltung des Gebens und Beschenkens ist aus den dunklen Anteilen TOOJ‘s verbunden mit Absicht. Sie schenken, um Aufmerksamkeit zu erregen, um Verhaltensänderung des anderen zu forcieren, um großzügig zu erscheinen u.a.'
  ],
  array[
    'Am Tag TOOJ erbitten wir durch Dankbarkeit und die Gabe den Ausgleich im Geben und Erhalten. Wir bitten um Vergebung für das, was wir durch unser Denken, Fühlen und Handeln in anderen auslösen. Dies bezieht sich auch auf geistigen, energetischen, materiellen Diebstahl, das ungefragte Nehmen von Energien, das Ausnützen von Gastfreundschaft, das Einbrechen in intime Bereiche eines anderen, das ungefragte, mediale Andocken eines anderen Menschen So bitten wir durch unsere Opfergabe, durch das Ritual des Vergebens, durch eine bewusste Hinwendung zum zwischenmenschlichen Geben um die Befreiung von behindernden Belastungen und aus uns selbst aktivierten, blockierenden Kräften.',
    'Durch die Gabe beruhigen wir inneres und äußeres Ungleichgewicht. Wir stabilisieren unsere Existenz und erbitten vom göttlichen Schöpfer Erkenntnis und die innere Haltung, nicht zu erwarten, sondern in Vertrauen auf den göttlichen Kreislauf zu geben.',
    'Im Ritual des Gebens und Vergebens können wir auch Gefahren jeglicher Art abwenden, die wir selbst durch fehlende Erkenntnis und durch die Grundhaltung ungefragten Nehmens heraufbeschworen haben (Unfälle, Leid, Angst und voreiliger Tod, Katastrophen, Rache, Schwarzmagie etc.)'
  ],
  'Hände, Herz',
  'die Hingabe der Haustiere, die uneingeschränkte Liebe des Hundes'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();

-- 20 · Tz'i'
insert into nahual_long_texts
  (nahual_index, lang, heading, directions, body, ceremonies, body_level, power_animal)
values (
  20, 'de',
  'TZ’I (Oc), sprich Tsi',
  'O IQ, W TIJAAX, S KAT, N AJMAC',
  array[
    'TZ‘I repräsentiert die geistige und physische Ordnung, den daraus entstehenden Schutz vor zerstörenden Einflüssen, das kosmische Gesetz der alles verbindenden Liebe, die geistige und menschliche Autorität, den Sinn für Gerechtigkeit, die Ordnung in der schrittweise erfolgenden Entfaltung der Seele, die spirituelle Treue, das aus dem Herzen und der Lebenserfahrung sich erhebende Wort, die Hierarchie in den unterschiedlichen Seinsebenen und Welten, die Hüter der gesellschaftlichen Ordnung und der menschlichen Gesetzgebung, die Hüter der geistig-kosmischen Ordnung, die Kraft des Glaubens und des Vertrauens.',
    'TZ’I, der geistige Hüter der kosmischen Ordnung und Wahrheit, trägt in sich das kosmische Gesetz, aus dem sich die unterschiedlichen Seinsebenen, die verschiedenen geistigen Lebensräume der Unter-, Mittel- und Oberwelten miteinander verbunden halten. Im Volke der Hebräer wurde diese Ordnung besonders erkannt, gehütet und als Mysterium betrachtet. Aus dem Weisheitsschatz der großen Weisen und Meister dieses Volkes baut sich in Verbindung mit den Gottheiten der Schöpferkräfte die neue Weltenordnung auf. Das Gerechtigkeitsempfinden der mit dem Herzen verbundenen Menschen ist höchster Ausdruck dieser geistigen Ordnung im Menschsein.',
    'In der Rechtssprechung möge dem Menschen bewusst werden, dass die Verurteilung eines Menschen Schutz der Gemeinschaft vor einzelnen außerhalb der Ordnung lebenden Individuen gibt. Zugleich sollte erkannt werden, dass diese Menschen sich auch außerhalb der kosmischen Ordnung befinden. Aus gegebener Unordnung in der Seele stehen sie im Einfluss von Trennung und Unheil schaffenden Kräften. Die Heilung dieser Menschen erfolgt durch die Hilfe bei der Neuordnung, Heilung und Reinigung der Seele des Menschen.',
    'TZ’I gibt uns dabei immer wieder die Orientierung, durch Erkenntnis und im Prinzip der kosmischen Liebe die göttliche Gesetzmäßigkeit zu leben, auszudrücken und in die Rechtsprechung mit einzubeziehen.',
    'Wie alte Völker und Weise der Kulturen durch die Ausrichtung auf die kosmischen Gesetze die Rückverbindung mit dem Göttlichen hielten, so sollte uns bewusst sein, dass jegliche Form von Übertretung von Gesetzen ein sich Entfernen vom Göttlichen darstellt. Das Wiedereinfügen in die göttliche Ordnung ist verbunden mit der Kraft der Liebe und der göttlichen Gnade. TZ’I schützt uns davor, dass wir aus dem Gesetz des Lebens, aus dem Kraftfeld der schützenden Gemeinschaft und den uns begleitenden und beschützenden Kräften des göttlichen Kosmos einseitig in die beengende, illusorische Welt der Materie fallen.',
    'Über TZ’I erkennen wir die Seelenanteile, aus denen wir fehlgeleitet sind, die uns in Erfahrungen des Lebens führen, wo auch im Umfeld des Menschen Trennung entsteht, die gleichermaßen in der Seele des Menschen besteht. An TZ’I nützen Schadensmagier die negativen Qualitäten des Menschen, indem sie die innere Unordnung (Chaos, Hass, Neid, Eifersucht ...) durch magischen Einfluss verstärken.',
    'TZ’I ist der Nahual des Vertrauens auf die göttliche Führung und den göttlichen Schutz. Unsere geistigen Begleiter stehen uns aus unterschiedlichen Seinsebenen mit ihrer Kraft und Weisheit bei unserer Wahrheitsfindung zur Seite. Symbol dieser Ordnung in der Seelenentfaltung, der geistigen Ordnung und der kosmischen Gesetzmäßigkeiten ist der Stufenbau einer Pyramide. Schritt für Schritt wandern wir auf dem Weg der Weihe.',
    'Stufe für Stufe (bei den Maya in schlangenförmigem Aufstieg) wandern wir durch die Lebens- und Erfahrungswelten verschiedener, kosmischer Dimensionen und Räume. Jede Stufe trägt in sich den Zugang zu Welten, zu Lebenserfahrungen, zu Seelenanteilen und zu geistigen Kräften, die diese geistigen Räume bewohnen, die uns Zugang verschaffen und uns auf dem Weg zur Krone der Pyramide (zu GOTTES Seinsebene) Wegweiser sind.',
    'Die dunkle Seite des Tages TZ´I ist die große Zerstörungskraft der Unordnung und die fehlende mit dem Herzen verbundene Rechtsordnung. Dies führt zu Rechtskämpfen, zu Gier und Macht in der Rechtssprechung. Die Desorientierung von Menschen, die in Abartigkeiten als Ausdruck ihrer Seelentrennung von GOTT leben, Mord, Blutvergießen, ungezügelte Sexualität sowie die Untugenden im Menschsein sind Ausdruck des von der göttlichen Ordnung entfernt lebenden Menschen.',
    'Menschen am Tag TZI geboren lieben es, authentisch ihr eigener Herr, ihre eigene Frau zu sein, sich allein an ihrem eigenen Wahrheitsempfinden, an ihre individuellen Lebensführung, an ihrem Verhalten zu orientieren. Sie haben einen ausgeprägten Sinn für Wahrheit, für Ordnung und für die Lebensgesetze, sie halten stets Verbindung mit ihren geistigen Begleitern in Gebet, Meditation und täglicher Kommunikation. Sie leben mit sich in Einklang, sind loyal und verlässlich, sie hüten und erweitern zugleich Traditionen und folgen den Impulsen ihres inneren Wandels.',
    'Sie sind hervorragende Rechtsanwälte, Notare, Beamte, Richter, Wirtschaftstreibende mit einer bewusst oder unbewusst bestehenden Verbindung zu ihrem Herzen.',
    'Ihre Schwächen sind ein ungezügeltes Streben nach Macht und Kontrolle, aber auch ein ungezügeltes Alltagsleben, oft auch ein vom Herzen isoliertes Sexualleben, starke Eifersucht und Besitzstreben. Sie sind sehr selbstgefällig, hart, selbstsüchtig und leicht erregbar, wenn sie kritisiert werden. Durch ihre Selbstgefälligkeit erheben sie sich gerne über das Gesetz und agieren hartherzig, unflexibel und starrköpfig. Sie sind oft sehr eng an Traditionen gebunden und messen ihre Mitmenschen in Verurteilung an ihren eigenen Wertmaßstäben.'
  ],
  array[
    'Am Tag TZ’I erbitten wir die menschliche und göttliche Ordnung in der Gemeinschaft.',
    'Wir bitten um die aus dem Herzen erwachsende, innere mentale und emotionelle Harmonie, um eine auf die geistige Ordnung abgestimmte Lebensführung, um Weitblick und Transparenz. Wir bitten um das heilvolle Zusammenführen von unterschiedlich veranlagten Menschen, von betrieblichen Strukturen, von unterschiedlichen Aufgaben in Gemeinschaften, um ein harmonisches Zusammenleben der Familienmitglieder. Wir erbitten das Erkennen und Auflösen von erstarrten Strukturen, die uns auf dem Lebensweg aus alten Glaubensprogrammen und Verhaltensnormen behindern.',
    'Wir bitten um die Offenbarung der göttlichen Geheimnisse, die uns die größeren Zusammenhänge der aufeinander abgestimmten geistigen Hierarchien einsichtig machen. Wir erbitten den Schutz vor machthungrigen Vorgesetzten, Politikern, vor Ungerechtigkeit, Mobbing am Arbeitsplatz, vor Massenhysterie und Massenbeeinflussungen, vor negativen Einflüssen durch Schadensmagie.',
    'Wir bitten in TZ‘I auch um den Schutz unseres Hauses und unserer Familie. Wir verbinden uns bei laufenden Gerichtsprozessen aus TZ’I mit den geistigen Schutzkräften, aus deren Weisheit eine zum Wohle für alle Beteiligten sich ergebende Lösung gefunden werden möge.'
  ],
  'rechte Gehirnhälfte, die Intuition, der Instinkt',
  'der Hund, Schutztiere'
)
on conflict (nahual_index, lang) do update set
  heading = excluded.heading,
  directions = excluded.directions,
  body = excluded.body,
  ceremonies = excluded.ceremonies,
  body_level = excluded.body_level,
  power_animal = excluded.power_animal,
  updated_at = now();
