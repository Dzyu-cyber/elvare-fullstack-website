'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export function useProducts() {
  const searchParams = useSearchParams();
  
  // Parse search params
  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') || undefined;
  const maxPrice = searchParams.get('maxPrice') || undefined;
  const size = searchParams.get('size') || undefined;
  const color = searchParams.get('color') || undefined;
  const sort = searchParams.get('sort') || 'newest';
  const featured = searchParams.get('featured') || undefined;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '20';
  const q = searchParams.get('q') || undefined;

  // Build query string
  const queryParams = new URLSearchParams();
  if (category) queryParams.set('category', category);
  if (minPrice) queryParams.set('minPrice', minPrice);
  if (maxPrice) queryParams.set('maxPrice', maxPrice);
  if (size) queryParams.set('size', size);
  if (color) queryParams.set('color', color);
  if (sort) queryParams.set('sort', sort);
  if (featured) queryParams.set('featured', featured);
  if (page) queryParams.set('page', page);
  if (limit) queryParams.set('limit', limit);
  if (q) queryParams.set('q', q);

  const queryKey = ['products', queryParams.toString()];

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  return {
    products: data?.data?.products || [],
    meta: data?.data?.meta || { total: 0, page: 1, limit: 20, totalPages: 1 },
    isLoading,
    isFetching,
    error,
  };
}
