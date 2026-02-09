'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { useCartStore } from '@/store/cartStore';

const ADDRESS_KEY = 'eloroverde_default_address';

function loadSavedAddress(userId: string | null) {
  if (typeof window === 'undefined' || !userId) return null;
  try {
    const raw = localStorage.getItem(`${ADDRESS_KEY}_${userId}`);
    if (!raw) return null;
    return JSON.parse(raw) as { name: string; address: string; city: string; postalCode: string; country: string; phone: string };
  } catch {
    return null;
  }
}

function saveAddress(userId: string, data: { name: string; address: string; city: string; postalCode: string; country: string; phone: string }) {
  try {
    localStorage.setItem(`${ADDRESS_KEY}_${userId}`, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export default function CheckoutPage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const items = useCartStore((s) => s.getItems());
  const getTotalPrice = useCartStore((s) => s.totalPrice);
  const clear = useCartStore((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    phone: '',
  });

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        const u = data?.user;
        setUser(u ?? null);
        if (u?.id) {
          const saved = loadSavedAddress(u.id);
          if (saved) setForm(saved);
        }
      });
  }, []);

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center animate-fade-in">
        <p className="text-[var(--muted)]">Tu carrito está vacío.</p>
        <Link href="/tienda" className="mt-4 inline-block text-[var(--accent)] transition hover:underline">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const itemName = (item: { product?: { name: Record<string, string> } }) =>
    item.product?.name?.[locale as keyof typeof item.product.name] || item.product?.name?.es || '—';
  const itemImg = (item: { product?: { images?: string[] } }) => item.product?.images?.[0] || '/placeholder-product.svg';
  const unitPrice = (item: { product?: { priceOffer?: number; price: number } }) =>
    item.product ? (item.product.priceOffer ?? item.product.price) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (user?.id && saveAddressChecked) saveAddress(user.id, form);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: form,
          lines: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear el pedido');
      clear();
      router.push(`/pedido/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'input-pro mt-1 w-full rounded-lg px-4 py-2';

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/carrito" className="transition hover:text-[var(--accent)]">{t('cart.title')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('checkout.title')}</li>
        </ol>
      </nav>

      <h1 className="section-title mb-4 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('checkout.title')}</h1>

      <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <h2 className="mb-4 font-semibold text-[var(--foreground)]">{t('checkout.summary')}</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--background)]">
                <Image src={itemImg(item)} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[var(--foreground)]">{itemName(item)}</p>
                <p className="text-sm text-[var(--muted)]">{item.quantity} × {unitPrice(item).toFixed(2)} €</p>
              </div>
              <p className="shrink-0 font-semibold text-[var(--accent)]">{(unitPrice(item) * item.quantity).toFixed(2)} €</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[var(--border)] pt-4 text-lg font-bold text-[var(--foreground)]">
          {t('cart.total')}: {getTotalPrice().toFixed(2)} €
        </p>
      </div>

      <p className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--muted)]">
        {t('checkout.paymentNote')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">
            {t('checkout.name')} *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">
            {t('checkout.address')} *
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              {t('checkout.city')} *
            </label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              {t('checkout.postalCode')} *
            </label>
            <input
              type="text"
              required
              value={form.postalCode}
              onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">
            {t('checkout.country')} *
          </label>
          <input
            type="text"
            required
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">
            {t('checkout.phone')} *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
          />
        </div>
        {user && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={saveAddressChecked}
              onChange={(e) => setSaveAddressChecked(e.target.checked)}
              className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span className="text-sm text-[var(--foreground)]">{t('checkout.saveAddress')}</span>
          </label>
        )}
        {error && <p className="rounded-lg bg-red-100 px-3 py-2 text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? '...' : t('checkout.placeOrder')}
        </button>
      </form>
      <p className="mt-4 text-center">
        <Link href="/carrito" className="text-[var(--accent)] transition hover:underline">
          Volver al carrito
        </Link>
      </p>
    </div>
  );
}
