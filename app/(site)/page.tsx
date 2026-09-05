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

      <div
        style={{
          height: 7,
          background:
            "repeating-linear-gradient(90deg, var(--gold) 0 9px, transparent 9px 22px)",
          margin: "var(--space-5) 0",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "var(--space-4)",
          alignItems: "center",
        }}
      >
        <div>
          <RotatingWheel
            items={NUMBERS}
            idPrefix="wheel-numbers"
            size={280}
            duration={60}
            fontFamily="var(--font-mono)"
            fontSize={15}
          />
          <div className="wheel-caption">13 Schwingungszahlen</div>
        </div>
        <div>
          <RotatingWheel
            items={[...NAHUALES]}
            idPrefix="wheel-nahuales"
            size={420}
            duration={95}
            reverse
            fontFamily="var(--font-serif)"
            fontSize={14}
          />
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
      <div className="card">
        <h3>Rituale</h3>
        <p>Praktiken zur Verbindung mit den Zyklen von Erde und Kosmos.</p>
      </div>
      <div className="card">
        <h3>Workouts</h3>
        <p>Körperliche Praxis, abgestimmt auf die jeweiligen Rituale.</p>
      </div>
    </>
  );
}
