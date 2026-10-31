import { BASE } from '../content';

const sections = [
  { hash: '#work', label: 'Work' },
  { hash: '#writing', label: 'Writing' },
  { hash: '#ai', label: 'AI' },
  { hash: '#play', label: 'Play' },
];

export default function BottomNav({ page = 'home' }: { page?: 'home' | 'lab' }) {
  const home = page === 'lab' ? BASE : '';
  const items = [
    ...sections.map((section) => ({
      href: `${home}${section.hash}`,
      label: section.label,
      current: false,
    })),
    { href: `${BASE}lab/`, label: 'Lab', current: page === 'lab' },
  ];

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dashed border-line bg-paper/95 backdrop-blur-md sm:hidden"
    >
      <ul className="flex items-stretch justify-around px-1.5 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5">
        {items.map((item) => (
          <li key={item.href} className="flex-1">
            <a
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`mono flex min-h-11 items-center justify-center rounded-md px-0.5 py-2 text-center text-[12px] uppercase tracking-[0.08em] transition-colors active:text-ink ${
                item.current ? 'text-ink' : 'text-faint'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li className="flex-1">
          <a
            href="#top"
            className="mono flex min-h-11 items-center justify-center rounded-md px-0.5 py-2 text-center text-[12px] uppercase tracking-[0.08em] text-faint transition-colors active:text-ink"
          >
            Top ↑
          </a>
        </li>
      </ul>
    </nav>
  );
}
