import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistStore {
  productIds: string[];
  items: Product[];
  add: (productId: string, product?: Product) => void;
  remove: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggle: (productId: string, product?: Product) => void;
  toggleItem: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      items: [],
      add: (productId, product) => {
        set((state) => {
          if (state.productIds.includes(productId)) return state;
          return {
            productIds: [...state.productIds, productId],
            items: product
              ? [...state.items.filter((p) => p.id !== productId), product]
              : state.items,
          };
        });
      },
      remove: (productId) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
          items: state.items.filter((p) => p.id !== productId),
        }));
      },
      removeItem: (productId) => {
        get().remove(productId);
      },
      toggle: (productId, product) => {
        get().has(productId) ? get().remove(productId) : get().add(productId, product);
      },
      toggleItem: (product) => {
        get().toggle(product.id, product);
      },
      has: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [], items: [] }),
      clearWishlist: () => {
        get().clear();
      },
    }),
    { name: 'eloroverde-wishlist' }
  )
);
