"use client";

import * as React from "react";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import Link from "next/link";

export function CartReview() {
  const { items, total, removeItem, updateQty } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <ShoppingBag className="h-12 w-12 text-text-muted" />
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="text-text-secondary text-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/shop">
          <Button variant="primary">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Bag Review</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0">
            <div className="w-20 h-24 bg-surface-2 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={item.product.images[0]?.url || 'https://via.placeholder.com/100'}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-medium text-text-primary text-sm">{item.product.name}</h4>
                <p className="text-xs text-text-secondary">
                  {item.variant?.size && `Size: ${item.variant.size}`}
                  {item.variant?.color && ` | Color: ${item.variant.color}`}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 text-text-muted hover:text-text-primary"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-2 text-xs font-medium text-text-primary">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="p-1 text-text-muted hover:text-text-primary"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="text-sm font-medium text-primary">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-text-muted hover:text-accent"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 flex justify-between items-center">
        <span className="font-medium">Subtotal</span>
        <span className="font-semibold text-lg text-primary">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
