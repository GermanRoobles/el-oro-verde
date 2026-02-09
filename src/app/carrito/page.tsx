'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { useCartStore } from '@/store/cartStore';
import type { Locale } from '@/types';

export default function CarritoPage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const items = useCartStore((s) => s.getItems());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getTotalPrice = useCartStore((s) => s.totalPrice);

  const name = (item: { product?: { name: Record<string, string> } }) =>
    item.product?.name?.[locale as keyof typeof item.product.name] || item.product?.name?.es || '—';
  const price = (item: { product?: { priceOffer?: number; price: number }; quantity: number }) => {
    const p = item.product;
    const unit = p ? (p.priceOffer ?? p.price) : 0;
    return (unit * item.quantity).toFixed(2);
  };
  const imgSrc = (item: { product?: { images?: string[] } }) => {
    const src = item.product?.images?.[0];
    return src || '/placeholder-product.svg';
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <nav className="mb-6 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
          <ol className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
            <li aria-hidden>/</li>
            <li className="font-medium text-[var(--accent)]">{t('cart.title')}</li>
          </ol>
        </nav>

        {/* Empty state */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[var(--accent-light)]">
            <svg className="h-16 w-16 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('cart.title')}</h1>
          <p className="mt-3 text-lg text-[var(--muted)]">{t('cart.empty')}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">¡Descubre nuestros productos y empieza a llenar tu carrito!</p>
          <Link
            href="/tienda"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explorar productos
          </Link>
        </div>

        {/* Featured products section */}
        <div className="mt-16 border-t border-[var(--border)] pt-12">
          <h2 className="section-title mb-6 text-center text-xl font-bold text-[var(--foreground)] sm:text-2xl">
            Productos destacados
          </h2>
          <p className="mb-8 text-center text-sm text-[var(--muted)]">
            Estos productos podrían interesarte
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder for featured products - will be populated by API */}
            <div className="text-center text-sm text-[var(--muted)] sm:col-span-2 lg:col-span-4">
              <Link href="/tienda" className="text-[var(--accent)] underline-offset-4 hover:underline">
                Ver todos los productos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/tienda" className="transition hover:text-[var(--accent)]">{t('nav.shop')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('cart.title')}</li>
        </ol>
      </nav>
      <h1 className="section-title mb-6 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">{t('cart.title')}</h1>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={item.productId}
            className="card animate-fade-in-up flex flex-wrap items-center justify-between gap-4 p-4 opacity-0"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-xl bg-[var(--background)]">
                <Image
                  src={imgSrc(item)}
                  alt={name(item)}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-[var(--foreground)]">{name(item)}</p>
                <p className="text-sm text-[var(--accent)]">
                  {(item.product?.priceOffer ?? item.product?.price ?? 0).toFixed(2)} € × {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId, Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="input-pro w-16 rounded-lg px-2 py-1.5 text-center"
              />
              <span className="w-20 text-right font-medium text-[var(--accent)]">{price(item)} €</span>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="rounded-lg p-2 text-red-400 transition duration-200 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Eliminar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-4 border-t border-[var(--border)] pt-8">
        <p className="text-xl font-bold text-[var(--foreground)]">
          {t('cart.total')}: {getTotalPrice().toFixed(2)} €
        </p>
        <div className="flex gap-3">
          <Link
            href="/tienda"
            className="rounded-xl border border-[var(--accent)] px-6 py-3 font-medium text-[var(--accent)] transition duration-200 hover:bg-[var(--accent-light)]"
          >
            {t('cart.continue')}
          </Link>
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </div>
  );
}
