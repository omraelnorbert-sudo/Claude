import Link from "next/link";
import RotatingWheel from "@/components/RotatingWheel";
import { NAHUALES } from "@/lib/nahual";

const NUMBERS = Array.from({ length: 13 }, (_, i) => String(i + 1));

export default function HomePage() {
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Kosmovision Maya
      </div>
      <h1>Cosmovision Maya</h1>
      <p>
        Die Kosmovision der Maya versteht Mensch, Natur und Kosmos nicht als
        getrennte Welten, sondern als ein Netzwerk aus Kraftfeldern und
        Schwingungen. Rituale sind darin keine Anbetung, sondern eine
        Toröffnung: ein Weg, sich wieder mit den eigenen, individuell
        angelegten geistigen Kräften zu verbinden — unabhängig davon, welcher
        Glaubensrichtung man sonst folgt.
      </p>
      <p>
        Im Zentrum dieses Weltbilds steht der heilige Tzolk&apos;in-Kalender:
        13 Schwingungszahlen und 20 Nahuales — Tageszeichen mit je eigener
        Energie — laufen wie zwei unabhängige Räder unaufhörlich weiter und
        ergeben gemeinsam einen Zyklus von 260 Tagen. Jeder Mensch trägt sein
        eigenes Geburtsnahual in sich.
      </p>

      <div className="dot-rule" role="presentation" />

      <div className="wheel-pair">
        <div className="wheel-cell">
          <div className="wheel-stage">
            <RotatingWheel
              items={NUMBERS}
              idPrefix="wheel-numbers"
              size={280}
              duration={60}
              fontFamily="var(--font-mono)"
              fontSize={15}
            />
          </div>
          <div className="wheel-caption">13 Schwingungszahlen</div>
        </div>
        <div className="wheel-cell">
          <div className="wheel-stage">
            <RotatingWheel
              items={[...NAHUALES]}
              idPrefix="wheel-nahuales"
              size={420}
              duration={95}
              reverse
              fontFamily="var(--font-serif)"
              fontSize={14}
            />
          </div>
          <div className="wheel-caption">20 Nahuales</div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "var(--space-4) 0 var(--space-6)" }}>
        <Link href="/horoskop" className="btn">
          Finde dein Nahual
        </Link>
      </div>

      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Entdecke mehr
      </div>
      <Link href="/nahuales" className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <h3>Die 20 Nahuales</h3>
        <p>Jedes Tageszeichen im Detail — mit Videos, Texten und Krafttier.</p>
      </Link>
      <Link href="/paz-mundo" className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <h3>Paz Mundo</h3>
        <p>Alle Angebote von Paz Mundo und Norbert Muigg an einem Ort.</p>
      </Link>
    </>
  );
}
