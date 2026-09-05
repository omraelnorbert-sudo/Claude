import assert from "node:assert/strict";
import test, { describe } from "node:test";

import { NAHUALES, calculateNahual } from "@/lib/nahual";
import {
  MAYA_CALENDAR_CONFIG,
  MAYA_CROSS_POSITION_KEYS,
  MayaCrossError,
  addCalendarDays,
  calculateCholqijForDate,
  calculateMayaCross,
  formatCalendarDate,
  gregorianToJulianDay,
  isRealCalendarDate,
  isSupportedCrossBirthDate,
  julianDayToGregorian,
  mod,
  parseCalendarDate,
  type CalendarDate,
} from "@/lib/maya-cross";

// ---------------------------------------------------------------------------
// Hilfen
// ---------------------------------------------------------------------------

const YEARS = MAYA_CALENDAR_CONFIG.supportedYears;

function eachSupportedDay(visit: (date: CalendarDate) => void): number {
  let count = 0;
  for (let year = YEARS.from; year <= YEARS.to; year++) {
    for (let month = 1; month <= 12; month++) {
      const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
      for (let day = 1; day <= days; day++) {
        visit({ year, month, day });
        count++;
      }
    }
  }
  return count;
}

// ---------------------------------------------------------------------------

describe("mod()", () => {
  test("liefert bei negativen Werten ein Ergebnis in [0, divisor)", () => {
    assert.equal(mod(-1, 13), 12);
    assert.equal(mod(-13, 13), 0);
    assert.equal(mod(-14, 13), 12);
    assert.equal(mod(-1, 20), 19);
    assert.equal(mod(-260, 260), 0);
    assert.equal(mod(-261, 260), 259);
  });

  test("verhält sich bei nicht-negativen Werten wie %", () => {
    for (const value of [0, 1, 12, 13, 14, 259, 260, 261]) {
      assert.equal(mod(value, 13), value % 13);
      assert.equal(mod(value, 20), value % 20);
    }
  });
});

describe("Datumsumrechnung", () => {
  test("bekannte Julian Day Numbers (ganzzahlig, Tagesbeginn Mitternacht)", () => {
    assert.equal(gregorianToJulianDay({ year: 2000, month: 1, day: 1 }), 2451545);
    assert.equal(gregorianToJulianDay({ year: 1970, month: 1, day: 1 }), 2440588);
    assert.equal(gregorianToJulianDay({ year: 1858, month: 11, day: 17 }), 2400001);
  });

  test("JDN und Kalenderdatum sind über den gesamten Bereich umkehrbar", () => {
    const from = gregorianToJulianDay({ year: YEARS.from, month: 1, day: 1 });
    const to = gregorianToJulianDay({ year: YEARS.to, month: 12, day: 31 });
    for (let jdn = from; jdn <= to; jdn++) {
      assert.equal(gregorianToJulianDay(julianDayToGregorian(jdn)), jdn);
    }
  });

  test("parseCalendarDate liest reine Kalenderdaten", () => {
    assert.deepEqual(parseCalendarDate("1979-06-04"), { year: 1979, month: 6, day: 4 });
    assert.deepEqual(parseCalendarDate("2000-02-29"), { year: 2000, month: 2, day: 29 });
  });

  test("parseCalendarDate weist Unfug zurück", () => {
    for (const input of ["", "1979-6-4", "04.06.1979", "2000/01/01", "abc"]) {
      assert.throws(() => parseCalendarDate(input), (e: unknown) => {
        assert.ok(e instanceof MayaCrossError);
        assert.equal(e.code, "invalidDate");
        return true;
      });
    }
  });

  test("nicht existierende Kalendertage werden erkannt", () => {
    assert.equal(isRealCalendarDate({ year: 2024, month: 2, day: 31 }), false);
    assert.equal(isRealCalendarDate({ year: 2023, month: 2, day: 29 }), false);
    assert.equal(isRealCalendarDate({ year: 2024, month: 2, day: 29 }), true);
    assert.equal(isRealCalendarDate({ year: 1900, month: 2, day: 29 }), false); // kein Schaltjahr
    assert.equal(isRealCalendarDate({ year: 2000, month: 2, day: 29 }), true); // Schaltjahr
    assert.equal(isRealCalendarDate({ year: 2024, month: 4, day: 31 }), false);
    assert.equal(isRealCalendarDate({ year: 2024, month: 13, day: 1 }), false);
    assert.throws(() => parseCalendarDate("2023-02-29"), MayaCrossError);
  });

  test("addCalendarDays über Monats-, Jahres- und Schaltjahresgrenzen", () => {
    const cases: [string, number, string][] = [
      ["2024-01-31", 1, "2024-02-01"],
      ["2024-02-28", 1, "2024-02-29"],
      ["2023-02-28", 1, "2023-03-01"],
      ["2024-12-31", 1, "2025-01-01"],
      ["2025-01-01", -1, "2024-12-31"],
      ["1900-02-28", 1, "1900-03-01"],
      ["2000-02-28", 1, "2000-02-29"],
      ["2024-03-01", -8, "2024-02-22"],
      ["2024-03-05", -6, "2024-02-28"],
      ["2024-01-05", -8, "2023-12-28"],
      ["2024-12-28", 8, "2025-01-05"],
    ];
    for (const [input, offset, expected] of cases) {
      assert.equal(
        formatCalendarDate(addCalendarDays(parseCalendarDate(input), offset)),
        expected,
        `${input} ${offset >= 0 ? "+" : ""}${offset}`,
      );
    }
  });

  test("addCalendarDays ist zeitzonenunabhängig", () => {
    const original = process.env.TZ ?? "";
    const results: string[] = [];
    for (const tz of ["UTC", "Pacific/Kiritimati", "Pacific/Niue", "Europe/Zurich"]) {
      process.env.TZ = tz;
      results.push(formatCalendarDate(addCalendarDays({ year: 1979, month: 6, day: 4 }, -8)));
      results.push(formatCalendarDate(parseCalendarDate("2024-01-01")));
    }
    process.env.TZ = original;
    assert.equal(new Set(results.filter((_, i) => i % 2 === 0)).size, 1);
    assert.equal(new Set(results.filter((_, i) => i % 2 === 1)).size, 1);
  });
});

describe("Cholq'ij eines einzelnen Tages", () => {
  test("Zahl bleibt in 1–13, Nahual-Index in 1–20, Name auflösbar", () => {
    const seenNumbers = new Set<number>();
    const seenIndexes = new Set<number>();
    let date = parseCalendarDate("2020-01-01");
    for (let i = 0; i < 520; i++) {
      const day = calculateCholqijForDate(date);
      assert.ok(day.number >= 1 && day.number <= 13, `Zahl ${day.number}`);
      assert.ok(day.nawalIndex >= 1 && day.nawalIndex <= 20, `Index ${day.nawalIndex}`);
      assert.equal(day.nawalName, NAHUALES[day.nawalIndex - 1]);
      assert.match(day.glyphSrc, /^\/nahuales\/\d{2}\.jpeg$/);
      seenNumbers.add(day.number);
      seenIndexes.add(day.nawalIndex);
      date = addCalendarDays(date, 1);
    }
    assert.equal(seenNumbers.size, 13);
    assert.equal(seenIndexes.size, 20);
  });

  test("beide Zyklen schalten pro Kalendertag um genau eine Position weiter", () => {
    let date = parseCalendarDate("1999-12-20");
    let previous = calculateCholqijForDate(date);
    for (let i = 0; i < 800; i++) {
      date = addCalendarDays(date, 1);
      const current = calculateCholqijForDate(date);
      assert.equal(current.number, mod(previous.number, 13) + 1, formatCalendarDate(date));
      assert.equal(current.nawalIndex, mod(previous.nawalIndex, 20) + 1, formatCalendarDate(date));
      previous = current;
    }
  });

  test("dieselbe Kombination wiederholt sich nach genau 260 Tagen", () => {
    for (const start of ["1830-01-09", "1900-02-27", "1979-06-04", "2024-02-29", "2098-12-31"]) {
      const date = parseCalendarDate(start);
      const a = calculateCholqijForDate(date);
      const b = calculateCholqijForDate(addCalendarDays(date, MAYA_CALENDAR_CONFIG.cycleLength));
      assert.deepEqual({ n: b.number, i: b.nawalIndex }, { n: a.number, i: a.nawalIndex }, start);

      // …und vorher nicht: 259 Tage später ist die Kombination eine andere.
      const c = calculateCholqijForDate(addCalendarDays(date, 259));
      assert.notDeepEqual({ n: c.number, i: c.nawalIndex }, { n: a.number, i: a.nawalIndex }, start);
    }
  });

  test("Daten außerhalb 1830–2099 werden als dateOutOfRange abgewiesen", () => {
    for (const date of [
      { year: 1829, month: 12, day: 31 },
      { year: 2100, month: 1, day: 1 },
    ]) {
      assert.throws(() => calculateCholqijForDate(date), (e: unknown) => {
        assert.ok(e instanceof MayaCrossError);
        assert.equal(e.code, "dateOutOfRange");
        return true;
      });
    }
  });
});

describe("GMT-584283-Äquivalenz der vorhandenen Berechnung", () => {
  // Klassische Reihenfolge der Tageszeichen (0 = Imix). Die Nahual-Liste in
  // lib/nahual.ts ist dieselbe Folge, nur bei B'aatz' (= Chuwen, Position 10)
  // beginnend — daher die dokumentierte Verschiebung um −10.
  const YUCATEC_TO_NAHUAL_INDEX = (yucatecIndex: number) => mod(yucatecIndex - 10, 20) + 1;

  test("Referenz-Fixture: fünf von Hand geprüfte Tage (Korrelation 584283)", () => {
    // Geprüft gegen number = mod(JDN − 584283 + 3, 13) + 1 und
    // yucatecIdx = mod(JDN − 584283 + 19, 20); der Stylebook-Anker
    // "1. Januar 2027 = 6 Kat" ist als erster Fall enthalten.
    const fixture: [string, number, string][] = [
      ["2027-01-01", 6, "Kat"],
      ["1970-01-01", 13, "Kaan"],
      ["2026-09-05", 5, "Keme"],
      ["2000-02-29", 5, "Imox"],
      ["1830-01-01", 8, "B'aatz'"],
    ];
    for (const [date, number, name] of fixture) {
      const day = calculateCholqijForDate(parseCalendarDate(date));
      assert.deepEqual({ number: day.number, name: day.nawalName }, { number, name }, date);
    }
  });

  test("stimmt an allen 98.616 Tagen von 1830 bis 2099 mit GMT 584283 überein", () => {
    let mismatches = 0;
    const days = eachSupportedDay((date) => {
      if (date.year === 1900 && date.month === 2 && date.day === 29) return;
      const d = gregorianToJulianDay(date) - MAYA_CALENDAR_CONFIG.correlation;
      const expectedNumber = mod(d + 3, 13) + 1;
      const expectedIndex = YUCATEC_TO_NAHUAL_INDEX(mod(d + 19, 20));
      const actual = calculateCholqijForDate(date);
      if (actual.number !== expectedNumber || actual.nawalIndex !== expectedIndex) {
        mismatches++;
      }
    });
    assert.equal(days, 98_616);
    assert.equal(mismatches, 0);
  });

  test("der interne Tageszähler ist lückenlos: sum = JDN − countEpochJdn", () => {
    // Indirekt geprüft: kin lässt sich aus dem JDN allein reproduzieren.
    for (const date of ["1830-01-01", "1900-02-28", "1900-03-01", "2026-09-05", "2099-12-31"]) {
      const parsed = parseCalendarDate(date);
      const sum = gregorianToJulianDay(parsed) - MAYA_CALENDAR_CONFIG.countEpochJdn;
      const kin = mod(sum - 1, 260) + 1;
      const legacy = calculateNahual(parsed.day, parsed.month, parsed.year);
      assert.equal(mod(kin + 6, 13) + 1, legacy.number, date);
      assert.equal(mod(kin - 1, 20) + 1, legacy.index, date);
    }
  });
});

describe("calculateMayaCross()", () => {
  test("die fünf Offsets stimmen und sind vollständig", () => {
    const cross = calculateMayaCross("1979-06-04");
    assert.deepEqual(Object.keys(cross.positions), [...MAYA_CROSS_POSITION_KEYS]);
    assert.equal(cross.positions.conception.offsetDays, -8);
    assert.equal(cross.positions.masculine.offsetDays, -6);
    assert.equal(cross.positions.birth.offsetDays, 0);
    assert.equal(cross.positions.feminine.offsetDays, 6);
    assert.equal(cross.positions.maturity.offsetDays, 8);
    assert.equal(cross.birthDate, "1979-06-04");
    assert.equal(cross.correlation, 584283);
  });

  test("jede Position rechnet ihr eigenes verschobenes Kalenderdatum", () => {
    const cross = calculateMayaCross("2024-03-03");
    assert.equal(cross.positions.conception.gregorianDate, "2024-02-24");
    assert.equal(cross.positions.masculine.gregorianDate, "2024-02-26");
    assert.equal(cross.positions.birth.gregorianDate, "2024-03-03");
    assert.equal(cross.positions.feminine.gregorianDate, "2024-03-09");
    assert.equal(cross.positions.maturity.gregorianDate, "2024-03-11");

    // Der Schalttag 2024-02-29 liegt zwischen Empfängnis und Geburt — die
    // Zahlen dürfen sich deshalb nicht "um einen Tag verrechnen".
    for (const key of MAYA_CROSS_POSITION_KEYS) {
      const position = cross.positions[key];
      const direct = calculateCholqijForDate(parseCalendarDate(position.gregorianDate));
      assert.deepEqual(
        { number: position.number, index: position.nawalIndex },
        { number: direct.number, index: direct.nawalIndex },
        key,
      );
    }
  });

  test("das Zentrum entspricht exakt der bestehenden Geburtsnahual-Berechnung", () => {
    for (const date of ["1830-01-09", "1899-12-31", "1900-03-01", "2000-02-29", "2099-12-23"]) {
      const parsed = parseCalendarDate(date);
      const legacy = calculateNahual(parsed.day, parsed.month, parsed.year);
      const birth = calculateMayaCross(date).positions.birth;
      assert.deepEqual(
        { n: birth.number, i: birth.nawalIndex, name: birth.nawalName, g: birth.glyphSrc },
        { n: legacy.number, i: legacy.index, name: legacy.name, g: legacy.glyphSrc },
        date,
      );
    }
  });

  test("Referenz-Fixture: ein vollständiges Kreuz (Korrelation 584283)", () => {
    const cross = calculateMayaCross("1979-06-04");
    assert.deepEqual(
      MAYA_CROSS_POSITION_KEYS.map((key) => {
        const p = cross.positions[key];
        return `${key} ${p.gregorianDate} ${p.number} ${p.nawalName}`;
      }),
      [
        "conception 1979-05-27 1 Tijaax",
        "masculine 1979-05-29 3 Ajpuu",
        "birth 1979-06-04 9 Keme",
        "feminine 1979-06-10 2 Ee",
        "maturity 1979-06-12 4 I'x",
      ],
    );
  });

  test("das Kreuz ist nach 260 Tagen identisch", () => {
    const a = calculateMayaCross("1979-06-04");
    const b = calculateMayaCross(formatCalendarDate(addCalendarDays(parseCalendarDate("1979-06-04"), 260)));
    for (const key of MAYA_CROSS_POSITION_KEYS) {
      assert.deepEqual(
        { n: a.positions[key].number, i: a.positions[key].nawalIndex },
        { n: b.positions[key].number, i: b.positions[key].nawalIndex },
        key,
      );
    }
  });

  test("nimmt sowohl String als auch CalendarDate entgegen", () => {
    assert.deepEqual(
      calculateMayaCross("1979-06-04"),
      calculateMayaCross({ year: 1979, month: 6, day: 4 }),
    );
  });

  test("Invarianten über einen ganzen 260-Tage-Zyklus", () => {
    let date = parseCalendarDate("1994-07-01");
    for (let i = 0; i < 260; i++) {
      const cross = calculateMayaCross(date);
      for (const key of MAYA_CROSS_POSITION_KEYS) {
        const p = cross.positions[key];
        assert.ok(p.number >= 1 && p.number <= 13);
        assert.ok(p.nawalIndex >= 1 && p.nawalIndex <= 20);
        assert.equal(p.key, key);
        assert.equal(p.nawalName, NAHUALES[p.nawalIndex - 1]);
      }
      date = addCalendarDays(date, 1);
    }
  });

  test("Fehlerfälle: fehlendes, ungültiges und randständiges Datum", () => {
    assert.throws(() => calculateMayaCross(""), MayaCrossError);
    assert.throws(() => calculateMayaCross("2023-02-29"), MayaCrossError);
    assert.throws(() => calculateMayaCross({ year: 2024, month: 2, day: 31 }), MayaCrossError);

    // Acht Tage Vorlauf/Nachlauf verkleinern den nutzbaren Bereich an beiden Enden.
    assert.throws(() => calculateMayaCross("1830-01-08"), (e: unknown) => {
      assert.ok(e instanceof MayaCrossError);
      assert.equal(e.code, "dateOutOfRange");
      return true;
    });
    assert.throws(() => calculateMayaCross("2099-12-24"), (e: unknown) => {
      assert.ok(e instanceof MayaCrossError);
      assert.equal(e.code, "dateOutOfRange");
      return true;
    });

    assert.equal(isSupportedCrossBirthDate("1830-01-08"), false);
    assert.equal(isSupportedCrossBirthDate("1830-01-09"), true);
    assert.equal(isSupportedCrossBirthDate("2099-12-23"), true);
    assert.equal(isSupportedCrossBirthDate("2099-12-24"), false);
  });
});
