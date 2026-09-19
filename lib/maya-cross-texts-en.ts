/**
 * English texts of the Maya Cross — translation of
 * lib/maya-cross-texts.ts, same structure and keys.
 */

import type { MayaCrossPositionText } from "@/lib/maya-cross-texts";

export const MAYA_CROSS_TEXTS_EN: {
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
  title: "Your Maya Cross",

  lead:
    "Alongside your birth Nahual, the Maya Cross shows four further energies. " +
    "They are calculated from real calendar days around your birthday — eight " +
    "and six days before, six and eight days after.",

  hint:
    "The layout is read like a mirror: the feminine force on the left, the " +
    "masculine force on the right. Both terms refer to an energetic quality, " +
    "not biological sex.",

  disclaimer:
    "The Maya Cross is based on the 260-day Cholq'ij calendar. The positions " +
    "shown serve cultural and spiritual interpretation and are not a scientific " +
    "personality analysis or a concrete prediction of the future. Interpretation " +
    "and naming can vary between MAYA traditions and Ajq'ijab'. A digital " +
    "calculation does not replace the personal interpretation of a trained " +
    "Ajq'ij.",

  positions: {
    conception: {
      title: "Conception / Origin",
      short: "Origin",
      description:
        "Origin, heritage, ancestral connection and the life project already laid " +
        "out before birth. This position is sometimes simplified as the \"past\".",
    },
    masculine: {
      title: "Masculine force",
      short: "Masculine force",
      description:
        "The generative, outward-directed force: action, work, achievement, social " +
        "role — and what the outer world demands of you. This refers to an " +
        "energetic quality, not biological sex.",
    },
    birth: {
      title: "Birth Nahual / Center",
      short: "Center",
      description:
        "The central birth energy: your core essence and the fundamental abilities " +
        "and challenges with which you shape your path in life.",
    },
    feminine: {
      title: "Feminine force",
      short: "Feminine force",
      description:
        "The intuitive, emotional, receiving and materializing force. It carries " +
        "growth, development and the unfolding of the life project. Here too, an " +
        "energetic quality is meant, not biological sex.",
    },
    maturity: {
      title: "Maturity / Destiny",
      short: "Maturity",
      description:
        "Maturing, unfolding, fulfillment and the possible outcome of life's path. " +
        "This position is sometimes simplified as the \"future\", but it is not a " +
        "concrete prediction.",
    },
  },

  errors: {
    invalidDate: "This date doesn't exist. Please check the day, month and year.",
    dateOutOfRange:
      "The Maya Cross also calculates eight days before and after the birthday. " +
      "That's why it covers the period from January 9, 1830 to December 23, 2099.",
    calculationFailed: "The Maya Cross could not be calculated.",
  },
};
