import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-surface text-text-primary shadow-card transition-all",
          glow && "shadow-glow-green hover:shadow-glow-green-md",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };
