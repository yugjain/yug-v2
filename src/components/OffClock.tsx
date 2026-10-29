import { useEffect, useRef, useState } from 'react';
import { coffee, pitch, sectionNotes, song } from '../content';
import { Check, Play, Stop } from './Icons';
import Marginalia from './Marginalia';
import Section from './Section';

const LANES = ['T', 'i', 'm', 'slap'];

/* ------------------------------------------------------- silent patterns */

function Guitar() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [plucked, setPlucked] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % 16);
    }, 163);
    return () => window.clearInterval(id);
  }, [playing]);

  const flick = (i: number) => {
    setPlucked(i);
    window.setTimeout(() => setPlucked((p) => (p === i ? null : p)), 260);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-line px-4 py-3.5">
        <div>
          <p className="eyebrow">On the music stand</p>
          <h3 className="mt-1 text-[14px] font-medium">
            {song.title} <span className="text-faint">· {song.artist}</span>
          </h3>
          <p className="mt-0.5 max-w-[52ch] text-[11.5px] leading-relaxed text-muted">{song.note}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPlaying((p) => !p);
            if (playing) setStep(-1);
          }}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11.5px] transition-colors ${
            playing
              ? 'bg-accent text-accent-ink'
              : 'border border-line text-ink hover:border-ink/40 hover:bg-line/40'
          }`}
        >
          {playing ? <Stop className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? 'Stop' : 'Run pattern'}
        </button>
      </div>

      <div className="bg-line/15 px-3 py-3">
        <svg
          viewBox="0 0 640 170"
          className="mx-auto block w-full max-w-[520px] -rotate-1"
          role="group"
          aria-label="Acoustic guitar, silent — click a string to see it move"
        >
          <defs>
            <linearGradient id="rim2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E7B173" />
              <stop offset="45%" stopColor="#D79A56" />
              <stop offset="100%" stopColor="#B97B3D" />
            </linearGradient>
            <filter id="soft2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--ink)" floodOpacity="0.1" />
            </filter>
          </defs>

          <rect x="230" y="72" width="332" height="26" rx="3" fill="url(#rim2)" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.2" />
          {[268, 306, 344, 382, 420, 458, 496, 534].map((x) => (
            <line key={x} x1={x} y1="73" x2={x} y2="97" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1" />
          ))}
          <rect x="562" y="64" width="46" height="42" rx="8" fill="url(#rim2)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
          {[72, 81, 90, 99, 108].map((y) => (
            <g key={y}>
              <circle cx="571" cy={y} r="2.1" fill="var(--ink)" opacity="0.35" />
              <circle cx="599" cy={y} r="2.1" fill="var(--ink)" opacity="0.35" />
            </g>
          ))}

          <g filter="url(#soft2)">
            <path
              d="M36 85 C36 51 62 27 100 27 C124 27 140 44 150 60 C160 75 176 46 196 46 C216 46 232 55 236 70
                 L236 100 C232 115 216 124 196 124 C176 124 160 95 150 110 C140 126 124 143 100 143 C62 143 36 119 36 85 Z"
              fill="url(#rim2)"
              stroke="var(--ink)"
              strokeOpacity="0.8"
              strokeWidth="1.6"
            />
            <path
              d="M46 87 C46 60 68 37 100 37 C120 37 132 50 141 63"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          </g>
          <circle cx="98" cy="85" r="19" fill="none" stroke="#D3A04A" strokeWidth="1.8" opacity="0.8" />
          <circle cx="98" cy="85" r="15" fill="#F4EBDD" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.4" />
          <circle cx="98" cy="85" r="9" fill="#2A1A10" />
          <rect x="46" y="78" width="11" height="13" rx="2" fill="#2A1A10" opacity="0.85" />

          {[0, 1, 2, 3, 4, 5].map((i) => {
            const y = 75 + i * 4;
            const active = plucked === i;
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`String ${i + 1}`}
                className="cursor-pointer outline-none"
                onClick={() => flick(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    flick(i);
                  }
                }}
              >
                <line x1="46" y1={y} x2="562" y2={y} stroke="transparent" strokeWidth="3.9" />
                <line
                  x1="40"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke={active ? 'var(--accent)' : 'var(--ink)'}
                  strokeWidth={active ? 1.8 : 0.9}
                  opacity={active ? 1 : 0.55}
                  style={{ transition: 'stroke 120ms, stroke-width 120ms, opacity 120ms' }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-4 py-3.5">
        <div className="rounded-md border border-dashed border-line p-2.5">
          <div className="mb-1 flex items-center gap-1">
            <span className="w-7" />
            <div className="grid flex-1" style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className={`mono text-center text-[8px] text-faint ${i % 4 === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  {i / 4 + 1}
                </span>
              ))}
            </div>
          </div>

          {LANES.map((lane) => (
            <div key={lane} className="flex items-center gap-1">
              <span className="mono w-7 shrink-0 text-[8.5px] uppercase tracking-[0.06em] text-faint">
                {lane}
              </span>
              <div
                className="grid flex-1"
                style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
              >
                {Array.from({ length: 16 }).map((_, stepIndex) => {
                  const hit = song.pattern[Math.floor(stepIndex / 4)][stepIndex % 4];
                  const isHit = hit !== '' && hit.toLowerCase() === lane.toLowerCase();
                  const isNow = step === stepIndex;
                  return (
                    <span
                      key={stepIndex}
                      className={`grid h-5 place-items-center border-r border-dashed border-line last:border-r-0 ${
                        stepIndex % 4 === 3 ? 'border-r-ink/20' : ''
                      } ${isNow ? 'bg-accent/25' : isHit ? 'bg-ink/[0.04]' : ''}`}
                    >
                      {isHit && (
                        <span
                          className={`block h-2 w-2 rounded-[2px] transition-colors ${
                            isNow ? 'bg-ink' : 'bg-ink/45'
                          }`}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="mono text-[9px] uppercase tracking-[0.12em] text-faint">
            T thumb · i index · m middle · slap · {song.bpm} bpm
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- pitch */

function Pitch() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);
  const [dragging, setDragging] = useState(false);
  const [ball, setBall] = useState({ x: pitch[2].x, y: pitch[2].y });
  const role = pitch[active];

  const move = (e: React.PointerEvent) => {
    if (!dragging || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setBall({
      x: Math.min(95, Math.max(5, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(95, Math.max(5, ((e.clientY - r.top) / r.height) * 100)),
    });
  };

  const drop = () => {
    if (!dragging) return;
    setDragging(false);
    let best = 0;
    let bd = Number.POSITIVE_INFINITY;
    pitch.forEach((p, i) => {
      const d = (p.x - ball.x) ** 2 + (p.y - ball.y) ** 2;
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    setActive(best);
    setBall({ x: pitch[best].x, y: pitch[best].y });
  };

  const pick = (i: number) => {
    setActive(i);
    setBall({ x: pitch[i].x, y: pitch[i].y });
  };

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="border-b border-dashed border-line px-4 py-3.5">
        <p className="eyebrow">Football</p>
        <h3 className="mt-1 text-[14px] font-medium">Where I actually play</h3>
      </div>

      <div className="flex flex-1 items-center bg-line/15 px-3 py-3">
        <div
          ref={ref}
          onPointerMove={move}
          onPointerUp={drop}
          onPointerLeave={drop}
          className="relative mx-auto w-full max-w-[280px] touch-none select-none overflow-hidden rounded-md border border-line bg-paper"
        >
          <svg viewBox="0 0 100 100" className="block w-full" aria-hidden>
            <g stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2">
              <rect x="4" y="4" width="92" height="92" rx="1" />
              <line x1="4" y1="50" x2="96" y2="50" />
              <circle cx="50" cy="50" r="11" />
              <rect x="28" y="4" width="44" height="14" />
              <rect x="40" y="4" width="20" height="6" />
              <rect x="28" y="82" width="44" height="14" />
              <rect x="40" y="90" width="20" height="6" />
            </g>
          </svg>

          {pitch.map((p, i) => (
            <button
              key={p.role}
              type="button"
              onClick={() => pick(i)}
              aria-label={p.role}
              aria-pressed={active === i}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[9px] transition-all duration-300 ${
                active === i
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-ink/25 bg-paper text-faint hover:border-ink/50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <div
            aria-hidden
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setDragging(true);
            }}
            style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
            className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-ink ring-2 ring-paper active:cursor-grabbing ${
              dragging ? '' : 'transition-all duration-500'
            }`}
          />
        </div>
      </div>

      <div className="px-4 pb-3.5 pt-3">
        <p className="text-[12px] font-medium text-ink">
          {active + 1}. {role.role}
        </p>
        <p className="mt-0.5 min-h-[2.4rem] text-[12px] leading-[1.55] text-muted">{role.note}</p>
        <p className="serif text-[11.5px] italic text-faint">Drag the ball, or tap a shirt.</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- coffee */

function Coffee() {
  const [step, setStep] = useState(0);
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef(0);
  const done = step >= coffee.steps.length;

  const advance = () => {
    if (done) {
      setStep(0);
      return;
    }
    setStep((s) => s + 1);
  };

  const release = () => {
    if (!dragging) return;
    setDragging(false);
    if (pull > 0.55) advance();
    setPull(0);
  };

  const fill = Math.min(step / coffee.steps.length, 1);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="border-b border-dashed border-line px-4 py-3.5">
        <p className="eyebrow">Daily ritual</p>
        <h3 className="mt-1 text-[14px] font-medium">The inverted AeroPress</h3>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-line/15 px-3 py-3">
        <svg
          viewBox="0 0 140 150"
          className="block h-[190px] select-none"
          aria-hidden
          onPointerMove={(e) => {
            if (!dragging) return;
            setPull(Math.max(0, Math.min(1, (e.clientY - start.current) / 46)));
          }}
          onPointerUp={release}
          onPointerLeave={release}
        >
          <path d="M40 102 h60 v24 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.55" />
          <rect
            x="43"
            y={124 - fill * 20}
            width="54"
            height={fill * 20 + 2}
            rx="3"
            fill="var(--ink)"
            opacity="0.72"
            style={{ transition: 'all 700ms cubic-bezier(.32,.72,0,1)' }}
          />
          <path d="M100 108 h7 a6 6 0 0 1 0 12 h-7" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.45" />

          <g
            style={{
              transform: `translateY(${pull * 22}px)`,
              transition: dragging ? 'none' : 'transform 700ms cubic-bezier(.32,.72,0,1)',
              cursor: 'grab',
            }}
            onPointerDown={(e) => {
              (e.target as SVGGElement).setPointerCapture?.(e.pointerId);
              start.current = e.clientY;
              setDragging(true);
            }}
          >
            <rect x="48" y="44" width="44" height="44" rx="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" opacity="0.75" />
            <rect x="46" y="88" width="48" height="8" rx="3" fill="var(--ink)" opacity="0.2" />
            <rect x="46" y="88" width="48" height="8" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.3" opacity="0.45" />
            <rect x="66" y="24" width="8" height="20" rx="3" fill="var(--ink)" opacity="0.35" />
            <rect x="57" y="16" width="26" height="8" rx="4" fill="var(--ink)" opacity="0.45" />
          </g>

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity={fill > 0.4 ? 0.28 : 0.1}
            style={{ transition: 'opacity 600ms' }}
          >
            <path d="M58 98 c-3 -4 3 -7 0 -11" />
            <path d="M70 98 c-3 -5 3 -8 0 -13" />
            <path d="M82 98 c-3 -4 3 -7 0 -11" />
          </g>
        </svg>
        <p className="serif text-[11.5px] italic text-faint">inverted · 200°F · 18g</p>
      </div>

      <div className="px-4 pb-3.5 pt-3">
        <ol className="space-y-1.5">
          {coffee.steps.map((s, i) => {
            const state = done || i < step ? 'done' : i === step ? 'now' : 'todo';
            return (
              <li key={s.label} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] ${
                    state === 'done'
                      ? 'border-accent bg-accent text-accent-ink'
                      : state === 'now'
                        ? 'border-ink text-ink'
                        : 'border-line text-faint'
                  }`}
                >
                  {state === 'done' ? <Check className="h-2.5 w-2.5" /> : i + 1}
                </span>
                <span className={`text-[11.5px] leading-snug ${state === 'todo' ? 'text-faint' : 'text-ink'}`}>
                  {s.label}
                  {state === 'now' && <span className="block text-[10.5px] text-muted">{s.note}</span>}
                </span>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={advance}
          className="mt-2.5 w-full rounded-md border border-dashed border-line py-1.5 text-[11px] text-muted transition-colors hover:border-ink/40 hover:bg-line/40 hover:text-ink"
        >
          {done ? 'Brew another' : step === coffee.steps.length - 1 ? 'Press' : `Next: ${coffee.steps[step + 1].label}`}
        </button>

      </div>
    </div>
  );
}

export default function OffClock() {
  return (
    <Section
      id="play"
      eyebrow="Away from the screen"
      title="Three things that aren’t a status report"
      hint="All interactive"
    >
      <Marginalia side="right" className="top-24">
        {sectionNotes.play}
      </Marginalia>
      <Guitar />
      <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
        <Pitch />
        <Coffee />
      </div>
    </Section>
  );
}
