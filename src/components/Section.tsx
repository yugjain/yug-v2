import type { ReactNode } from 'react';

export default function Section({
  id,
  eyebrow,
  title,
  hint,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line px-5 py-9 sm:px-9 sm:py-11">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          {title && (
            <h2 className="mt-2 text-[19px] font-medium tracking-[-0.02em] sm:text-[21px]">{title}</h2>
          )}
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
