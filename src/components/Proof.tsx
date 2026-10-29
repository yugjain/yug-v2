import { metrics, stack, testimonials } from '../content';
import Section from './Section';

export default function Proof() {
  return (
    <Section id="proof" eyebrow="Evidence" title="What the portfolio actually did" hint="Verified numbers">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
        {metrics.map((m, i) => (
          <div
            key={m.v}
            className={`sm:px-5 ${i === 0 ? 'sm:pl-0' : ''} ${i > 0 ? 'sm:border-l sm:border-line' : ''}`}
          >
            <dt className="text-[32px] font-medium leading-none tracking-[-0.03em] sm:text-[34px]">{m.k}</dt>
            <dd className="mt-1.5 text-[12.5px] font-medium text-ink">{m.v}</dd>
            <dd className="mt-1 max-w-[30ch] text-[12px] leading-[1.55] text-faint">{m.note}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 border-t border-line pt-6">
        <p className="eyebrow mb-4">What sponsors say</p>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.role}
              className={`flex flex-col justify-between bg-paper p-5 ${i === 2 ? 'sm:col-span-2' : ''}`}
            >
              <div>
                <span className="mono text-[10px] uppercase tracking-[0.12em] text-accent-ink">
                  <span className="rounded-full bg-accent px-2 py-0.5">{t.badge}</span>
                </span>
                <blockquote className="mt-3 max-w-[70ch] text-[13.5px] leading-[1.7] text-ink/90">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-4 border-t border-line pt-3 text-[11.5px] text-faint">
                <span className="font-medium text-muted">{t.role}</span> · {t.org}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {stack.map((s) => (
          <div key={s.name} className="flex items-baseline gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[12px] text-muted">{s.name}</span>
            <span className="mono text-[10px] uppercase tracking-[0.1em] text-faint">{s.level}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
