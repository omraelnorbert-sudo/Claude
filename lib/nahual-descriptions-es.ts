// Versión corta en español de los 20 Nahuales — traducción de trabajo de
// lib/nahual-descriptions.ts, en revisión por Paz Mundo. Ver también
// supabase/schema_nahual_long_texts_es.sql (versión larga).

import { NAHUALES } from "@/lib/nahual";
import type { NahualDescription } from "@/lib/nahual-descriptions";

export const NAHUAL_DESCRIPTIONS_ES: Record<(typeof NAHUALES)[number], NahualDescription> = {
  "B'aatz'": {
    summary:
      "B'aatz' es el comienzo: el primer signo del calendario sagrado y un símbolo de la conexión con lo divino — como un cordón umbilical invisible que nos lleva a través del tiempo. Representa el arte, la cultura y la creatividad humana. Las personas con este Nahual suelen ser prudentes, atentas y buenas mediadoras entre distintos mundos y culturas — su reto es no caer en la soberbia o el afán de control.",
    kurz: "Origen, arte y cultura",
    krafttier: "El mono, símbolo de sabiduría, arte y agilidad.",
  },
  Ee: {
    summary:
      "Ee es el camino mismo — el Nahual del viaje de vida y de la brújula interior que nos guía hacia nuestro destino. Acompaña los nuevos comienzos: proyectos, relaciones, viajes. Las personas con este Nahual son independientes, buenas guías para otros y suelen encontrarse en profesiones de asesoría o espirituales — pero corren el riesgo de aislarse o de parecer sabelotodo.",
    kurz: "El camino y el destino",
    krafttier: "El gato montés, entre ellos el jaguar blanco y el lobo blanco.",
  },
  Aaj: {
    summary:
      "Aaj representa la siembra y la comunidad — la semilla que depositamos en nuestra convivencia y la cosecha que de ella crece. Está estrechamente ligado a la familia, la pertenencia y el árbol de la vida. Las personas con este Nahual son solidarias, buenas para el trabajo en equipo y a menudo buenos padres o sanadores — su debilidad está en la falta de constancia y de arraigo.",
    kurz: "Siembra, familia y pertenencia",
    krafttier: "Ballenas y delfines, como símbolo de comunidad.",
  },
  "I'x": {
    summary:
      "I'x encarna la fuerza materna de la Tierra: fertilidad, conexión con la naturaleza y los lugares sagrados del paisaje. Las personas con este Nahual son fuertes, con los pies en la tierra y amantes de la naturaleza, a menudo con un acceso especial al trabajo de sanación — en la sombra, esto puede convertirse en terquedad o agresividad.",
    kurz: "La Madre Tierra y sus lugares sagrados",
    krafttier: "El jaguar negro, símbolo de claridad e intrepidez en la oscuridad.",
  },
  "Tz'ikin": {
    summary:
      "Tz'ikin vuela como el águila por encima de las cosas y representa la suerte, la plenitud y la amplia mirada desde las alturas. Se le considera mensajero entre los mundos y regala claridad, visión de futuro y buen instinto para las oportunidades. Las personas con este Nahual son generosas, mentalmente claras y se mueven con facilidad entre el éxito material y la profundidad espiritual.",
    kurz: "Visión, suerte y plenitud",
    krafttier: "El águila, también el cóndor y el quetzal.",
  },
  Ajmaq: {
    summary:
      "Ajmaq es el día de los ancestros y del perdón — ayuda a soltar antiguas cargas y a hacer las paces con lo imperfecto. Las personas con este Nahual son muy empáticas, serviciales y a menudo sensibles hasta la hipersensibilidad, con un instinto especial para las necesidades de los demás y para el mundo de los ancestros.",
    kurz: "Ancestros y perdón",
    krafttier: "El búho, pero también la abeja y otros insectos.",
  },
  Noj: {
    summary:
      "Noj es el Nahual de la sabiduría — el lugar donde se encuentran la mente y el corazón. Representa el conocimiento, la comprensión y el pensamiento claro. Las personas con este Nahual suelen tener muchas buenas ideas, un marcado sentido de la justicia y una memoria fuerte — son maestros y transmisores de conocimiento natos.",
    kurz: "Sabiduría de la mente y el corazón",
    krafttier: "El mono, también el pájaro carpintero y el coyote.",
  },
  Tijaax: {
    summary:
      "Tijaax representa la claridad y la fuerza de la mujer — rectitud, unida a la compasión y la calidez de corazón. Invita a reconocer y equilibrar los lados de luz y de sombra en uno mismo. Las personas con este Nahual son optimistas, buenas para el trabajo en equipo, fiables en la amistad y se posicionan claramente contra la injusticia.",
    kurz: "Claridad entre luz y sombra",
    krafttier: "El pez espada, también el tiburón.",
  },
  Kawoq: {
    summary:
      "Kawoq cuida la comunidad — desde el pueblo hasta toda la familia humana — y une las fuerzas del agua y el fuego, como en una tormenta. Las personas con este Nahual asumen con gusto responsabilidades sociales o políticas, están conectadas con la naturaleza y suelen ser buenas sanadoras o conocedoras de hierbas.",
    kurz: "Comunidad, agua y fuego",
    krafttier: "La tortuga.",
  },
  Ajpuu: {
    summary:
      "Ajpuu es la fuerza solar — símbolo de claridad, seguridad y la conexión con lo divino como fuerza nutricia y cálida. Las personas con este Nahual irradian luminosidad, seguridad y claridad, son amigos y parejas fiables con una calidez natural.",
    kurz: "Fuerza solar, claridad y calidez",
    krafttier: "El león.",
  },
  Imox: {
    summary:
      "Imox es la fuerza del agua — el mundo de los sentimientos, los sueños y las visiones. Abre el acceso a la intuición y a lo que yace bajo la superficie. Las personas con este Nahual son compasivas, serviciales, a menudo visionarias y a la vez sorprendentemente hábiles para los negocios.",
    kurz: "Agua, sueño e intuición",
    krafttier: "El cocodrilo, también la iguana.",
  },
  "Iq'": {
    summary:
      "Iq' es el viento — purificador, claro y ágil como el propio espíritu. Representa el intelecto, la claridad y la fuerza de la palabra y de la música. Las personas con este Nahual tienen ideas claras, captan lo nuevo con rapidez y pueden convencer fácilmente a otros de sus pensamientos.",
    kurz: "Viento, palabra y claridad",
    krafttier: "El halcón, también el colibrí.",
  },
  "Ak'ab'al": {
    summary:
      "Ak'ab'al es el crepúsculo — el tránsito entre dos estados: de la infancia a la edad adulta, de la enfermedad a la sanación, de la oscuridad a la luz. Las personas con este Nahual son fuertes constructoras de puentes, capaces de despertar la luz en otros, a menudo reservadas y que disfrutan de estar consigo mismas.",
    kurz: "Crepúsculo y tránsito",
    krafttier: "El murciélago, también el búho.",
  },
  Kat: {
    summary:
      "Kat es la red — los hilos que conectan a personas, familias y comunidades. Representa el espíritu de equipo y el sentimiento de pertenencia. Las personas con este Nahual son sensibles, amantes del orden y crean, con su sola presencia, una sensación de cobijo en los grupos.",
    kurz: "La red que une a las personas",
    krafttier: "La lagartija y la araña, símbolos de la transformación.",
  },
  Kaan: {
    summary:
      "Kaan es la fuerza de la serpiente — transformación, energía vital y la fuerza ascendente que conocemos de las tradiciones antiguas. Las personas con este Nahual tienen mucha vitalidad, son inteligentes y sirven con gusto a la comunidad, a menudo con inclinación hacia la técnica y la ciencia.",
    kurz: "Fuerza de la serpiente y transformación",
    krafttier: "La serpiente, también el dragón.",
  },
  Keme: {
    summary:
      "Keme es la muerte como hermano y transformador — no un final, sino el tránsito antes de un nuevo nacimiento. Representa el cambio, el desapego y la conexión con el mundo de los ancestros. Las personas con este Nahual suelen tener una fuerte conexión con otros planos, son muy intuitivas, compasivas y a menudo actúan como sanadoras o acompañantes.",
    kurz: "Cambio, desapego y ancestros",
    krafttier: "El cuervo, también el búho.",
  },
  Kiej: {
    summary:
      "Kiej pone en equilibrio los cuatro puntos cardinales y los elementos — encarnado en el venado, alerta, vigoroso y de instinto certero. Las personas con este Nahual son ágiles, responsables y asumen con gusto el liderazgo, con una fuerte conexión interior y exterior con la naturaleza.",
    kurz: "Equilibrio de las cuatro direcciones",
    krafttier: "El venado, también el caballo.",
  },
  "Q'anil": {
    summary:
      "Q'anil es la semilla — fertilidad, crecimiento y la manifestación de nuevas ideas y proyectos. Las personas con este Nahual son intuitivas, motivadoras y buenas realizadoras de visiones, a menudo con vena artística o emprendedora.",
    kurz: "Semilla, crecimiento y fertilidad",
    krafttier: "El conejo, también la liebre.",
  },
  Tooj: {
    summary:
      "Tooj representa el equilibrio entre dar y recibir — la disposición a compartir abre el camino hacia una nueva plenitud. Las personas con este Nahual son serenas, orientadas a la comunidad y dan con gusto, aunque deberían aprender también a cuidar de sí mismas.",
    kurz: "Equilibrio entre dar y recibir",
    krafttier: "El perro, como símbolo de entrega incondicional.",
  },
  "Tz'i'": {
    summary:
      "Tz'i' representa el orden, la justicia y la lealtad a los propios valores — el último signo del ciclo de 20, que cierra el círculo. Las personas con este Nahual son independientes, leales y tienen un marcado sentido de la justicia y la verdad, a menudo en profesiones como el derecho o la administración.",
    kurz: "Orden, justicia y lealtad",
    krafttier: "El perro, como fiel protector.",
  },
};
