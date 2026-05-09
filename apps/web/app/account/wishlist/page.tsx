'use client';

import { useWishlistStore } from '@/store/wishlist';
import { ProductCard } from '@/components/store/ProductCard';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const { items } = useWishlistStore();

  if (status === 'unauthenticated') {
    redirect('/auth/login?callbackUrl=/account/wishlist');
  }

  if (status === 'loading') {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 space-y-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">My Wishlist</h1>
        <p className="text-[var(--color-text-muted)]">
          Items you've saved for later.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              imageUrl={product.images[0]?.url || 'https://via.placeholder.com/500'}
              category={product.category.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
