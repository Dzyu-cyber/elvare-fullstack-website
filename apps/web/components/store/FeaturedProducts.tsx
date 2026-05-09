'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import Link from 'next/link';

interface FeaturedProductsProps {
  title?: string;
  query?: string;
  queryKey?: string;
}

export function FeaturedProducts({ 
  title = "Featured", 
  query = "?featured=true&limit=4",
  queryKey = "featured-products"
}: FeaturedProductsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/products${query}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      return json.data.products;
    },
  });

  if (isLoading) {
    return (
      <section className="px-6 md:px-12 py-16 bg-[var(--color-bg)]">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display text-3xl text-[var(--color-text)]">{title}</h2>
          <div className="h-4 w-20 bg-[var(--color-surface-2)] animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/5] bg-[var(--color-surface-2)] animate-pulse rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 md:px-12 py-16 bg-[var(--color-bg)]">
        <h2 className="font-display text-3xl text-[var(--color-text)] mb-8">Featured</h2>
        <p className="text-[var(--color-text-muted)]">Failed to load featured products.</p>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-16 bg-[var(--color-bg)]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-display text-3xl text-[var(--color-text)]">{title}</h2>
        <Link href="/shop" className="text-[var(--color-primary)] hover:underline text-sm">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((product: any) => (
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
    </section>
  );
}
