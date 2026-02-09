'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useQuickViewStore } from '@/store/quickViewStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/toastStore';
import { useLocale } from '@/context/LocaleContext';
import StarRating from './StarRating';
import ProductBadges from './ProductBadges';
import { getProductRating } from '@/data/mockReviews';

export default function QuickViewModal() {
    const { product, isOpen, closeQuickView } = useQuickViewStore();
    const addToCart = useCartStore((s) => s.addItem);
    const toggleWishlist = useWishlistStore((s) => s.toggleItem);
    const isInWishlist = useWishlistStore((s) => s.items.some((item) => product && item.id === product.id));
    const addToast = useToastStore((s) => s.addToast);
    const { locale } = useLocale();
    const [quantity, setQuantity] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsExiting(false);
            setQuantity(1);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            closeQuickView();
            setIsExiting(false);
        }, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product.id, quantity, product);
        addToast(
            `✓ ${name} añadido al carrito`,
            'success',
            3000
        );
        handleClose();
    };

    if (!mounted || !isOpen || !product) return null;

    const name = product.name[locale as keyof typeof product.name] || product.name.es;
    const description = product.description[locale as keyof typeof product.description] || product.description.es;
    const price = product.priceOffer ?? product.price;
    const hasOffer = !!product.priceOffer;
    const imgSrc = product.images[0] || '/placeholder-product.svg';
    const rating = getProductRating(product.id);

    return createPortal(
        <div
            className={`
        fixed inset-0 z-[9998] flex items-center justify-center p-4
        transition-all duration-300
        ${isExiting ? 'opacity-0' : 'opacity-100'}
      `}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`
          relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl
          bg-[var(--surface)] shadow-2xl transition-all duration-300
          max-h-[90vh] overflow-y-auto
          ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white"
                    aria-label="Cerrar"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
                    {/* Image */}
                    <div className="relative">
                        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                            <ProductBadges product={product} />
                        </div>

                        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--background)]">
                            <Image
                                src={imgSrc}
                                alt={name}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">{product.brand}</p>
                            <h2 id="quick-view-title" className="mt-2 text-2xl font-bold text-[var(--foreground)] md:text-3xl">{name}</h2>

                            {rating && (
                                <div className="mt-3">
                                    <StarRating rating={rating.averageRating} readonly size="sm" showCount count={rating.totalReviews} />
                                </div>
                            )}

                            <div className="mt-4 flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-[var(--accent)]">{price.toFixed(2)} €</span>
                                {hasOffer && (
                                    <span className="text-lg text-[var(--muted)] line-through">{product.price.toFixed(2)} €</span>
                                )}
                            </div>

                            <p className="mt-4 leading-relaxed text-[var(--muted)]">{description}</p>

                            {product.stock > 0 ? (
                                <p className="mt-3 text-sm text-[var(--success)]">✓ En stock ({product.stock} disponibles)</p>
                            ) : (
                                <p className="mt-3 text-sm text-[var(--sale-red)]">Agotado</p>
                            )}
                        </div>

                        <div className="mt-auto pt-6">
                            {product.stock > 0 && (
                                <div className="mb-4 flex items-center gap-3">
                                    <label className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-[var(--foreground)]">Cantidad:</span>
                                        <input
                                            type="number"
                                            min={1}
                                            max={product.stock}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                            className="w-20 rounded-lg border border-[var(--border)] px-3 py-2 text-center focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                                        />
                                    </label>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Añadir al carrito
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleWishlist(product)}
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 transition ${isInWishlist
                                            ? 'border-red-500 bg-red-500 text-white'
                                            : 'border-[var(--border)] text-[var(--muted)] hover:border-red-500 hover:text-red-500'
                                        }`}
                                    aria-label={isInWishlist ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                                >
                                    <svg className="h-6 w-6" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                            <Link
                                href={`/producto/${product.slug}`}
                                className="mt-4 block text-center text-sm text-[var(--accent)] underline-offset-4 hover:underline"
                                onClick={handleClose}
                            >
                                Ver detalles completos →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
