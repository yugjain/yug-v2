import { useEffect, useState } from 'react';
import { pending } from '../claims';
import { profile } from '../content';
import BookCTA from './BookCTA';
import StickerBanner from './Stickers';
import { ArrowUpRight, FileIcon, LinkedIn } from './Icons';

/* +30% leads. Retention follows with its scope attached, because a bare
   80% invites the "80% of what?" question. NRR is optional and only renders
   once a real number exists in src/claims.ts. */
const facts = [
  { value: '+30%', label: 'ARR growth' },
  { value: '80%+', label: 'gross retention · multi-year' },
  { value: '10 yrs', label: 'experience' },
  { value: 'Salesforce', label: '+ MuleSoft' },
  { value: 'US / UK', label: 'hours overlap' },
  ...(pending.nrr ? [{ value: pending.nrr, label: 'net revenue retention' }] : []),
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
      <p className="mono mt-2 text-[12px] uppercase tracking-[0.14em] text-faint">
        {profile.role} · {profile.roleLine}
      </p>
      {pending.seeking && (
        <p className="mt-2 max-w-[54ch] text-[13px] leading-snug text-muted">
          <span className="mono text-[12px] uppercase tracking-[0.12em] text-faint">Seeking</span>{' '}
          {pending.seeking}
        </p>
      )}

      <p className="mt-4 max-w-[44ch] text-[17px] font-medium leading-[1.45] tracking-[-0.012em] text-ink sm:text-[18px]">
        I keep $1.0M+ enterprise SaaS portfolios renewing and growing.
      </p>
      <p className="mt-1.5 max-w-[54ch] text-[13.5px] leading-[1.6] text-muted">
        Engineer by training — I diagnose the integration before I sell the change order.
      </p>

      <dl
        className={`mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-y border-dashed border-line py-3 ${
          pending.nrr ? 'sm:grid-cols-6' : 'sm:grid-cols-5'
        }`}
      >
        {facts.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="mono text-[12px] font-medium leading-tight tracking-[-0.01em] text-ink">
              {f.value}
            </dt>
            <dd className="mt-0.5 text-[12px] uppercase leading-tight tracking-[0.1em] text-faint">
              {f.label}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <BookCTA />
        {profile.resumeEnabled ? (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3.5 py-2 text-[13px] text-ink transition-colors hover:border-ink/40 hover:bg-line/40"
          >
            <FileIcon className="h-3.5 w-3.5" />
            Résumé
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-default items-center gap-2 rounded-md border border-line px-3.5 py-2 text-[13px] text-ink select-none"
          >
            <FileIcon className="h-3.5 w-3.5" />
            Résumé
          </button>
        )}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 px-1.5 py-2 text-[13px] text-muted transition-colors hover:text-ink"
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
        <a href={`mailto:${profile.email}`} className="group inline-flex min-h-11 items-center gap-1 text-ink">
          <span className="link">Say hello</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {pending.workAuth && (
        <p className="mono mt-2.5 text-[12px] leading-snug text-muted">{pending.workAuth}</p>
      )}

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {profile.status.map((s) => (
          <li
            key={s}
            className="mono rounded-full border border-dashed border-line px-2.5 py-1 text-[12px] uppercase tracking-[0.08em] text-faint"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
