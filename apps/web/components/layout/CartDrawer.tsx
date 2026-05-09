"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, itemCount, removeItem, updateQty } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-screen max-w-md bg-surface text-text-primary shadow-card border-l border-border flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <span className="text-text-muted text-sm">({itemCount})</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <ShoppingBag className="h-12 w-12 text-text-muted" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-text-secondary text-sm">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button variant="primary" onClick={onClose}>
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  /* Items List */
                  <div className="space-y-6">
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
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-4 border-t border-border space-y-4">
                  <div className="flex justify-between text-base font-medium">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-text-muted text-xs">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                      View Cart
                    </Button>
                    <Button variant="primary" className="flex-1">
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
