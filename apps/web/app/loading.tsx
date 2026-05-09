import { Spinner } from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <Spinner className="w-12 h-12 text-primary" />
      <p className="text-sm text-text-secondary font-medium animate-pulse">
        Loading Elvaré...
      </p>
    </div>
  );
}
