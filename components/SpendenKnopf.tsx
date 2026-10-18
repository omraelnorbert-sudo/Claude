"use client";

import { useRef } from "react";

// Öffnet das Payrexx-Zahlungsfenster direkt über der Seite, statt auf die
// Payrexx-Seite zu wechseln. Code von Payrexx (Omrael, 16.10.2026), aber:
//
// - jQuery und das Payrexx-Skript werden erst beim ersten Klick geladen.
//   Wer nicht spendet, lädt nichts von Dritten — so bleibt der Satz in der
//   Datenschutzerklärung wahr.
// - Ohne JavaScript oder wenn das Laden scheitert, bleibt es ein normaler
//   Link auf die Payrexx-Bezahlseite.

declare global {
  interface Window {
    jQuery?: ((el: Element) => { payrexxModal: () => void }) & object;
  }
}

const JQUERY = {
  src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0/jquery.min.js",
  // Die Prüfsumme aus dem Payrexx-Code passte nicht zur Datei, die cdnjs
  // ausliefert — der Browser blockierte jQuery. Diese hier ist nachgerechnet
  // (16.10.2026) über die echte Datei.
  integrity: "sha512-8LENNbXmzI/Gbj+OwXmqR6V4QaUAw0/porPzy1+dQoJqC0JPHedWoe0DDOTL2uHA5XXJyIsPtiMHH86pVlay6A==",
};
const PAYREXX = "https://media.payrexx.com/modal/v1/modal.min.js?v=2.0";

function skriptLaden(src: string, integrity?: string): Promise<void> {
  return new Promise((ok, fehler) => {
    const s = document.createElement("script");
    s.src = src;
    if (integrity) {
      s.integrity = integrity;
      s.crossOrigin = "anonymous";
    }
    s.onload = () => ok();
    s.onerror = () => fehler(new Error(src));
    document.head.appendChild(s);
  });
}

let laden: Promise<void> | null = null;

export default function SpendenKnopf({
  href,
  children,
  className = "btn",
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const knopf = useRef<HTMLAnchorElement>(null);
  const bereit = useRef(false);

  async function klick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (bereit.current) return; // Payrexx hat den Klick übernommen
    // Kein Payrexx-Ziel (z. B. vorübergehend die Bankverbindungen): normaler Link.
    if (!href.includes("payrexx.com")) return;
    e.preventDefault();
    try {
      laden ??= skriptLaden(JQUERY.src, JQUERY.integrity).then(() => skriptLaden(PAYREXX));
      await laden;
      const el = knopf.current;
      if (!el || !window.jQuery) throw new Error("Payrexx nicht verfügbar");
      window.jQuery(el).payrexxModal();
      bereit.current = true;
      el.click(); // jetzt öffnet Payrexx das Fenster
    } catch {
      window.location.href = href; // Notweg: die Bezahlseite selbst
    }
  }

  return (
    <a ref={knopf} href={href} className={className} style={style} onClick={klick}>
      {children}
    </a>
  );
}
