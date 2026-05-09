'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="bg-[var(--color-surface)] py-16 px-6 md:px-12 text-center border-t border-[var(--color-border)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl text-[var(--color-text)] mb-4">Join the Movement</h2>
        <p className="text-[var(--color-text-muted)] mb-8">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-grow">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[var(--color-bg)]"
            />
          </div>
          <Button
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] font-medium"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
