import { profile } from '../content';
import { useTheme } from '../useTheme';
import { LinkedIn, Mail, Moon, Sun } from './Icons';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#how', label: 'How' },
  { href: '#advisory', label: 'Advisory' },
  { href: '#writing', label: 'Writing' },
  { href: '#ai', label: 'AI' },
  { href: '#play', label: 'Play' },
];

export default function TopBar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-line bg-paper/92 backdrop-blur-md">
      <div className="flex h-[52px] items-center justify-between gap-4 px-4 sm:px-7">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center px-1 -mx-1 text-[14px] font-semibold tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          yj<span className="text-accent">.</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 items-center px-1 text-[12px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-line/60 hover:text-ink"
          >
            <LinkedIn className="h-[15px] w-[15px]" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Yug"
            className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-line/60 hover:text-ink"
          >
            <Mail className="h-[15px] w-[15px]" />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-line/60 hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-[15px] w-[15px]" /> : <Moon className="h-[15px] w-[15px]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
