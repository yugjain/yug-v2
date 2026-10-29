import { useEffect, useState } from 'react';
import { profile } from '../content';
import StickerBanner from './Stickers';
import { ArrowUpRight, CalendarIcon, FileIcon, LinkedIn } from './Icons';

const facts = [
  { value: '10 yrs', label: 'experience' },
  { value: '$1.0M → $1.3M', label: 'ARR growth' },
  { value: '80%+', label: 'gross retention' },
  { value: 'Salesforce', label: '+ MuleSoft' },
  { value: 'US / UK', label: 'hours overlap' },
];

function useLocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const time = useLocalTime();

  return (
    <section id="top" className="px-5 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-9">
      <StickerBanner />

      <div className="mt-1 flex items-center gap-2.5">
        <img
          src={profile.avatar}
          alt="Yug Jain"
          width={36}
          height={36}
          className="h-9 w-9 rounded-lg border border-line object-cover object-[50%_26%]"
        />
        <h1 className="text-[26px] font-medium leading-none tracking-[-0.035em] sm:text-[30px]">
          Hey, I’m Yug<span className="text-accent">.</span>
        </h1>
      </div>
      <p className="mono mt-2 text-[10.5px] uppercase tracking-[0.14em] text-faint">
        {profile.role} · {profile.roleLine}
      </p>

      <p className="mt-4 max-w-[44ch] text-[17px] font-medium leading-[1.45] tracking-[-0.012em] text-ink sm:text-[18px]">
        I keep $1M+ enterprise SaaS portfolios renewing and growing.
      </p>
      <p className="mt-1.5 max-w-[54ch] text-[13.5px] leading-[1.6] text-muted">
        Engineer by training — I diagnose the integration before I sell the change order.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-y border-dashed border-line py-3 sm:grid-cols-5">
        {facts.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="mono text-[11.5px] font-medium leading-tight tracking-[-0.01em] text-ink">
              {f.value}
            </dt>
            <dd className="mt-0.5 text-[9px] uppercase leading-tight tracking-[0.1em] text-faint">
              {f.label}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <a
          href={profile.calendar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-px"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          Book 15 min
          <ArrowUpRight className="h-3 w-3" />
        </a>
        {profile.resumeEnabled ? (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-[13px] text-ink transition-colors hover:border-ink/40 hover:bg-line/40"
          >
            <FileIcon className="h-3.5 w-3.5" />
            Résumé
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            className="inline-flex cursor-default items-center gap-2 rounded-md border border-line px-3.5 py-2 text-[13px] text-ink select-none"
          >
            <FileIcon className="h-3.5 w-3.5" />
            Résumé
          </button>
        )}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-1.5 py-2 text-[13px] text-muted transition-colors hover:text-ink"
        >
          <LinkedIn className="h-3.5 w-3.5" />
          LinkedIn
        </a>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-dashed border-line pt-3.5 text-[12px] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.location} · <span className="mono">{time} IST</span>
        </span>
        <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-1 text-ink">
          <span className="link">Say hello</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {profile.status.map((s) => (
          <li
            key={s}
            className="mono rounded-full border border-dashed border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-faint"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
