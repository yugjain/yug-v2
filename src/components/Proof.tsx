import { certifications, metrics, stackTable, testimonials } from '../content';
import Marginalia from './Marginalia';
import Reveal from './Reveal';
import Section from './Section';
import { sectionNotes } from '../content';

export default function Proof() {
  return (
    <Section id="proof" eyebrow="Evidence" title="What the portfolio actually did" hint="Verified numbers">
      <Marginalia side="left" className="top-20">
        {sectionNotes.proof}
      </Marginalia>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
        {metrics.map((m, i) => (
          <div
            key={m.v}
            className={`sm:px-4 ${i === 0 ? 'sm:pl-0' : ''} ${i > 0 ? 'sm:border-l sm:border-dashed sm:border-line' : ''}`}
          >
            <dt className="text-[28px] font-medium leading-none tracking-[-0.03em]">{m.k}</dt>
            <dd className="mt-1 text-[12px] font-medium text-ink">{m.v}</dd>
            <dd className="mt-0.5 max-w-[30ch] text-[11.5px] leading-[1.55] text-faint">{m.note}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7">
        <p className="eyebrow mb-3">What sponsors say</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.role} delay={i * 60} className={i === 2 ? 'sm:col-span-2' : ''}>
              <figure className="card flex h-full flex-col justify-between p-4">
                <div>
                  <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-accent-ink">
                    <span className="rounded-full bg-accent px-2 py-0.5">{t.badge}</span>
                  </span>
                  <blockquote className="mt-2.5 max-w-[70ch] text-[12.5px] leading-[1.7] text-ink/90">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-3 border-t border-dashed border-line pt-2.5 text-[11px] text-faint">
                  <span className="font-medium text-muted">{t.role}</span> · {t.org}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="eyebrow mb-3">Tooling</p>
        <ul className="divide-y divide-dashed divide-line border-y border-dashed border-line">
          {stackTable.map((row) => (
            <li key={row.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2">
              <span className="mono w-[128px] shrink-0 text-[9.5px] uppercase tracking-[0.1em] text-faint">
                {row.label}
              </span>
              <span className="flex flex-wrap gap-1.5">
                {row.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-dashed border-line px-2 py-0.5 text-[11px] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="eyebrow mb-2">Certifications</p>
        <ul className="border-y border-dashed border-line">
          {certifications.map((c) => (
            <li
              key={c.org}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-line py-1.5 last:border-b-0"
            >
              <span className="mono shrink-0 text-[9.5px] uppercase tracking-[0.1em] text-faint">
                {c.org}
              </span>
              <span className="text-right text-[12px] text-muted">{c.items.join(' · ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
