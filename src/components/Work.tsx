import { roles } from '../content';
import { Chevron } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

export default function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Where I’ve run the number" hint="2016 — now">
      <ul>
        {roles.map((role) => (
          <li key={role.company} className="border-b border-dashed border-line last:border-b-0">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 rounded-md py-3.5 transition-colors hover:bg-line/20 [&::-webkit-details-marker]:hidden">
                <span className="mono mt-0.5 w-5 shrink-0 text-[10.5px] text-faint">{role.n}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[14px] font-medium tracking-[-0.01em]">{role.company}</h3>
                    <span className="mono text-[10px] uppercase tracking-[0.1em] text-faint">
                      {role.years}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-muted">{role.role}</p>
                  <p className="mono mt-0.5 text-[10px] uppercase tracking-[0.08em] text-faint">
                    {role.impact}
                  </p>
                </div>
                <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-faint transition-transform group-open:rotate-180" />
              </summary>

              <div className="pb-4 pl-8 sm:pl-9">
                <Reveal>
                  <p className="max-w-[62ch] text-[13px] leading-[1.7] text-muted">{role.summary}</p>

                  {role.bullets && (
                    <ul className="mt-2.5 space-y-1.5">
                      {role.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[12.5px] leading-[1.6] text-muted">
                          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.stats && (
                    <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-dashed border-line pt-2.5">
                      {role.stats.map((s) => (
                        <div key={s.v} className="flex items-baseline gap-1.5">
                          <dt className="mono text-[12px] font-medium text-ink">{s.k}</dt>
                          <dd className="text-[11px] text-faint">{s.v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </Reveal>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
