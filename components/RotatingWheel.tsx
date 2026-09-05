interface RotatingWheelProps {
  items: string[];
  idPrefix: string;
  size?: number;
  duration: number;
  reverse?: boolean;
  fontFamily?: string;
  fontSize?: number;
}

function normalizeUpright(angleDeg: number): number {
  const tangent = angleDeg + 90;
  const wrapped = ((tangent + 180) % 360 + 360) % 360 - 180;
  return wrapped > 90 || wrapped < -90 ? wrapped + 180 : wrapped;
}

function gearPath(cx: number, cy: number, teeth: number, rOuter: number, rInner: number): string {
  const step = (Math.PI * 2) / teeth;
  const pt = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.22;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.72;
    const a4 = a0 + step;
    if (i === 0) d += `M ${pt(rOuter, a0)} `;
    d += `L ${pt(rOuter, a1)} L ${pt(rInner, a2)} L ${pt(rInner, a3)} L ${pt(rOuter, a4)} `;
  }
  return d + "Z";
}

export default function RotatingWheel({
  items,
  idPrefix,
  size = 300,
  duration,
  reverse = false,
  fontFamily = "var(--font-mono)",
  fontSize = 13,
}: RotatingWheelProps) {
  const center = size / 2;
  const teeth = items.length;
  const rOuter = center - 4;
  const toothDepth = Math.max(10, size * 0.04);
  const rTeethInner = rOuter - toothDepth;
  const rFace = rTeethInner - 3;
  const rLabel = rFace - fontSize * 1.05;
  const rHub = size * 0.09;

  const rimId = `${idPrefix}-rim`;
  const faceId = `${idPrefix}-face`;
  const hubId = `${idPrefix}-hub`;
  const shadowId = `${idPrefix}-shadow`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size, aspectRatio: "1 / 1", display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={rimId} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#efe6cf" />
          <stop offset="45%" stopColor="#c9b98c" />
          <stop offset="100%" stopColor="#726752" />
        </linearGradient>
        <radialGradient id={faceId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f5eddb" />
          <stop offset="60%" stopColor="#d6c69e" />
          <stop offset="100%" stopColor="#a1926f" />
        </radialGradient>
        <radialGradient id={hubId} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#cdbd90" />
          <stop offset="100%" stopColor="#463d2e" />
        </radialGradient>
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="3" dy="7" stdDeviation="6" floodColor="#241f14" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <path
          d={gearPath(center, center, teeth, rOuter, rTeethInner)}
          fill={`url(#${rimId})`}
          stroke="#3a3324"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <circle cx={center} cy={center} r={rFace} fill={`url(#${faceId})`} stroke="#3a3324" strokeWidth={1} />
      </g>

      {/* Fixierter Zeiger (rotiert nicht mit) */}
      <polygon
        points={`${center - 5},${center - rOuter - 2} ${center + 5},${center - rOuter - 2} ${center},${center - rOuter + 9}`}
        fill="var(--gold)"
      />

      <g
        style={{
          transformOrigin: `${center}px ${center}px`,
          animation: `wheel-spin ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {items.map((label, i) => {
          const angleDeg = (i / items.length) * 360 - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const labelX = center + rLabel * Math.cos(angleRad);
          const labelY = center + rLabel * Math.sin(angleRad);
          const rotation = normalizeUpright(angleDeg);

          return (
            <text
              key={`${label}-${i}`}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rotation}, ${labelX}, ${labelY})`}
              style={{ fontFamily, fontSize, fontWeight: 600, fill: "#372f1f" }}
            >
              {label}
            </text>
          );
        })}
      </g>

      <circle cx={center} cy={center} r={rHub} fill={`url(#${hubId})`} stroke="#3a3324" strokeWidth={1} />
      <circle cx={center} cy={center} r={rHub * 0.35} fill="#241f14" />
    </svg>
  );
}
