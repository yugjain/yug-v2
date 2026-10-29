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
    <section id={id} className={`section-rule relative px-5 py-8 sm:px-7 sm:py-9 ${className}`}>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          {title && <h2 className="section-title mt-1.5">{title}</h2>}
        </div>
        {hint && (
          <span className="mono hidden shrink-0 text-[10.5px] uppercase tracking-[0.12em] text-faint sm:block">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
