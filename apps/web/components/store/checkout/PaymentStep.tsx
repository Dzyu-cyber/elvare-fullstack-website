"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PaymentStepProps {
  addressId: string | null;
  newAddress?: any;
  onSuccess: (orderId: string) => void;
}

export function PaymentStep({ addressId, newAddress, onSuccess }: PaymentStepProps) {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK. Please check your connection.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create Razorpay order on backend
      const orderRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/razorpay/create`,
        { amount: total },
        { withCredentials: true }
      );

      const { id: razorpayOrderId, amount, currency } = orderRes.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Elvaré",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          // This callback runs on success
          try {
            // 3. Create order on backend
            const orderData = {
              paymentMethod: "razorpay",
              paymentId: response.razorpay_payment_id,
              notes: "Paid via Razorpay",
            };

            if (addressId) {
              Object.assign(orderData, { addressId });
            } else if (newAddress) {
              Object.assign(orderData, newAddress);
            }

            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/orders`,
              orderData,
              { withCredentials: true }
            );

            toast.success("Order placed successfully!");
            clearCart();
            onSuccess(res.data.id);
          } catch (error: any) {
            toast.error("Failed to create order in our system. Please contact support.");
            console.error(error);
          }
        },
        prefill: {
          name: newAddress?.name || "",
          email: "", // We should get this from session if possible
          contact: newAddress?.phone || "",
        },
        theme: {
          color: "#22C55E", // Primary green
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error("Failed to initiate payment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Payment</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2 space-y-4">
          <div className="border border-border p-6 rounded-md bg-surface">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Action */}
        <div className="space-y-4">
          <div className="border border-border p-6 rounded-md bg-surface flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-medium mb-2">Secure Payment</h3>
              <p className="text-sm text-text-secondary mb-4">
                We use Razorpay for secure payments. You can pay via Cards, UPI, NetBanking, etc.
              </p>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
