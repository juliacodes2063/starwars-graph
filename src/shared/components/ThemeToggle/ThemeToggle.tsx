import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

// Small theme switcher: syncs "light/dark" with data-theme attribute and localStorage

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

    const initial: Theme =
      saved ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const handleClick = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', next);
      window.localStorage.setItem(STORAGE_KEY, next);

      return next;
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      {theme === 'light' ? '🌚' : '☀️'}
    </button>
  );
}
