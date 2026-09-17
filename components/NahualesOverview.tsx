"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NahualOverviewItem } from "@/lib/public-data";

const PREVIEW_PARAGRAPHS = 2;

export default function NahualesOverview({ items }: { items: NahualOverviewItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openIndex]);

  const open = openIndex !== null ? items[openIndex] : null;

  function openCard(index: number, startExpanded: boolean) {
    setOpenIndex(index);
    setExpanded(startExpanded);
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "var(--space-3)",
          marginTop: "var(--space-4)",
        }}
      >
        {items.map((item, position) => (
          <button
            key={item.name}
            type="button"
            className="nahual-card"
            onClick={() => openCard(position, false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.cardSrc}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ width: "70%", height: "auto" }}
            />
            <span className="nahual-card-name">{item.name}</span>
            {item.longText && (
              <span
                className="underline-link"
                style={{ fontSize: 11 }}
                onClick={(event) => {
                  event.stopPropagation();
                  openCard(position, true);
                }}
              >
                Langfassung →
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div className="nahual-overlay-backdrop" onClick={() => setOpenIndex(null)}>
          <div className="nahual-overlay-card" onClick={(event) => event.stopPropagation()}>
            <div className="nahual-overlay-head">
              <span>Nahual {String(open.index).padStart(2, "0")} / 20</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setOpenIndex(null)}
                aria-label="Schliessen"
              >
                Schliessen ✕
              </button>
            </div>

            <div className="nahual-overlay-body">
              <div className="nahual-overlay-top">
                <div className="nahual-overlay-glyph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={open.fullSrc} alt={open.name} />
                </div>
                <div>
                  <div className="cholqij-detail-name">{open.name}</div>
                  <div className="cholqij-detail-kurz">{open.kurz}</div>
                  <div className="cholqij-detail-rule" />
                  <p className="cholqij-detail-summary">{open.summary}</p>
                  <p className="cholqij-detail-krafttier">
                    <strong>Krafttier:</strong> {open.krafttier}
                  </p>
                  <Link href={`/nahuales/${open.slug}`} className="underline-link">
                    Zum vollständigen Nahual-Profil →
                  </Link>
                </div>
              </div>

              {open.longText && (
                <div className="nahual-longtext">
                  <div className="eyebrow" style={{ marginBottom: 8 }}>
                    Langfassung · Omrael Norbert Muigg · Paz Mundo
                  </div>
                  {open.longText.heading && (
                    <div className="nahual-longtext-heading">{open.longText.heading}</div>
                  )}
                  {open.longText.directions && (
                    <div className="nahual-longtext-directions">{open.longText.directions}</div>
                  )}

                  {open.longText.body
                    .slice(0, expanded ? undefined : PREVIEW_PARAGRAPHS)
                    .map((paragraph, i) => (
                      <p key={i} className="nahual-longtext-paragraph">
                        {paragraph}
                      </p>
                    ))}

                  {!expanded && open.longText.body.length > PREVIEW_PARAGRAPHS && (
                    <button
                      type="button"
                      className="underline-link"
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                      onClick={() => setExpanded(true)}
                    >
                      Langfassung lesen →
                    </button>
                  )}

                  {expanded && open.longText.ceremonies.length > 0 && (
                    <div className="nahual-ceremonies">
                      <div className="nahual-ceremonies-label">Zeremonien</div>
                      {open.longText.ceremonies.map((paragraph, i) => (
                        <p key={i} className="nahual-longtext-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {expanded && (open.longText.bodyLevel || open.longText.powerAnimal) && (
                    <div className="nahual-longtext-footer">
                      {open.longText.bodyLevel && (
                        <div>
                          <div className="nahual-longtext-footer-label">Körperebene</div>
                          <p className="nahual-longtext-paragraph">{open.longText.bodyLevel}</p>
                        </div>
                      )}
                      {open.longText.powerAnimal && (
                        <div>
                          <div className="nahual-longtext-footer-label">Krafttier</div>
                          <p className="nahual-longtext-paragraph">{open.longText.powerAnimal}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
