import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/* ------------------------------------------------------------------ palette */
/* Sticker art keeps fixed ink-and-paper colours in both themes, the way a
   printed sticker would — only the drop shadow follows the theme. */
const INK = '#1C1B18';
const WHITE = '#FFFFFF';
const CREAM = '#F8F3E8';
const CREAM2 = '#EDE6D5';
const SHADE = '#DCD3BF';
const COFFEE = '#3E2617';
const CREMA = '#B98A5C';
const GOLD = '#D3A04A';
const WOOD = '#D79A56';
const WOOD2 = '#B97B3D';
const WOOD3 = '#8B5626';
const SCREEN = '#20272B';
const LIME = '#A3E635';

/* Die-cut helpers: white halo first, artwork on top. */
function Piece({
  d,
  fill,
  sw = 3,
  stroke = INK,
  opacity,
}: {
  d: string;
  fill: string;
  sw?: number;
  stroke?: string;
  opacity?: number;
}) {
  return (
    <>
      <path d={d} fill={WHITE} stroke={WHITE} strokeWidth={11} strokeLinejoin="round" paintOrder="stroke" />
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        opacity={opacity}
      />
    </>
  );
}

function DieEllipse({
  cx,
  cy,
  rx,
  ry,
  fill,
  sw = 3,
  stroke = INK,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  sw?: number;
  stroke?: string;
}) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx + 7} ry={ry + 7} fill={WHITE} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={sw} />
    </>
  );
}

function Frame({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  return (
    <svg viewBox={viewBox} className="h-auto w-full overflow-visible" aria-hidden shapeRendering="geometricPrecision">
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------- coffee */

export function CoffeeSticker() {
  return (
    <Frame viewBox="0 0 170 190">
      <defs>
        <linearGradient id="cupBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E9E1D0" />
          <stop offset="22%" stopColor="#FDFAF3" />
          <stop offset="72%" stopColor="#FBF6EB" />
          <stop offset="100%" stopColor="#DED5C1" />
        </linearGradient>
        <linearGradient id="saucer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDFAF3" />
          <stop offset="100%" stopColor="#E3DAC7" />
        </linearGradient>
        <radialGradient id="brew" cx="0.4" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#5C3A22" />
          <stop offset="100%" stopColor={COFFEE} />
        </radialGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="85" cy="176" rx="58" ry="7" fill={INK} opacity="0.10" />

      {/* saucer */}
      <DieEllipse cx={85} cy={156} rx={64} ry={15} fill="url(#saucer)" />
      <ellipse cx="85" cy="152" rx="43" ry="8" fill={SHADE} opacity="0.5" />

      {/* handle */}
      <path d="M120 106c28-6 34 26 6 36" fill="none" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
      <path d="M120 106c28-6 34 26 6 36" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d="M124 112c17-3 21 17 4 23" fill="none" stroke={CREAM2} strokeWidth="4" strokeLinecap="round" />

      {/* cup */}
      <Piece
        d="M47 94c0 0 5 50 9 56 16 11 42 11 58 0 4-6 9-56 9-56z"
        fill="url(#cupBody)"
      />

      {/* gold band */}
      <path d="M50 124c18 9 52 9 70 0" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />

      {/* rim + coffee */}
      <DieEllipse cx={85} cy={94} rx={38} ry={11} fill={CREAM} />
      <ellipse cx="85" cy="94" rx="31" ry="8.5" fill="url(#brew)" />
      <path d="M62 92c6-3 14-4 22-4s16 1 22 4" fill="none" stroke={CREMA} strokeWidth="2.6" opacity="0.9" />
      <ellipse cx="76" cy="90" rx="6" ry="2" fill="#7A5232" opacity="0.8" />

      {/* steam */}
      <g fill="none" stroke={SHADE} strokeWidth="3.4" strokeLinecap="round" opacity="0.9">
        <path d="M66 74c-5-7 5-11 0-19" />
        <path d="M85 70c-6-9 6-13 0-24" />
        <path d="M104 74c-5-7 5-11 0-19" />
      </g>
    </Frame>
  );
}

/* -------------------------------------------------------------------- guitar */

export function GuitarSticker() {
  return (
    <Frame viewBox="0 0 210 130">
      <defs>
        <linearGradient id="woodTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7B173" />
          <stop offset="45%" stopColor={WOOD} />
          <stop offset="100%" stopColor={WOOD2} />
        </linearGradient>
        <linearGradient id="neckWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WOOD2} />
          <stop offset="100%" stopColor={WOOD3} />
        </linearGradient>
      </defs>

      <g transform="rotate(-7 105 65)">
        <ellipse cx="78" cy="116" rx="56" ry="6" fill={INK} opacity="0.10" />

        {/* body */}
        <Piece
          d="M14 65C14 42 30 26 52 26c14 0 22 10 26 20 4-10 12-16 22-14 18 4 30 18 30 33s-12 29-30 33c-10 2-18-4-22-14-4 10-12 20-26 20-22 0-38-16-38-39z"
          fill="url(#woodTop)"
        />

        {/* soundhole + rosette */}
        <circle cx="52" cy="65" r="17" fill="none" stroke={GOLD} strokeWidth="2.2" opacity="0.85" />
        <circle cx="52" cy="65" r="13.5" fill="#F4EBDD" stroke={INK} strokeWidth="2.6" />
        <circle cx="52" cy="65" r="9" fill="#2A1A10" />

        {/* pickguard */}
        <path d="M74 52c14 2 20 14 14 28-8-8-14-12-20-14z" fill={INK} opacity="0.85" />
        {/* bridge */}
        <rect x="20" y="60" width="9" height="11" rx="2" fill="#2A1A10" />
        <rect x="21" y="56" width="7" height="4" rx="1.5" fill={CREAM} opacity="0.8" />

        {/* neck */}
        <rect x="124" y="55" width="54" height="19" rx="2" fill="url(#neckWood)" stroke={INK} strokeWidth="2.6" />
        {[132, 139, 146, 153, 160, 167, 174].map((x) => (
          <line key={x} x1={x} y1="56" x2={x} y2="73" stroke={CREAM} strokeWidth="1.4" opacity="0.85" />
        ))}

        {/* headstock */}
        <rect x="176" y="49" width="19" height="31" rx="4" fill={WOOD3} stroke={INK} strokeWidth="2.6" />
        {[55, 62, 69].map((y) => (
          <g key={y}>
            <circle cx="181" cy={y} r="2.4" fill={CREAM} stroke={INK} strokeWidth="1" />
            <circle cx="190" cy={y + 4} r="2.4" fill={CREAM} stroke={INK} strokeWidth="1" />
          </g>
        ))}

        {/* strings */}
        {[58, 61, 64, 67, 70, 73].map((y) => (
          <line key={y} x1="24" y1={y} x2="195" y2={y} stroke={CREAM} strokeWidth="1.1" opacity="0.95" />
        ))}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------- laptop */

export function LaptopSticker() {
  return (
    <Frame viewBox="0 0 200 150">
      <defs>
        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDFBF5" />
          <stop offset="100%" stopColor="#E8E1D1" />
        </linearGradient>
        <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F1E4" />
          <stop offset="100%" stopColor="#DCD3BF" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="126" rx="76" ry="8" fill={INK} opacity="0.10" />

      {/* lid */}
      <Piece
        d="M47 16h106a6 6 0 0 1 6 6v66a6 6 0 0 1-6 6H47a6 6 0 0 1-6-6V22a6 6 0 0 1 6-6z"
        fill="url(#lid)"
      />
      <rect x="50" y="22" width="100" height="60" rx="2" fill={SCREEN} stroke={INK} strokeWidth="2" />

      {/* dashboard */}
      <rect x="58" y="50" width="7" height="20" rx="1.5" fill={SHADE} opacity="0.85" />
      <rect x="70" y="42" width="7" height="28" rx="1.5" fill={CREAM2} opacity="0.8" />
      <rect x="82" y="34" width="7" height="36" rx="1.5" fill={LIME} />
      <rect x="94" y="46" width="7" height="24" rx="1.5" fill={SHADE} opacity="0.6" />
      <path d="M58 32h26" stroke={CREAM} strokeWidth="2" opacity="0.45" />
      <path d="M110 36c8 4 12 10 12 20" stroke={LIME} strokeWidth="2" opacity="0.75" fill="none" />
      <rect x="110" y="24" width="32" height="4" rx="2" fill={CREAM} opacity="0.25" />
      <rect x="110" y="31" width="22" height="4" rx="2" fill={CREAM} opacity="0.2" />

      {/* base */}
      <path
        d="M20 91h160l-8 19H28z"
        fill="#E9E1D0"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {[0, 1, 2, 3].map((row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={38 + col * 9.6}
            y={94 + row * 3.6}
            width={7.2}
            height={2.6}
            rx={0.8}
            fill={CREAM}
            opacity={0.85}
          />
        )),
      )}
      <path d="M28 110h144l4 6H24z" fill="#D6CCB6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M88 92h24" stroke={INK} strokeWidth="2" opacity="0.25" />
    </Frame>
  );
}

/* ------------------------------------------------------------------- ball */

function pentagon(cx: number, cy: number, r: number, rot = -90) {
  return Array.from({ length: 5 }, (_, i) => {
    const a = ((rot + i * 72) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

export function FootballSticker() {
  const petals = [0, 72, 144, 216, 288].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: 75 + 40 * Math.cos(a), y: 75 + 40 * Math.sin(a), rot: deg + 36 };
  });

  return (
    <Frame viewBox="0 0 150 150">
      <defs>
        <radialGradient id="ballShade" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="62%" stopColor={CREAM} />
          <stop offset="100%" stopColor={SHADE} />
        </radialGradient>
        <clipPath id="ballClip">
          <circle cx="75" cy="75" r="60" />
        </clipPath>
      </defs>

      <ellipse cx="76" cy="136" rx="44" ry="5" fill={INK} opacity="0.10" />
      <circle cx="75" cy="75" r="67" fill={WHITE} />
      <circle cx="75" cy="75" r="60" fill="url(#ballShade)" stroke={INK} strokeWidth="3" />

      <g clipPath="url(#ballClip)">
        <polygon points={pentagon(75, 75, 18)} fill={INK} opacity="0.84" />
        {petals.map((p) => (
          <polygon key={p.rot} points={pentagon(p.x, p.y, 14, p.rot)} fill={INK} opacity="0.8" />
        ))}
        {petals.map((p) => (
          <line
            key={`l${p.rot}`}
            x1={75 + 18 * Math.cos(((p.rot - 36) * Math.PI) / 180)}
            y1={75 + 18 * Math.sin(((p.rot - 36) * Math.PI) / 180)}
            x2={p.x}
            y2={p.y}
            stroke={INK}
            strokeWidth="2.4"
            opacity="0.55"
          />
        ))}
        <ellipse cx="55" cy="48" rx="26" ry="18" fill={WHITE} opacity="0.28" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------- boarding pass */

export function PassSticker() {
  return (
    <Frame viewBox="0 0 200 110">
      <g transform="rotate(-5 100 55)">
        <rect x="14" y="30" width="176" height="56" rx="7" fill={INK} opacity="0.10" />
        <rect x="12" y="26" width="176" height="56" rx="7" fill={CREAM} stroke={INK} strokeWidth="3" />
        <rect x="12" y="26" width="176" height="12" rx="6" fill={GOLD} opacity="0.35" />
        <line x1="140" y1="26" x2="140" y2="82" stroke={INK} strokeWidth="2" strokeDasharray="3 4" opacity="0.55" />

        <text x="26" y="52" fontFamily="'Geist Mono', monospace" fontSize="15" fontWeight="600" fill={INK}>
          BOM
        </text>
        <text x="88" y="52" fontFamily="'Geist Mono', monospace" fontSize="15" fontWeight="600" fill={INK}>
          JFK
        </text>
        <path d="M64 47h16M74 41l6 6-6 6" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="26" y="66" fontFamily="'Geist Mono', monospace" fontSize="6.5" fill={INK} opacity="0.55">
          YJ · SEAT 01A
        </text>
        <text x="26" y="75" fontFamily="'Geist Mono', monospace" fontSize="6.5" fill={INK} opacity="0.55">
          ADVISORY MANDATE
        </text>

        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={150 + i * 3.6}
            y="40"
            width={i % 3 === 0 ? 2.2 : 1.2}
            height="26"
            fill={INK}
            opacity="0.8"
          />
        ))}

        <circle cx="176" cy="76" r="9" fill={WHITE} stroke={INK} strokeWidth="1.6" opacity="0.9" />
        <path d="M172 76l3 3 5-6" stroke={LIME} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------- banner */

type StickerProps = {
  label: string;
  tilt: number;
  left: string;
  top: string;
  width: string;
  depth: number;
  px: number;
  py: number;
  z?: number;
  children: ReactNode;
};

function Sticker({ label, tilt, left, top, width, depth, px, py, z = 1, children }: StickerProps) {
  const style = {
    left,
    top,
    width,
    zIndex: z,
    '--tilt': `${tilt}deg`,
    '--px': `${px * depth}px`,
    '--py': `${py * depth}px`,
  } as CSSProperties;

  return (
    <div className="sticker absolute block drop-shadow-[0_10px_14px_rgba(20,18,14,0.16)]" style={style} aria-hidden>
      {children}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function StickerBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setP({ x: 0, y: 0 })}
      className="relative mx-auto mb-2 aspect-[46/27] w-full max-w-[470px]"
    >
      <Sticker label="Dashboard" tilt={-3} left="16%" top="0%" width="66%" depth={7} px={p.x} py={p.y} z={2}>
        <LaptopSticker />
      </Sticker>
      <Sticker label="Coffee" tilt={-8} left="-1%" top="42%" width="31%" depth={13} px={p.x} py={p.y} z={4}>
        <CoffeeSticker />
      </Sticker>
      <Sticker label="Guitar" tilt={7} left="57%" top="31%" width="45%" depth={10} px={p.x} py={p.y} z={3}>
        <GuitarSticker />
      </Sticker>
      <Sticker label="Football" tilt={-12} left="66%" top="-2%" width="24%" depth={15} px={p.x} py={p.y} z={5}>
        <FootballSticker />
      </Sticker>
      <Sticker label="Boarding pass" tilt={5} left="33%" top="70%" width="36%" depth={9} px={p.x} py={p.y} z={6}>
        <PassSticker />
      </Sticker>
    </div>
  );
}
