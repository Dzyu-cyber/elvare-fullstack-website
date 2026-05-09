"use client";

import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag, Settings, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AccountOverview() {
  const { user, isLoading: authLoading } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        withCredentials: true,
      });
      return res.data.slice(0, 3); // Get only top 3 recent orders
    },
    enabled: !!user,
  });

  if (authLoading) {
    return <div>Loading account...</div>;
  }

  if (!user) {
    return <div>Please log in to view your account.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name || 'User'}!</h2>
        <p className="text-text-secondary text-sm">Here is an overview of your account activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Summary */}
        <div className="border border-border p-6 rounded-md bg-surface-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Profile Summary</h3>
            </div>
            <p className="text-sm text-text-primary font-medium">{user.name}</p>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
          <div className="mt-4">
            <Link href="/account/profile">
              <Button variant="secondary" size="sm">Edit Profile</Button>
            </Link>
          </div>
        </div>

        {/* Addresses Shortcut */}
        <div className="border border-border p-6 rounded-md bg-surface-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Addresses</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Manage your saved delivery addresses.
            </p>
          </div>
          <div className="mt-4">
            <Link href="/account/addresses">
              <Button variant="secondary" size="sm">Manage Addresses</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Recent Orders</h3>
          </div>
          <Link href="/account/orders" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>

        {ordersLoading ? (
          <div className="text-text-muted text-sm">Loading recent orders...</div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border border-border p-4 rounded-md bg-surface-2 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-text-primary">{order.orderNumber}</p>
                  <p className="text-xs text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">${parseFloat(order.total).toFixed(2)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'DELIVERED' ? 'bg-green-900 text-green-200' :
                    order.status === 'CANCELLED' ? 'bg-red-900 text-red-200' :
                    'bg-yellow-900 text-yellow-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-border border-dashed p-6 rounded-md text-center">
            <p className="text-text-secondary text-sm mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop">
              <Button variant="primary" size="sm">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
