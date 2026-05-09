"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrderStatusTimeline } from "@/components/store/OrderStatusTimeline";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function OrderDetail() {
  const params = useParams();
  const id = params.id as string;

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-text-muted text-sm">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-red-500">Order not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/account/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">Order Details</h2>
          <p className="text-text-secondary text-sm">{order.orderNumber}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="border border-border p-6 rounded-md bg-surface-2">
        <h3 className="text-lg font-medium mb-4">Order Status</h3>
        <OrderStatusTimeline currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="md:col-span-2 space-y-4">
          <div className="border border-border p-6 rounded-md bg-surface-2">
            <h3 className="text-lg font-medium mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0">
                  <div className="w-16 h-20 bg-surface rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">{item.name}</h4>
                      <p className="text-xs text-text-secondary">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Address */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="border border-border p-6 rounded-md bg-surface-2">
            <h3 className="text-lg font-medium mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span>${parseFloat(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span>${parseFloat(order.shippingCost).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Discount</span>
                <span>-${parseFloat(order.discount).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">${parseFloat(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border border-border p-6 rounded-md bg-surface-2">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Delivery Address</h3>
            </div>
            {order.address ? (
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary">{order.address.name}</p>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                <p>{order.address.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-text-muted">Address details not available.</p>
            )}
          </div>

          {/* Payment Info */}
          <div className="border border-border p-6 rounded-md bg-surface-2">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Payment</h3>
            </div>
            <div className="text-sm text-text-secondary">
              <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
              <p><span className="font-medium">Status:</span> {order.paymentStatus}</p>
              {order.paymentId && <p><span className="font-medium">ID:</span> {order.paymentId}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
