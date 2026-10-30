import { certifications, metrics, testimonials } from '../content';
import BookCTA from './BookCTA';
import Marginalia from './Marginalia';
import Reveal from './Reveal';
import Section from './Section';
import { sectionNotes } from '../content';

export default function Proof() {
  return (
    <Section id="proof" eyebrow="Evidence" title="What the portfolio actually did" hint="Selected results">
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
            <dd className="mt-0.5 max-w-[30ch] text-[12px] leading-[1.55] text-faint">{m.note}</dd>
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
                  <span className="mono text-[12px] uppercase tracking-[0.1em] text-accent-ink">
                    <span className="rounded-full bg-accent px-2 py-0.5">{t.badge}</span>
                  </span>
                  <blockquote className="mt-2.5 max-w-[70ch] text-[12.5px] leading-[1.7] text-ink/90">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-3 border-t border-dashed border-line pt-2.5 text-[12px] text-faint">
                  {t.name ? (
                    <>
                      {t.href ? (
                        <a href={t.href} target="_blank" rel="noreferrer" className="font-medium text-muted link">
                          {t.name}
                        </a>
                      ) : (
                        <span className="font-medium text-muted">{t.name}</span>
                      )}
                      {' · '}
                      {t.role} · {t.company}
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-muted">{t.role}</span> · {t.company}
                    </>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="eyebrow mb-2">Certifications</p>
        <ul className="border-y border-dashed border-line">
          {certifications.map((c) => (
            <li
              key={c.org}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-line py-1.5 last:border-b-0"
            >
              <span className="mono shrink-0 text-[12px] uppercase tracking-[0.1em] text-faint">
                {c.org}
              </span>
              <span className="text-right text-[12px] text-muted">{c.items.join(' · ')}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-line pt-4">
        <p className="text-[12.5px] text-muted">Want the working detail behind any of these?</p>
        <BookCTA />
      </div>
    </Section>
  );
}
