'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import Badge from '@/components/ui/Badge';
import type { Product } from '@/types';
import type { Locale } from '@/types';

const DEBOUNCE_MS = 200;
const MIN_CHARS = 2;
const LIMIT = 6;
const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT = 5;

interface CategorySuggestion {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

const CATEGORY_SUGGESTIONS: CategorySuggestion[] = [
  { id: 'cultivo', name: 'Cultivo', icon: '🌿' },
  { id: 'cbd', name: 'CBD', icon: '💎' },
  { id: 'parafernalia', name: 'Parafernalia', icon: '🔥' },
  { id: 'accesorios', name: 'Accesorios', icon: '🎒' },
];

export default function SearchAutocomplete() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent searches:', e);
    }
  }, []);

  // Save search to recent searches
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < MIN_CHARS) return;

    try {
      setRecentSearches((prev) => {
        const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to save recent search:', e);
    }
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (e) {
      console.error('Failed to clear recent searches:', e);
    }
  }, []);

  const search = useCallback(
    (q: string) => {
      if (q.length < MIN_CHARS) {
        setResults([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      fetch(`/api/products?search=${encodeURIComponent(q)}&limit=${LIMIT}&locale=${locale}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((data: Product[]) => {
          setResults(Array.isArray(data) ? data : []);
          setOpen(true);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    },
    [locale]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => search(query.trim()), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const name = (p: Product) => p.name[locale as keyof typeof p.name] || p.name.es;
  const imgSrc = (p: Product) => p.images[0] || '/placeholder-product.svg';

  // Filter categories based on query
  const filteredCategories = query.length >= MIN_CHARS
    ? CATEGORY_SUGGESTIONS.filter((cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  // Show recent searches when input is focused but empty
  const showRecentSearches = open && query.length === 0 && recentSearches.length > 0;
  const showCategories = open && query.length >= MIN_CHARS && filteredCategories.length > 0;
  const showProducts = open && query.length >= MIN_CHARS;

  return (
    <div ref={containerRef} className="search-bar-enhanced relative hidden w-full max-w-[220px] md:block md:max-w-none">
      <label className="sr-only" htmlFor="header-search">
        {t('shop.search')}
      </label>
      <input
        id="header-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder={t('shop.search')}
        className="input-pro w-full rounded-lg px-4 py-2 pr-10 text-sm"
        autoComplete="off"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>

      {open && (showRecentSearches || showCategories || showProducts) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[420px] overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
          {/* Recent Searches */}
          {showRecentSearches && (
            <div className="border-b border-[var(--border)] py-2">
              <div className="flex items-center justify-between px-4 py-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Búsquedas recientes
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs font-medium text-[var(--accent)] transition hover:underline"
                >
                  Limpiar
                </button>
              </div>
              {recentSearches.map((recentQuery, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(recentQuery);
                    search(recentQuery);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[var(--accent-light)]"
                >
                  <svg className="h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-[var(--foreground)]">{recentQuery}</span>
                </button>
              ))}
            </div>
          )}

          {/* Category Suggestions */}
          {showCategories && (
            <div className="border-b border-[var(--border)] py-2">
              <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Categorías
              </h3>
              {filteredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/tienda?category=${cat.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[var(--accent-light)]"
                  onClick={() => {
                    saveRecentSearch(query);
                    setOpen(false);
                  }}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">{cat.name}</span>
                  {cat.count && (
                    <span className="ml-auto text-xs text-[var(--muted)]">({cat.count})</span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Product Results */}
          {showProducts && (
            <div className="py-2">
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <div className="h-6 w-6 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
                </div>
              ) : results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-[var(--muted)]">{t('search.noResults')}</p>
              ) : (
                <>
                  <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Productos
                  </h3>
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/producto/${p.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[var(--accent-light)]"
                      onClick={() => {
                        saveRecentSearch(query);
                        setOpen(false);
                      }}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--background)]">
                        <Image src={imgSrc(p)} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[var(--foreground)]">{name(p)}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--accent)]">
                            {(p.priceOffer ?? p.price).toFixed(2)} €
                          </span>
                          {p.priceOffer != null && (
                            <span className="text-xs text-[var(--muted)] line-through">
                              {p.price.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </div>
                      {p.new && <Badge variant="new" size="sm">NUEVO</Badge>}
                      {p.priceOffer != null && (
                        <Badge variant="sale" size="sm">
                          -{Math.round(((p.price - p.priceOffer) / p.price) * 100)}%
                        </Badge>
                      )}
                    </Link>
                  ))}
                  <Link
                    href={`/tienda?q=${encodeURIComponent(query)}`}
                    className="block border-t border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-light)]"
                    onClick={() => {
                      saveRecentSearch(query);
                      setOpen(false);
                    }}
                  >
                    {t('search.viewAll')} →
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
