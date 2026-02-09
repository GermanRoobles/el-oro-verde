'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { useCartStore } from '@/store/cartStore';
import type { Locale } from '@/types';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { t, locale } = useLocale();
  const items = useCartStore((s) => s.getItems());
  const getTotalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const name = (item: { product?: { name: Record<string, string> } }) =>
    item.product?.name?.[locale as keyof typeof item.product.name] || item.product?.name?.es || '—';
  const img = (item: { product?: { images?: string[] } }) => item.product?.images?.[0] || '/placeholder-product.svg';
  const unitPrice = (item: { product?: { priceOffer?: number; price: number } }) =>
    item.product ? (item.product.priceOffer ?? item.product.price) : 0;

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-xl animate-fade-in"
        role="dialog"
        aria-label={t('cart.title')}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h2 className="text-lg font-bold text-[var(--foreground)]">{t('cart.title')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            aria-label={t('cart.closeDrawer')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="py-8 text-center text-[var(--muted)]">{t('cart.empty')}</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={img(item)} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--foreground)]">{name(item)}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {unitPrice(item).toFixed(2)} € × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--accent-light)]"
                      aria-label="Menos"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--accent-light)]"
                      aria-label="Más"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-100 hover:text-red-600"
                    aria-label="Quitar"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-[var(--border)] px-4 py-4">
            <p className="flex justify-between text-lg font-bold text-[var(--foreground)]">
              <span>{t('cart.total')}</span>
              <span className="text-[var(--accent)]">{getTotalPrice().toFixed(2)} €</span>
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/carrito"
                onClick={onClose}
                className="flex-1 rounded-xl border border-[var(--accent)] py-3 text-center font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-light)]"
              >
                {t('cart.title')}
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-primary flex-1 rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white hover:bg-[var(--accent-hover)]"
              >
                {t('cart.checkout')}
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
