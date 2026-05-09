'use client';

import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { SortDropdown } from './SortDropdown';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export function ProductGrid() {
  const { products, meta, isLoading, isFetching } = useProducts();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/shop?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 w-32 bg-[var(--color-surface-2)] animate-pulse rounded"></div>
          <div className="h-8 w-40 bg-[var(--color-surface-2)] animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-[var(--color-surface-2)] animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing {products.length} of {meta.total} products
        </p>
        <SortDropdown />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              imageUrl={product.images[0]?.url || 'https://via.placeholder.com/500'}
              category={product.category.name}
              badge={product.isFeatured ? 'Featured' : undefined}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <Button
            variant="outline"
            size="sm"
            disabled={meta.page === 1}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm text-[var(--color-text)]">
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={meta.page === meta.totalPages}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
