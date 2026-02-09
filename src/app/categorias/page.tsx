'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import type { Category } from '@/types';
import type { Locale } from '@/types';

// Category icons mapping
const categoryIcons: Record<string, string> = {
  cultivo: '🌱',
  cbd: '🍃',
  parafernalia: '💨',
  accesorios: '🔧',
  semillas: '🌿',
};

export default function CategoriasPage() {
  const { t, locale } = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/products').then((r) => (r.ok ? r.json() : [])),
    ]).then(([cats, products]) => {
      setCategories(Array.isArray(cats) ? cats : []);

      // Count products per category
      const counts: Record<string, number> = {};
      if (Array.isArray(products)) {
        products.forEach((p: any) => {
          if (p.category) {
            counts[p.category] = (counts[p.category] || 0) + 1;
          }
        });
      }
      setProductCounts(counts);
    }).catch(() => {
      setCategories([]);
      setProductCounts({});
    });
  }, []);

  const name = (c: Category) => c.name[locale as keyof typeof c.name] || c.name.es;
  const desc = (c: Category) => c.description[locale as keyof typeof c.description] || c.description.es;
  const icon = (c: Category) => categoryIcons[c.id] || '📦';
  const count = (c: Category) => productCounts[c.id] || 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('nav.categories')}</li>
        </ol>
      </nav>
      <h1 className="section-title mb-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('nav.categories')}</h1>
      <p className="mb-8 max-w-2xl text-[var(--muted)]">{t('categories.intro')}</p>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            href={`/tienda?category=${c.id}`}
            className={`card group relative block overflow-hidden p-0 opacity-0 transition hover:scale-[1.02] hover:shadow-xl animate-fade-in-up ${i < 4 ? `stagger-${i + 1}` : ''}`}
            style={i >= 4 ? { animationDelay: `${0.25 + 0.05 * (i - 4)}s` } : undefined}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-light)] to-transparent opacity-40 transition-opacity group-hover:opacity-60" />

            {/* Content */}
            <div className="relative p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-light)] text-4xl transition-transform group-hover:scale-110">
                {icon(c)}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                {name(c)}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{desc(c)}</p>
              {count(c) > 0 && (
                <p className="mt-3 text-xs font-medium text-[var(--accent)]">
                  {count(c)} {count(c) === 1 ? 'producto' : 'productos'}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
