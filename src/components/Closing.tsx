import { quotes } from '../content';
import Reveal from './Reveal';

export default function Closing() {
  return (
    <section className="section-rule px-4 py-12 text-center sm:px-6 sm:py-16">
      <Reveal>
        <p className="serif mx-auto max-w-[24ch] text-[24px] italic leading-[1.28] tracking-[-0.01em] text-ink sm:text-[30px]">
          “{quotes.closing.text}”
        </p>
        <p className="mono mt-4 text-[12px] uppercase tracking-[0.16em] text-faint">
          {quotes.closing.who}
        </p>
        <p className="serif mt-1 text-[12px] italic text-faint">{quotes.closing.source}</p>
      </Reveal>
    </section>
  );
}
