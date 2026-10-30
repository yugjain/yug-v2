import { profile } from '../content';
import { ArrowUpRight, CalendarIcon } from './Icons';

/**
 * The one primary action. Shared so the hero and the evidence section cannot
 * drift apart in styling, hover state or hit area.
 */
export default function BookCTA({ className = '' }: { className?: string }) {
  return (
    <a
      href={profile.calendar}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-9 items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-ink transition-transform hover:-translate-y-px ${className}`}
    >
      <CalendarIcon className="h-3.5 w-3.5" />
      Book 15 min
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}
