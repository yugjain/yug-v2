import { useCallback, useState } from 'react';
import { essays } from '../content';
import Reader from './Reader';
import Section from './Section';

export default function Writing() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="writing" eyebrow="Working papers" title="How I think about the work" hint="Open to read">
      <ul className="-mx-2">
        {essays.map((paper, i) => (
          <li key={paper.n} className="border-b border-line last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex w-full items-start gap-3 rounded-lg px-2 py-4 text-left transition-colors hover:bg-line/25 sm:gap-4"
            >
              <span className="mono mt-0.5 w-5 shrink-0 text-[11px] text-faint">{paper.n}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-faint">{paper.kicker}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-faint">· {paper.read}</span>
                </div>
                <h3 className="mt-1 max-w-[52ch] text-[14.5px] font-medium leading-snug tracking-[-0.01em] text-ink group-hover:underline group-hover:decoration-accent group-hover:decoration-[1.5px] group-hover:underline-offset-4">
                  {paper.title}
                </h3>
              </div>
              <span className="mono mt-1.5 shrink-0 text-[10px] uppercase tracking-[0.1em] text-faint transition-colors group-hover:text-ink">
                Read
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Reader essay={essays[open]} onClose={close} />}
    </Section>
  );
}
