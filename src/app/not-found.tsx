'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <p className="text-6xl font-bold text-[var(--accent)]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
        {t('error.404.title')}
      </h1>
      <p className="mt-2 max-w-md text-center text-[var(--muted)]">
        {t('error.404.message')}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
        >
          {t('error.404.home')}
        </Link>
        <Link
          href="/tienda"
          className="rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--background)]"
        >
          {t('error.404.shop')}
        </Link>
      </div>
    </div>
  );
}
