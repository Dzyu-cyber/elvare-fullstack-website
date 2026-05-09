'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const categories = [
  { name: 'Tops', slug: 'tops' },
  { name: 'Bottoms', slug: 'bottoms' },
  { name: 'Dresses', slug: 'dresses' },
  { name: 'Outerwear', slug: 'outerwear' },
  { name: 'Accessories', slug: 'accessories' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Olive', hex: '#556B2F' },
  { name: 'Beige', hex: '#F5F5DC' },
];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category');
  const currentSize = searchParams.get('size');
  const currentColor = searchParams.get('color');
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const handleFilterChange = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/shop');
  };

  return (
    <div className="space-y-8 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] h-fit">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-xl text-[var(--color-text)]">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCategory === cat.slug}
                onChange={() => handleFilterChange('category', currentCategory === cat.slug ? undefined : cat.slug)}
                className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--color-bg)]"
              />
              <span className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Price Range</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value || undefined)}
            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          />
          <span className="text-[var(--color-text-muted)]">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value || undefined)}
            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Sizes</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => handleFilterChange('size', currentSize === sz ? undefined : sz)}
              className={`border rounded-md py-1 text-sm transition-colors ${
                currentSize === sz
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-wider">Colors</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((col) => (
            <button
              key={col.name}
              onClick={() => handleFilterChange('color', currentColor === col.name ? undefined : col.name)}
              className={`w-6 h-6 rounded-full border transition-transform ${
                currentColor === col.name ? 'scale-125 border-[var(--color-primary)]' : 'border-[var(--color-border)]'
              }`}
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
