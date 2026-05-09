import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-8xl font-bold text-primary animate-pulse">404</h1>
      <h2 className="font-display text-3xl font-bold text-text-primary mt-4">Page Not Found</h2>
      <p className="text-text-secondary mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-8 bg-primary text-bg font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-glow-green hover:shadow-none">
        Return Home
      </Link>
    </div>
  );
}
