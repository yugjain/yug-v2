import { useEffect, useState } from 'react';
import { profile } from '../content';
import { ArrowUpRight, CalendarIcon, FileIcon, LinkedIn } from './Icons';

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
    <section id="top" className="px-5 pb-7 pt-9 sm:px-9 sm:pb-8 sm:pt-12">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar}
          alt="Yug Jain"
          width={64}
          height={64}
          className="h-14 w-14 rounded-2xl border border-line object-cover object-[50%_26%] sm:h-16 sm:w-16"
        />
        <div>
          <h1 className="text-[30px] font-medium leading-none tracking-[-0.035em] sm:text-[40px]">
            Hey, I’m Yug<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 text-[13px] text-muted sm:text-sm">
            {profile.role} · {profile.roleLine}
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-[58ch] space-y-2.5 text-[15px] leading-[1.7] text-muted sm:text-[15.5px]">
        <p>
          I run post-sales for a{' '}
          <strong className="font-medium text-ink">$1M+ ARR Salesforce &amp; MuleSoft portfolio</strong> at
          NTT DATA North America.
        </p>
        <p>
          I turn adoption telemetry into executive QBRs that protect renewals and open expansion —{' '}
          <strong className="font-medium text-ink">+30% ARR, 80%+ gross retention</strong>, across REITs,
          InsurTech and Fortune 500 consumer brands.
        </p>
        <p>
          Trained as an engineer, so I diagnose the integration before I sell the next change order. I also
          advise early-stage teams, and I write about what actually moves the number.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <a
          href={profile.calendar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-px"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          Book 15 min
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13px] text-ink transition-colors hover:border-ink/40 hover:bg-line/40"
        >
          <FileIcon className="h-3.5 w-3.5" />
          Résumé
        </a>
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

      <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4 text-[12px] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.location} · <span className="mono">{time} IST</span>
        </span>
        <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-1 text-ink">
          <span className="link">Say hello</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {profile.status.map((s) => (
          <li
            key={s}
            className="mono rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-faint"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
