// Impressum, Haftungsausschluss und Datenschutz von cosmovisionmaya.org —
// deutsch, spanisch, englisch. Eine Seite pro Sprache: /impressum,
// /es/impressum, /en/impressum.
//
// Impressum und Haftungsausschluss wie auf www.pazmundo.com (Organisation
// PAZ MUNDO, Norbert Muigg). Der Datenschutzteil beschreibt, was diese Seite
// wirklich tut — Stand 16.10.2026:
// - Hosting bei Netlify, Daten (Texte, Anmeldung, Profile) bei Supabase
// - Anmelden per E-Mail-Link oder Google; Profil mit E-Mail, Name,
//   Geburtsdatum, Nahual, Sprache, E-Mail-Zustimmung (supabase/schema_admin.sql)
// - tägliche Botschaften per E-Mail über Resend
// - Horoskop-Rechner rechnet im Browser, ohne Übertragung
// - YouTube-Videos eingebettet (youtube-nocookie.com)
// - Spenden: Payrexx-Fenster, lädt erst beim Klick
// - Schriften über next/font selbst ausgeliefert, keine Statistik
// Kommt etwas dazu (Statistik, Formular, neuer Dienst), muss es hier rein —
// in allen drei Sprachen.

export type Sprache = "de" | "es" | "en";
export type Abschnitt = { titel: string; absaetze: string[] };

export type Rechtliches = {
  titel: string;
  beschreibung: string;
  eyebrow: string;
  h1: string;
  impressumH2: string;
  land: string;
  haftungH2: string;
  haftung: Abschnitt[];
  datenschutzH2: string;
  datenschutz: Abschnitt[];
  massgeblich?: string;
};

export const RECHTLICHES: Record<Sprache, Rechtliches> = {
  de: {
    titel: "Impressum und Datenschutz",
    beschreibung: "Impressum, Haftungsausschluss und Datenschutz von cosmovisionmaya.org.",
    eyebrow: "Offenlegung",
    h1: "Impressum und Datenschutz",
    impressumH2: "Impressum",
    land: "Österreich",
    haftungH2: "Haftungsausschluss",
    haftung: [
      {
        titel: "Inhalt des Onlineangebotes",
        absaetze: [
          "Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.",
          "Die Auslegung und Benennung können zwischen den Maya-Traditionen variieren. Eine digitale Einsicht ersetzt keine persönliche Auslegung durch einen Horoskopweisen und keine ärztliche oder therapeutische Beratung.",
        ],
      },
      {
        titel: "Verweise und Links",
        absaetze: [
          "Bei direkten oder indirekten Verweisen auf fremde Internetseiten („Links“), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Für die Inhalte der verlinkten Seiten haftet allein deren Anbieter.",
        ],
      },
      {
        titel: "Urheber- und Kennzeichenrecht",
        absaetze: [
          "Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.",
        ],
      },
    ],
    datenschutzH2: "Datenschutz",
    datenschutz: [
      {
        titel: "Verantwortlicher",
        absaetze: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist die Organisation PAZ MUNDO, Norbert Muigg, Vorderthiersee 87d, 6335 Thiersee, Österreich, kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Hosting",
        absaetze: [
          "Diese Website wird bei Netlify, Inc. (San Francisco, USA) betrieben. Bei jedem Aufruf verarbeitet Netlify technisch notwendige Daten — IP-Adresse, Zeitpunkt, aufgerufene Adresse und Angaben zum Browser —, um die Seite auszuliefern und vor Missbrauch zu schützen. Diese Daten können auch auf Servern in den USA verarbeitet werden. Grundlage ist unser berechtigtes Interesse an einem sicheren Betrieb der Website.",
        ],
      },
      {
        titel: "Horoskop-Rechner",
        absaetze: [
          "Ihr Geburtsdatum wird für das Horoskop direkt in Ihrem Browser berechnet. Es wird dabei nicht an uns übertragen und nicht gespeichert — außer Sie melden sich an und speichern es in Ihrem Profil.",
        ],
      },
      {
        titel: "Anmelden und Profil",
        absaetze: [
          "Sie können sich freiwillig anmelden — mit einem Anmeldelink an Ihre E-Mail-Adresse oder mit Ihrem Google-Konto. Bei der Anmeldung mit Google übermittelt Google uns Ihre E-Mail-Adresse und Ihren Namen.",
          "In Ihrem Profil speichern wir: E-Mail-Adresse, Namen, auf Wunsch Geburtsdatum und Nahual, Ihre bevorzugte Sprache und ob Sie die täglichen Botschaften per E-Mail erhalten möchten. Die Daten liegen bei Supabase, Inc. (USA), unserem Datenbank-Anbieter. Grundlage ist Ihre Einwilligung bzw. die Nutzung des Angebots, für das Sie sich angemeldet haben.",
          "Solange Sie angemeldet sind, setzt die Website technisch notwendige Cookies, die Ihre Anmeldung halten. Andere Cookies gibt es nicht.",
        ],
      },
      {
        titel: "Tägliche Botschaften per E-Mail",
        absaetze: [
          "Wenn Sie die täglichen Botschaften abonniert haben, versenden wir sie über Resend (Resend, Inc., USA). Dafür werden Ihre E-Mail-Adresse, Ihre Sprache und der Tagesnahual verarbeitet, und wir protokollieren, ob eine E-Mail zugestellt wurde. Sie können die Botschaften jederzeit abbestellen — im Profil oder mit einer Nachricht an kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Videos",
        absaetze: [
          "Auf den Seiten der Nahuales und unter „Videos“ sind Videos von YouTube eingebettet, im erweiterten Datenschutzmodus (youtube-nocookie.com). Beim Aufruf dieser Seiten wird eine Verbindung zu YouTube (Google Ireland Limited) hergestellt; dabei werden Ihre IP-Adresse und Angaben zum Browser übertragen. Erst wenn Sie ein Video abspielen, kann YouTube weitere Daten erheben.",
        ],
      },
      {
        titel: "Online spenden",
        absaetze: [
          "Der Knopf „Online spenden“ öffnet das Zahlungsfenster von Payrexx AG (Schweiz) direkt auf dieser Seite. Erst mit diesem Klick werden die dafür nötigen Programme geladen — von Payrexx und von cdnjs (Cloudflare, USA) —, dabei erhalten diese Ihre IP-Adresse und Angaben zum Browser. Was Sie im Zahlungsfenster eingeben, wird von Payrexx verarbeitet; es gilt deren Datenschutzerklärung.",
        ],
      },
      {
        titel: "Keine Statistik",
        absaetze: [
          "Diese Website verwendet keine Analyse- oder Werbedienste. Die Schriften werden von dieser Website selbst ausgeliefert; beim Aufruf werden keine Daten an Google Fonts übertragen.",
        ],
      },
      {
        titel: "Ihre Rechte",
        absaetze: [
          "Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, auf Berichtigung, Löschung und Einschränkung der Verarbeitung, auf Datenübertragbarkeit, auf Widerruf einer Einwilligung sowie auf Widerspruch. Schreiben Sie dazu an kontakt@pazmundo.com. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, in Österreich bei der Datenschutzbehörde (dsb.gv.at).",
        ],
      },
      {
        titel: "Rechtswirksamkeit",
        absaetze: [
          "Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile in ihrem Inhalt und ihrer Gültigkeit davon unberührt.",
        ],
      },
    ],
  },
  es: {
    titel: "Aviso legal y privacidad",
    beschreibung: "Aviso legal, exención de responsabilidad y privacidad de cosmovisionmaya.org.",
    eyebrow: "Información legal",
    h1: "Aviso legal y privacidad",
    impressumH2: "Aviso legal",
    land: "Austria",
    massgeblich: "Esta es una traducción. En caso de duda, vale la versión en alemán.",
    haftungH2: "Exención de responsabilidad",
    haftung: [
      {
        titel: "Contenido",
        absaetze: [
          "El autor no garantiza la actualidad, exactitud, integridad ni calidad de la información ofrecida. Quedan excluidas en principio las reclamaciones de responsabilidad por daños causados por el uso o no uso de la información, salvo dolo o negligencia grave demostrados por parte del autor.",
          "La interpretación y la denominación pueden variar entre las tradiciones MAYA. Una lectura digital no sustituye la interpretación personal de un sabio del horóscopo ni un consejo médico o terapéutico.",
        ],
      },
      {
        titel: "Enlaces",
        absaetze: [
          "De los contenidos de sitios web ajenos enlazados responde únicamente su proveedor. El autor solo sería responsable si conociera contenidos ilegales y le fuera técnicamente posible y razonable impedir su uso.",
        ],
      },
      {
        titel: "Derechos de autor",
        absaetze: [
          "Los derechos de autor de los contenidos creados por el autor quedan exclusivamente en sus manos. No se permite reproducirlos ni utilizarlos en otras publicaciones sin su consentimiento expreso.",
        ],
      },
    ],
    datenschutzH2: "Privacidad",
    datenschutz: [
      {
        titel: "Responsable",
        absaetze: [
          "El responsable del tratamiento de datos en este sitio web es la organización PAZ MUNDO, Norbert Muigg, Vorderthiersee 87d, 6335 Thiersee, Austria, kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Alojamiento web",
        absaetze: [
          "Este sitio web está alojado en Netlify, Inc. (San Francisco, EE. UU.). En cada visita, Netlify trata datos técnicamente necesarios —dirección IP, hora, dirección solicitada y datos del navegador— para entregar la página y protegerla contra abusos. Estos datos también pueden tratarse en servidores de EE. UU.",
        ],
      },
      {
        titel: "Calculadora del horóscopo",
        absaetze: [
          "Tu fecha de nacimiento se calcula directamente en tu navegador. No se nos transmite ni se guarda, salvo que inicies sesión y la guardes en tu perfil.",
        ],
      },
      {
        titel: "Inicio de sesión y perfil",
        absaetze: [
          "Puedes iniciar sesión de forma voluntaria, con un enlace a tu correo electrónico o con tu cuenta de Google. Con Google, Google nos transmite tu correo electrónico y tu nombre.",
          "En tu perfil guardamos: correo electrónico, nombre, si lo deseas fecha de nacimiento y nahual, tu idioma preferido y si quieres recibir los mensajes diarios por correo. Los datos están en Supabase, Inc. (EE. UU.), nuestro proveedor de base de datos.",
          "Mientras tienes la sesión iniciada, el sitio usa cookies técnicamente necesarias para mantenerla. No hay otras cookies.",
        ],
      },
      {
        titel: "Mensajes diarios por correo",
        absaetze: [
          "Si te suscribes a los mensajes diarios, los enviamos a través de Resend (Resend, Inc., EE. UU.). Para ello se tratan tu correo electrónico, tu idioma y el nahual del día, y registramos si el correo se entregó. Puedes darte de baja en cualquier momento, en tu perfil o escribiendo a kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Vídeos",
        absaetze: [
          "En las páginas de los nahuales y en «Vídeos» hay vídeos de YouTube integrados en el modo de privacidad mejorada (youtube-nocookie.com). Al abrir esas páginas se establece una conexión con YouTube (Google Ireland Limited) y se transmiten tu dirección IP y datos del navegador. Solo al reproducir un vídeo YouTube puede recoger más datos.",
        ],
      },
      {
        titel: "Donar en línea",
        absaetze: [
          "El botón «Donar en línea» abre la ventana de pago de Payrexx AG (Suiza) directamente en esta página. Solo con ese clic se cargan los programas necesarios —de Payrexx y de cdnjs (Cloudflare, EE. UU.)—, que reciben tu dirección IP y datos del navegador. Lo que introduzcas en la ventana de pago lo procesa Payrexx, según su propia política de privacidad.",
        ],
      },
      {
        titel: "Sin estadísticas",
        absaetze: [
          "Este sitio web no usa servicios de análisis ni de publicidad. Las fuentes tipográficas se sirven desde este mismo sitio.",
        ],
      },
      {
        titel: "Tus derechos",
        absaetze: [
          "Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad, revocación del consentimiento y oposición. Escribe a kontakt@pazmundo.com. También puedes reclamar ante una autoridad de protección de datos; en Austria, la Datenschutzbehörde (dsb.gv.at).",
        ],
      },
    ],
  },
  en: {
    titel: "Legal notice and privacy",
    beschreibung: "Legal notice, disclaimer and privacy of cosmovisionmaya.org.",
    eyebrow: "Disclosure",
    h1: "Legal notice and privacy",
    impressumH2: "Legal notice",
    land: "Austria",
    massgeblich: "This is a translation. In case of doubt, the German version applies.",
    haftungH2: "Disclaimer",
    haftung: [
      {
        titel: "Content",
        absaetze: [
          "The author accepts no liability for the topicality, correctness, completeness or quality of the information provided. Liability claims for damage caused by the use or non-use of the information are excluded, unless the author can be shown to have acted with intent or gross negligence.",
          "Interpretation and naming may vary between MAYA traditions. A digital reading does not replace a personal interpretation by a horoscope sage, nor medical or therapeutic advice.",
        ],
      },
      {
        titel: "Links",
        absaetze: [
          "The provider of a linked external website is solely responsible for its content. The author would only be liable if he knew of illegal content and it were technically possible and reasonable to prevent its use.",
        ],
      },
      {
        titel: "Copyright",
        absaetze: [
          "Copyright for content created by the author remains solely with the author. Reproduction or use in other publications is not permitted without his express consent.",
        ],
      },
    ],
    datenschutzH2: "Privacy",
    datenschutz: [
      {
        titel: "Controller",
        absaetze: [
          "The controller for data processing on this website is the organisation PAZ MUNDO, Norbert Muigg, Vorderthiersee 87d, 6335 Thiersee, Austria, kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Hosting",
        absaetze: [
          "This website is hosted by Netlify, Inc. (San Francisco, USA). Each time the site is accessed, Netlify processes technically necessary data — IP address, time, requested address and browser information — to deliver the page and protect it against misuse. This data may also be processed on servers in the USA.",
        ],
      },
      {
        titel: "Horoscope calculator",
        absaetze: [
          "Your date of birth is calculated directly in your browser. It is not sent to us or stored — unless you sign in and save it in your profile.",
        ],
      },
      {
        titel: "Signing in and your profile",
        absaetze: [
          "You may sign in voluntarily, with a sign-in link sent to your e-mail address or with your Google account. When you sign in with Google, Google passes your e-mail address and name to us.",
          "In your profile we store: e-mail address, name, if you wish date of birth and nahual, your preferred language and whether you want to receive the daily messages by e-mail. The data is held by Supabase, Inc. (USA), our database provider.",
          "While you are signed in, the site sets technically necessary cookies to keep you signed in. There are no other cookies.",
        ],
      },
      {
        titel: "Daily messages by e-mail",
        absaetze: [
          "If you subscribe to the daily messages, we send them via Resend (Resend, Inc., USA). Your e-mail address, language and the day's nahual are processed for this, and we log whether an e-mail was delivered. You can unsubscribe at any time, in your profile or by writing to kontakt@pazmundo.com.",
        ],
      },
      {
        titel: "Videos",
        absaetze: [
          "The nahual pages and the “Videos” page embed YouTube videos in privacy-enhanced mode (youtube-nocookie.com). When you open these pages, a connection to YouTube (Google Ireland Limited) is made and your IP address and browser information are transmitted. Only when you play a video may YouTube collect further data.",
        ],
      },
      {
        titel: "Donating online",
        absaetze: [
          "The “Donate online” button opens the payment window of Payrexx AG (Switzerland) directly on this page. Only with this click are the necessary programs loaded — from Payrexx and from cdnjs (Cloudflare, USA) — which receive your IP address and browser information. What you enter in the payment window is processed by Payrexx under its own privacy policy.",
        ],
      },
      {
        titel: "No analytics",
        absaetze: [
          "This website uses no analytics or advertising services. The fonts are served by this website itself.",
        ],
      },
      {
        titel: "Your rights",
        absaetze: [
          "You have the right to access, rectification, erasure, restriction of processing, data portability, withdrawal of consent and objection. Please write to kontakt@pazmundo.com. You may also lodge a complaint with a data protection authority; in Austria this is the Datenschutzbehörde (dsb.gv.at).",
        ],
      },
    ],
  },
};
