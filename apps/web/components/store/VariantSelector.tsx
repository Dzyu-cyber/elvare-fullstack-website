'use client';

interface VariantSelectorProps {
  variants: { size: string | null; color: string | null; stock: number }[];
  selectedSize: string | null;
  selectedColor: string | null;
  onSizeChange: (size: string | null) => void;
  onColorChange: (color: string | null) => void;
}

export function VariantSelector({
  variants,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: VariantSelectorProps) {
  // Extract unique sizes and colors
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean))) as string[];
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean))) as string[];

  const colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#FFFFFF',
    Olive: '#556B2F',
    Beige: '#F5F5DC',
  };

  return (
    <div className="space-y-6">
      {/* Colors */}
      {colors.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Color</h4>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-8 h-8 rounded-full border transition-transform ${
                  selectedColor === color ? 'scale-125 border-[var(--color-primary)]' : 'border-[var(--color-border)]'
                }`}
                style={{ backgroundColor: colorMap[color] || '#ccc' }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`border rounded-md px-4 py-2 text-sm transition-colors ${
                  selectedSize === size
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
