"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrderCard } from "@/components/store/OrderCard";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function OrderHistory() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order History</h2>
        <p className="text-text-secondary text-sm">View and track all your orders.</p>
      </div>

      {isLoading ? (
        <div className="text-text-muted text-sm">Loading orders...</div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="border border-border border-dashed p-12 rounded-md text-center flex flex-col items-center justify-center space-y-4">
          <ShoppingBag className="h-12 w-12 text-text-muted" />
          <h3 className="text-lg font-medium">No orders yet</h3>
          <p className="text-text-secondary text-sm max-w-sm">
            You haven't placed any orders yet. When you do, they will appear here.
          </p>
          <Link href="/shop">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
