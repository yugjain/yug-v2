import type { ReactNode } from 'react';

/**
 * Scroll-in treatment with no hidden-by-default state: the animation is driven
 * by the CSS scroll timeline where supported, and the content simply renders
 * statically everywhere else. Nothing can ever get stuck invisible.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
