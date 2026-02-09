'use client';

import FilterSection from './FilterSection';
import CategoryButton from './CategoryButton';
import PriceRangeSlider from './PriceRangeSlider';

interface FilterSidebarProps {
    // Category
    categoryId: string;
    onCategoryChange: (category: string) => void;
    categoryCounts?: Record<string, number>;

    // Price
    priceRange: [number, number];
    onPriceChange: (range: [number, number]) => void;

    // Brand
    brand: string;
    onBrandChange: (brand: string) => void;
    brands: string[];

    // Features
    showOnSale: boolean;
    showNew: boolean;
    showInStock: boolean;
    onFeatureChange: (feature: 'sale' | 'new' | 'stock', value: boolean) => void;

    // Clear all
    onClearAll: () => void;
    hasActiveFilters: boolean;
}

export default function FilterSidebar({
    categoryId,
    onCategoryChange,
    categoryCounts = {},
    priceRange,
    onPriceChange,
    brand,
    onBrandChange,
    brands,
    showOnSale,
    showNew,
    showInStock,
    onFeatureChange,
    onClearAll,
    hasActiveFilters,
}: FilterSidebarProps) {
    const categories = [
        { id: '', label: 'Todas', icon: '⭐', color: 'default' as const },
        { id: 'cultivo', label: 'Cultivo', icon: '🌱', color: 'default' as const },
        { id: 'cbd', label: 'CBD', icon: '💊', color: 'default' as const },
        { id: 'parafernalia', label: 'Parafernalia', icon: '🔧', color: 'default' as const },
        { id: 'accesorios', label: 'Accesorios', icon: '📦', color: 'default' as const },
    ];

    return (
        <aside className="sticky top-20 h-fit space-y-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Filtros
                </h2>
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        className="text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {/* Categories */}
            <FilterSection title="Categorías" icon="📂">
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <CategoryButton
                            key={cat.id}
                            icon={cat.icon}
                            color={cat.color}
                            active={categoryId === cat.id}
                            count={categoryCounts[cat.id]}
                            onClick={() => onCategoryChange(cat.id)}
                        >
                            {cat.label}
                        </CategoryButton>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Rango de Precio" icon="💰">
                <PriceRangeSlider
                    min={0}
                    max={200}
                    value={priceRange}
                    onChange={onPriceChange}
                    step={5}
                />
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Marca" icon="🏷️">
                <select
                    value={brand}
                    onChange={(e) => onBrandChange(e.target.value)}
                    className="input-pro w-full rounded-lg px-3 py-2.5 text-sm"
                >
                    <option value="">Todas las marcas</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </FilterSection>

            {/* Features */}
            <FilterSection title="Características" icon="✨">
                <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm transition hover:border-[var(--accent)]/50">
                        <input
                            type="checkbox"
                            checked={showOnSale}
                            onChange={(e) => onFeatureChange('sale', e.target.checked)}
                            className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                        <span className="flex-1 text-[var(--foreground)]">En oferta</span>
                        <span className="text-xs text-[var(--sale-red)]">🔥</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm transition hover:border-[var(--accent)]/50">
                        <input
                            type="checkbox"
                            checked={showNew}
                            onChange={(e) => onFeatureChange('new', e.target.checked)}
                            className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                        <span className="flex-1 text-[var(--foreground)]">Nuevos</span>
                        <span className="text-xs text-[var(--new-gold)]">⭐</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm transition hover:border-[var(--accent)]/50">
                        <input
                            type="checkbox"
                            checked={showInStock}
                            onChange={(e) => onFeatureChange('stock', e.target.checked)}
                            className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                        <span className="flex-1 text-[var(--foreground)]">En stock</span>
                        <span className="text-xs text-[var(--success-green)]">✓</span>
                    </label>
                </div>
            </FilterSection>
        </aside>
    );
}
