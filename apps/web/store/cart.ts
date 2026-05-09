import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  product: {
    name: string;
    price: string;
    images: { url: string }[];
  };
  variant?: {
    size?: string;
    color?: string;
  };
}

interface CartStore {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: any, variant: any, qty: number) => void;
  removeItem: (itemId: string) => void;
  updateQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  syncWithServer: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (product, variant, qty) => {
        const items = get().items;
        const existingItem = items.find(
          (i) => i.productId === product.id && i.variantId === variant?.id
        );

        let newItems;
        if (existingItem) {
          newItems = items.map((i) =>
            i.id === existingItem.id ? { ...i, quantity: i.quantity + qty } : i
          );
        } else {
          newItems = [
            ...items,
            {
              id: Math.random().toString(36).substring(7),
              productId: product.id,
              variantId: variant?.id,
              quantity: qty,
              product: {
                name: product.name,
                price: product.price,
                images: product.images,
              },
              variant: variant,
            },
          ];
        }

        const itemCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const total = newItems.reduce((acc, item) => acc + parseFloat(item.product.price) * item.quantity, 0);

        set({ items: newItems, itemCount, total });
      },

      removeItem: (itemId) => {
        const items = get().items.filter((i) => i.id !== itemId);
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        const total = items.reduce((acc, item) => acc + parseFloat(item.product.price) * item.quantity, 0);

        set({ items, itemCount, total });
      },

      updateQty: (itemId, qty) => {
        const items = get().items.map((i) =>
          i.id === itemId ? { ...i, quantity: qty } : i
        );
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        const total = items.reduce((acc, item) => acc + parseFloat(item.product.price) * item.quantity, 0);

        set({ items, itemCount, total });
      },

      clearCart: () => set({ items: [], itemCount: 0, total: 0 }),

      syncWithServer: async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/cart`);
          if (res.ok) {
            const json = await res.json();
            const serverItems = json.data.items;
            const itemCount = serverItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
            const total = serverItems.reduce((acc: number, item: any) => acc + parseFloat(item.product.price) * item.quantity, 0);
            set({ items: serverItems, itemCount, total });
          }
        } catch (error) {
          console.error('Failed to sync cart with server', error);
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
