'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import ProductBadges from '@/components/ProductBadges';
import WishlistButton from '@/components/WishlistButton';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import type { Product } from '@/types';
import type { Locale } from '@/types';

export default function HomePage() {
  const { t, locale } = useLocale();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const setSafe = (setter: (v: Product[]) => void) => (data: unknown) => {
    setter(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/products?featured=true&locale=${locale}`).then((r) => (r.ok ? r.json() : [])).then(setSafe(setFeatured)),
      fetch(`/api/products?new=true&locale=${locale}`).then((r) => (r.ok ? r.json() : [])).then(setSafe(setNewProducts)),
      fetch(`/api/products?locale=${locale}`).then((r) => (r.ok ? r.json() : [])).then((all: unknown) => setOffers(Array.isArray(all) ? (all as Product[]).filter((p) => p.priceOffer != null) : [])),
    ]).finally(() => setLoading(false));
  }, [locale]);

  const name = (p: Product) => p.name[locale as keyof typeof p.name] || p.name.es;
  const price = (p: Product) => (p.priceOffer ?? p.price).toFixed(2);
  const imgSrc = (p: Product) => p.images[0] || '/placeholder-product.svg';

  const ProductCard = ({ p, index = 0 }: { p: Product; index?: number }) => (
    <Link
      href={`/producto/${p.slug}`}
      className="group relative animate-fade-in-up overflow-hidden rounded-xl border border-neutral-200 bg-white opacity-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"

      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">

        <Image
          src={imgSrc(p)}
          alt={name(p)}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <ProductBadges product={p} />
      </div>
      <div className="absolute right-2 top-2 z-10" onClick={(e) => e.preventDefault()}>
        <WishlistButton productId={p.id} product={p} size="sm" />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{p.brand}</p>

        <h3 className="mt-1.5 font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-green-600 dark:text-neutral-100 dark:group-hover:text-green-400">

          {name(p)}
        </h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{price(p)} €</span>

          {p.priceOffer != null && (
            <span className="text-sm text-neutral-500 line-through">{p.price.toFixed(2)} €</span>
          )}
        </p>
      </div>
    </Link>
  );

  const heroBanner = '/hero-professional.png';
  const categoryBanners = [
    { id: 'cultivo', href: '/tienda?category=cultivo', img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80', labelKey: 'home.banner.cultivo' as const },
    { id: 'cbd', href: '/tienda?category=cbd', img: 'https://images.unsplash.com/photo-1574944985070-8f3ebcfe5e5e?w=800&q=80', labelKey: 'home.banner.cbd' as const },
    { id: 'parafernalia', href: '/tienda?category=parafernalia', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f1cc45?w=800&q=80', labelKey: 'home.banner.parafernalia' as const },
    { id: 'semillas', href: '/tienda?category=cultivo', img: 'https://images.unsplash.com/photo-1597848212624-a19eb5e8e1e6?w=800&q=80', labelKey: 'home.banner.semillas' as const },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[380px] overflow-hidden min-[400px]:min-h-[420px] sm:min-h-[480px] md:min-h-[520px]">
        <div className="absolute inset-0">
          <Image
            src={heroBanner}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/40" />
        </div>
        <div className="relative mx-auto flex min-h-[380px] max-w-6xl flex-col justify-center px-4 py-16 min-[400px]:min-h-[420px] sm:min-h-[480px] sm:px-5 sm:py-20 md:min-h-[520px] md:px-8">
          <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.2em] text-white/80 opacity-0" style={{ animationFillMode: 'forwards' }}>
            {t('site.tagline')}
          </p>
          <h1 className="animate-fade-in-up mt-3 text-3xl font-bold tracking-tight text-white opacity-0 min-[400px]:text-4xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight" style={{ animationDelay: '60ms', animationFillMode: 'forwards' }}>
            {t('home.hero')}
          </h1>
          <p className="animate-fade-in-up mt-4 max-w-lg text-base leading-relaxed text-white/85 opacity-0 md:text-lg" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {t('home.sub')}
          </p>
          <Link
            href="/tienda"
            className="btn-primary animate-fade-in-up mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 font-semibold text-white opacity-0 shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            style={{ animationDelay: '140ms', animationFillMode: 'forwards' }}
          >
            {t('shop.all')}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Banda promocional */}
      <div className="banner-strip">
        <span className="hidden sm:inline">{t('home.promoBanner')}</span>
        <span className="sm:hidden">15% en fertilizantes</span>
        <Link href="/tienda?category=cultivo" className="ml-2 inline-block font-semibold">
          {t('home.promoBanner.cta')} →
        </Link>
      </div>

      {/* Sobre nosotros */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-12 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="section-title text-2xl font-bold text-[var(--foreground)] md:text-3xl">{t('home.about.title')}</h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)] md:text-lg">{t('home.about.text')}</p>
        </div>
      </section>

      {/* Banners de categorías */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-8 sm:py-12 md:py-14">
        <div className="mobile-container mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <h2 className="section-title mb-8 text-center text-xl font-bold text-[var(--foreground)] md:text-2xl">{t('home.categories')}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categoryBanners.map(({ id, href, img, labelKey }) => (
              <Link
                key={id}
                href={href}
                className="card group relative overflow-hidden transition duration-300 hover:-translate-y-0.5"
              >
                <div className="category-card-mobile relative aspect-[3/2] sm:aspect-[4/3]">
                  <Image
                    src={img}
                    alt={t(labelKey)}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-center text-xs font-semibold uppercase tracking-wider text-white drop-shadow-lg sm:bottom-4 sm:left-4 sm:right-4 sm:text-sm">
                    {t(labelKey)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="section-title mb-2 text-center text-lg font-bold text-[var(--foreground)] md:text-xl">{t('home.brands.title')}</h2>
          <p className="mb-8 text-center text-sm text-[var(--muted)]">{t('home.brands.sub')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {['El Oro Verde', 'BioBizz', 'RAW', 'OCB', 'Generic', 'Clipper', 'Juicy', 'Jano'].map((brandName) => (
              <Link
                key={brandName}
                href="/tienda"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]/50 hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                {brandName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banda de confianza */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 md:py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 md:gap-8">
          {[
            { iconPath: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', key: 'home.trust.shipping', descKey: 'home.trust.shipping.desc' as const },
            { iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', key: 'home.trust.secure', descKey: 'home.trust.secure.desc' as const },
            { iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', key: 'home.trust.support', descKey: 'home.trust.support.desc' as const },
            { iconPath: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6', key: 'home.trust.returns', descKey: 'home.trust.returns.desc' as const },
          ].map(({ iconPath, key, descKey }) => (
            <div
              key={key}
              className="card flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:gap-4 md:px-8 md:py-6 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{t(key)}</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section className="mobile-container mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-14 md:px-6 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title text-2xl font-bold text-[var(--foreground)] md:text-3xl">{t('home.offers')}</h2>
          <Link href="/tienda" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 transition hover:underline">
            {t('home.viewAll')} →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />) : offers.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {/* Destacados */}
      <section className="mobile-container mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-14 md:px-6 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title text-2xl font-bold text-[var(--foreground)] md:text-3xl">{t('home.featured')}</h2>
          <Link href="/tienda" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 transition hover:underline">
            {t('home.viewAll')} →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />) : featured.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {/* Novedades */}
      <section className="mobile-container mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-14 md:px-6 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title text-2xl font-bold text-[var(--foreground)] md:text-3xl">{t('home.new')}</h2>
          <Link href="/tienda" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 transition hover:underline">
            {t('home.viewAll')} →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />) : newProducts.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {/* CTA asesoramiento */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
        <div className="cta-banner">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t('home.cta.title')}</h2>
          <p className="mt-2 max-w-lg mx-auto text-white/90">{t('home.cta.sub')}</p>
          <Link
            href="/contacto"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-8 py-3.5 font-semibold text-white hover:bg-white/10"
          >
            {t('home.cta.button')}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-14 md:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] md:text-2xl">{t('home.newsletter.title')}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{t('home.promo')}</p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t('home.newsletter.placeholder')}
              className="input-pro w-full rounded-xl px-4 py-3.5 sm:w-72"
            />
            <button
              type="submit"
              className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              {t('home.newsletter.cta')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
