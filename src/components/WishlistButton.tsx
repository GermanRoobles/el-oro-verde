'use client';

import { useWishlistStore } from '@/store/wishlistStore';

interface WishlistButtonProps {
  productId: string;
  product?: { id: string };
  className?: string;
  size?: 'sm' | 'md';
}

export default function WishlistButton({ productId, product, className = '', size = 'md' }: WishlistButtonProps) {
  const { has, toggle } = useWishlistStore();
  const isInWishlist = has(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId, product as any);
  };

  const sizeClass = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${sizeClass} ${className}`}
      aria-label={isInWishlist ? 'Quitar de deseos' : 'Añadir a deseos'}
    >
      {isInWishlist ? (
        <svg className="h-5 w-5 fill-[var(--accent)] text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  );
}
