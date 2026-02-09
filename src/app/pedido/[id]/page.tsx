'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';

export default function PedidoConfirmacionPage() {
  const params = useParams();
  const id = params.id as string;
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t('order.success')}</h1>
      <p className="mt-4 text-[var(--muted)]">{t('order.thanks')}</p>
      <p className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--background)] px-6 py-3 font-mono text-lg text-[var(--accent)]">
        {t('order.number')}: {id}
      </p>
      <Link
        href="/"
        className="btn-primary mt-8 inline-block rounded-lg bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
      >
        {t('order.backHome')}
      </Link>
    </div>
  );
}
