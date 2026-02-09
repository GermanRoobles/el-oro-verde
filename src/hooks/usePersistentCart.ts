'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export function usePersistentCart() {
    const cart = useCartStore();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const { items } = JSON.parse(savedCart);
                if (Array.isArray(items) && items.length > 0) {
                    // Restore cart items
                    items.forEach((item: any) => {
                        if (item.product && item.quantity) {
                            cart.addItem(item.product.id, item.quantity, item.product);
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        const cartData = {
            items: cart.items,
            timestamp: Date.now(),
        };
        localStorage.setItem('cart', JSON.stringify(cartData));
    }, [cart.items]);
}
