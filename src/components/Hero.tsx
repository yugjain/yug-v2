import { useEffect, useState } from 'react';
import { profile } from '../content';
import StickerBanner from './Stickers';
import { ArrowUpRight, CalendarIcon, Chart, FileIcon, LinkedIn, Note } from './Icons';

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

function Inline({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[1px] items-center rounded-md border border-line bg-line/30 px-1.5 py-0.5 align-baseline">
      {children}
    </span>
  );
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

      <div className="mt-4 max-w-[58ch] space-y-2.5 text-[14.5px] leading-[1.72] text-muted sm:text-[15px]">
        <p>
          I run post-sales for a{' '}
          <strong className="font-medium text-ink">$1M+ ARR Salesforce &amp; MuleSoft portfolio</strong> at
          NTT DATA North America — and I’m in the room from first discovery to renewal.
        </p>
        <p>
          I turn adoption telemetry into executive QBRs
          <Inline>
            <Chart className="mr-1 h-3 w-3" />
            <span className="mono text-[9.5px] uppercase tracking-[0.06em]">QBR</span>
          </Inline>{' '}
          that protect renewals and open expansion —{' '}
          <strong className="font-medium text-ink">+30% ARR, 80%+ gross retention</strong>.
        </p>
        <p>
          Trained as an engineer, so I diagnose the integration before I sell the next change order. I also
          play guitar
          <Inline>
            <Note className="mr-1 h-3 w-3" />
            <span className="mono text-[9.5px] uppercase tracking-[0.06em]">guitar</span>
          </Inline>
          , and I work across three time zones.
        </p>
      </div>

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
