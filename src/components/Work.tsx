import { roles } from '../content';
import { Chevron } from './Icons';
import Section from './Section';

export default function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Where I’ve run the number" hint="2016 — now">
      <ul className="-mx-2">
        {roles.map((role, i) => (
          <li key={role.company} className="border-b border-line last:border-b-0">
            <details className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-line/25 sm:gap-4 [&::-webkit-details-marker]:hidden">
                <span className="mono mt-0.5 w-5 shrink-0 text-[11px] text-faint">{role.n}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[15px] font-medium tracking-[-0.01em]">{role.company}</h3>
                    <span className="mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                      {role.years}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {role.role}
                    <span className="hidden sm:inline"> · {role.tag}</span>
                  </p>
                </div>
                <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-faint transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-2 pb-5 pl-10 sm:pl-12">
                <p className="max-w-[62ch] text-[14px] leading-[1.7] text-muted">{role.summary}</p>

                {role.bullets && (
                  <ul className="mt-3.5 space-y-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[13.5px] leading-[1.65] text-muted">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {role.stats && (
                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3">
                    {role.stats.map((s) => (
                      <div key={s.v} className="flex items-baseline gap-1.5">
                        <dt className="mono text-[13px] font-medium text-ink">{s.k}</dt>
                        <dd className="text-[11.5px] text-faint">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
