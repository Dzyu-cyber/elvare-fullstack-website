"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  imageUrl?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: string;
  status: string;
  items: OrderItem[];
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="border border-border rounded-lg bg-surface-2 overflow-hidden">
      {/* Header */}
      <div className="bg-surface px-6 py-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-xs text-text-muted uppercase font-medium">Order Number</p>
          <p className="text-sm font-semibold text-text-primary">{order.orderNumber}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase font-medium">Date Placed</p>
          <p className="text-sm text-text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase font-medium">Total Amount</p>
          <p className="text-sm font-semibold text-primary">${parseFloat(order.total).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase font-medium">Status</p>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block mt-0.5 ${
            order.status === 'DELIVERED' ? 'bg-green-900 text-green-200' :
            order.status === 'CANCELLED' ? 'bg-red-900 text-red-200' :
            'bg-yellow-900 text-yellow-200'
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex -space-x-4 overflow-hidden">
            {order.items.slice(0, 3).map((item) => (
              <div key={item.id} className="inline-block h-12 w-12 rounded-full ring-2 ring-surface-2 bg-surface overflow-hidden">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/50'}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="inline-block h-12 w-12 rounded-full ring-2 ring-surface-2 bg-surface-2 flex items-center justify-center text-xs text-text-muted font-medium">
                +{order.items.length - 3}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Link href={`/account/orders/${order.id}`}>
              <Button variant="secondary" size="sm">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
