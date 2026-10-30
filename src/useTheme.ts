import { useEffect, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'yj-theme';

/** Matches --paper in each theme, so browser chrome blends with the top bar. */
const CHROME: Record<Theme, string> = { light: '#fbfbf8', dark: '#111112' };

function readStored(): Theme | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // Private mode / blocked storage: behave as if nothing was chosen.
    return null;
  }
}

/** ?theme=dark is a testing hook (Lighthouse, screenshots); it never invents a preference. */
function readUrl(): Theme | null {
  try {
    const value = new URLSearchParams(window.location.search).get('theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  // Starts light on both server and client so prerendered markup hydrates
  // cleanly; the prepaint script has already set the real class on <html>.
  const [theme, setTheme] = useState<Theme>('light');
  const chose = useRef(false);

  // Resolve the real preference after hydration, without touching storage.
  useEffect(() => {
    setTheme(readUrl() ?? readStored() ?? systemTheme());
  }, []);

  // Apply the resolved theme. Storage is only written by the toggle, so an
  // OS-level change still works for visitors who never made a choice.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[theme]);
  }, [theme]);

  // Follow the OS while no choice has been saved.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!chose.current && !readStored()) setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    chose.current = true;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Not fatal — the class is what actually paints the page.
    }
    setTheme(next);
  };

  return { theme, toggle };
}
