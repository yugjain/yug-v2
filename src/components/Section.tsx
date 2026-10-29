import type { ReactNode } from 'react';

export default function Section({
  id,
  eyebrow,
  title,
  hint,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="flex items-center justify-between gap-4 border-y border-dashed border-line bg-line/35 px-5 py-2 sm:px-7">
        <h2 className="flex items-center gap-2 text-[16.5px] font-semibold tracking-[-0.012em] text-ink">
          <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
          {title ?? eyebrow}
        </h2>
        <span className="mono hidden shrink-0 text-[9px] uppercase tracking-[0.14em] text-faint sm:block">
          {eyebrow}
          {hint ? ` · ${hint}` : ''}
        </span>
      </div>
      <div className="px-5 pb-8 pt-5 sm:px-7">{children}</div>
    </section>
  );
}
