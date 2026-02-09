'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import StarRating from '@/components/StarRating';
import { getProductRating } from '@/data/mockReviews';

export default function FavoritosPage() {
    const { t, locale } = useLocale();
    const items = useWishlistStore((s) => s.items);
    const removeItem = useWishlistStore((s) => s.removeItem);
    const clearWishlist = useWishlistStore((s) => s.clearWishlist);
    const addToCart = useCartStore((s) => s.addItem);

    const handleAddAllToCart = () => {
        items.forEach((product) => {
            addToCart(product.id, 1, product);
        });
        clearWishlist();
    };

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
                <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
                        <li aria-hidden>/</li>
                        <li className="font-medium text-[var(--accent)]">Favoritos</li>
                    </ol>
                </nav>

                <div className="text-center">
                    <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[var(--accent-light)]">
                        <svg className="h-16 w-16 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">Tu lista de favoritos está vacía</h1>
                    <p className="mt-3 text-lg text-[var(--muted)]">Guarda productos que te gusten para verlos más tarde</p>
                    <Link
                        href="/tienda"
                        className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)]"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Explorar productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
            <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
                    <li aria-hidden>/</li>
                    <li className="font-medium text-[var(--accent)]">Favoritos</li>
                </ol>
            </nav>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">Mis Favoritos</h1>
                    <p className="mt-1 text-sm text-[var(--muted)]">{items.length} producto{items.length !== 1 ? 's' : ''} guardado{items.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleAddAllToCart}
                        className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
                    >
                        Añadir todo al carrito
                    </button>
                    <button
                        type="button"
                        onClick={clearWishlist}
                        className="rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--background)]"
                    >
                        Limpiar lista
                    </button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((product) => {
                    const name = product.name[locale as keyof typeof product.name] || product.name.es;
                    const price = (product.priceOffer ?? product.price).toFixed(2);
                    const imgSrc = product.images[0] || '/placeholder-product.svg';
                    const rating = getProductRating(product.id);

                    return (
                        <div key={product.id} className="card group relative overflow-hidden p-0">
                            <Link href={`/producto/${product.slug}`} className="block">
                                <div className="relative aspect-square overflow-hidden bg-[var(--background)]">
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        fill
                                        className="object-cover transition duration-500 ease-out group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                            </Link>

                            <button
                                type="button"
                                onClick={() => removeItem(product.id)}
                                className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)]/90 text-red-500 shadow-lg backdrop-blur-sm transition hover:bg-[var(--surface)] hover:scale-110"
                                aria-label="Eliminar de favoritos"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                                </svg>
                            </button>

                            <div className="p-4">
                                <Link href={`/producto/${product.slug}`}>
                                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{product.brand}</p>
                                    <h2 className="mt-1 line-clamp-2 font-semibold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                                        {name}
                                    </h2>
                                </Link>

                                {rating && (
                                    <div className="mt-2">
                                        <StarRating rating={rating.averageRating} readonly size="sm" showCount count={rating.totalReviews} />
                                    </div>
                                )}

                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-[var(--accent)]">{price} €</span>
                                    {product.priceOffer != null && (
                                        <span className="text-sm text-[var(--muted)] line-through">{product.price.toFixed(2)} €</span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        addToCart(product.id, 1, product);
                                        removeItem(product.id);
                                    }}
                                    className="mt-4 w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
