import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group hover:shadow-glow-green", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-3xl font-bold font-mono text-text-primary mt-2">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {(trend || description) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span className={cn("font-medium mr-2", trend.positive ? "text-primary" : "text-danger")}>
              {trend.positive ? "+" : "-"}{trend.value}
            </span>
          )}
          {description && (
            <span className="text-text-muted">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
