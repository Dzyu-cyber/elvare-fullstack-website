'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center bg-[var(--color-bg)]">
      <div className="flex flex-col justify-center px-6 md:px-12 py-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-label-sm text-sm text-[var(--color-primary)] uppercase tracking-widest mb-4"
        >
          New Collection
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight"
        >
          Wear the Future.<br />Own the Moment.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-[var(--color-text-muted)] mb-8 max-w-md"
        >
          Discover sustainable, avant-garde outerwear designed for the modern world.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-6"
        >
          <Link href="/shop">
            <Button
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] font-medium px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-shadow"
            >
              Shop Now
            </Button>
          </Link>
          
          <Link
            href="/collections"
            className="text-[var(--color-text)] border-b border-[var(--color-text)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors pb-1 font-label-sm text-sm"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>
      
      <div className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Nq3f6jlwbk0vog7OvCqhUSf4Qct1thmuIhOhT9CESb4IT9weTObOGfgPaaQ8yAsetMuLHzvieOHa2JBOVrMqpMNoJ39bEu9_mu2d1_fxuNFGaQGu3AARn6aB9qWrNAoHiv5Yx25Vb2HotKP-NgSnJVgv8qC2FwhXeALxCEL7eZFZ5Ny59C4D0fnp7ue7XewKnShId-FTsVBU06m9fBfQrg-6E_9Jfv5TqQ533fl0yS-yA4lRtZI00TuwzCVNpqPWaMj-P7LcxFE"
          alt="High-fashion hero image"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-transparent to-transparent md:block hidden"></div>
      </div>
    </section>
  );
}
