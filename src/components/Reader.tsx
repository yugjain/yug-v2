import { useEffect, useRef } from 'react';
import type { Essay } from '../content';
import { Close } from './Icons';

export default function Reader({ essay, onClose }: { essay: Essay; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close paper"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px] dark:bg-black/65"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`paper-${essay.n}`}
        className="reveal relative flex h-full w-full max-w-[600px] flex-col overflow-y-auto border-l border-line bg-paper px-6 py-6 sm:px-9 sm:py-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="eyebrow">
            Working paper {essay.n} · {essay.read}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close paper"
            className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink"
          >
            <Close />
          </button>
        </div>

        <h2 id={`paper-${essay.n}`} className="text-[24px] font-medium leading-[1.2] tracking-[-0.025em]">
          {essay.title}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{essay.dek}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {essay.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-0.5 text-[12px] uppercase tracking-[0.08em] text-faint"
            >
              {t}
            </li>
          ))}
        </ul>

        <blockquote className="serif mt-6 border-l-2 border-accent pl-4 text-[19px] italic leading-[1.45] text-ink">
          “{essay.thesis}”
        </blockquote>

        <div className="mt-6 space-y-5">
          {essay.sections.map((s, i) => (
            <div key={s.h}>
              <h3 className="text-[13px] font-medium tracking-[-0.01em]">
                <span className="mono mr-2 text-[12px] text-faint">0{i + 1}</span>
                {s.h}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.75] text-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-line bg-line/25 p-4">
          <p className="mono text-[12px] uppercase tracking-[0.16em] text-faint">Operating rule of thumb</p>
          <p className="mt-1.5 text-[13px] leading-[1.7] text-ink/90">{essay.rule}</p>
        </div>

        <p className="mt-6 text-[12px] text-faint">
          Written by Yug Jain · Enterprise Client Partner ·{' '}
          <a href="mailto:yugrjain@gmail.com" className="link">
            reply by email
          </a>
        </p>
      </div>
    </div>
  );
}
