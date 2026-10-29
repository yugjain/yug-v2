import { useEffect } from 'react';
import Advisory from './components/Advisory';
import Elsewhere from './components/Elsewhere';
import Footer from './components/Footer';
import Hero from './components/Hero';
import OffClock from './components/OffClock';
import Proof from './components/Proof';
import Synthesizer from './components/Synthesizer';
import TopBar from './components/TopBar';
import Work from './components/Work';
import Writing from './components/Writing';

export default function App() {
  // Static hosting + React means the browser's own hash scroll fires before mount.
  // Re-apply it once the page has painted so /#advisory style links land correctly.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const target = () => document.getElementById(id);
    const frame = requestAnimationFrame(() => {
      const el = target();
      if (el) el.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:text-paper"
      >
        Skip to content
      </a>

      <div className="sheet">
        <TopBar />
        <main id="main">
          <Hero />
          <Work />
          <Advisory />
          <Proof />
          <Writing />
          <Synthesizer />
          <OffClock />
          <Elsewhere />
        </main>
        <Footer />
      </div>
    </>
  );
}
