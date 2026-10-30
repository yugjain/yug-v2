import { profile } from '../content';

function DeskScene() {
  return (
    <svg viewBox="0 0 180 64" className="h-12 w-auto" aria-hidden fill="none" stroke="var(--ink)">
      {/* desk line */}
      <path d="M4 56h172" strokeWidth="1.2" strokeOpacity="0.35" />
      {/* laptop */}
      <path d="M64 40V22a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v18" strokeWidth="1.3" strokeOpacity="0.55" />
      <path d="M58 40h48l3 5H55z" strokeWidth="1.3" strokeOpacity="0.55" />
      <path d="M72 27h16M72 32h22" strokeWidth="1" strokeOpacity="0.3" />
      {/* mug */}
      <path d="M28 38h18v12a4 4 0 0 1-4 4H32a4 4 0 0 1-4-4z" strokeWidth="1.3" strokeOpacity="0.55" />
      <path d="M46 42h4a3 3 0 0 1 0 6h-4" strokeWidth="1.2" strokeOpacity="0.45" />
      <path d="M33 33c-2-3 2-4 0-7M40 33c-2-3 2-4 0-7" strokeWidth="1" strokeOpacity="0.3" />
      {/* lamp */}
      <path d="M126 22h14v4h-14z" strokeWidth="1.3" strokeOpacity="0.55" />
      <path d="M131 26h4v18h-4z" strokeWidth="1.2" strokeOpacity="0.45" />
      <path d="M124 44h18v4h-18z" strokeWidth="1.3" strokeOpacity="0.55" />
      <path d="M133 13h2v9h-2z" strokeWidth="1.2" strokeOpacity="0.35" />
      <path d="M129 8h10v5h-10z" strokeWidth="1.2" strokeOpacity="0.35" />
      {/* papers */}
      <path d="M104 50l10-6 8 12-10 5z" strokeWidth="1.1" strokeOpacity="0.35" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="section-rule px-5 py-6 sm:px-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <DeskScene />
          <p className="text-[12px] text-faint">
            Made in Mumbai · <span className="mono">© {new Date().getFullYear()}</span> {profile.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 text-[12px] text-faint">
          <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
            LinkedIn
          </a>
          <a href="#top" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
