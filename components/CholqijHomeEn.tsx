"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  NAHUALES,
  calculateNahual,
  glyphSrcForIndex,
  isValidBirthDate,
  slugForIndex,
} from "@/lib/nahual";
import { NAHUAL_DESCRIPTIONS_EN } from "@/lib/nahual-descriptions-en";
import { nahualOfToday } from "@/lib/tzolkin";
import MayaNumber from "@/components/MayaNumber";
import NahualesOverviewEn from "@/components/NahualesOverviewEn";
import type { NahualOverviewItem } from "@/lib/public-data";

const RADIUS_PERCENT = 42.3;
const TONE_RADIUS_PERCENT = 27;

const YOUTUBE_CHANNEL = "https://www.youtube.com/@norbertmuiggmaya-pazmundo7830";
const YOUTUBE_SERIES = `${YOUTUBE_CHANNEL}/search?query=${encodeURIComponent("Der Mayakalender im Zeitgeist")}`;

const LINK_CARDS = [
  { title: "Paz Mundo", href: "https://www.pazmundo.com", label: "www.pazmundo.com →" },
  { title: "Omrael Norbert Muigg on YouTube", href: YOUTUBE_SERIES, label: "The MAYA calendar in the spirit of our time →" },
  { title: "MAYA Healing Resort", href: "https://healingresort.pazmundo.com/", label: "healingresort.pazmundo.com →" },
  { title: "Events", href: "https://www.pazmundo.com/veranstaltungen", label: "pazmundo.com/veranstaltungen →" },
];

const ITEMS = NAHUALES.map((name, position) => {
  const index = position + 1;
  const description = NAHUAL_DESCRIPTIONS_EN[name];
  return {
    index,
    pad: String(index).padStart(2, "0"),
    name,
    slug: slugForIndex(index),
    glyphSrc: glyphSrcForIndex(index, "thumb"),
    kurz: description.kurz,
    summary: description.summary,
    krafttier: description.krafttier,
  };
});

function parseBirthInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day || !isValidBirthDate(day, month, year)) return null;
  return { day, month, year };
}

export default function CholqijHomeEn({ overviewItems }: { overviewItems: NahualOverviewItem[] }) {
  const today = useMemo(() => nahualOfToday(), []);

  const [activeIndex, setActiveIndex] = useState(today.index - 1);
  const [birth, setBirth] = useState("");
  const [seelencoachingOpen, setSeelencoachingOpen] = useState(false);
  const [donateInfoOpen, setDonateInfoOpen] = useState(false);

  useEffect(() => {
    if (!seelencoachingOpen && !donateInfoOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSeelencoachingOpen(false);
        setDonateInfoOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [seelencoachingOpen, donateInfoOpen]);

  const active = ITEMS[activeIndex];

  // Both wheels mesh together: the chosen sign is delta steps
  // before/after today, the vibrational number advances by the same amount.
  const delta = (activeIndex - (today.index - 1) + 20) % 20;
  const activeTone = ((today.number - 1 + delta) % 13) + 1;

  const birthDate = parseBirthInput(birth);
  const birthResult = birthDate ? calculateNahual(birthDate.day, birthDate.month, birthDate.year) : null;
  const birthItem = birthResult ? ITEMS[birthResult.index - 1] : null;

  const birthLabel = birthDate
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(birthDate.year, birthDate.month - 1, birthDate.day),
      )
    : "Choose a date";

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "var(--space-3)" }}>
        <button type="button" className="btn" onClick={() => setDonateInfoOpen(true)}>
          Your donation for the MAYA elders
        </button>
      </div>

      {donateInfoOpen && (
        <div className="nahual-overlay-backdrop" onClick={() => setDonateInfoOpen(false)}>
          <div
            className="nahual-overlay-card"
            style={{ maxWidth: 480 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="nahual-overlay-head">
              <span>Donation for the MAYA elders</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setDonateInfoOpen(false)}
                aria-label="Close"
              >
                Close ✕
              </button>
            </div>
            <div className="nahual-overlay-body">
              <p style={{ margin: "0 0 16px" }}>
                Online donations are not available at the moment. Please donate by
                bank transfer in the meantime:
              </p>
              <div className="si-modal-bank">
                <div>
                  <strong>Donation transfer</strong> · Please state "MAYA Guatemala"
                </div>
                <div>Norbert Muigg</div>
                <div>IBAN: AT94 3633 9000 0005 8370 · Reference: Stiftung Guatemala</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Paz Mundo · The sacred MAYA calendar
      </div>
      <h2
        style={{
          fontSize: "clamp(38px, 6.5vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          margin: "0 0 8px",
        }}
      >
        20 Nahuales in the modern world
      </h2>
      <a
        href={YOUTUBE_SERIES}
        target="_blank"
        rel="noopener noreferrer"
        className="listen-link"
      >
        <span className="listen-link-icon" aria-hidden="true" />
        Listen to the MAYA calendar
      </a>
      <div className="listen-link-note">
        "The MAYA calendar in the spirit of our time" · German version · Omrael Norbert Muigg's YouTube channel
      </div>
      <p style={{ maxWidth: "62ch" }}>
        13 vibrational numbers and 20 Nahuales advance like two wheels and together
        form 260 days. Choose a sign — the wheel turns it up to the top.
      </p>

      <div className="cholqij-grid">
        <div>
          <div className="cholqij-detail-index">Nahual {active.pad} / 20</div>
          <div className="cholqij-detail-name">
            {activeTone} {active.name}
          </div>
          <div className="cholqij-detail-kurz">{active.kurz}</div>
          <div className="cholqij-detail-rule" />
          <p className="cholqij-detail-summary">{active.summary}</p>
          <p className="cholqij-detail-krafttier">
            <strong>Power animal:</strong> {active.krafttier}
          </p>
          <Link href={`/en/nahuales/${active.slug}`} className="underline-link">
            View this sign
          </Link>
        </div>

        <div className="cholqij-wheel">
          <div className="cholqij-ring-outer" />
          <div className="cholqij-ring-inner" />
          {Array.from({ length: 13 }, (_, k) => {
            const toneAngle =
              ((-90 + (((k - (activeTone - 1) + 13) % 13) * (360 / 13))) * Math.PI) / 180;
            const isActiveTone = k + 1 === activeTone;
            return (
              <div
                key={k}
                className={`cholqij-tone-node${isActiveTone ? " is-active" : ""}`}
                style={{
                  left: `calc(50% + ${(Math.cos(toneAngle) * TONE_RADIUS_PERCENT).toFixed(2)}%)`,
                  top: `calc(50% + ${(Math.sin(toneAngle) * TONE_RADIUS_PERCENT).toFixed(2)}%)`,
                }}
              >
                {k + 1}
              </div>
            );
          })}
          <div className="cholqij-hub" />
          <div className="cholqij-pointer" />
          {ITEMS.map((item, position) => {
            const angle =
              ((-90 + (((position - activeIndex) % 20) + 20) % 20 * 18) * Math.PI) / 180;
            const isActive = position === activeIndex;
            const widthPercent = isActive ? 15 : 7.7;
            const heightPercent = widthPercent / 0.78;
            return (
              <button
                key={item.name}
                type="button"
                className={`cholqij-node${isActive ? " is-active" : ""}`}
                onClick={() => setActiveIndex(position)}
                aria-label={item.name}
                aria-pressed={isActive}
                style={{
                  left: `calc(50% + ${(Math.cos(angle) * RADIUS_PERCENT).toFixed(2)}%)`,
                  top: `calc(50% + ${(Math.sin(angle) * RADIUS_PERCENT).toFixed(2)}%)`,
                  width: `${widthPercent}%`,
                  height: `${heightPercent.toFixed(2)}%`,
                  marginLeft: `${(-widthPercent / 2).toFixed(2)}%`,
                  marginTop: `${(-heightPercent / 2).toFixed(2)}%`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.glyphSrc} alt="" width={160} height={205} decoding="async" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="cholqij-chips">
        {ITEMS.map((item, position) => (
          <button
            key={item.name}
            type="button"
            className={`cholqij-chip${position === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(position)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="dot-rule" role="presentation" />

      <div id="nahuales-uebersicht">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          MAYA cosmovision
        </div>
        <h2
          style={{
            fontSize: "clamp(34px, 6vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            margin: "0 0 8px",
          }}
        >
          All 20 signs at a glance
        </h2>
        <p style={{ maxWidth: "58ch" }}>
          Each Nahual is arranged in a polar way and carries its own energy, its own
          qualities and strengths, its own power animal, the corresponding bodily
          connection and its link to the cosmos. The Nahual in the unconscious is its
          shadow side; its light side lives in a growing awareness. Choose a Nahual
          here to learn more.
        </p>
        <NahualesOverviewEn items={overviewItems} />
      </div>

      <div className="dot-rule" role="presentation" />

      <div id="horoskop" className="birth-hero">
        <div className="birth-hero-text">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Your birth horoscope
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6.5vw, 64px)", letterSpacing: "-0.025em", marginBottom: 18 }}>
            Your birth Nahual
          </h1>
          <p>
            Your date of birth determines your heart Nahual, your vibrational number
            and your Maya Cross. All you need is your date of birth.
          </p>

          <div className="birth-form">
            <input
              type="date"
              className="birth-date-input"
              value={birth}
              onChange={(event) => setBirth(event.target.value)}
              min="1830-01-01"
              max="2099-12-31"
              aria-label="Date of birth"
            />
            <Link href={birthDate ? `/en/horoskop?datum=${birth}` : "/en/horoskop"} className="btn">
              Calculate horoscope
            </Link>
          </div>
          <div className="birth-note">Free · no registration</div>
        </div>

        <div className="birth-preview">
          <div className="birth-preview-label">Preview</div>
          <div className="birth-preview-date">{birthLabel}</div>

          {birthItem && birthResult ? (
            <div className="birth-preview-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={birthItem.glyphSrc}
                alt={birthItem.name}
                className="birth-preview-glyph"
                width={82}
                height={105}
                decoding="async"
              />
              <div>
                <MayaNumber value={birthResult.number} />
                <div className="birth-preview-name">
                  {birthResult.number} {birthItem.name}
                </div>
                <div className="birth-preview-kurz">{birthItem.kurz}</div>
              </div>
            </div>
          ) : (
            <p className="empty-state" style={{ margin: 0 }}>
              Enter your date of birth to calculate your Nahual.
            </p>
          )}
        </div>
      </div>

      <div className="dot-rule" role="presentation" />

      <div className="closing-cta">
        <div>
          <h3>Your personal MAYA horoscope</h3>
          <p>
            Birth Nahual, vibrational number and the Maya Cross with the four signs
            that accompany you — calculated from your date of birth.
          </p>
        </div>
        <Link href="/en/horoskop" className="btn">
          Calculate your birth constellation
        </Link>
      </div>

      <div id="links" className="links-section">
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Links
        </div>
        <div className="link-card-grid">
          {LINK_CARDS.map((card) => (
            <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="link-card">
              <span className="link-card-title">{card.title}</span>
              <span className="link-card-url">{card.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div id="si" className="si-section">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          SI · Soul Intelligence
        </div>
        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 6px",
          }}
        >
          A journey into the depths of the soul
        </h2>
        <div className="si-subline">Paz Mundo · Omrael Norbert Muigg &amp; team, Laura Soraya</div>

        <p className="si-lead">
          Soul Coaching is a profound work of spiritual perception, in which your soul
          becomes "perceptible and visible" — its story, its themes, its wounds and
          its beauty.
        </p>
        <p className="si-text">
          It is not a usual coaching conversation, but a sacred space of mediumistic
          observation, recognition and acceptance — of everything you are, everything
          you were, and with possibilities for where your life's path should go.
        </p>
        <p className="si-text">
          Omrael Norbert Muigg and his team connect with your energy field — through
          your written request and a current photo. You receive a written soul
          reading with a summary and a personal work plan.
        </p>

        <div className="si-cta-row">
          <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
            Send request →
          </a>
          <button
            type="button"
            className="underline-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onClick={() => setSeelencoachingOpen(true)}
          >
            Peace work and Soul Coaching →
          </button>
        </div>
      </div>

      {seelencoachingOpen && (
        <div className="nahual-overlay-backdrop" onClick={() => setSeelencoachingOpen(false)}>
          <div className="nahual-overlay-card" onClick={(event) => event.stopPropagation()}>
            <div className="nahual-overlay-head">
              <span>Paz Mundo Soul Coaching</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setSeelencoachingOpen(false)}
                aria-label="Close"
              >
                Close ✕
              </button>
            </div>

            <div className="nahual-overlay-body">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                Paz Mundo · Omrael Norbert Muigg &amp; Laura Soraya
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 24px",
                }}
              >
                A journey into the depths of the soul
              </h2>

              <div className="si-modal-section">
                <h3>What is Soul Coaching?</h3>
                <p>
                  Soul Coaching is a profound work of spiritual perception, in which
                  your soul becomes "perceptible and visible" — its story, its
                  themes, its wounds and its beauty.
                </p>
                <p>
                  Omrael Norbert Muigg and his team connect with your energy field,
                  through your written request and a current photo of you.
                </p>
                <p>
                  We design your Soul Coaching in detail, on approximately 10 pages,
                  with a summary, work plan, images, and if needed prayers and
                  meditations — or focused on a few concrete life themes.
                </p>
                <p>
                  This happens in connection with "spiritual soul companions," forces
                  that may be unconscious to you. In a mediumistic writing prepared
                  by our team, these bring to light what remains hidden, waiting to
                  be recognized and healed by you.
                </p>
                <p>
                  Soul Coaching is not a usual coaching conversation. It is rather a
                  sacred space of mediumistic observation, recognition and acceptance
                  — of everything you are, everything you were, and with
                  possibilities for where your life's path should go.
                </p>
                <p>
                  This form of soul healing is closely connected with "ancient"
                  healing methods of the MAYA and their understanding that changing
                  behavior and experiencing love, respect and dignity are only
                  possible through soul and karmic liberation work.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>What becomes visible?</h3>
                <ul className="si-modal-list">
                  <li>Your soul patterns and your karmic themes</li>
                  <li>Your soul mission and your deepest calling</li>
                  <li>
                    Energetic blockages and karmic bonds that are holding you back
                  </li>
                  <li>The spiritual companions currently at your side</li>
                  <li>Themes yet to be redeemed from your ancestral and family lines</li>
                  <li>Your resources, strengths and your soul-spirit being</li>
                  <li>Recommendations for action — a work plan for your soul's path</li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>How does a Soul Coaching unfold?</h3>
                <ul className="si-modal-steps">
                  <li>
                    <strong>Preparation and sacred space</strong>
                    <p>
                      Omrael Norbert Muigg opens the sacred space, connecting with
                      the Paz Mundo Altar and his team, usually with the medium Laura
                      Soraya. Connected to your written request and a current image
                      of you, we attune to your soul and let the forces speak about
                      your soul's themes and tasks.
                    </p>
                  </li>
                  <li>
                    <strong>The observation</strong>
                    <p>
                      In joint attunement with Omrael Norbert Muigg, the mediumistic
                      soul reading unfolds. Omrael Norbert Muigg complements this
                      perception with his own impressions, images and messages. The
                      soul reading and the work plan reach you by mail.
                    </p>
                  </li>
                  <li>
                    <strong>Summary and path</strong>
                    <p>
                      You receive a written summary of the essential insights, as
                      well as concrete recommendations for your path forward —
                      rituals, meditations, prayers, together with your personal work
                      plan, in which you work through and resolve your central
                      themes.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Who is Soul Coaching for?</h3>
                <p>
                  Soul Coaching is suited for people at a turning point, who long for
                  deeper self-knowledge, who want to work on recurring patterns, or
                  who simply feel: there is more — I want to recognize, address and
                  resolve the tasks of my soul.
                </p>
                <p>
                  Our offer is not aimed at the masses, but at people who want to
                  approach this form of spiritual development with inner openness
                  and authenticity — even if visible resistances arise along the
                  way. In doing so, you open yourself as a human being and at the
                  same time as a soul-spirit being; that is exactly where the mystery
                  between the Here and the Beyond begins.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Awareness and liberation of the soul</h3>
                <p>
                  Consciously descending into one's own shadows is essential on the
                  path toward awareness. Liberation of the soul requires courage,
                  honesty and the willingness to face one's own shadow — taking
                  responsibility for one's own wounds and for the wounds in the
                  family and ancestral web. This requires strength, devotion and
                  time.
                </p>
                <p>
                  It is not enough to practice only spiritual practices or to turn
                  exclusively toward the light. As long as the inner darkness and
                  karmic burdens remain excluded, little changes in outer life. Only
                  when we accept our karmic burdens and unresolved conflicts, and
                  live through them once more, do freedom, true love and happiness
                  become possible for a human being.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Offer and contact</h3>
                <ul className="si-modal-list">
                  <li>
                    Soul Coaching begins with your request, a description of the
                    theme and a photo of you.
                  </li>
                  <li>
                    Spiritual contact is established with your soul-spirit being at
                    the Paz Mundo Altar and with your soul companions.
                  </li>
                  <li>
                    They speak about your soul's story, your karmic themes and your
                    tasks, gifts and special soul possibilities.
                  </li>
                  <li>
                    Omrael Norbert Muigg writes a summary of the soul reading and
                    works out plans for how you can continue working on yourself.
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Your contribution</h3>
                <p>
                  Your financial contribution goes to the Paz Mundo Guatemala peace
                  project. Please transfer before your Soul Coaching begins.
                </p>
                <p>
                  Send your details by email with a brief description of the theme
                  and a current photo to{" "}
                  <a href="mailto:kontakt@pazmundo.com" className="underline-link">
                    kontakt@pazmundo.com
                  </a>
                  .
                </p>

                <div className="si-modal-price-grid">
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Full Soul Coaching</div>
                    <div className="si-modal-price-desc">
                      Summary, list of materials, full work plan · approx. 13 pages
                    </div>
                    <div className="si-modal-price-amount">€ 490,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Soul Coaching with work plan</div>
                    <div className="si-modal-price-desc">
                      Focused on a few blocking life themes · approx. 6 pages
                    </div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">For animals</div>
                    <div className="si-modal-price-desc">Soul and being coaching</div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                </div>

                <p className="si-modal-note">
                  Further Soul Coachings can be requested if you wish to work on
                  additional themes at a later time.
                </p>

                <div className="si-modal-bank">
                  <div>
                    <strong>Transfer</strong> · Please state "Guatemala"
                  </div>
                  <div>Norbert Muigg</div>
                  <div>IBAN: AT94 3633 9000 0005 8370 · Reference: Guatemala</div>
                </div>
              </div>

              <div className="si-modal-quote">
                With love — the Paz Mundo team
              </div>

              <div className="si-cta-row" style={{ marginTop: "var(--space-4)" }}>
                <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
                  Send request →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
