// Fahnen als SVG, nicht als Emoji: Emoji-Fahnen zeichnet Windows nicht,
// dort stünde statt der Fahne „AT", „GT" oder „GB".

const RAHMEN = { border: "1px solid var(--line-card)", display: "block" } as const;

export function FahneOesterreich() {
  return (
    <svg viewBox="0 0 9 6" width={16} height={11} style={RAHMEN} role="img" aria-label="Österreich">
      <rect width="9" height="6" fill="#ED2939" />
      <rect y="2" width="9" height="2" fill="#fff" />
    </svg>
  );
}

export function FahneGuatemala() {
  return (
    <svg viewBox="0 0 10 6" width={17} height={11} style={RAHMEN} role="img" aria-label="Guatemala">
      <rect width="10" height="6" fill="#4997D0" />
      <rect x="3.333" width="3.333" height="6" fill="#fff" />
    </svg>
  );
}

export function FahneGrossbritannien() {
  return (
    <svg viewBox="0 0 60 30" width={18} height={11} style={RAHMEN} role="img" aria-label="Großbritannien">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#C8102E" strokeWidth="4"
            clipPath="url(#pm-halb)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      <clipPath id="pm-halb"><path d="M30 15h30v15zM30 15v15H0zM30 15H0V0zM30 15V0h30z" /></clipPath>
    </svg>
  );
}
