'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { useCartStore } from '@/store/cartStore';
import ProductGallery from '@/components/ProductGallery';
import ProductReviews from '@/components/ProductReviews';
import ProductBadges from '@/components/ProductBadges';
import WishlistButton from '@/components/WishlistButton';
import ProductPageSkeleton from '@/components/ProductPageSkeleton';
import type { Product } from '@/types';
import type { Locale } from '@/types';

export default function ProductoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { t, locale } = useLocale();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setProduct);
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    fetch(`/api/products?categoryId=${product.categoryId}&locale=${locale}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => setRelated((Array.isArray(data) ? data : []).filter((p) => p.id !== product.id).slice(0, 4)));
  }, [product?.id, product?.categoryId, locale]);

  if (!product) {
    return (
      <>
        <ProductPageSkeleton />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Link href="/tienda" className="text-[var(--accent)] underline-offset-2 hover:underline">
            Volver a la tienda
          </Link>
        </div>
      </>
    );
  }

  const name = product.name[locale as keyof typeof product.name] || product.name.es;
  const description = product.description[locale as keyof typeof product.description] || product.description.es;
  const price = product.priceOffer ?? product.price;
  const hasOffer = !!product.priceOffer;
  const imgSrc = product.images[0] || '/placeholder-product.svg';

  const handleAddToCart = () => {
    addItem(product.id, quantity, product);
    router.push('/carrito');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="animate-fade-in mb-6 text-sm text-[var(--muted)] opacity-0" style={{ animationFillMode: 'forwards' }} aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/tienda" className="transition hover:text-[var(--accent)]">{t('shop.all')}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-[var(--accent)] font-medium truncate max-w-[180px] sm:max-w-none">{name}</li>
        </ol>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative animate-scale-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          <ProductGallery images={product.images} alt={name} priority />
          <div className="absolute left-3 top-3 z-10">
            <ProductBadges product={product} />
          </div>
          <div className="absolute right-3 top-3 z-10">
            <WishlistButton productId={product.id} product={product} />
          </div>
        </div>
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{name}</h1>
          <p className="mt-2 text-[var(--muted)]">{product.brand}</p>
          <p className="mt-4 text-2xl font-semibold text-[var(--accent)]">
            {price.toFixed(2)} €
            {hasOffer && (
              <span className="ml-2 text-lg text-[var(--muted)] line-through">{product.price.toFixed(2)} €</span>
            )}
          </p>
          <p className="mt-4 leading-relaxed text-[var(--foreground)]/90">{description}</p>
          {product.stock > 0 ? (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2">
                <span className="text-[var(--foreground)]">Cantidad:</span>
                <input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="input-pro w-20 rounded-xl px-3 py-2 text-center"
                />
              </label>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
              >
                {t('shop.addToCart')}
              </button>
            </div>
          ) : (
            <p className="mt-6 text-[var(--accent)]">{t('shop.outOfStock')}</p>
          )}
          {product.stock > 0 && (
            <p className="mt-4 text-sm text-[var(--muted)]">{product.stock} {t('shop.stock')}</p>
          )}
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">{t('product.shippingTitle')}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t('product.shippingText')}</p>
          </div>
        </div>
      </div>

      <ProductReviews productId={product.id} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-[var(--border)] pt-12">
          <h2 className="section-title mb-6 text-xl font-bold text-[var(--foreground)]">{t('shop.related')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => {
              const relatedName = p.name[locale as keyof typeof p.name] || p.name.es;
              const relatedPrice = (p.priceOffer ?? p.price).toFixed(2);
              const relatedImg = p.images[0] || '/placeholder-product.svg';
              return (
                <Link
                  key={p.id}
                  href={`/producto/${p.slug}`}
                  className="card group relative overflow-hidden p-0 transition hover:-translate-y-0.5"
                >
                  <div className="relative aspect-square overflow-hidden bg-[var(--background)]">
                    <Image src={relatedImg} alt={relatedName} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="25vw" />
                  </div>
                  <ProductBadges product={p} className="pointer-events-none" />
                  <div className="absolute right-2 top-2 z-10" onClick={(e) => e.preventDefault()}>
                    <WishlistButton productId={p.id} product={p} size="sm" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)]">{relatedName}</h3>
                    <p className="mt-1 font-bold text-[var(--accent)]">{relatedPrice} €</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
