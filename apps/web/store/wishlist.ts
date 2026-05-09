import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: string;
  images: { url: string }[];
  category: { name: string };
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  syncWithServer: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => ({ items: [...state.items, product] }));
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== productId) }));
      },

      hasItem: (productId) => get().items.some((item) => item.id === productId),

      syncWithServer: async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/wishlist`);
          if (res.ok) {
            const json = await res.json();
            const serverItems = json.data.map((item: any) => ({
              id: item.product.id,
              name: item.product.name,
              slug: item.product.slug,
              price: item.product.price,
              images: item.product.images,
              category: item.product.category,
            }));
            set({ items: serverItems });
          }
        } catch (error) {
          console.error('Failed to sync wishlist with server', error);
        }
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
