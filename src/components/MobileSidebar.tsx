'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from '@/context/LocaleContext';
import ThemeToggle from '@/components/ThemeToggle';
import type { Locale } from '@/types';

const SHOP_CATEGORIES = [
  { href: '/tienda', labelKey: 'shop.category.all' as const },
  { href: '/tienda?category=cultivo', labelKey: 'shop.category.cultivo' as const },
  { href: '/tienda?category=cbd', labelKey: 'shop.category.cbd' as const },
  { href: '/tienda?category=parafernalia', labelKey: 'shop.category.parafernalia' as const },
  { href: '/tienda?category=accesorios', labelKey: 'shop.category.accesorios' as const },
];

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  currentCategory?: string;
}

export default function MobileSidebar({ open, onClose, currentCategory = '' }: MobileSidebarProps) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLocale();
  const isShop = pathname === '/tienda' || pathname.startsWith('/tienda');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navMain = [
    { href: '/categorias', label: t('nav.categories') },
    { href: '/contacto', label: t('nav.contact') },
  ];

  const linkClass = (active: boolean) =>
    `flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-[15px] font-medium transition active:scale-[0.98] ${
      active ? 'bg-[var(--accent-light)] text-[var(--accent)]' : 'text-[var(--foreground)] active:bg-[var(--background)]'
    }`;

  const sidebarContent = (
    <div className="md:hidden">
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className="mobile-sidebar fixed left-0 top-0 z-[101] flex h-full w-[min(100vw-3rem,280px)] max-w-[280px] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl"
        role="dialog"
        aria-label="Menú"
        aria-modal="true"
      >
        <div className="flex min-h-[56px] items-center justify-between border-b border-[var(--border)] px-4 pt-[env(safe-area-inset-top)]">
          <Link href="/" onClick={onClose} className="flex items-center gap-2 py-2">
            <Image src="/logo.png" alt={t('site.name')} width={100} height={30} className="h-7 w-auto object-contain" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            aria-label="Cerrar menú"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-3 py-4 pb-[env(safe-area-inset-bottom)]">
          <ul className="space-y-1">
            <li>
              <Link href="/" onClick={onClose} className={linkClass(pathname === '/')}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                {t('nav.home')}
              </Link>
            </li>

            <li className="pt-2">
              <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {t('nav.shop')}
              </p>
              <ul className="space-y-0.5">
                {SHOP_CATEGORIES.map(({ href, labelKey }) => {
                  const categorySlug = href.includes('category=') ? href.split('category=')[1]?.split('&')[0] || '' : '';
                  const isAll = href === '/tienda' && !categorySlug;
                  const active = isAll ? isShop && !currentCategory : isShop && currentCategory === categorySlug;
                  return (
                    <li key={href}>
                      <Link href={href} onClick={onClose} className={linkClass(!!active)}>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--accent)]">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </span>
                        {t(labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {navMain.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={onClose} className={linkClass(pathname === href)}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-4 h-px bg-[var(--border)]" />

          <ul className="space-y-1">
            <li>
              <Link href="/cuenta" onClick={onClose} className={linkClass(pathname === '/cuenta')}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                {t('nav.account')}
              </Link>
            </li>
            <li>
              <Link href="/deseos" onClick={onClose} className={linkClass(pathname === '/deseos')}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                {t('nav.wishlist')}
              </Link>
            </li>
          </ul>

          <div className="mt-auto space-y-2 pt-4">
            <div className="flex items-center justify-between rounded-xl bg-[var(--background)] px-4 py-3">
              <span className="text-sm font-medium text-[var(--foreground)]">Idioma</span>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="input-pro min-w-0 rounded-lg px-3 py-2 text-sm"
                aria-label="Idioma"
              >
                <option value="es">ES</option>
                <option value="ca">CA</option>
                <option value="en">EN</option>
              </select>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[var(--background)] px-4 py-3">
              <span className="text-sm font-medium text-[var(--foreground)]">Tema</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );

  if (!open) return null;

  if (typeof document === 'undefined') return null;
  return createPortal(sidebarContent, document.body);
}
