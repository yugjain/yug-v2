import { elsewhere, profile } from '../content';
import { ArrowUpRight, CalendarIcon, FileIcon, LinkedIn, Mail } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

const icons = {
  linkedin: LinkedIn,
  mail: Mail,
  calendar: CalendarIcon,
  file: FileIcon,
} as const;

export default function Elsewhere() {
  return (
    <Section id="contact" eyebrow="Elsewhere" title="The short version" hint="Reply within a day">
      <p className="max-w-[62ch] text-[13px] leading-[1.75] text-muted">
        Since 2016: customer success and operations, Deepstash’s first B2B motion, and
        a $1M+ ARR portfolio at NTT DATA North America. The through-line is the same — make the post-sales
        system legible enough that renewal stops being a negotiation.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {elsewhere.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          const inner = (
            <>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-dashed border-line text-muted transition-colors group-hover:border-ink/30 group-hover:text-ink">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-medium text-ink">{item.label}</span>
                <span className="mono block truncate text-[10px] text-faint">{item.handle}</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          );

          if (item.disabled) {
            return (
              <Reveal key={item.label} delay={i * 50}>
                <div
                  aria-disabled="true"
                  className="card group flex cursor-default items-center gap-3 px-3.5 py-3 select-none opacity-70"
                >
                  {inner}
                </div>
              </Reveal>
            );
          }

          return (
            <Reveal key={item.label} delay={i * 50}>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="card group flex items-center gap-3 px-3.5 py-3 transition-colors hover:bg-line/30"
              >
                {inner}
              </a>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
        <a href={`mailto:${profile.email}`} className="link">
          {profile.email}
        </a>
        {profile.resumeEnabled ? (
          <a href={profile.resume} target="_blank" rel="noreferrer" className="link">
            Full résumé (PDF)
          </a>
        ) : (
          <span className="text-faint select-none">Full résumé (PDF) · on request</span>
        )}
        <a href={profile.calendar} target="_blank" rel="noreferrer" className="link">
          Book 15 minutes
        </a>
      </div>
    </Section>
  );
}
