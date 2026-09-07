import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

export type CartItem = {
  lineId: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, variant: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, variant) =>
        set((state) => {
          const lineId = `${product.id}-${variant.toLowerCase().replaceAll(' ', '-')}`;
          const existing = state.items.find((item) => item.lineId === lineId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.lineId === lineId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                lineId,
                productId: product.id,
                name: product.name,
                variant,
                price: product.price,
                image: product.image,
                quantity: 1,
              },
            ],
          };
        }),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.lineId !== lineId)
              : state.items.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)),
        })),
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((item) => item.lineId !== lineId) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'yotesurto-cart' },
  ),
);