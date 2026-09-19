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
import { NAHUAL_DESCRIPTIONS_ES } from "@/lib/nahual-descriptions-es";
import { nahualOfToday } from "@/lib/tzolkin";
import MayaNumber from "@/components/MayaNumber";
import NahualesOverviewEs from "@/components/NahualesOverviewEs";
import type { NahualOverviewItem } from "@/lib/public-data";

const RADIUS_PERCENT = 42.3;
const TONE_RADIUS_PERCENT = 27;

const YOUTUBE_CHANNEL = "https://www.youtube.com/@norbertmuiggmaya-pazmundo7830";
const YOUTUBE_SERIES = `${YOUTUBE_CHANNEL}/search?query=${encodeURIComponent("Der Mayakalender im Zeitgeist")}`;

const LINK_CARDS = [
  { title: "Paz Mundo", href: "https://www.pazmundo.com", label: "www.pazmundo.com →" },
  { title: "Omrael Norbert Muigg en YouTube", href: YOUTUBE_SERIES, label: "El calendario MAYA en el espíritu de nuestro tiempo →" },
  { title: "MAYA Healing Resort", href: "https://healingresort.pazmundo.com/", label: "healingresort.pazmundo.com →" },
  { title: "Eventos", href: "https://www.pazmundo.com/veranstaltungen", label: "pazmundo.com/veranstaltungen →" },
];

const ITEMS = NAHUALES.map((name, position) => {
  const index = position + 1;
  const description = NAHUAL_DESCRIPTIONS_ES[name];
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

export default function CholqijHomeEs({ overviewItems }: { overviewItems: NahualOverviewItem[] }) {
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

  // Ambas ruedas engranan entre sí: el signo elegido está delta pasos
  // antes/después de hoy, el número vibracional avanza con la misma cantidad.
  const delta = (activeIndex - (today.index - 1) + 20) % 20;
  const activeTone = ((today.number - 1 + delta) % 13) + 1;

  const birthDate = parseBirthInput(birth);
  const birthResult = birthDate ? calculateNahual(birthDate.day, birthDate.month, birthDate.year) : null;
  const birthItem = birthResult ? ITEMS[birthResult.index - 1] : null;

  const birthLabel = birthDate
    ? new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(birthDate.year, birthDate.month - 1, birthDate.day),
      )
    : "Elegir fecha";

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "var(--space-3)" }}>
        <button type="button" className="btn" onClick={() => setDonateInfoOpen(true)}>
          Tu donación para los sabios MAYA
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
              <span>Donación para los sabios MAYA</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setDonateInfoOpen(false)}
                aria-label="Cerrar"
              >
                Cerrar ✕
              </button>
            </div>
            <div className="nahual-overlay-body">
              <p style={{ margin: "0 0 16px" }}>
                La donación en línea no está disponible por el momento. Por favor, dona
                mientras tanto por transferencia bancaria:
              </p>
              <div className="si-modal-bank">
                <div>
                  <strong>Transferencia de donación</strong> · Por favor, indica «MAYA Guatemala»
                </div>
                <div>Norbert Muigg</div>
                <div>IBAN: AT94 3633 9000 0005 8370 · Contraseña: Stiftung Guatemala</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Paz Mundo · El calendario sagrado MAYA
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
        20 Nahuales en la modernidad
      </h2>
      <a
        href={YOUTUBE_SERIES}
        target="_blank"
        rel="noopener noreferrer"
        className="listen-link"
      >
        <span className="listen-link-icon" aria-hidden="true" />
        Escuchar el calendario MAYA
      </a>
      <div className="listen-link-note">
        «El calendario MAYA en el espíritu de nuestro tiempo» · Versión en alemán · Canal de YouTube de Omrael Norbert Muigg
      </div>
      <p style={{ maxWidth: "62ch" }}>
        13 números vibracionales y 20 Nahuales avanzan como dos ruedas y forman juntos
        260 días. Elige un signo — la rueda lo gira hacia arriba.
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
            <strong>Animal de poder:</strong> {active.krafttier}
          </p>
          <Link href={`/es/nahuales/${active.slug}`} className="underline-link">
            Ver el signo
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
          Cosmovisión MAYA
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
          Todos los signos de un vistazo
        </h2>
        <p style={{ maxWidth: "58ch" }}>
          Cada Nahual está dispuesto de forma polar y lleva su propia energía, sus
          propias cualidades y fortalezas, su propio animal de poder, la conexión
          corporal correspondiente y la vinculación con el cosmos. El Nahual en lo
          inconsciente es su lado oscuro; su lado luminoso reside en la conciencia que
          crece. Elige aquí un Nahual para saber más.
        </p>
        <NahualesOverviewEs items={overviewItems} />
      </div>

      <div className="dot-rule" role="presentation" />

      <div id="horoskop" className="birth-hero">
        <div className="birth-hero-text">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Tu horóscopo de nacimiento
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6.5vw, 64px)", letterSpacing: "-0.025em", marginBottom: 18 }}>
            Tu Nahual de nacimiento
          </h1>
          <p>
            Tu fecha de nacimiento determina tu Nahual del corazón, tu número
            vibracional y tu Cruz MAYA. Basta con tu fecha de nacimiento.
          </p>

          <div className="birth-form">
            <input
              type="date"
              className="birth-date-input"
              value={birth}
              onChange={(event) => setBirth(event.target.value)}
              min="1830-01-01"
              max="2099-12-31"
              aria-label="Fecha de nacimiento"
            />
            <Link href={birthDate ? `/es/horoskop?datum=${birth}` : "/es/horoskop"} className="btn">
              Calcular horóscopo
            </Link>
          </div>
          <div className="birth-note">Gratis · sin registro</div>
        </div>

        <div className="birth-preview">
          <div className="birth-preview-label">Vista previa</div>
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
              Introduce tu fecha de nacimiento para calcular tu Nahual.
            </p>
          )}
        </div>
      </div>

      <div className="dot-rule" role="presentation" />

      <div className="closing-cta">
        <div>
          <h3>Tu horóscopo MAYA personal</h3>
          <p>
            Nahual de nacimiento, número vibracional y la Cruz MAYA con los cuatro
            signos que te acompañan — calculados a partir de tu fecha de nacimiento.
          </p>
        </div>
        <Link href="/es/horoskop" className="btn">
          Calcular tu constelación de nacimiento
        </Link>
      </div>

      <div id="links" className="links-section">
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Enlaces
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
          SI · Inteligencia del Alma
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
          Un viaje a las profundidades del alma
        </h2>
        <div className="si-subline">Paz Mundo · Omrael Norbert Muigg &amp; equipo, Laura Soraya</div>

        <p className="si-lead">
          El Coaching del Alma es una profunda obra de percepción espiritual, en la
          que tu alma se vuelve «perceptible y visible» — su historia, sus temas, sus
          heridas y su belleza.
        </p>
        <p className="si-text">
          No es una conversación de coaching habitual, sino un espacio sagrado de
          observación medial, reconocimiento y aceptación — de todo lo que eres, lo
          que fuiste, y con posibilidades de hacia dónde debería ir tu camino de vida.
        </p>
        <p className="si-text">
          Omrael Norbert Muigg y su equipo se conectan con tu campo energético — a
          través de tu escrito y una foto actual. Recibes una lectura del alma escrita
          con resumen y un plan de trabajo personal.
        </p>

        <div className="si-cta-row">
          <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
            Enviar solicitud →
          </a>
          <button
            type="button"
            className="underline-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onClick={() => setSeelencoachingOpen(true)}
          >
            Obra de paz y Coaching del Alma →
          </button>
        </div>
      </div>

      {seelencoachingOpen && (
        <div className="nahual-overlay-backdrop" onClick={() => setSeelencoachingOpen(false)}>
          <div className="nahual-overlay-card" onClick={(event) => event.stopPropagation()}>
            <div className="nahual-overlay-head">
              <span>Coaching del Alma Paz Mundo</span>
              <button
                type="button"
                className="nahual-overlay-close"
                onClick={() => setSeelencoachingOpen(false)}
                aria-label="Cerrar"
              >
                Cerrar ✕
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
                Un viaje a las profundidades del alma
              </h2>

              <div className="si-modal-section">
                <h3>¿Qué es el Coaching del Alma?</h3>
                <p>
                  El Coaching del Alma es una profunda obra de percepción espiritual, en la
                  que tu alma se vuelve «perceptible y visible» — su historia, sus temas, sus
                  heridas y su belleza.
                </p>
                <p>
                  Omrael Norbert Muigg y su equipo se conectan con tu campo energético, a
                  través de tu escrito y una foto actual tuya.
                </p>
                <p>
                  Diseñamos tu Coaching del Alma de forma detallada, con aproximadamente 10
                  páginas, con resumen, plan de trabajo, imágenes, y si es necesario oraciones
                  y meditaciones — o centrado en pocos temas de vida concretos.
                </p>
                <p>
                  Esto sucede en conexión con «acompañantes espirituales del alma», fuerzas
                  espirituales quizás inconscientes para ti. Estas sacan a la luz, en un
                  escrito medial elaborado por nuestro equipo, lo que permanece oculto
                  esperando ser reconocido y sanado por ti.
                </p>
                <p>
                  El Coaching del Alma no es una conversación de coaching habitual. Es más
                  bien un espacio sagrado de observación medial, reconocimiento y aceptación
                  — de todo lo que eres, lo que fuiste, y con posibilidades de hacia dónde
                  debería ir tu camino de vida.
                </p>
                <p>
                  Esta forma de sanación del alma está estrechamente conectada con métodos de
                  sanación «antiguos» de los MAYA y su concepción de que el cambio de
                  comportamiento y la vivencia del amor, el respeto y la dignidad solo son
                  posibles a través de un trabajo de liberación anímico-kármico.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>¿Qué se hace visible?</h3>
                <ul className="si-modal-list">
                  <li>Tus patrones del alma y tus temas kármicos</li>
                  <li>Tu misión del alma y tu vocación más profunda</li>
                  <li>
                    Bloqueos energéticos y ataduras kármicas que te retienen
                  </li>
                  <li>Los acompañantes espirituales que actúan actualmente a tu lado</li>
                  <li>Temas por redimir de las líneas ancestrales y familiares</li>
                  <li>Tus recursos, fortalezas y tu ser alma-espíritu</li>
                  <li>Recomendaciones de acción — plan de trabajo para tu camino del alma</li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>¿Cómo se desarrolla un Coaching del Alma?</h3>
                <ul className="si-modal-steps">
                  <li>
                    <strong>Preparación y espacio sagrado</strong>
                    <p>
                      Omrael Norbert Muigg abre el espacio sagrado, se conecta con el Altar
                      Paz Mundo y su equipo, generalmente con el médium Laura Soraya.
                      Conectados con tu escrito y una imagen actual tuya, nos sintonizamos con
                      tu alma y dejamos que las fuerzas hablen sobre tus temas y tareas
                      anímicas.
                    </p>
                  </li>
                  <li>
                    <strong>La observación</strong>
                    <p>
                      En sintonía conjunta con Omrael Norbert Muigg se despliega la lectura
                      medial del alma. Omrael Norbert Muigg complementa esta percepción con
                      sus propias impresiones, imágenes y mensajes. La lectura del alma y el
                      plan de trabajo te llegan por correo.
                    </p>
                  </li>
                  <li>
                    <strong>Resumen y camino</strong>
                    <p>
                      Recibes un resumen escrito de los conocimientos esenciales, así como
                      recomendaciones concretas para tu camino a seguir — rituales,
                      meditaciones, oraciones, junto con tu plan de trabajo personal, en el
                      que trabajas y resuelves tus temas centrales.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>¿Para quién es el Coaching del Alma?</h3>
                <p>
                  El Coaching del Alma es adecuado para personas que se encuentran en un
                  punto de inflexión, que anhelan un autoconocimiento más profundo, que
                  quieren trabajar en patrones recurrentes, o que simplemente sienten: hay
                  algo más — quiero reconocer, abordar y resolver las tareas de mi alma.
                </p>
                <p>
                  Nuestra oferta no se dirige a las masas, sino a personas que quieren
                  abordar esta forma de desarrollo espiritual con apertura interior y
                  autenticidad — incluso si en el proceso surgen resistencias visibles. Al
                  hacerlo, te abres como ser humano y a la vez como ser alma-espíritu; justo
                  ahí comienza el misterio entre el Aquí y el Más Allá.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Toma de conciencia y liberación del alma</h3>
                <p>
                  Descender conscientemente a las propias sombras es imprescindible en el
                  camino hacia la toma de conciencia. La liberación del alma exige valor,
                  honestidad y la disposición a enfrentarse a la propia sombra — asumir
                  responsabilidad por las propias heridas y por las heridas en la red
                  familiar y ancestral. Esto requiere fuerza, entrega y tiempo.
                </p>
                <p>
                  No basta con practicar solo prácticas espirituales o dirigirse
                  exclusivamente hacia la luz. Mientras la oscuridad interior y las cargas
                  kármicas queden excluidas, poco cambia en la vida exterior. Solo cuando
                  aceptamos nuestras cargas kármicas y conflictos no resueltos, y los
                  volvemos a vivir una vez más, se hacen posibles la libertad, el amor
                  verdadero y la felicidad en el ser humano.
                </p>
              </div>

              <div className="si-modal-section">
                <h3>Oferta y contacto</h3>
                <ul className="si-modal-list">
                  <li>
                    El Coaching del Alma comienza con tu solicitud, la descripción del tema y
                    una foto tuya.
                  </li>
                  <li>
                    Se establece contacto espiritual con tu ser alma-espíritu en el Altar Paz
                    Mundo y con tus acompañantes del alma.
                  </li>
                  <li>
                    Estos hablan sobre tu historia del alma, tus temas kármicos y tus tareas,
                    dones y posibilidades anímicas especiales.
                  </li>
                  <li>
                    Omrael Norbert Muigg redacta un resumen escrito de la lectura del alma y
                    trabaja en planes de trabajo sobre posibilidades para seguir trabajando en
                    ti mismo.
                  </li>
                </ul>
              </div>

              <div className="si-modal-section">
                <h3>Tu contribución</h3>
                <p>
                  Tu aporte económico va al proyecto de paz Paz Mundo Guatemala. Por favor,
                  transfiere antes de comenzar el Coaching del Alma.
                </p>
                <p>
                  Envía tu información por correo con una breve descripción del tema y una
                  foto actual a{" "}
                  <a href="mailto:kontakt@pazmundo.com" className="underline-link">
                    kontakt@pazmundo.com
                  </a>
                  .
                </p>

                <div className="si-modal-price-grid">
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Coaching del Alma completo</div>
                    <div className="si-modal-price-desc">
                      Resumen, lista de materiales, plan de trabajo completo · aprox. 13 páginas
                    </div>
                    <div className="si-modal-price-amount">€ 490,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Coaching del Alma con plan de trabajo</div>
                    <div className="si-modal-price-desc">
                      Centrado en pocos temas de vida bloqueantes · aprox. 6 páginas
                    </div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                  <div className="si-modal-price-card">
                    <div className="si-modal-price-title">Para animales</div>
                    <div className="si-modal-price-desc">Coaching del alma y del ser</div>
                    <div className="si-modal-price-amount">€ 390,–</div>
                  </div>
                </div>

                <p className="si-modal-note">
                  Se pueden solicitar más Coachings del Alma si en un momento posterior deseas
                  trabajar temas adicionales.
                </p>

                <div className="si-modal-bank">
                  <div>
                    <strong>Transferencia</strong> · Por favor, indica «Guatemala»
                  </div>
                  <div>Norbert Muigg</div>
                  <div>IBAN: AT94 3633 9000 0005 8370 · Contraseña: Guatemala</div>
                </div>
              </div>

              <div className="si-modal-quote">
                Con amor — Equipo Paz Mundo
              </div>

              <div className="si-cta-row" style={{ marginTop: "var(--space-4)" }}>
                <a href="mailto:kontakt@pazmundo.com?subject=Seelen-Coaching" className="btn">
                  Enviar solicitud →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
