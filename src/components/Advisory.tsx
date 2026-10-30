import { advisory, advisoryTag } from '../content';
import { Chevron } from './Icons';
import Marginalia from './Marginalia';
import Reveal from './Reveal';
import Section from './Section';
import { sectionNotes } from '../content';

export default function Advisory() {
  return (
    <Section
      id="advisory"
      eyebrow="Selective advisory"
      title="Fractional mandates, not decks"
      hint="4 dossiers"
    >
      <Marginalia side="right" className="top-16">
        {sectionNotes.advisory}
      </Marginalia>

      <ul>
        {advisory.map((item) => (
          <li key={item.name} className="border-b border-dashed border-line last:border-b-0">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 py-3.5 transition-colors hover:bg-line/20 [&::-webkit-details-marker]:hidden">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[14px] font-medium tracking-[-0.01em]">{item.name}</h3>
                    <span className="mono text-[12px] uppercase tracking-[0.1em] text-faint">
                      {advisoryTag}
                    </span>
                  </div>
                  <p className="mt-0.5 max-w-[54ch] text-[12.5px] leading-relaxed text-muted">
                    {item.headline}
                  </p>
                </div>
                <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-faint transition-transform group-open:rotate-180" />
              </summary>

              <div className="pb-5 pl-6">
                <Reveal>
                  <p className="max-w-[62ch] text-[13px] leading-[1.7] text-muted">{item.blurb}</p>

                  {item.clients && (
                    <div className="mt-3">
                      <p className="mono text-[12px] uppercase tracking-[0.14em] text-faint">
                        Accounts advised
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {item.clients.map((c) => (
                          <li
                            key={c}
                            className="rounded-md border border-dashed border-line px-2 py-0.5 text-[12px] text-muted"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.stats && (
                    <dl className="mt-3 grid grid-cols-3 gap-2 border-y border-dashed border-line py-2.5">
                      {item.stats.map((s) => (
                        <div key={s.v}>
                          <dt className="mono text-[12px] font-medium text-ink">{s.k}</dt>
                          <dd className="mt-0.5 text-[12px] uppercase leading-tight tracking-[0.06em] text-faint">
                            {s.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="mono text-[12px] uppercase tracking-[0.14em] text-faint">
                        01 / The bottleneck
                      </p>
                      <p className="mt-1 max-w-[64ch] text-[12.5px] leading-[1.7] text-muted">
                        {item.problem}
                      </p>
                    </div>

                    <div>
                      <p className="mono text-[12px] uppercase tracking-[0.14em] text-faint">
                        02 / What I built
                      </p>
                      <ol className="mt-1.5 space-y-2">
                        {item.systems.map((s, idx) => (
                          <li key={s.title} className="flex gap-2.5">
                            <span className="mono mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[12px] text-accent-ink">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="text-[12.5px] font-medium">{s.title}</p>
                              <p className="mt-0.5 max-w-[60ch] text-[12.5px] leading-[1.6] text-muted">
                                {s.body}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="mono text-[12px] uppercase tracking-[0.14em] text-faint">
                        03 / The outcome
                      </p>
                      <p className="mt-1 max-w-[64ch] text-[12.5px] leading-[1.7] text-muted">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
