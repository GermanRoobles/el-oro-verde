'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function BackToTop() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] shadow-lg transition hover:bg-[var(--accent-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 md:bottom-8 md:left-8"
      aria-label={t('backToTop')}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
