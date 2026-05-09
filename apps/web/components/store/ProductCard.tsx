'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlist';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: string;
  imageUrl: string;
  category: string;
  badge?: string;
}

export function ProductCard({ id, name, slug, price, imageUrl, category, badge }: ProductCardProps) {
  const { addItem, removeItem, hasItem } = useWishlistStore();
  const isSaved = hasItem(id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden group hover:border-[var(--color-primary)]/30 transition-colors"
    >
      <div className="aspect-[4/5] relative bg-[var(--color-surface-2)] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {badge && (
          <div className="absolute top-4 left-4 bg-[var(--color-primary)]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--color-primary)]/30">
            <span className="font-label-sm text-xs text-[var(--color-primary)]">{badge}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            aria-label="Add to cart"
            className="bg-[var(--color-surface)] text-[var(--color-text)] p-3 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button
            onClick={() => isSaved ? removeItem(id) : addItem({ id, name, slug, price, images: [{ url: imageUrl }], category: { name: category } })}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "p-3 rounded-full transition-colors",
              isSaved
                ? "bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)]"
                : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]"
            )}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-[var(--color-surface)]/80 backdrop-blur-xl">
        <Link href={`/shop/${slug}`}>
          <h3 className="font-body-lg text-lg text-[var(--color-text)] mb-2 hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-label-sm text-sm text-[var(--color-text-muted)]">{category}</span>
          <span className="font-body-md text-base text-[var(--color-primary)]">${price}</span>
        </div>
      </div>
    </motion.div>
  );
}
