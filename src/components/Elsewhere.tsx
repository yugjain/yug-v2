import { elsewhere, profile } from '../content';
import { ArrowUpRight, CalendarIcon, FileIcon, LinkedIn, Mail } from './Icons';
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
      <p className="max-w-[60ch] text-[13.5px] leading-[1.75] text-muted">
        I started in 2016 running success and operations across 25+ enterprise accounts, spent two years
        building Deepstash’s first B2B motion, and since 2022 have run a $1M+ ARR Salesforce &amp; MuleSoft
        portfolio at NTT DATA North America. The through-line is the same: make the post-sales system
        legible enough that renewal and expansion stop being a negotiation.
      </p>

      <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {elsewhere.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-3 bg-paper px-4 py-3.5 transition-colors hover:bg-line/30"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-ink/30 group-hover:text-ink">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-ink">{item.label}</span>
                <span className="mono block truncate text-[10.5px] text-faint">{item.handle}</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
        <a href={`mailto:${profile.email}`} className="link">
          {profile.email}
        </a>
        <a href={profile.resume} target="_blank" rel="noreferrer" className="link">
          Full résumé (PDF)
        </a>
        <a href={profile.calendar} target="_blank" rel="noreferrer" className="link">
          Book 15 minutes
        </a>
      </div>
    </Section>
  );
}
