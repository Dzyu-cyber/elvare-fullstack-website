import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "green" | "muted" | "danger" | "warning";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "green", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          variant === "green" && "bg-primary/20 text-accent border border-primary/30",
          variant === "muted" && "bg-surface-2 text-text-secondary border border-border",
          variant === "danger" && "bg-red-500/20 text-red-400 border border-red-500/30",
          variant === "warning" && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
