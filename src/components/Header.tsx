'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import CartDrawer from '@/components/CartDrawer';
import ThemeToggle from '@/components/ThemeToggle';
import MobileSidebar from '@/components/MobileSidebar';
import type { Locale } from '@/types';

const SHOP_CATEGORIES = [
  { href: '/tienda', labelKey: 'shop.category.all' as const },
  { href: '/tienda?category=cultivo', labelKey: 'shop.category.cultivo' as const },
  { href: '/tienda?category=cbd', labelKey: 'shop.category.cbd' as const },
  { href: '/tienda?category=parafernalia', labelKey: 'shop.category.parafernalia' as const },
  { href: '/tienda?category=accesorios', labelKey: 'shop.category.accesorios' as const },
];

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, locale, setLocale } = useLocale();
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isShop = pathname === '/tienda' || pathname.startsWith('/tienda');
  const isProduct = pathname.startsWith('/producto/');
  const currentCategory = searchParams.get('category') || '';

  const nav = [
    { href: '/', label: t('nav.home') },
    { href: '/categorias', label: t('nav.categories') },
    { href: '/contacto', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/98 backdrop-blur-xl shadow-sm">
      <div className="border-b border-[var(--border)] bg-[var(--accent-light)] py-2 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
          {t('home.promo')}
        </p>
      </div>
      <div className="mobile-container mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 md:h-16 md:px-4">
        {/* Móvil: hamburger + logo + acciones */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:flex-none">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="touch-target flex shrink-0 items-center justify-center rounded-lg p-2 text-[var(--foreground)] transition hover:bg-[var(--background)] md:hidden"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg py-2 transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-2 focus:ring-offset-[var(--surface)] md:shrink-0"
          >
            <Image
              src="/logo.png"
              alt={t('site.name')}
              width={120}
              height={36}
              className="mobile-logo h-6 w-auto object-contain md:h-9"
              priority
            />
          </Link>
        </div>
        <nav className="hidden gap-1 md:flex md:items-center">
          <Link
            href="/"
            className={`relative rounded-lg px-3 py-4 text-sm font-medium tracking-wide transition duration-200 ${pathname === '/' ? 'text-[var(--accent)]' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
              }`}
          >
            {t('nav.home')}
            {pathname === '/' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--accent)]" />
            )}
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              onClick={() => setShopOpen((o) => !o)}
              className={`relative flex items-center gap-1 rounded-lg px-3 py-4 text-sm font-medium tracking-wide transition duration-200 ${isShop || isProduct ? 'text-[var(--accent)]' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                }`}
              aria-expanded={shopOpen}
              aria-haspopup="true"
            >
              {t('nav.shop')}
              <svg className={`h-4 w-4 transition-transform ${shopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {(shopOpen) && (
              <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2 shadow-lg">
                {SHOP_CATEGORIES.map(({ href, labelKey }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                    onClick={() => setShopOpen(false)}
                  >
                    {t(labelKey)}
                  </Link>
                ))}
              </div>
            )}
            {(isShop || isProduct) && !shopOpen && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--accent)]" />
            )}
          </div>
          {nav.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative rounded-lg px-3 py-4 text-sm font-medium tracking-wide transition duration-200 ${pathname === href ? 'text-[var(--accent)]' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                }`}
            >
              {label}
              {pathname === href && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--accent)]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <SearchAutocomplete />
          <ThemeToggle />
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="input-pro hidden rounded-lg px-3 py-2 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)]/20 md:block"
            aria-label="Idioma"
          >
            <option value="es">ES</option>
            <option value="ca">CA</option>
            <option value="en">EN</option>
          </select>
          <Link
            href="/favoritos"
            className="touch-target relative hidden items-center justify-center rounded-full p-2.5 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--accent)] md:flex"
            aria-label={t('nav.wishlist')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {useWishlistStore.getState().items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                {useWishlistStore.getState().items.length}
              </span>
            )}
          </Link>
          <Link
            href="/cuenta"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)]/80 transition duration-200 hover:bg-[var(--background)] hover:text-[var(--accent)] md:inline-block"
          >
            {t('nav.account')}
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="touch-target relative flex shrink-0 items-center justify-center rounded-full p-2.5 text-[var(--accent)] transition duration-200 hover:bg-[var(--accent-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            aria-label={t('nav.cart')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} currentCategory={currentCategory} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
