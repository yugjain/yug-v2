import { useEffect, useRef, useState } from 'react';
import { coffee, guitar, pitch } from '../content';
import { Check, Play, Stop } from './Icons';
import Section from './Section';

/* ------------------------------------------------------------------ audio */
/* Karplus–Strong: a noise burst into a tuned feedback delay = plucked string. */

const OPEN_STRINGS = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

function usePluck() {
  const ctxRef = useRef<AudioContext | null>(null);

  const context = () => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  };

  const pluck = (freq: number, delay = 0, level = 0.2) => {
    const ctx = context();
    const t = ctx.currentTime + delay;
    const life = 1.9;

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const delayNode = ctx.createDelay(1);
    delayNode.delayTime.value = 1 / freq;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.968;
    const damp = ctx.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.value = Math.min(4200, freq * 16);
    const body = ctx.createBiquadFilter();
    body.type = 'peaking';
    body.frequency.value = 190;
    body.gain.value = 4;
    body.Q.value = 0.9;
    const out = ctx.createGain();
    out.gain.value = level;

    src.connect(delayNode);
    delayNode.connect(damp);
    damp.connect(feedback);
    feedback.connect(delayNode);
    damp.connect(body);
    body.connect(out);
    out.connect(ctx.destination);

    out.gain.setValueAtTime(level, t);
    out.gain.exponentialRampToValueAtTime(0.0001, t + life);
    src.start(t);

    window.setTimeout(() => {
      [src, delayNode, feedback, damp, body, out].forEach((n) => {
        try {
          n.disconnect();
        } catch {
          /* already gone */
        }
      });
    }, (delay + life + 0.4) * 1000);
  };

  useEffect(() => () => void ctxRef.current?.close(), []);
  return pluck;
}

/* ---------------------------------------------------------------- guitar */

function Guitar() {
  const [playing, setPlaying] = useState(false);
  const [bar, setBar] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [plucked, setPlucked] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const pluck = usePluck();

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const stop = () => {
    clear();
    setPlaying(false);
    setBar(null);
  };

  useEffect(() => clear, []);

  const strum = (freqs: number[], offset = 0) =>
    freqs.forEach((f, i) => pluck(f, offset + i * 0.05, 0.16 - i * 0.012));

  const playProgression = () => {
    if (playing) return stop();
    setPlaying(true);
    guitar.progression.forEach((chord, i) => {
      strum(chord.freqs, i * 1.6);
      timers.current.push(
        window.setTimeout(() => {
          setBar(i);
          if (i === guitar.progression.length - 1) {
            timers.current.push(
              window.setTimeout(() => {
                setPlaying(false);
                setBar(null);
              }, 1500),
            );
          }
        }, i * 1600),
      );
    });
  };

  const flick = (index: number) => {
    pluck(OPEN_STRINGS[index]);
    setPlucked(index);
    window.setTimeout(() => setPlucked((p) => (p === index ? null : p)), 550);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="eyebrow">Off the clock</p>
          <h3 className="mt-1.5 text-[15px] font-medium">A guitar you can actually play</h3>
        </div>
        <button
          type="button"
          onClick={playProgression}
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
            playing
              ? 'bg-accent text-accent-ink'
              : 'border border-line text-ink hover:border-ink/40 hover:bg-line/40'
          }`}
        >
          {playing ? <Stop className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? 'Stop' : 'Play G–D–C–D'}
        </button>
      </div>

      <div className="bg-line/15 px-3 py-3">
        <svg
          viewBox="0 0 640 180"
          className="mx-auto block w-full max-w-[560px] -rotate-2"
          role="group"
          aria-label="Acoustic guitar — click a string to pluck it, or tap the body to strum"
          onClick={(e) => {
            if ((e.target as Element).closest('g[role="button"]')) return;
            strum(OPEN_STRINGS);
          }}
        >
          <defs>
            <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.03" />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--ink)" floodOpacity="0.10" />
            </filter>
          </defs>

          {/* neck + headstock */}
          <rect x="230" y="76" width="332" height="28" rx="3" fill="url(#rim)" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.2" />
          {[268, 306, 344, 382, 420, 458, 496, 534].map((x) => (
            <line key={x} x1={x} y1="77" x2={x} y2="103" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1" />
          ))}
          <rect x="562" y="68" width="46" height="44" rx="8" fill="url(#rim)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
          {[76, 85, 94, 103, 112].map((y) => (
            <g key={y}>
              <circle cx="571" cy={y} r="2.2" fill="var(--ink)" opacity="0.35" />
              <circle cx="599" cy={y} r="2.2" fill="var(--ink)" opacity="0.35" />
            </g>
          ))}

          {/* body */}
          <g filter="url(#soft)">
            <path
              d="M36 90 C36 54 62 28 100 28 C124 28 140 46 150 64 C160 80 176 48 196 48 C216 48 232 58 236 74
                 L236 106 C232 122 216 132 196 132 C176 132 160 100 150 116 C140 134 124 152 100 152 C62 152 36 126 36 90 Z"
              fill="url(#rim)"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
            <path
              d="M46 92 C46 62 68 38 100 38 C120 38 132 52 141 66 C149 79 161 58 178 55"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
            <path
              d="M126 78 C142 82 150 96 146 112 C136 104 126 100 118 96 Z"
              fill="var(--ink)"
              opacity="0.07"
            />
          </g>
          <circle cx="98" cy="90" r="17" fill="var(--paper)" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.2" />
          <circle cx="98" cy="90" r="17" fill="var(--ink)" opacity="0.06" />
          <rect x="46" y="83" width="12" height="14" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" />

          {/* strings — each one is a button */}
          {OPEN_STRINGS.map((freq, i) => {
            const y = 80 + i * 4;
            const active = hover === i || plucked === i;
            return (
              <g
                key={freq}
                role="button"
                tabIndex={0}
                aria-label={`Pluck the ${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} string`}
                className="cursor-pointer outline-none"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
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
                  strokeWidth={active ? 1.8 : 0.8}
                  opacity={active ? 1 : 0.45}
                  style={{
                    transition: 'stroke 120ms, stroke-width 120ms, opacity 120ms, transform 180ms',
                    transform: plucked === i ? 'translateY(1px)' : 'none',
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-4 gap-2">
          {guitar.progression.map((chord, i) => (
            <button
              key={`${chord.chord}-${i}`}
              type="button"
              onClick={() => {
                strum(chord.freqs);
                setBar(i);
                window.setTimeout(() => setBar((b) => (b === i ? null : b)), 1100);
              }}
              aria-label={`Strum ${chord.chord}`}
              className={`rounded-lg border px-2 py-2.5 text-center transition-all duration-200 ${
                bar === i
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-ink/30'
              }`}
            >
              <span className="block text-[17px] font-medium leading-none">{chord.chord}</span>
              <span className="mono mt-1.5 block text-[9px] tracking-[0.06em] opacity-55">{chord.fingering}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="serif text-[13px] italic text-faint">
            <span className="hidden sm:inline">Click a string, or tap a chord. Standard tuning, EADGBE.</span>
            <span className="sm:hidden">Tap the guitar to strum, or tap a chord.</span>
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.1em] text-faint">
            {guitar.repertoire[0].song} · {guitar.repertoire[0].bpm} bpm
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- pitch */

function Pitch() {
  const [active, setActive] = useState(2);
  const [pass, setPass] = useState<{ from: number; to: number } | null>(null);
  const role = pitch[active];

  const pick = (i: number) => {
    if (i === active) return;
    setPass({ from: active, to: i });
    setActive(i);
    window.setTimeout(() => setPass(null), 900);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line">
      <div className="border-b border-line px-5 py-4">
        <p className="eyebrow">Football</p>
        <h3 className="mt-1.5 text-[15px] font-medium">Where I actually play</h3>
      </div>

      <div className="flex flex-1 items-center bg-line/15 px-3 py-3">
        <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-lg border border-line bg-paper">
          <svg viewBox="0 0 100 100" className="block w-full" aria-hidden>
            <g stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.22">
              <rect x="4" y="4" width="92" height="92" rx="1" />
              <line x1="4" y1="50" x2="96" y2="50" />
              <circle cx="50" cy="50" r="11" />
              <rect x="28" y="4" width="44" height="14" />
              <rect x="40" y="4" width="20" height="6" />
              <rect x="28" y="82" width="44" height="14" />
              <rect x="40" y="90" width="20" height="6" />
            </g>
          </svg>

          {/* pass line */}
          {pass && (
            <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
              <line
                x1={pitch[pass.from].x}
                y1={pitch[pass.from].y}
                x2={pitch[pass.to].x}
                y2={pitch[pass.to].y}
                stroke="var(--accent)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                strokeLinecap="round"
              />
            </svg>
          )}

          {pitch.map((p, i) => (
            <button
              key={p.role}
              type="button"
              onClick={() => pick(i)}
              aria-label={p.role}
              aria-pressed={active === i}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-[9px] transition-all duration-300 sm:h-6 sm:w-6 ${
                  active === i
                    ? 'scale-110 border-accent bg-accent text-accent-ink shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent)_22%,transparent)]'
                    : 'border-ink/25 bg-paper text-faint hover:scale-105 hover:border-ink/50'
                }`}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 pt-3">
        <p className="text-[12.5px] font-medium text-ink">
          {active + 1}. {role.role}
        </p>
        <p className="mt-0.5 min-h-[2.6rem] text-[12.5px] leading-[1.55] text-muted">{role.note}</p>
        <p className="serif text-[12px] italic text-faint">Tap a shirt number.</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- coffee */

function Coffee() {
  const [step, setStep] = useState(0);
  const [pressing, setPressing] = useState(false);
  const done = step >= coffee.steps.length;

  const press = () => {
    if (pressing) return;
    if (done) {
      setStep(0);
      return;
    }
    setPressing(true);
    window.setTimeout(() => {
      setStep((s) => s + 1);
      setPressing(false);
    }, 900);
  };

  const fill = Math.min(step / coffee.steps.length, 1);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line">
      <div className="border-b border-line px-5 py-4">
        <p className="eyebrow">Daily ritual</p>
        <h3 className="mt-1.5 text-[15px] font-medium">The inverted AeroPress</h3>
      </div>

      <div className="flex flex-1 items-center justify-center bg-line/15 px-3 py-4">
        <svg viewBox="0 0 140 150" className="block h-[186px]" aria-hidden>
            {/* cup */}
            <path
              d="M40 102 h60 v24 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 Z"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              opacity="0.55"
            />
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

            {/* inverted press: body, cap, rod, knob */}
            <g
              style={{
                transform: pressing ? 'translateY(12px)' : 'translateY(0)',
                transition: 'transform 850ms cubic-bezier(.32,.72,0,1)',
              }}
            >
              <rect x="48" y="44" width="44" height="44" rx="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" opacity="0.75" />
              <rect x="46" y="88" width="48" height="8" rx="3" fill="var(--ink)" opacity="0.2" />
              <rect x="46" y="88" width="48" height="8" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.3" opacity="0.45" />
              <rect x="66" y="24" width="8" height="20" rx="3" fill="var(--ink)" opacity="0.35" />
              <rect x="57" y="16" width="26" height="8" rx="4" fill="var(--ink)" opacity="0.45" />
              <line x1="56" y1="58" x2="84" y2="58" stroke="var(--ink)" strokeWidth="1" opacity="0.14" />
            </g>

            {/* steam */}
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
      </div>

      <div className="px-5 pb-4 pt-3">
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
                <span className={`text-[12px] leading-snug ${state === 'todo' ? 'text-faint' : 'text-ink'}`}>
                  {s.label}
                  {state === 'now' && <span className="block text-[11px] text-muted">{s.note}</span>}
                </span>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={press}
          disabled={pressing}
          className={`mt-3 w-full rounded-full py-1.5 text-[11.5px] transition-colors ${
            pressing
              ? 'cursor-wait bg-ink text-paper'
              : 'border border-line text-muted hover:border-ink/40 hover:bg-line/40 hover:text-ink'
          }`}
        >
          {pressing
            ? 'Pressing…'
            : done
              ? 'Brew another'
              : step === coffee.steps.length - 1
                ? 'Press'
                : `Next: ${coffee.steps[step + 1].label}`}
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
      <Guitar />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Pitch />
        <Coffee />
      </div>
    </Section>
  );
}
