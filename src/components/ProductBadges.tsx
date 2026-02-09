'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Product } from '@/types';

const LOW_STOCK_THRESHOLD = 5;

interface ProductBadgesProps {
  product: Product;
  className?: string;
}

export default function ProductBadges({ product, className = '' }: ProductBadgesProps) {
  const { t } = useLocale();
  const hasOffer = product.priceOffer != null;
  const isNew = product.new;
  const lowStock = product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD;
  const outOfStock = product.stock <= 0;

  if (!hasOffer && !isNew && !lowStock && !outOfStock) return null;

  return (
    <div className={`absolute left-2 top-2 right-2 flex flex-wrap justify-between gap-1 sm:left-3 sm:top-3 sm:right-3 ${className}`}>
      <div className="flex flex-wrap gap-1">
        {hasOffer && (
          <span className="badge-offer rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow sm:px-2.5 sm:py-1 sm:text-xs">
            {t('shop.offer')}
          </span>
        )}
        {isNew && (
          <span className="badge-new rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow sm:px-2.5 sm:py-1 sm:text-xs">
            {t('shop.new')}
          </span>
        )}
        {lowStock && (
          <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow sm:px-2.5 sm:py-1 sm:text-xs">
            {t('shop.lowStock')}
          </span>
        )}
      </div>
      {outOfStock && (
        <span className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:px-2.5 sm:py-1 sm:text-xs">
          {t('shop.outOfStock')}
        </span>
      )}
    </div>
  );
}
