'use client';

import { useState } from 'react';
import { VariantSelector } from './VariantSelector';
import { QuantitySelector } from './QuantitySelector';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';

interface ProductInteractiveSectionProps {
  product: {
    id: string;
    name: string;
    price: string;
    images: { url: string }[];
    variants: { id: string; size: string | null; color: string | null; stock: number }[];
  };
}

export function ProductInteractiveSection({ product }: ProductInteractiveSectionProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  // Find stock for selected variant
  const selectedVariant = product.variants.find(
    (v: any) => v.size === selectedSize && v.color === selectedColor
  );
  const stock = selectedVariant ? selectedVariant.stock : 10; // Fallback stock

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="space-y-6">
      <VariantSelector
        variants={product.variants}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeChange={setSelectedSize}
        onColorChange={setSelectedColor}
      />

      <QuantitySelector quantity={quantity} max={stock} onChange={setQuantity} />

      <div className="text-sm text-[var(--color-text-muted)]">
        {stock < 5 ? (
          <span className="text-[var(--color-accent)] font-medium">Only {stock} left in stock!</span>
        ) : (
          <span>In Stock</span>
        )}
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] font-medium py-6 text-lg rounded-full shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-shadow"
      >
        Add to Cart
      </Button>
    </div>
  );
}
