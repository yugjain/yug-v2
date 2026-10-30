import { useState } from 'react';

export default function Lamp() {
  const [on, setOn] = useState(false);

  return (
    <div className="absolute -left-[132px] top-10 hidden w-[112px] flex-col items-center gap-1 xl:flex">
      <button
        type="button"
        aria-pressed={on}
        aria-label={on ? 'Switch the desk lamp off' : 'Switch the desk lamp on'}
        onClick={() => setOn((v) => !v)}
        className="group flex flex-col items-center rounded-lg px-2 py-1 transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        <svg viewBox="0 0 56 64" width="56" height="64" shapeRendering="crispEdges" aria-hidden>
          {/* glow */}
          <g opacity={on ? 1 : 0} style={{ transition: 'opacity 260ms ease' }}>
            <path d="M18 26h20v12H18z" fill="var(--lamp-glow)" opacity="0.28" />
            <path d="M22 38h12v10H22z" fill="var(--lamp-glow)" opacity="0.18" />
            <path d="M25 48h6v8h-6z" fill="var(--lamp-glow)" opacity="0.1" />
          </g>

          {/* shade */}
          <path
            d="M12 22h32v4H12zM15 26h26v3H15z"
            fill={on ? 'var(--lamp-glow)' : 'var(--line)'}
            style={{ transition: 'fill 260ms ease' }}
          />
          <path d="M18 29h20v8H18z" fill={on ? 'var(--lamp-shade)' : 'var(--paper)'} stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1" />
          <path d="M22 33h12v3H22z" fill={on ? 'var(--lamp-core)' : 'var(--line)'} />

          {/* arm + base */}
          <path d="M28 12h4v10h-4z" fill="var(--ink)" opacity="0.55" />
          <path d="M28 12h4v2h-4z" fill="var(--ink)" opacity="0.75" />
          <path d="M18 4h16v3H18z" fill="var(--ink)" opacity="0.45" />
          <path d="M24 4h4v8h-4z" fill="var(--ink)" opacity="0.45" />
          <path d="M28 44h4v8h-4z" fill="var(--ink)" opacity="0.4" />
          <path d="M16 56h24v4H16z" fill="var(--ink)" opacity="0.5" />
          <path d="M20 52h16v4H20z" fill="var(--ink)" opacity="0.35" />
        </svg>
        <span
          className="hand text-[15px] leading-none text-faint transition-colors group-hover:text-ink"
          style={{ transform: 'rotate(-3deg)' }}
        >
          {on ? 'working late' : 'light the lamp'}
        </span>
      </button>
    </div>
  );
}
