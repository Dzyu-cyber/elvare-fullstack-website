'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1'); // Reset to page 1 on sort change
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-[var(--color-text-muted)]">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
}
