'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
}

export function RelatedProducts({ categorySlug, currentProductId }: RelatedProductsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['related-products', categorySlug],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/products?category=${categorySlug}&limit=5`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      return json.data.products.filter((p: any) => p.id !== currentProductId).slice(0, 4);
    },
  });

  if (isLoading || error || !data || data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h3 className="font-display text-2xl text-[var(--color-text)]">Related Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((product: any) => (
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
    </div>
  );
}
