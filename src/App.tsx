import { useEffect } from 'react';
import Advisory from './components/Advisory';
import BottomNav from './components/BottomNav';
import Closing from './components/Closing';
import Elsewhere from './components/Elsewhere';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import OffClock from './components/OffClock';
import Proof from './components/Proof';
import Synthesizer from './components/Synthesizer';
import TopBar from './components/TopBar';
import Work from './components/Work';
import Writing from './components/Writing';

export default function App() {
  // Static hosting + React means the browser's own hash scroll fires before mount.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:text-paper"
      >
        Skip to content
      </a>

      <div className="sheet pb-14 sm:pb-0">
        <TopBar />
        <main id="main">
          <Hero />
          <Work />
          <HowIWork />
          <Advisory />
          <Proof />
          <Writing />
          <Synthesizer />
          <OffClock />
          <Elsewhere />
          <Closing />
        </main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
