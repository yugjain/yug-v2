import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Mounts its children only when the slot approaches the viewport. Used for the
 * two heavy interactive sections so their code and SVG art stay out of the
 * initial bundle and off the first paint.
 *
 * The wrapper owns the section's `id` until the real section mounts, so an
 * anchor click or a deep link still has something to scroll to. Once mounted,
 * the inner <section> carries the id and the wrapper drops it.
 */
export default function Defer({
  id,
  minHeight,
  children,
}: {
  id: string;
  minHeight: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    // A deep link to this section should mount immediately.
    if (window.location.hash === `#${id}`) {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      // Start a little early so the section is painted before it is seen.
      { rootMargin: '700px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, show]);

  return (
    <div ref={ref} id={show ? undefined : id} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
