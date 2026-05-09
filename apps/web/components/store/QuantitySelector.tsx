'use client';

import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, max, onChange }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Quantity</h4>
      <div className="flex items-center border border-[var(--color-border)] rounded-md w-fit bg-[var(--color-surface)]">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-50 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-4 text-sm font-medium text-[var(--color-text)] min-w-[40px] text-center">
          {quantity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
