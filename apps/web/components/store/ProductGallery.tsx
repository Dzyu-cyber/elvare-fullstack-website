'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductGalleryProps {
  images: { url: string; altText?: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]?.url || 'https://via.placeholder.com/600');

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-[4/5] relative bg-[var(--color-surface-2)] rounded-xl overflow-hidden">
        <motion.div
          key={mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={mainImage}
            alt="Main product image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img.url)}
              className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors relative ${
                mainImage === img.url ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
              }`}
            >
              <Image 
                src={img.url} 
                alt={img.altText || `Thumbnail ${index + 1}`} 
                fill
                sizes="80px"
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
