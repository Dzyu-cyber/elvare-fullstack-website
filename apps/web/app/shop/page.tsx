import { FilterSidebar } from '@/components/store/FilterSidebar';
import { FilterMobileDrawer } from '@/components/store/FilterMobileDrawer';
import { ProductGrid } from '@/components/store/ProductGrid';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our full collection of sustainable, premium fashion.',
};

export default function ShopPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">Shop All</h1>
        <p className="text-[var(--color-text-muted)]">
          Explore our collection of sustainable, premium fashion.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading shop...</div>}>
        <div className="flex gap-8 flex-col md:flex-row">
          {/* Desktop Sidebar */}
          <div className="w-64 flex-shrink-0 hidden md:block">
            <FilterSidebar />
          </div>

          <div className="flex-grow space-y-6">
            {/* Mobile Filter Trigger */}
            <div className="md:hidden">
              <FilterMobileDrawer />
            </div>

            {/* Product Grid */}
            <ProductGrid />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
