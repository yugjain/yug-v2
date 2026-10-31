import { lazy, Suspense, useEffect } from 'react';
import Advisory from './components/Advisory';
import BottomNav from './components/BottomNav';
import Closing from './components/Closing';
import Defer from './components/Defer';
import Elsewhere from './components/Elsewhere';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import Proof from './components/Proof';
import TopBar from './components/TopBar';
import Work from './components/Work';
import Writing from './components/Writing';
import SideProjects from './components/SideProjects';

/* Two heavy, below-the-fold modules stay out of the first chunk. Defer keeps
   them unmounted until they are close to the viewport. */
const Synthesizer = lazy(() => import('./components/Synthesizer'));
const OffClock = lazy(() => import('./components/OffClock'));

export default function App() {
  // Static hosting + React means the browser's own hash scroll fires before
  // mount. Deferred sections can arrive later still, so keep listening until
  // the target exists.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    let settle = 0;
    const reveal = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const pin = () => el.scrollIntoView({ block: 'start', behavior: 'auto' });
      pin();
      requestAnimationFrame(pin);
      // A neighbouring deferred section can mount a beat later and move this
      // one; nudge it back only if it actually moved.
      settle = window.setTimeout(() => {
        if (Math.abs(el.getBoundingClientRect().top - 60) > 12) pin();
      }, 350);
      return true;
    };
    let observer: MutationObserver | null = null;
    const frame = requestAnimationFrame(() => {
      if (reveal()) return;
      observer = new MutationObserver(() => {
        if (reveal()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:text-paper"
      >
        Skip to content
      </a>

      <div className="sheet pb-16 sm:pb-0">
        <TopBar />
        <main id="main">
          <Hero />
          <Work />
          <HowIWork />
          <Advisory />
          <Proof />
          <Writing />
          <Suspense fallback={null}>
            <Defer id="ai" minHeight={860}>
              <Synthesizer />
            </Defer>
          </Suspense>
          <SideProjects />
          <Suspense fallback={null}>
            <Defer id="play" minHeight={1050}>
              <OffClock />
            </Defer>
          </Suspense>
          <Elsewhere />
          <Closing />
        </main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
