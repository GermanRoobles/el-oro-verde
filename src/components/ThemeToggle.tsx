'use client';

import { useEffect } from 'react';
import { useThemeStore, applyTheme } from '@/store/themeStore';

export default function ThemeToggle() {
  const { theme, setTheme, resolved } = useThemeStore();

  useEffect(() => {
    const resolvedTheme = theme === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    applyTheme(resolvedTheme);
  }, [theme]);

  useEffect(() => {
    const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (!media || theme !== 'system') return;
    const handler = () => applyTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  const cycle = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="rounded-lg p-2.5 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
      aria-label={resolved === 'dark' ? 'Usar tema claro' : 'Usar tema oscuro'}
      title={theme === 'system' ? 'Tema del sistema' : theme === 'dark' ? 'Oscuro' : 'Claro'}
    >
      {resolved === 'dark' ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
