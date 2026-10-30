import { lazy, Suspense, useCallback, useState } from 'react';
import { essays } from '../content';
import Reveal from './Reveal';
import Section from './Section';

const Reader = lazy(() => import('./Reader'));

const heights = [150, 138, 156];

export default function Writing() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="writing" eyebrow="Working papers" title="On the shelf" hint="Pull one out">
      <div className="shelf">
        {essays.map((paper, i) => (
          <Reveal key={paper.n} delay={i * 70}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="volume"
              style={{ height: heights[i] }}
              aria-label={`Open working paper ${paper.n}: ${paper.title}`}
            >
              <span className="flex w-full flex-col justify-between pl-1.5 text-left">
                <span className="mono text-[12px] uppercase tracking-[0.12em] text-faint">
                  Paper {paper.n}
                </span>
                <span className="text-[12px] font-medium leading-[1.3] text-ink">
                  {paper.short}
                </span>
                <span className="mono text-[12px] uppercase tracking-[0.08em] text-faint">
                  {paper.read}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <p className="serif mt-2 text-center text-[12.5px] italic text-faint">
        Three papers, written before the meetings — not after.
      </p>

      {open !== null && (
        <Suspense fallback={null}>
          <Reader essay={essays[open]} onClose={close} />
        </Suspense>
      )}
    </Section>
  );
}
