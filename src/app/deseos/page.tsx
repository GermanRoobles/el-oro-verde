'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { useWishlistStore } from '@/store/wishlistStore';
import WishlistButton from '@/components/WishlistButton';
import type { Locale } from '@/types';

export default function DeseosPage() {
  const { t, locale } = useLocale();
  const { items: products } = useWishlistStore();

  const name = (p: { name: Record<string, string> }) => p.name[locale as keyof typeof p.name] || p.name.es;
  const price = (p: { priceOffer?: number; price: number }) => (p.priceOffer ?? p.price).toFixed(2);
  const imgSrc = (p: { images?: string[] }) => p.images?.[0] || '/placeholder-product.svg';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('nav.wishlist')}</li>
        </ol>
      </nav>
      <h1 className="section-title mb-6 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('wishlist.title')}</h1>
      {products.length === 0 ? (
        <p className="py-12 text-center text-[var(--muted)]">{t('wishlist.empty')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="card group relative overflow-hidden p-0">
              <Link href={`/producto/${p.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[var(--background)]">
                  <Image
                    src={imgSrc(p)}
                    alt={name(p)}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)]">{name(p)}</h2>
                  <p className="mt-1 font-bold text-[var(--accent)]">{price(p)} €</p>
                </div>
              </Link>
              <div className="absolute right-2 top-2 z-10">
                <WishlistButton productId={p.id} product={p} size="sm" />
              </div>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <p className="mt-6 text-center">
          <Link href="/tienda" className="text-[var(--accent)] font-medium hover:underline">
            {t('shop.all')}
          </Link>
        </p>
      )}
    </div>
  );
}
