import { advisory } from '../content';
import { Chevron } from './Icons';
import Section from './Section';

export default function Advisory() {
  return (
    <Section
      id="advisory"
      eyebrow="Selective advisory"
      title="Fractional mandates, not decks"
      hint="4 dossiers"
    >
      <ul className="-mx-2">
        {advisory.map((item) => (
          <li key={item.name} className="border-b border-line last:border-b-0">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-line/25 sm:gap-4 [&::-webkit-details-marker]:hidden">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[15px] font-medium tracking-[-0.01em]">{item.name}</h3>
                    <span className="mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-0.5 max-w-[54ch] text-[13px] leading-relaxed text-muted">
                    {item.headline}
                  </p>
                </div>
                <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-faint transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-2 pb-6 pl-[26px] sm:pl-[30px]">
                <p className="max-w-[62ch] text-[14px] leading-[1.7] text-muted">{item.blurb}</p>

                {item.clients && (
                  <div className="mt-4">
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">Accounts advised</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {item.clients.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-muted"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.stats && (
                  <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3">
                    {item.stats.map((s) => (
                      <div key={s.v}>
                        <dt className="mono text-[12.5px] font-medium text-ink">{s.k}</dt>
                        <dd className="mt-0.5 text-[10.5px] uppercase leading-tight tracking-[0.06em] text-faint">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      01 / The bottleneck
                    </p>
                    <p className="mt-1.5 max-w-[64ch] text-[13.5px] leading-[1.7] text-muted">
                      {item.problem}
                    </p>
                  </div>

                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      02 / What I built
                    </p>
                    <ol className="mt-2 space-y-2.5">
                      {item.systems.map((s, idx) => (
                        <li key={s.title} className="flex gap-3">
                          <span className="mono mt-0.5 text-[10.5px] text-accent-ink">
                            <span className="inline-grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px]">
                              {idx + 1}
                            </span>
                          </span>
                          <div>
                            <p className="text-[13px] font-medium">{s.title}</p>
                            <p className="mt-0.5 max-w-[60ch] text-[13px] leading-[1.65] text-muted">
                              {s.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      03 / The outcome
                    </p>
                    <p className="mt-1.5 max-w-[64ch] text-[13.5px] leading-[1.7] text-muted">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
