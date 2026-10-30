import { useEffect, useState } from 'react';

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

function initial(): Theme {
  if (typeof window === 'undefined') return 'light';
  return readUrl() ?? readStored() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      // Not fatal — the class is what actually paints the page.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[theme]);
  }, [theme]);

  // If the visitor has never made a choice, keep following the OS.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStored()) setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return {
    theme,
    toggle: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}
