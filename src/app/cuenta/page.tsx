'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import type { Order } from '@/types';

export default function CuentaPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/auth/me').then((r) => r.json()), fetch('/api/orders').then((r) => r.json())])
      .then(([me, ord]) => {
        setUser(me.user);
        setOrders(ord.orders || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const statusKey = (s: Order['status']) => `status.${s}`;

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center text-[var(--muted)]">
        Cargando...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t('account.title')}</h1>
      {user ? (
        <>
          <p className="mt-2 text-[var(--muted)]">
            {user.name} · {user.email}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-lg border border-[var(--accent)] px-4 py-2 text-sm text-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            {t('nav.logout')}
          </button>
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{t('account.orders')}</h2>
            {orders.length === 0 ? (
              <p className="mt-4 text-[var(--muted)]">No tienes pedidos aún.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="card flex flex-wrap items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <span className="font-mono font-semibold text-[var(--accent)]">{order.id}</span>
                      <span className="ml-3 text-sm text-[var(--muted)]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[var(--accent)]">{order.total.toFixed(2)} €</span>
                      <span className="rounded bg-[var(--accent-light)] px-2 py-0.5 text-[var(--accent)]">
                        {t(statusKey(order.status))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-[var(--muted)]">Inicia sesión para ver tu cuenta y pedidos.</p>
          <Link
            href="/login"
            className="btn-primary mt-4 inline-block rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            {t('nav.login')}
          </Link>
        </div>
      )}
    </div>
  );
}
