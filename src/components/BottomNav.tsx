const items = [
  { href: '#work', label: 'Work' },
  { href: '#writing', label: 'Writing' },
  { href: '#ai', label: 'AI' },
  { href: '#play', label: 'Play' },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dashed border-line bg-paper/95 backdrop-blur-md sm:hidden"
    >
      <ul className="flex items-stretch justify-around px-2 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5">
        {items.map((item) => (
          <li key={item.href} className="flex-1">
            <a
              href={item.href}
              className="mono block rounded-md py-2 text-center text-[10px] uppercase tracking-[0.12em] text-faint transition-colors active:text-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li className="flex-1">
          <a
            href="#top"
            className="mono block rounded-md py-2 text-center text-[10px] uppercase tracking-[0.12em] text-faint transition-colors active:text-ink"
          >
            Top ↑
          </a>
        </li>
      </ul>
    </nav>
  );
}
