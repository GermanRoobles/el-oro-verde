import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, product?: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, quantity = 1, product) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          const newItems = existing
            ? state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity, product: product ?? i.product }
                  : i
              )
            : [...state.items, { productId, quantity, product }];
          return { items: newItems };
        });
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => {
          const p = i.product;
          const price = p ? (p.priceOffer ?? p.price) : 0;
          return acc + price * i.quantity;
        }, 0),
      getItems: () => get().items,
    }),
    { name: 'eloroverde-cart' }
  )
);
