import { useEffect, useRef, useState } from 'react';
import { coffee, guitar, pitch } from '../content';
import { Check, Play, Stop } from './Icons';
import Section from './Section';

function usePluck() {
  const ctxRef = useRef<AudioContext | null>(null);

  const context = () => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  };

  const strum = (freqs: number[], when = 0) => {
    const ctx = context();
    const t = ctx.currentTime + when;
    freqs.forEach((f, i) => {
      const t0 = t + i * 0.045;
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const a = ctx.createOscillator();
      const b = ctx.createOscillator();

      a.type = 'triangle';
      a.frequency.value = f;
      b.type = 'sawtooth';
      b.frequency.value = f * 1.004;
      filter.type = 'lowpass';
      filter.Q.value = 0.8;
      filter.frequency.setValueAtTime(2800, t0);
      filter.frequency.exponentialRampToValueAtTime(620, t0 + 0.45);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.09, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.15);

      a.connect(filter);
      b.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      a.start(t0);
      b.start(t0);
      a.stop(t0 + 1.2);
      b.stop(t0 + 1.2);
    });
  };

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
    };
  }, []);

  return strum;
}

function Guitar() {
  const [playing, setPlaying] = useState(false);
  const [bar, setBar] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const strum = usePluck();

  const stop = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setPlaying(false);
    setBar(null);
  };

  useEffect(() => stop, []);

  const play = () => {
    if (playing) {
      stop();
      return;
    }
    setPlaying(true);
    strum(guitar.progression[0].freqs);
    guitar.progression.forEach((chord, i) => {
      if (i > 0) strum(chord.freqs, i * 1.6);
      timers.current.push(
        window.setTimeout(() => {
          setBar(i);
          if (i === guitar.progression.length - 1) {
            timers.current.push(
              window.setTimeout(() => {
                setPlaying(false);
                setBar(null);
              }, 1400),
            );
          }
        }, i * 1600),
      );
    });
  };

  return (
    <div className="rounded-xl border border-line p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Off the clock</p>
          <h3 className="mt-1.5 text-[15px] font-medium">{guitar.title}</h3>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12px] text-ink transition-colors hover:border-ink/40 hover:bg-line/40"
        >
          {playing ? <Stop className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? 'Stop' : 'Play progression'}
        </button>
      </div>

      <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.65] text-muted">{guitar.blurb}</p>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {guitar.progression.map((chord, i) => (
          <button
            key={`${chord.chord}-${i}`}
            type="button"
            onClick={() => {
              strum(chord.freqs);
              setBar(i);
              window.setTimeout(() => setBar((b) => (b === i ? null : b)), 900);
            }}
            aria-label={`Play ${chord.chord} chord`}
            className={`rounded-lg border px-2 py-3 text-center transition-all duration-300 ${
              bar === i
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line bg-line/20 text-ink hover:border-ink/30'
            }`}
          >
            <span className="block text-[18px] font-medium leading-none">{chord.chord}</span>
            <span className="mono mt-1.5 block text-[9.5px] tracking-[0.05em] opacity-60">
              {chord.fingering}
            </span>
            <span className="mono mt-1 block text-[8.5px] uppercase tracking-[0.1em] opacity-40">
              bar {i + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3">
        {guitar.repertoire.map((r) => (
          <span key={r.song} className="text-[11px] text-faint">
            {r.song} <span className="mono opacity-70">· {r.bpm} bpm</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Pitch() {
  const [active, setActive] = useState(2);
  const role = pitch[active];

  return (
    <div className="rounded-xl border border-line p-5">
      <p className="eyebrow">Football</p>
      <h3 className="mt-1.5 text-[15px] font-medium">Tactical pitch spacing</h3>
      <p className="mt-2 text-[13px] leading-[1.65] text-muted">
        Two-time university champion at Mumbai University, lifelong Manchester City supporter. Tap a
        position — the analogy is the point.
      </p>

      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-line/25">
        <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect x="2" y="2" width="96" height="71" rx="1" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
          <line x1="2" y1="37.5" x2="98" y2="37.5" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
          <circle cx="50" cy="37.5" r="9" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
          <rect x="30" y="2" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
          <rect x="41" y="2" width="18" height="5" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
          <rect x="30" y="61" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
        </svg>
        {pitch.map((p, i) => (
          <button
            key={p.role}
            type="button"
            onClick={() => setActive(i)}
            aria-label={p.role}
            aria-pressed={active === i}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
              active === i
                ? 'scale-125 border-accent bg-accent shadow-[0_0_0_4px_rgba(163,230,53,0.22)]'
                : 'border-ink/30 bg-paper hover:border-ink/60 hover:scale-110'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 min-h-[3.2rem]">
        <p className="text-[12.5px] font-medium text-ink">{role.role}</p>
        <p className="mt-0.5 text-[12.5px] leading-[1.55] text-muted">{role.note}</p>
      </div>
    </div>
  );
}

function Coffee() {
  const [step, setStep] = useState(0);
  const done = step >= coffee.steps.length;

  return (
    <div className="rounded-xl border border-line p-5">
      <p className="eyebrow">Daily ritual</p>
      <h3 className="mt-1.5 text-[15px] font-medium">{coffee.title}</h3>
      <p className="mt-2 text-[13px] leading-[1.65] text-muted">{coffee.blurb}</p>

      <ol className="mt-4 space-y-2">
        {coffee.steps.map((s, i) => {
          const state = done || i < step ? 'done' : i === step ? 'now' : 'todo';
          return (
            <li key={s.label} className="flex items-start gap-2.5">
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
              <div>
                <p className={`text-[12.5px] ${state === 'todo' ? 'text-faint' : 'text-ink'}`}>{s.label}</p>
                {state === 'now' && <p className="text-[11.5px] text-muted">{s.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => setStep((s) => (done ? 0 : s + 1))}
        className="mt-4 w-full rounded-full border border-line py-1.5 text-[11.5px] text-muted transition-colors hover:border-ink/40 hover:bg-line/40 hover:text-ink"
      >
        {done
          ? 'Brew another'
          : step === coffee.steps.length - 1
            ? 'Finish brew'
            : `Next: ${coffee.steps[step + 1].label}`}
      </button>
    </div>
  );
}

export default function OffClock() {
  return (
    <Section id="play" eyebrow="Away from the screen" title="What I do when I’m not on a call" hint="All three are live">
      <Guitar />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Pitch />
        <Coffee />
      </div>
    </Section>
  );
}
