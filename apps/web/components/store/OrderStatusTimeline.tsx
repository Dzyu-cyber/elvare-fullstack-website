"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

interface OrderStatusTimelineProps {
  currentStatus: string;
}

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[600px] max-w-3xl mx-auto">
        {statuses.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;

          return (
            <div key={status} className="flex flex-col items-center flex-1 relative">
              {/* Node */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors z-10",
                  isCompleted && "bg-primary text-bg shadow-glow-green",
                  isCurrent && "bg-primary text-bg shadow-glow-green animate-pulse",
                  isFuture && "bg-surface-2 text-text-muted border border-border"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              
              {/* Label */}
              <span
                className={cn(
                  "text-xs mt-2 font-medium",
                  isCompleted && "text-text-primary",
                  isCurrent && "text-primary",
                  isFuture && "text-text-muted"
                )}
              >
                {status}
              </span>

              {/* Line */}
              {index < statuses.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 left-[50%] w-full h-0.5 -z-10",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
