export default function Marginalia({
  children,
  side = 'right',
  className = '',
}: {
  children: string;
  side?: 'left' | 'right';
  className?: string;
}) {
  return (
    <aside
      aria-hidden
      className={`hand pointer-events-none absolute hidden w-[156px] text-[19px] leading-[1.15] text-faint xl:block ${
        side === 'right' ? '-right-[176px]' : '-left-[176px]'
      } ${className}`}
      style={{ transform: `rotate(${side === 'right' ? 3.5 : -3.5}deg)` }}
    >
      <span className="block whitespace-pre-line">{children}</span>
      <svg
        viewBox="0 0 72 52"
        width="52"
        height="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-1 ${side === 'right' ? '' : '-scale-x-100'}`}
        aria-hidden
      >
        <path d="M12 4C8 22 24 41 59 38M50 30C53 34 57 37 61 38C57 40 53 42 49 46" />
      </svg>
    </aside>
  );
}
