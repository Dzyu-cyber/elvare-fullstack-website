"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!orderId,
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mb-6"
      >
        <CheckCircle className="h-20 w-20 text-primary mx-auto" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold font-display mb-2"
      >
        Thank You for Your Order!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-text-secondary mb-8"
      >
        Your order has been placed successfully and is being processed.
      </motion.p>

      {isLoading ? (
        <div className="text-text-muted">Loading order details...</div>
      ) : order ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-surface border border-border rounded-lg p-6 mb-8 w-full max-w-md"
        >
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-text-secondary">Order Number:</span>
            <span className="font-semibold text-primary">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-text-secondary">Total Amount:</span>
            <span className="font-semibold">${parseFloat(order.total).toFixed(2)}</span>
          </div>
          <p className="text-sm text-text-muted mt-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </motion.div>
      ) : (
        <div className="text-red-500 mb-8">Failed to load order details.</div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex gap-4"
      >
        <Link href="/shop">
          <Button variant="secondary">
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
        <Link href="/account/orders">
          <Button variant="primary">View My Orders</Button>
        </Link>
      </motion.div>
    </div>
  );
}
