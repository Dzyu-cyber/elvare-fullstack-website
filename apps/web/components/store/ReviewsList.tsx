'use client';

import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  createdAt: string;
  user: {
    name: string | null;
    avatar: string | null;
  };
}

interface ReviewsListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewsList({ reviews, rating, reviewCount }: ReviewsListProps) {
  return (
    <div className="space-y-8">
      <h3 className="font-display text-2xl text-[var(--color-text)]">Customer Reviews</h3>

      {/* Summary */}
      <div className="flex items-center gap-4 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
        <div className="text-center">
          <span className="text-4xl font-bold text-[var(--color-text)]">{rating.toFixed(1)}</span>
          <div className="flex justify-center text-[var(--color-primary)] mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Based on {reviewCount} reviews</p>
        </div>

        {/* Breakdown */}
        <div className="flex-grow space-y-1 text-xs text-[var(--color-text-muted)]">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-3">{stars}</span>
              <div className="flex-grow h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary)]" style={{ width: '0%' }}></div>
              </div>
              <span className="w-5 text-right">0%</span>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      {reviews.length === 0 ? (
        <p className="text-[var(--color-text-muted)] text-center py-6">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-[var(--color-border)] pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-[var(--color-text)]">
                    {review.user.name || 'Anonymous'}
                  </span>
                  <div className="flex text-[var(--color-primary)] mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-3 w-3 ${star <= review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {review.title && <h4 className="font-medium text-[var(--color-text)] mb-1">{review.title}</h4>}
              {review.body && <p className="text-sm text-[var(--color-text-muted)]">{review.body}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
