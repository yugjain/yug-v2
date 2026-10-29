import { profile } from '../content';

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-6 sm:px-9">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11.5px] text-faint">
        <p>
          Made in Mumbai · <span className="mono">© {new Date().getFullYear()}</span> {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a href="#top" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
