'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocale } from '@/context/LocaleContext';
import ProductBadges from '@/components/ProductBadges';
import WishlistButton from '@/components/WishlistButton';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import FilterChips from '@/components/FilterChips';
import FilterSidebar from '@/components/FilterSidebar';
import StarRating from '@/components/StarRating';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useQuickViewStore } from '@/store/quickViewStore';
import type { Product } from '@/types';
import type { Locale } from '@/types';

type SortOption = '' | 'priceAsc' | 'priceDesc' | 'newest';
type PriceFilter = '' | 'under25' | '25to50' | '50to100' | 'over100';

const CATEGORY_OPTIONS = [
  { value: '', labelKey: 'shop.category.all' as const },
  { value: 'cultivo', labelKey: 'shop.category.cultivo' as const },
  { value: 'cbd', labelKey: 'shop.category.cbd' as const },
  { value: 'parafernalia', labelKey: 'shop.category.parafernalia' as const },
  { value: 'accesorios', labelKey: 'shop.category.accesorios' as const },
];

const PRICE_OPTIONS: { value: PriceFilter; labelKey: 'shop.price.any' | 'shop.price.under25' | 'shop.price.25to50' | 'shop.price.50to100' | 'shop.price.over100' }[] = [
  { value: '', labelKey: 'shop.price.any' },
  { value: 'under25', labelKey: 'shop.price.under25' },
  { value: '25to50', labelKey: 'shop.price.25to50' },
  { value: '50to100', labelKey: 'shop.price.50to100' },
  { value: 'over100', labelKey: 'shop.price.over100' },
];

function matchesPrice(p: Product, priceRange: PriceFilter): boolean {
  const price = p.priceOffer ?? p.price;
  switch (priceRange) {
    case 'under25': return price < 25;
    case '25to50': return price >= 25 && price <= 50;
    case '50to100': return price > 50 && price <= 100;
    case 'over100': return price > 100;
    default: return true;
  }
}

export default function TiendaPage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceRange, setPriceRange] = useState<PriceFilter>('');
  const [customPriceRange, setCustomPriceRange] = useState<[number, number]>([0, 200]);
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState<SortOption>('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  // Sincronizar estado desde la URL al cargar o al navegar (p. ej. clic en chip)
  useEffect(() => {
    setSearch(searchParams.get('q') || '');
    setCategoryId(searchParams.get('category') || '');
    setPriceRange((searchParams.get('price') as PriceFilter) || '');
    setBrand(searchParams.get('brand') || '');
  }, [searchParams]);

  const updateUrl = useCallback(
    (updates: { category?: string; q?: string; price?: string; brand?: string }) => {
      const next = new URLSearchParams(searchParams.toString());
      if (updates.category !== undefined) (updates.category ? next.set('category', updates.category) : next.delete('category'));
      if (updates.q !== undefined) (updates.q ? next.set('q', updates.q) : next.delete('q'));
      if (updates.price !== undefined) (updates.price ? next.set('price', updates.price) : next.delete('price'));
      if (updates.brand !== undefined) (updates.brand ? next.set('brand', updates.brand) : next.delete('brand'));
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (categoryId) params.set('categoryId', categoryId);
    params.set('locale', locale);
    setLoading(true);
    setError(null);
    fetch(`/api/products?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 500 ? 'Error al cargar productos' : String(r.status));
        return r.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Error de conexión');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [search, categoryId, locale]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = products;

    // Price filters
    if (priceRange) {
      list = list.filter((p) => matchesPrice(p, priceRange));
    } else {
      // Custom price range
      list = list.filter((p) => {
        const price = p.priceOffer ?? p.price;
        return price >= customPriceRange[0] && price <= customPriceRange[1];
      });
    }

    // Brand filter
    if (brand) list = list.filter((p) => p.brand === brand);

    // Feature filters
    if (showOnSale) list = list.filter((p) => p.priceOffer != null);
    if (showNew) list = list.filter((p) => p.new === true);
    if (showInStock) list = list.filter((p) => p.stock > 0);

    return list;
  }, [products, priceRange, customPriceRange, brand, showOnSale, showNew, showInStock]);

  const sortedProducts = useMemo(() => {
    let list = [...filteredProducts];
    if (sort === 'priceAsc') return list.sort((a, b) => (a.priceOffer ?? a.price) - (b.priceOffer ?? b.price));
    if (sort === 'priceDesc') return list.sort((a, b) => (b.priceOffer ?? b.price) - (a.priceOffer ?? a.price));
    if (sort === 'newest') return list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    return list;
  }, [filteredProducts, sort]);

  const hasActiveFilters = Boolean(categoryId || priceRange || brand || showOnSale || showNew || showInStock);

  const clearFilters = () => {
    setCategoryId('');
    setPriceRange('');
    setBrand('');
    setShowOnSale(false);
    setShowNew(false);
    setShowInStock(false);
    setCustomPriceRange([0, 200]);
    updateUrl({ category: '', price: '', brand: '' });
  };

  // Build filter chips
  const filterChips = useMemo(() => {
    const chips: Array<{ id: string; label: string; value: string; onRemove: () => void }> = [];

    if (categoryId) {
      const cat = CATEGORY_OPTIONS.find((c) => c.value === categoryId);
      chips.push({
        id: 'category',
        label: 'Categoría',
        value: cat ? t(cat.labelKey) : categoryId,
        onRemove: () => handleCategoryChange(''),
      });
    }

    if (priceRange) {
      const price = PRICE_OPTIONS.find((p) => p.value === priceRange);
      chips.push({
        id: 'price',
        label: 'Precio',
        value: price ? t(price.labelKey) : priceRange,
        onRemove: () => handlePriceChange(''),
      });
    }

    if (brand) {
      chips.push({
        id: 'brand',
        label: 'Marca',
        value: brand,
        onRemove: () => handleBrandChange(''),
      });
    }

    if (showOnSale) {
      chips.push({
        id: 'sale',
        label: 'Filtro',
        value: 'En oferta',
        onRemove: () => setShowOnSale(false),
      });
    }

    if (showNew) {
      chips.push({
        id: 'new',
        label: 'Filtro',
        value: 'Nuevos',
        onRemove: () => setShowNew(false),
      });
    }

    if (showInStock) {
      chips.push({
        id: 'stock',
        label: 'Filtro',
        value: 'En stock',
        onRemove: () => setShowInStock(false),
      });
    }

    return chips;
  }, [categoryId, priceRange, brand, showOnSale, showNew, showInStock, t]);

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    updateUrl({ category: value || undefined });
  };
  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateUrl({ q: value || undefined });
  };
  const handlePriceChange = (value: PriceFilter) => {
    setPriceRange(value);
    updateUrl({ price: value || undefined });
  };
  const handleBrandChange = (value: string) => {
    setBrand(value);
    updateUrl({ brand: value || undefined });
  };

  const name = (p: Product) => p.name[locale as keyof typeof p.name] || p.name.es;
  const price = (p: Product) => (p.priceOffer ?? p.price).toFixed(2);
  const imgSrc = (p: Product) => p.images[0] || '/placeholder-product.svg';

  return (
    <div className="mobile-container mx-auto min-h-screen max-w-6xl px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      <nav className="animate-fade-in mb-4 text-sm text-[var(--muted)] opacity-0 sm:mb-6" style={{ animationFillMode: 'forwards' }} aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-[var(--accent)] font-medium">{t('shop.all')}</li>
        </ol>
      </nav>

      <h1 className="section-title animate-fade-in mb-2 text-2xl font-bold tracking-tight text-[var(--foreground)] opacity-0 sm:mb-3 sm:text-3xl" style={{ animationFillMode: 'forwards' }}>
        {t('shop.all')}
      </h1>
      <p className="animate-fade-in mb-4 max-w-2xl text-sm text-[var(--muted)] opacity-0 sm:text-base" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
        {t('shop.intro')}
      </p>
      <div className="animate-fade-in mb-4 flex flex-wrap gap-2 opacity-0 sm:mb-6 sm:gap-3" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <Link
          href="/tienda?category=cultivo"
          className={`rounded-xl border px-3 py-2 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${categoryId === 'cultivo' ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' : 'border-[var(--accent)]/30 bg-[var(--accent-light)]/50 text-[var(--accent)] hover:bg-[var(--accent-light)]'}`}
        >
          Cultivo
        </Link>
        <Link
          href="/tienda?category=cbd"
          className={`rounded-xl border px-3 py-2 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${categoryId === 'cbd' ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' : 'border-[var(--accent)]/30 bg-[var(--accent-light)]/50 text-[var(--accent)] hover:bg-[var(--accent-light)]'}`}
        >
          CBD
        </Link>
        <Link
          href="/tienda?category=parafernalia"
          className={`rounded-xl border px-3 py-2 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${categoryId === 'parafernalia' ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' : 'border-[var(--accent)]/30 bg-[var(--accent-light)]/50 text-[var(--accent)] hover:bg-[var(--accent-light)]'}`}
        >
          Parafernalia
        </Link>
        <Link
          href="/contacto"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)] sm:px-4 sm:py-2 sm:text-sm"
        >
          ¿Necesitas ayuda?
        </Link>
      </div>

      {/* 2-Column Layout: Sidebar + Content */}
      <div className="flex gap-6 lg:gap-8">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block lg:w-64 xl:w-72">
          <FilterSidebar
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            priceRange={customPriceRange}
            onPriceChange={setCustomPriceRange}
            brand={brand}
            onBrandChange={handleBrandChange}
            brands={brands}
            showOnSale={showOnSale}
            showNew={showNew}
            showInStock={showInStock}
            onFeatureChange={(feature, value) => {
              if (feature === 'sale') setShowOnSale(value);
              else if (feature === 'new') setShowNew(value);
              else if (feature === 'stock') setShowInStock(value);
            }}
            onClearAll={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Mobile Filter Button */}
          <div className="mb-4 flex items-center gap-3 lg:hidden">
            <input
              type="search"
              placeholder={t('shop.search')}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input-pro flex-1 rounded-xl px-4 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  {filterChips.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Chips */}
          {filterChips.length > 0 && (
            <div className="mb-4">
              <FilterChips filters={filterChips} onClearAll={clearFilters} />
            </div>
          )}

          {/* Results Counter and Sort */}
          <div className="mb-4 flex items-center justify-between gap-4">
            {!loading && (
              <p className="text-sm text-[var(--muted)]">
                Mostrando <span className="font-semibold text-[var(--foreground)]">{sortedProducts.length}</span> de{' '}
                <span className="font-semibold text-[var(--foreground)]">{products.length}</span> productos
              </p>
            )}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-pro min-w-[140px] rounded-lg px-3 py-2.5 text-sm"
              aria-label={t('shop.sortBy')}
            >
              <option value="">{t('shop.sortBy')}</option>
              <option value="newest">{t('shop.sort.newest')}</option>
              <option value="priceAsc">{t('shop.sort.priceAsc')}</option>
              <option value="priceDesc">{t('shop.sort.priceDesc')}</option>
            </select>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-50 p-6 text-center dark:bg-red-950/20">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <p className="text-[var(--muted)]">No se encontraron productos</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 transition hover:underline"
                >
                  {t('shop.clearFilters')}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sortedProducts.map((p, i) => {
                const mockRating = 4 + Math.random();
                const mockReviewCount = Math.floor(Math.random() * 50) + 5;

                const handleAddToCart = (e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  useCartStore.getState().addItem(p.id, 1, p);
                  // Show success toast
                  useToastStore.getState().addToast(
                    `✓ ${name(p)} añadido al carrito`,
                    'success',
                    3000
                  );
                };

                return (
                  <div
                    key={p.id}
                    className="card group relative animate-fade-in-up overflow-hidden p-0 opacity-0 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
                  >
                    <Link href={`/producto/${p.slug}`} className="block">
                      <div className="relative aspect-square overflow-hidden bg-[var(--background)]">
                        <Image
                          src={imgSrc(p)}
                          alt={name(p)}
                          fill
                          className="object-cover transition duration-500 ease-out group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw, 25vw"
                        />

                        {/* Badges - Top Left */}
                        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5">
                          {p.priceOffer != null && (
                            <Badge variant="sale" size="md">
                              -{Math.round(((p.price - p.priceOffer) / p.price) * 100)}%
                            </Badge>
                          )}
                          {p.new && (
                            <Badge variant="new" size="md">
                              NUEVO
                            </Badge>
                          )}
                          {p.featured && (
                            <Badge variant="featured" size="sm">
                              DESTACADO
                            </Badge>
                          )}
                        </div>

                        {/* Wishlist Button - Top Right */}
                        <div className="absolute right-2 top-2 z-10" onClick={(e) => e.preventDefault()}>
                          <WishlistButton productId={p.id} />
                        </div>

                        {/* Quick View Icon - Center on Hover */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              useQuickViewStore.getState().openQuickView(p);
                            }}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-lg transition hover:scale-110 hover:bg-white"
                            aria-label="Vista rápida"
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="flex flex-col p-3 sm:p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">{p.brand}</p>
                      <Link href={`/producto/${p.slug}`}>
                        <h2 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent)] sm:text-base">
                          {name(p)}
                        </h2>
                      </Link>

                      {/* Star Rating */}
                      <div className="mt-2">
                        <StarRating rating={mockRating} readonly size="sm" showCount count={mockReviewCount} />
                      </div>

                      {/* Price */}
                      <div className="mt-2 flex items-baseline gap-2 sm:mt-3">
                        <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent)] sm:text-2xl">
                          {price(p)} €
                        </span>
                        {p.priceOffer != null && (
                          <span className="text-sm text-[var(--muted)] line-through">{p.price.toFixed(2)} €</span>
                        )}
                      </div>

                      {/* Stock Info */}
                      {p.stock > 0 ? (
                        <p className="mt-1 text-xs text-[var(--success)]">
                          ✓ En stock ({p.stock} unidades)
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-[var(--sale-accent)]">Agotado</p>
                      )}

                      {/* Add to Cart Button */}
                      <div className="mt-3 sm:mt-4">
                        <Button
                          variant="action"
                          size="md"
                          fullWidth
                          onClick={handleAddToCart}
                          disabled={p.stock === 0}
                        >
                          <svg
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Añadir al Carrito
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[var(--surface)] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--foreground)]">
                Filtros
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--background)] text-[var(--foreground)] transition hover:bg-[var(--border)]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <FilterSidebar
              categoryId={categoryId}
              onCategoryChange={(cat) => {
                handleCategoryChange(cat);
                setMobileFiltersOpen(false);
              }}
              priceRange={customPriceRange}
              onPriceChange={setCustomPriceRange}
              brand={brand}
              onBrandChange={handleBrandChange}
              brands={brands}
              showOnSale={showOnSale}
              showNew={showNew}
              showInStock={showInStock}
              onFeatureChange={(feature, value) => {
                if (feature === 'sale') setShowOnSale(value);
                else if (feature === 'new') setShowNew(value);
                else if (feature === 'stock') setShowInStock(value);
              }}
              onClearAll={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              hasActiveFilters={hasActiveFilters}
            />

            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setMobileFiltersOpen(false)}
              >
                Ver {sortedProducts.length} productos
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
