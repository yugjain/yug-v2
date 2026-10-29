import { useMemo, useState } from 'react';
import { quotes } from '../content';
import { Check, Copy } from './Icons';
import Section from './Section';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

type Verdict = { label: string; tone: string; bar: string; line: string };

function verdictFor(score: number): Verdict {
  if (score >= 78)
    return {
      label: 'Expansion-ready',
      tone: 'bg-accent text-accent-ink',
      bar: 'bg-accent',
      line: 'Protect the baseline, then open the adjacent integration conversation.',
    };
  if (score >= 58)
    return {
      label: 'Watch',
      tone: 'bg-amber-200 text-amber-950',
      bar: 'bg-amber-400',
      line: 'Stabilise the two weakest signals before any commercial ask.',
    };
  if (score >= 38)
    return {
      label: 'At risk',
      tone: 'bg-orange-200 text-orange-950',
      bar: 'bg-orange-400',
      line: 'Executive intervention needed. Renewal narrative is not yet defensible.',
    };
  return {
    label: 'Critical',
    tone: 'bg-red-200 text-red-950',
    bar: 'bg-red-500',
    line: 'Save play. Get the sponsor in a room this week and stop the bleed.',
  };
}

export default function Synthesizer() {
  const [usage, setUsage] = useState(-14);
  const [tickets, setTickets] = useState(5);
  const [sponsor, setSponsor] = useState(false);
  const [copied, setCopied] = useState(false);

  const { score, verdict, points, actions, lead, summary } = useMemo(() => {
    const s = Math.round(clamp(84 + usage * 0.85 - tickets * 4.6 - (sponsor ? 9 : 0), 5, 98));
    const v = verdictFor(s);

    const candidates: string[] = [];
    if (sponsor) candidates.push('New executive sponsor — open with a 20-minute listening tour and zero commercial ask.');
    if (tickets >= 5)
      candidates.push(`${tickets} open P1s — bring a recovery timeline and the SLA maths, not a status list.`);
    if (usage <= -8)
      candidates.push(`Adoption is down ${Math.abs(usage)}% — name the two teams driving the dip before the client does.`);
    if (usage >= 8) candidates.push(`Adoption is up ${usage}% — tie it to one business metric, never to features shipped.`);
    candidates.push('Lead with the value ledger: cycle time compressed, revenue protected, OpEx retired.');
    candidates.push('Close with one expansion horizon mapped to their roadmap, not your catalogue.');
    const pts = [...new Set(candidates)].slice(0, 3);

    const act: string[] = [];
    if (tickets >= 5) act.push('Escalate the two oldest P1s to engineering leadership this week.');
    if (sponsor) act.push('Book the sponsor 1:1 within five days; send a one-page value recap first.');
    if (usage < 0) act.push('Ship a usage-recovery plan aimed at the lowest-adoption teams.');
    if (s >= 78) act.push('Open a change-order conversation on the adjacent MuleSoft integration.');
    act.push('Pre-align with the technical champion 48 hours before the review.');
    act.push('Rewrite the deck to three pages: value ledger, risk radar, commercial horizon.');
    const acts = [...new Set(act)].slice(0, 2);

    const leadLine =
      tickets >= 5
        ? `${tickets} open P1s · median days-to-resolve`
        : usage < 0
          ? `${Math.abs(usage)}% adoption dip · the two teams behind it`
          : `+${usage}% adoption · the value ledger behind it`;

    const text = [
      `QBR brief — health ${s}/100 (${v.label})`,
      `Signals: usage ${usage > 0 ? '+' : ''}${usage}%, ${tickets} open P1s, sponsor ${sponsor ? 'changed' : 'stable'}.`,
      `Lead with: ${leadLine}.`,
      'Talking points:',
      ...pts.map((p) => `- ${p}`),
      'Next actions:',
      ...acts.map((a) => `- ${a}`),
    ].join('\n');

    return { score: s, verdict: v, points: pts, actions: acts, lead: leadLine, summary: text };
  }, [usage, tickets, sponsor]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="ai" eyebrow="Applied AI" title="The QBR synthesizer" hint="Move the inputs">
      <div className="mb-4">
        <p className="serif max-w-[46ch] text-[14px] italic leading-snug text-faint">
          “{quotes.synthesizer.text}”
        </p>
        <p className="mono mt-1 text-[9px] uppercase tracking-[0.14em] text-faint">
          — {quotes.synthesizer.who}
        </p>
      </div>

      <p className="max-w-[62ch] text-[14px] leading-[1.7] text-muted">
        The most useful AI in post-sales isn’t a chatbot — it’s compression. Three signals a CSM already
        has, turned into a decision brief an executive can act on in 25 minutes.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-line">
        <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Controls */}
        <div className="bg-paper p-5">
          <p className="mono mb-4 text-[10px] uppercase tracking-[0.14em] text-faint">Signals</p>

          <div className="space-y-5">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="usage" className="text-[12.5px] text-muted">
                  Adoption trend
                </label>
                <span className="mono text-[12px] text-ink">
                  {usage > 0 ? '+' : ''}
                  {usage}%
                </span>
              </div>
              <input
                id="usage"
                type="range"
                min={-30}
                max={30}
                step={1}
                value={usage}
                onChange={(e) => setUsage(Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="tickets" className="text-[12.5px] text-muted">
                  Open P1 tickets
                </label>
                <span className="mono text-[12px] text-ink">{tickets}</span>
              </div>
              <input
                id="tickets"
                type="range"
                min={0}
                max={12}
                step={1}
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[12.5px] text-muted">Executive sponsor changed</span>
              <button
                type="button"
                role="switch"
                aria-checked={sponsor}
                onClick={() => setSponsor((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                  sponsor ? 'border-accent bg-accent' : 'border-line bg-line/50'
                }`}
              >
                <span className="sr-only">Executive sponsor changed</span>
                <span
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${
                    sponsor ? 'left-[calc(100%-20px)] bg-accent-ink' : 'left-1 bg-faint'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setUsage(-14);
              setTickets(5);
              setSponsor(false);
            }}
            className="mono mt-5 text-[10.5px] uppercase tracking-[0.12em] text-faint underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Reset to baseline
          </button>

          <div className="mt-5">
            <div className="flex h-1.5 overflow-hidden rounded-full">
              <span className="w-[37%] bg-red-500/80" />
              <span className="w-[20%] bg-orange-400/80" />
              <span className="w-[20%] bg-amber-400/80" />
              <span className="w-[23%] bg-accent" />
            </div>
            <div className="mono mt-1 flex justify-between text-[8px] uppercase tracking-[0.08em] text-faint">
              <span>Critical</span>
              <span>At risk</span>
              <span>Watch</span>
              <span>Ready</span>
            </div>
          </div>

          <p className="mt-4 border-t border-line pt-3 text-[11px] leading-[1.6] text-faint">
            Baseline 84, minus adoption drift, P1 load and sponsor continuity. Deterministic — no model
            call, no client data.
          </p>
        </div>

        {/* Output */}
        <div className="bg-paper p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">Executive brief</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-[30px] font-medium leading-none tracking-[-0.03em]">{score}</span>
                <span className="text-[11px] text-faint">/ 100 account health</span>
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium ${verdict.tone}`}>
              {verdict.label}
            </span>
          </div>

          <div
            className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-line"
            role="img"
            aria-label={`Account health ${score} of 100, ${verdict.label}`}
          >
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${verdict.bar}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] leading-snug text-muted">{verdict.line}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <Chip>Usage {usage > 0 ? '+' : ''}{usage}%</Chip>
            <Chip>{tickets} P1 open</Chip>
            <Chip>{sponsor ? 'New sponsor' : 'Sponsor stable'}</Chip>
          </div>

          <div className="mt-4 rounded-lg border border-line bg-line/25 px-3 py-2">
            <p className="mono text-[9.5px] uppercase tracking-[0.14em] text-faint">Lead with</p>
            <p className="mt-0.5 text-[12.5px] text-ink">{lead}</p>
          </div>

          <div className="mt-4">
            <p className="mono text-[9.5px] uppercase tracking-[0.14em] text-faint">Talking points</p>
            <ul className="mt-1.5 space-y-1.5">
              {points.map((p) => (
                <li key={p} className="flex gap-2 text-[12.5px] leading-[1.55] text-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="mono text-[9.5px] uppercase tracking-[0.14em] text-faint">Before the meeting</p>
            <ul className="mt-1.5 space-y-1.5">
              {actions.map((a) => (
                <li key={a} className="flex gap-2 text-[12.5px] leading-[1.55] text-muted">
                  <span className="mono mt-px text-[10px] text-faint">→</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <p className="sr-only" aria-live="polite">
            Health {score} of 100. {verdict.label}.
          </p>
        </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-5 py-2.5">
          <p className="max-w-[40ch] text-[10.5px] leading-snug text-faint">
            Illustrative model · no client data. Production runs on live telemetry.
          </p>
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-ink/40 hover:text-ink"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy brief'}
          </button>
        </div>
      </div>
    </Section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2 py-0.5 mono text-[10.5px] text-faint">{children}</span>
  );
}
