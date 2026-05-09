import { HeroSection } from '@/components/store/HeroSection';
import { CategoryStrip } from '@/components/store/CategoryStrip';
import { FeaturedProducts } from '@/components/store/FeaturedProducts';
import dynamic from 'next/dynamic';

const BrandValues = dynamic(() => import('@/components/store/BrandValues'), { ssr: false });
const Newsletter = dynamic(() => import('@/components/store/Newsletter'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <CategoryStrip />
      
      {/* Featured Products */}
      <FeaturedProducts 
        title="Featured Collection" 
        query="?featured=true&limit=4" 
        queryKey="featured-products"
      />
      
      <BrandValues />
      
      {/* New Arrivals */}
      <FeaturedProducts 
        title="New Arrivals" 
        query="?sort=newest&limit=4" 
        queryKey="new-arrivals"
      />
      
      <Newsletter />
    </div>
  );
}
