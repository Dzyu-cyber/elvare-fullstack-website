'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-6xl font-bold text-danger">Oops!</h1>
      <h2 className="font-display text-2xl font-bold text-text-primary mt-4">Something went wrong</h2>
      <p className="text-text-secondary mt-2 max-w-md">
        An unexpected error occurred. We have been notified and are working on it.
      </p>
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => reset()}
          className="bg-primary text-bg font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-glow-green hover:shadow-none"
        >
          Try Again
        </button>
        <a
          href="/"
          className="bg-surface-2 border border-border px-6 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors flex items-center justify-center"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
