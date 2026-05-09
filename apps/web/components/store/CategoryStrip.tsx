'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Tops',
    slug: 'tops',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB23_y0ljovnMHyjqu_jmAJLPwiVuESvCRaFo6Zl2aGVWAYAiwBEuHRsWtHUQdJwK3_wI3mCt9J353DBvD8ks20IERaPUcn_xp-Dd_dMuyJyMndFudaVK_Rt_UrMzwbHOsn2I2ZsMamUpZdSugl4nVh7IDwLULG2oEMl1ZqepJY33f9sItRLy1Tpw8amgg8kMVhvYNZlXXWrlZae17GLkWBjLv0N_i4oYgeWCQilRsD8ifnuREdM1DER9jXjdmU8gnQiMYcNIBFZqg',
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDArhvFw9z4YtQJvrin9mY2av_MN0sro2nisaYEUIttVeqCjeSc86rqfLEqXEcNV37gUp5o0K8WYXoWceZIz1ZSX8vPfChYgItcQ559tK6283TrL-hRQqmBylB_S3jlWuUO31l6aMNAuFSOi_HDNStgiFcfycWRxvMW0jXbohpRX7IpX7qH2xAvFILPIncwJB8O-K9qXgnc2ZhLR92dk4VB9VOXPP0rvY9bWgsHD7-TGv5MfGIrlI_NbRVuYfOCxYd53igqbJkAYEU',
  },
  {
    name: 'Dresses',
    slug: 'dresses',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSY_0uUmJw1ZgfnXSC-ht9ToTCvaL39rcFZFkWEYSLfq47-VNLeKXKv7s-IvFsXAAGpxLQD7FRBlRy48D3QRHkpAdzBP_yhaq1e0MXXNsAkF4XroLL-XasRnodm080YtSmRBlRHcwzSoYpzZsjDvXFX5Vr21pIeTWL1NHGaRh7DNz1ig3lL5t8nSWVcTtflhYMzkHmYMjQNBAuZW3IDg8qhPwZ9736JfFlp3NV997nJ9RjzY9sR51p-x2T5E9FZO2pGHn7GXkhJ_8',
  },
  {
    name: 'Outerwear',
    slug: 'outerwear',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpjeEJRyaHaSXrIeIObll-tDjN2i03RRaxFh_YXZTKLyPyVdSlUBIMr5LHIzSriSR1liZTyYRiapSzFSOctTpkN9Y694c1ld2c7LzQ9OEgC55JR7lsn8SIAk_CTE-dmybEGXTS-hiiNJPjiRUYTDFJFDWSXQ1Mk7yJoN9-Ev7LpFVEI2dExpX_4IoiMINmwqGPWzWkAMlk653ga9iuRIc7Bm6DEEQ1-eZy3Jd-0c7vnmtah_K9BrFPWgiboMej31akcT9vxexaueY',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgi-ajT1_3rjEidUf5Gs-gDOF_BXaDJ78OdVKF8d484JonctoK4b9bpDVIt4ALn6HiG4eQeNhPUCx6y8o2CB1o3mACJFa20U9WrUrQ7f0sofnK_oDyDsR4viL91y28qkEhJvzEU7lp8JY3y2LHRE9h4RWg8u7aTH3MP_AHJb5zm1VQHRq7yh-VNUv-6viNkgTbSkmtVpSJf1xBbCoPKlySkGG9He29ssqM2PGO4iRMUB9z1HkEKPoy9yDbyTBldQtkBkiCK0pwOfM',
  },
];

export function CategoryStrip() {
  return (
    <section className="px-6 md:px-12 py-16 bg-[var(--color-bg)]">
      <h2 className="font-display text-3xl text-[var(--color-text)] mb-8">Categories</h2>
      
      <div className="flex overflow-x-auto gap-6 hide-scrollbar snap-x">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="min-w-[200px] snap-start group cursor-pointer"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative border border-transparent group-hover:border-[var(--color-primary)] transition-colors"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[var(--color-bg)]/20 group-hover:bg-transparent transition-colors"></div>
            </motion.div>
            <span className="font-label-sm text-sm text-[var(--color-text)] tracking-wider block text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
