'use client';

import { Truck, RotateCcw, Leaf, ShieldCheck } from 'lucide-react';

const values = [
  {
    icon: Truck,
    title: 'Free Delivery',
    text: 'On all orders over $100',
  },
  {
    icon: RotateCcw,
    title: 'Free Returns',
    text: 'Within 30 days',
  },
  {
    icon: Leaf,
    title: 'Sustainably Made',
    text: 'Eco-friendly materials',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    text: 'Quality guaranteed',
  },
];

export function BrandValues() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-16 px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {values.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex flex-col items-center gap-4">
              <Icon className="text-[var(--color-primary)] h-8 w-8 stroke-[1.5]" />
              <div>
                <span className="font-label-sm text-sm text-[var(--color-text)] uppercase tracking-widest block mb-1">
                  {item.title}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
