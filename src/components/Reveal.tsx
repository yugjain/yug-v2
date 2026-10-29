import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Reveals content on scroll, but never hides it by default: only elements that
 * mount below the fold get the hidden state. If anything goes wrong — no
 * IntersectionObserver, a hard jump to the footer — the content is already
 * visible rather than stuck at opacity 0.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94) return;

    el.classList.add('is-hidden');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-in');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
