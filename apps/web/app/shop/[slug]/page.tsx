import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/store/ProductGallery';
import { ReviewsList } from '@/components/store/ReviewsList';
import { RelatedProducts } from '@/components/store/RelatedProducts';
import { ProductInteractiveSection } from '@/components/store/ProductInteractiveSection';
import { Star, Shield, Truck, RefreshCw } from 'lucide-react';

async function getProduct(slug: string) {
  const res = await fetch(`http://localhost:4000/api/products/${slug}`, {
    cache: 'no-store', // Ensure fresh data
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Calculate rating
  const rating = product.rating || 4.5; // Fallback
  const reviewCount = product.reviews?.length || 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.map((img: any) => img.url),
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-muted)]">
        <a href="/shop" className="hover:text-[var(--color-text)]">Shop</a>
        <span className="mx-2">/</span>
        <a href={`/shop?category=${product.category.slug}`} className="hover:text-[var(--color-text)]">
          {product.category.name}
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text)]">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <ProductGallery images={product.images} />

        {/* Right: Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-4xl font-bold text-[var(--color-text)] mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex text-[var(--color-primary)]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-[var(--color-text-muted)]">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-body-md text-[var(--color-primary)]">
            ${product.price}
          </div>

          <p className="text-[var(--color-text-muted)]">
            {product.description}
          </p>

          <hr className="border-[var(--color-border)]" />

          {/* Client Wrapper for stateful selections */}
          <ProductInteractiveSection product={product} />

          <hr className="border-[var(--color-border)]" />

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs text-[var(--color-text-muted)]">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-[var(--color-primary)]" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="h-5 w-5 text-[var(--color-primary)]" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield className="h-5 w-5 text-[var(--color-primary)]" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsList reviews={product.reviews || []} rating={rating} reviewCount={reviewCount} />

      {/* Related Products */}
      <RelatedProducts categorySlug={product.category.slug} currentProductId={product.id} />
    </div>
  );
}
