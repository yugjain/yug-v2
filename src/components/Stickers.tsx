import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/* One drawing style for all five: paper fill, ink outline, single lime accent. */

const ink = 'var(--ink)';
const paper = 'var(--paper)';
const accent = 'var(--accent)';

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-auto w-full overflow-visible drop-shadow-[0_8px_14px_rgba(0,0,0,0.13)]"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function LaptopSticker() {
  return (
    <Frame>
      <rect x="16" y="14" width="68" height="46" rx="4" fill={paper} stroke={ink} strokeWidth="2.2" />
      <rect x="22" y="20" width="56" height="34" rx="2" fill={ink} fillOpacity="0.06" />
      {/* bars */}
      <rect x="27" y="40" width="6" height="9" rx="1" fill={ink} fillOpacity="0.28" />
      <rect x="36" y="34" width="6" height="15" rx="1" fill={ink} fillOpacity="0.45" />
      <rect x="45" y="28" width="6" height="21" rx="1" fill={accent} stroke={ink} strokeWidth="1.1" />
      <rect x="54" y="37" width="6" height="12" rx="1" fill={ink} fillOpacity="0.35" />
      <path d="M25 27h24" stroke={ink} strokeWidth="2" strokeOpacity="0.35" />
      <path d="M64 24h8M64 29h6" stroke={ink} strokeWidth="1.6" strokeOpacity="0.35" />
      {/* base */}
      <path
        d="M10 62h80l4 8c.6 1.2-.2 2.4-1.5 2.4H7.5C6.2 72.4 5.4 71.2 6 70z"
        fill={paper}
        stroke={ink}
        strokeWidth="2.2"
      />
      <path d="M40 68h20" stroke={ink} strokeWidth="2" strokeOpacity="0.45" />
    </Frame>
  );
}

export function CoffeeSticker() {
  return (
    <Frame>
      <path
        d="M26 40h44l-5 40a6 6 0 0 1-6 5H37a6 6 0 0 1-6-5z"
        fill={paper}
        stroke={ink}
        strokeWidth="2.2"
      />
      <path d="M26 54h44" stroke={ink} strokeWidth="2" strokeOpacity="0.5" />
      <path d="M31 46h34" stroke={accent} strokeWidth="5" strokeOpacity="0.9" />
      <path
        d="M70 50c8-2 13 3 12 9-1 7-8 10-15 8"
        fill="none"
        stroke={ink}
        strokeWidth="2.2"
      />
      <ellipse cx="48" cy="87" rx="30" ry="5" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M40 32c-3-4 3-6 0-10M52 32c-3-4 3-6 0-10M64 32c-3-4 3-6 0-10" stroke={ink} strokeWidth="1.8" strokeOpacity="0.35" fill="none" />
    </Frame>
  );
}

export function GuitarSticker() {
  return (
    <Frame>
      <g transform="rotate(-22 50 50)">
        <path
          d="M8 52c0-13 6-22 15-24 5-1 8 2 10 7 2 4 4 4 6-1 3-6 7-9 12-8 10 2 15 12 15 25s-5 22-15 24c-5 1-9-2-12-8-2-5-4-5-6-1-2 5-5 9-10 8-9-2-15-11-15-22z"
          fill={paper}
          stroke={ink}
          strokeWidth="2.2"
        />
        <circle cx="27" cy="52" r="7" fill={ink} fillOpacity="0.08" stroke={ink} strokeWidth="1.6" />
        <rect x="54" y="46" width="34" height="12" rx="4" fill={paper} stroke={ink} strokeWidth="2" />
        <rect x="86" y="42" width="10" height="20" rx="3" fill={paper} stroke={ink} strokeWidth="2" />
        <path d="M92 46v3M92 51v3M92 56v3" stroke={ink} strokeWidth="1.4" strokeOpacity="0.5" />
        <path d="M14 46h78M14 50h78M14 54h78M14 58h78" stroke={ink} strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M16 50h8" stroke={ink} strokeWidth="2.4" strokeOpacity="0.55" />
      </g>
    </Frame>
  );
}

export function FootballSticker() {
  return (
    <Frame>
      <circle cx="50" cy="50" r="36" fill={paper} stroke={ink} strokeWidth="2.4" />
      <path d="M50 32l13 9-5 15H42l-5-15z" fill={ink} fillOpacity="0.85" />
      <path d="M50 32V14M63 41l16-6M58 56l11 13M42 56L31 69M37 41L21 35" stroke={ink} strokeWidth="2.2" />
      <path d="M50 14c9 0 17 3 23 9" stroke={ink} strokeWidth="2.2" fill="none" strokeOpacity="0.35" />
      <path d="M31 69c-5-5-8-12-8-19" stroke={ink} strokeWidth="2.2" fill="none" strokeOpacity="0.35" />
      <path d="M69 56c3-5 4-11 3-16" stroke={ink} strokeWidth="2.2" fill="none" strokeOpacity="0.35" />
    </Frame>
  );
}

export function PassSticker() {
  return (
    <Frame>
      <path
        d="M8 34h84v32H8z"
        fill={paper}
        stroke={ink}
        strokeWidth="2.2"
      />
      <path d="M62 34v32" stroke={ink} strokeWidth="1.6" strokeDasharray="4 4" strokeOpacity="0.6" />
      <path d="M18 44h28M18 52h20" stroke={ink} strokeWidth="2" strokeOpacity="0.4" />
      <path d="M70 50l16-7-6 7 6 7z" fill={accent} stroke={ink} strokeWidth="1.8" />
      <path d="M22 58h14" stroke={ink} strokeWidth="1.6" strokeOpacity="0.3" />
      <path d="M70 58h6M80 58h6" stroke={ink} strokeWidth="2" strokeOpacity="0.35" />
    </Frame>
  );
}

type StickerProps = {
  label: string;
  tilt: number;
  left: number;
  top: number;
  size: number;
  depth: number;
  px: number;
  py: number;
  children: ReactNode;
};

function Sticker({ label, tilt, left, top, size, depth, px, py, children }: StickerProps) {
  const style = {
    left: `${left}%`,
    top: `${top}%`,
    width: size,
    '--tilt': `${tilt}deg`,
    '--px': `${px * depth}px`,
    '--py': `${py * depth}px`,
  } as CSSProperties;

  // Decorative: no focus stop, no announcement, but still responds to a poke.
  return (
    <div className="sticker absolute block" style={style} aria-hidden title={label}>
      {children}
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
      className="relative mx-auto mb-1 h-[184px] w-full max-w-[420px] origin-top scale-[0.86] sm:h-[196px] sm:scale-100"
    >
      <Sticker label="A customer dashboard" tilt={-2} left={26} top={10} size={146} depth={7} px={p.x} py={p.y}>
        <LaptopSticker />
      </Sticker>
      <Sticker label="A cup of coffee" tilt={-9} left={2} top={60} size={62} depth={12} px={p.x} py={p.y}>
        <CoffeeSticker />
      </Sticker>
      <Sticker label="An acoustic guitar" tilt={8} left={67} top={30} size={86} depth={10} px={p.x} py={p.y}>
        <GuitarSticker />
      </Sticker>
      <Sticker label="A football" tilt={-12} left={67} top={1} size={52} depth={14} px={p.x} py={p.y}>
        <FootballSticker />
      </Sticker>
      <Sticker label="A boarding pass" tilt={6} left={35} top={67} size={84} depth={9} px={p.x} py={p.y}>
        <PassSticker />
      </Sticker>
    </div>
  );
}
