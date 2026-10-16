import { RECHTLICHES, type Sprache } from "@/lib/rechtliches";

// Impressum, Haftungsausschluss und Datenschutz — eine Seite je Sprache.
// Texte in lib/rechtliches.ts.

export default function RechtlichesSeite({ sprache }: { sprache: Sprache }) {
  const t = RECHTLICHES[sprache];
  return (
    <article lang={sprache} style={{ maxWidth: 760 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {t.eyebrow}
      </div>
      <h1>{t.h1}</h1>
      {t.massgeblich && <p style={{ fontSize: 15 }}>{t.massgeblich}</p>}

      <h2>{t.impressumH2}</h2>
      <p>
        Organisation PAZ MUNDO
        <br />
        Norbert Muigg
        <br />
        Vorderthiersee 87d
        <br />
        6335 Thiersee, {t.land}
        <br />
        <a href="mailto:kontakt@pazmundo.com">kontakt@pazmundo.com</a>
        <br />
        <a href="tel:+436601977752">+43 660 1977752</a>
      </p>

      <h2>{t.haftungH2}</h2>
      {t.haftung.map((a) => (
        <section key={a.titel}>
          <h3>{a.titel}</h3>
          {a.absaetze.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </section>
      ))}

      <h2>{t.datenschutzH2}</h2>
      {t.datenschutz.map((a) => (
        <section key={a.titel}>
          <h3>{a.titel}</h3>
          {a.absaetze.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </section>
      ))}
    </article>
  );
}
