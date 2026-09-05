// Kurzbeschreibungen der 20 Nahuales in einfacher Sprache, verdichtet aus der
// "Langfassung" (PDF) von pazmundo.com (Paz Mundo Mayakalender). Die Original-
// Langfassung ist sehr ausführlich und fachsprachlich (mehrere Seiten pro Nahual);
// diese Kurzfassung ist eine eigenständige, vereinfachte Zusammenfassung davon.

import { NAHUALES } from "@/lib/nahual";

export interface NahualDescription {
  /** Sehr kurze Essenz, aus `summary` verdichtet — für enge Stellen wie das Maya-Kreuz. */
  kurz: string;
  summary: string;
  krafttier: string;
}

export const NAHUAL_DESCRIPTIONS: Record<(typeof NAHUALES)[number], NahualDescription> = {
  "B'aatz'": {
    summary:
      "B'aatz' ist der Anfang: das erste Zeichen im heiligen Kalender und ein Symbol für die Verbindung zum Göttlichen — wie eine unsichtbare Nabelschnur, die uns durch die Zeit trägt. Er steht für Kunst, Kultur und menschliche Kreativität. Menschen mit diesem Nahual sind oft besonnen, achtsam und gute Vermittler zwischen verschiedenen Welten und Kulturen — ihre Herausforderung ist, nicht in Hochmut oder Kontrollstreben zu verfallen.",
    kurz: "Ursprung, Kunst und Kultur",
    krafttier: "Der Affe, Symbol für Weisheit, Kunst und Beweglichkeit.",
  },
  Ee: {
    summary:
      "Ee ist der Weg selbst — der Nahual der Lebensreise und des inneren Kompasses, der uns zu unserer Bestimmung führt. Er begleitet Aufbrüche: neue Projekte, Partnerschaften, Reisen. Menschen mit diesem Nahual sind eigenständig, gute Wegweiser für andere und oft in beratenden oder spirituellen Berufen zu finden — sie laufen aber Gefahr, sich zu isolieren oder allwissend zu wirken.",
    kurz: "Der Weg und die Bestimmung",
    krafttier: "Die Wildkatze, unter anderem der weiße Jaguar und der weiße Wolf.",
  },
  Aaj: {
    summary:
      "Aaj steht für Aussaat und Gemeinschaft — den Samen, den wir in unser Miteinander legen, und die Ernte, die daraus wächst. Er ist eng mit Familie, Zugehörigkeit und dem Lebensbaum verbunden. Menschen mit diesem Nahual sind fürsorglich, teamfähig und oft gute Eltern oder Heiler — ihre Schwäche liegt in mangelnder Beständigkeit und fehlender Verwurzelung.",
    kurz: "Aussaat, Familie und Zugehörigkeit",
    krafttier: "Wale und Delfine, als Sinnbild für Gemeinschaft.",
  },
  "I'x": {
    summary:
      "I'x verkörpert die mütterliche Kraft der Erde: Fruchtbarkeit, Naturverbundenheit und die heiligen Orte in der Landschaft. Menschen mit diesem Nahual sind kraftvoll, bodenständig und naturliebend, oft mit einem besonderen Zugang zu Heilarbeit — im Schatten können daraus Sturheit oder Aggression werden.",
    kurz: "Mutter Erde und ihre heiligen Orte",
    krafttier: "Der schwarze Jaguar, Symbol für Klarheit und Furchtlosigkeit in der Dunkelheit.",
  },
  "Tz'ikin": {
    summary:
      "Tz'ikin fliegt wie der Adler über die Dinge hinweg und steht für Glück, Fülle und den weiten Blick von oben. Er gilt als Bote zwischen den Welten und schenkt Klarheit, Weitsicht und ein gutes Gespür für Chancen. Menschen mit diesem Nahual sind großzügig, geistig klar und bewegen sich leicht zwischen materiellem Erfolg und spiritueller Tiefe.",
    kurz: "Weitblick, Glück und Fülle",
    krafttier: "Der Adler, auch Kondor und Quetzal.",
  },
  Ajmaq: {
    summary:
      "Ajmaq ist der Tag der Ahnen und der Vergebung — er hilft, alte Lasten loszulassen und mit dem, was unvollkommen ist, Frieden zu schließen. Menschen mit diesem Nahual sind sehr einfühlsam, hilfsbereit und oft feinfühlig bis hin zur Reizoffenheit, mit einem besonderen Gespür für die Nöte anderer und für die Welt der Ahnen.",
    kurz: "Ahnen und Vergebung",
    krafttier: "Der Uhu, aber auch die Biene und andere Insekten.",
  },
  Noj: {
    summary:
      "Noj ist der Nahual der Weisheit — der Ort, an dem Verstand und Herz zusammenfinden. Er steht für Wissen, Erkenntnis und klares Denken. Menschen mit diesem Nahual haben oft viele gute Ideen, einen ausgeprägten Gerechtigkeitssinn und ein starkes Gedächtnis — sie sind geborene Lehrer und Wissensvermittler.",
    kurz: "Weisheit von Verstand und Herz",
    krafttier: "Der Affe, auch der Specht und der Kojote.",
  },
  Tijaax: {
    summary:
      "Tijaax steht für Klarheit und die Kraft der Frau — Geradlinigkeit, verbunden mit Mitgefühl und Herzenswärme. Er fordert dazu auf, Licht- und Schattenseiten in sich zu erkennen und auszubalancieren. Menschen mit diesem Nahual sind optimistisch, teamfähig, verlässlich in Freundschaften und setzen sich klar gegen Ungerechtigkeit ein.",
    kurz: "Klarheit zwischen Licht und Schatten",
    krafttier: "Der Schwertfisch, auch der Hai.",
  },
  Kawoq: {
    summary:
      "Kawoq hütet die Gemeinschaft — vom Dorf bis zur ganzen Menschheitsfamilie — und verbindet die Kräfte von Wasser und Feuer, wie in einem Gewitter. Menschen mit diesem Nahual übernehmen gerne Verantwortung in sozialen oder politischen Aufgaben, sind naturverbunden und oft gute Heiler oder Kräuterkundige.",
    kurz: "Gemeinschaft, Wasser und Feuer",
    krafttier: "Die Schildkröte.",
  },
  Ajpuu: {
    summary:
      "Ajpuu ist die Sonnenkraft — Symbol für Klarheit, Sicherheit und die Verbindung zum Göttlichen als nährende, wärmende Kraft. Menschen mit diesem Nahual wirken sonnig, sicher und klar, sind verlässliche Freunde und Partner mit einer natürlichen Ausstrahlung von Wärme.",
    kurz: "Sonnenkraft, Klarheit und Wärme",
    krafttier: "Der Löwe.",
  },
  Imox: {
    summary:
      "Imox ist die Kraft des Wassers — die Welt der Gefühle, Träume und Visionen. Er öffnet den Zugang zur Intuition und zu dem, was unter der Oberfläche liegt. Menschen mit diesem Nahual sind mitfühlend, hilfsbereit, oft visionär und zugleich überraschend geschäftstüchtig.",
    kurz: "Wasser, Traum und Intuition",
    krafttier: "Das Krokodil, auch der Leguan.",
  },
  "Iq'": {
    summary:
      "Iq' ist der Wind — reinigend, klar und beweglich wie der Geist selbst. Er steht für Intellekt, Klarheit und die Kraft der Sprache und der Musik. Menschen mit diesem Nahual haben klare Ideen, erfassen Neues rasch und können andere leicht von ihren Gedanken überzeugen.",
    kurz: "Wind, Sprache und Klarheit",
    krafttier: "Der Falke, auch der Kolibri.",
  },
  "Ak'ab'al": {
    summary:
      "Ak'ab'al ist die Dämmerung — der Übergang zwischen zwei Zuständen: von Kindheit zu Erwachsensein, von Krankheit zu Heilung, von Dunkel zu Licht. Menschen mit diesem Nahual sind starke Brückenbauer, die das Licht in anderen wecken können, oft zurückhaltend und gerne für sich.",
    kurz: "Dämmerung und Übergang",
    krafttier: "Die Fledermaus, auch die Eule.",
  },
  Kat: {
    summary:
      "Kat ist das Netzwerk — die verbindenden Fäden zwischen Menschen, Familien und Gemeinschaften. Er steht für Teamgeist und das Gefühl von Zugehörigkeit. Menschen mit diesem Nahual sind feinfühlig, ordnungsliebend und schaffen durch ihre Präsenz ein Gefühl von Geborgenheit in Gruppen.",
    kurz: "Das Netz, das Menschen verbindet",
    krafttier: "Die Eidechse und die Spinne, Sinnbilder der Verwandlung.",
  },
  Kaan: {
    summary:
      "Kaan ist die Kraft der Schlange — Transformation, Lebensenergie und die aufsteigende Kraft, die man aus alten Traditionen kennt. Menschen mit diesem Nahual haben viel Lebenskraft, sind intelligent und dienen gerne der Gemeinschaft, oft mit einem Faible für Technik und Wissenschaft.",
    kurz: "Schlangenkraft und Verwandlung",
    krafttier: "Die Schlange, auch der Drache.",
  },
  Keme: {
    summary:
      "Keme ist der Tod als Bruder und Wandler — kein Ende, sondern der Übergang vor einer Neugeburt. Er steht für Wandel, Loslassen und die Verbindung zur Welt der Ahnen. Menschen mit diesem Nahual haben oft eine starke Verbindung zu anderen Ebenen, sind sehr intuitiv, mitfühlend und wirken häufig als Heiler oder Wegbegleiter.",
    kurz: "Wandel, Loslassen und Ahnen",
    krafttier: "Der Rabe, auch die Eule.",
  },
  Kiej: {
    summary:
      "Kiej bringt die vier Himmelsrichtungen und Elemente in Balance — verkörpert im Hirsch, wach, kraftvoll und instinktsicher. Menschen mit diesem Nahual sind agil, verantwortungsbewusst und übernehmen gerne Führung, mit einer starken inneren und äußeren Verbindung zur Natur.",
    kurz: "Balance der vier Richtungen",
    krafttier: "Der Hirsch, auch das Pferd.",
  },
  "Q'anil": {
    summary:
      "Q'anil ist der Same — Fruchtbarkeit, Wachstum und das Sichtbarwerden neuer Ideen und Projekte. Menschen mit diesem Nahual sind intuitiv, motivierend und gute Umsetzer von Visionen, oft mit künstlerischer oder unternehmerischer Ader.",
    kurz: "Same, Wachstum und Fruchtbarkeit",
    krafttier: "Das Kaninchen, auch der Hase.",
  },
  Tooj: {
    summary:
      "Tooj steht für den Ausgleich von Geben und Nehmen — die Bereitschaft, zu teilen, öffnet den Weg für neue Fülle. Menschen mit diesem Nahual sind gelassen, gemeinschaftsorientiert und geben gerne, sollten aber lernen, dabei auch auf sich selbst zu achten.",
    kurz: "Ausgleich von Geben und Nehmen",
    krafttier: "Der Hund, als Sinnbild bedingungsloser Hingabe.",
  },
  "Tz'i'": {
    summary:
      "Tz'i' steht für Ordnung, Gerechtigkeit und die Treue zu den eigenen Werten — das letzte Zeichen im 20er-Zyklus, das den Kreis wieder schließt. Menschen mit diesem Nahual sind eigenständig, loyal und haben einen ausgeprägten Sinn für Recht und Wahrheit, oft in Berufen wie Recht oder Verwaltung zu Hause.",
    kurz: "Ordnung, Recht und Treue",
    krafttier: "Der Hund, als treuer Beschützer.",
  },
};
