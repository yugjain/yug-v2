import { howIWork } from '../content';
import Lamp from './Lamp';
import Reveal from './Reveal';
import Section from './Section';

export default function HowIWork() {
  return (
    <Section id="how" eyebrow="Operating model" title="How I run an account" hint="Pre-sales → handover">
      <Lamp />
      <ol className="divide-y divide-dashed divide-line border-y border-dashed border-line">
        {howIWork.map((step, i) => (
          <li key={step.n}>
            <Reveal delay={i * 40}>
              <div className="flex gap-4 py-3.5 sm:gap-6">
                <div className="w-[86px] shrink-0 sm:w-[104px]">
                  <span className="mono block text-[10px] text-faint">{step.n}</span>
                  <span className="mono mt-0.5 block text-[9.5px] uppercase leading-tight tracking-[0.1em] text-faint">
                    {step.label}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-medium tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-0.5 max-w-[62ch] text-[12.5px] leading-[1.65] text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
