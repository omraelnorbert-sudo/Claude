/**
 * Textos visibles de la Cruz MAYA en español — traducción de trabajo de
 * lib/maya-cross-texts.ts, misma estructura y claves.
 */

import type { MayaCrossPositionText } from "@/lib/maya-cross-texts";

export const MAYA_CROSS_TEXTS_ES: {
  title: string;
  lead: string;
  hint: string;
  disclaimer: string;
  positions: Record<
    "conception" | "masculine" | "birth" | "feminine" | "maturity",
    MayaCrossPositionText
  >;
  errors: Record<"invalidDate" | "dateOutOfRange" | "calculationFailed", string>;
} = {
  title: "Tu Cruz MAYA",

  lead:
    "La Cruz MAYA representa, junto a tu Nahual de nacimiento, cuatro energías " +
    "adicionales. Se calculan a partir de días reales del calendario alrededor de " +
    "tu cumpleaños — ocho y seis días antes, seis y ocho días después.",

  hint:
    "La representación se lee como un espejo: a la izquierda la fuerza femenina, " +
    "a la derecha la fuerza masculina. Ambas designaciones se refieren a una " +
    "cualidad energética, no al sexo biológico.",

  disclaimer:
    "La Cruz MAYA se basa en el calendario Cholq'ij de 260 días. Las posiciones " +
    "representadas sirven para la interpretación cultural y espiritual, y no son un " +
    "análisis científico de la personalidad ni una predicción concreta del futuro. " +
    "La interpretación y la denominación pueden variar entre las tradiciones MAYA y " +
    "los Ajq'ijab'. Un cálculo digital no sustituye la interpretación personal de un " +
    "Ajq'ij formado.",

  positions: {
    conception: {
      title: "Concepción / Origen",
      short: "Origen",
      description:
        "Origen, procedencia, vínculo ancestral y el proyecto de vida ya dispuesto " +
        "antes del nacimiento. Esta posición se denomina a veces, de forma " +
        "simplificada, «pasado».",
    },
    masculine: {
      title: "Fuerza masculina",
      short: "Fuerza masculina",
      description:
        "La fuerza generativa, orientada hacia afuera: la acción, el trabajo, la " +
        "realización, el rol social — y lo que el mundo exterior exige de ti. Se " +
        "refiere a una cualidad energética, no al sexo biológico.",
    },
    birth: {
      title: "Nahual de nacimiento / Centro",
      short: "Centro",
      description:
        "La energía central de nacimiento: tu núcleo esencial y las capacidades y " +
        "desafíos fundamentales con los que das forma a tu camino de vida.",
    },
    feminine: {
      title: "Fuerza femenina",
      short: "Fuerza femenina",
      description:
        "La fuerza intuitiva, emocional, receptiva y materializadora. Sostiene el " +
        "crecimiento, el desarrollo y el despliegue del proyecto de vida. También " +
        "aquí se refiere a una cualidad energética, no al sexo biológico.",
    },
    maturity: {
      title: "Madurez / Destino",
      short: "Madurez",
      description:
        "Maduración, despliegue, realización y el posible resultado del camino de " +
        "vida. Esta posición se denomina a veces, de forma simplificada, «futuro», " +
        "pero no es una predicción concreta.",
    },
  },

  errors: {
    invalidDate: "Esta fecha no existe. Por favor, revisa el día, el mes y el año.",
    dateOutOfRange:
      "Para la Cruz MAYA se calculan también ocho días antes y después del " +
      "cumpleaños. Por eso abarca el período del 9 de enero de 1830 al 23 de " +
      "diciembre de 2099.",
    calculationFailed: "No se pudo calcular la Cruz MAYA.",
  },
};
