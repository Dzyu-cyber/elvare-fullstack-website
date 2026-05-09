"use client";

import * as React from "react";
import { CartReview } from "@/components/store/checkout/CartReview";
import { DeliveryStep } from "@/components/store/checkout/DeliveryStep";
import { PaymentStep } from "@/components/store/checkout/PaymentStep";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [addressId, setAddressId] = React.useState<string | null>(null);
  const [newAddress, setNewAddress] = React.useState<any>(null);
  const router = useRouter();
  const { items } = useCartStore();

  const handleAddressSelect = (id: string | null, address?: any) => {
    setAddressId(id);
    setNewAddress(address);
    if (id || address) {
      setCurrentStep(3);
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  const steps = [
    { number: 1, title: "Bag Review" },
    { number: 2, title: "Delivery" },
    { number: 3, title: "Payment" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[70vh]">
      <h1 className="text-3xl font-bold font-display mb-8 text-center">Checkout</h1>

      {/* Stepper */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    currentStep >= step.number
                      ? 'bg-primary text-bg shadow-glow-green'
                      : 'bg-surface-2 text-text-muted border border-border'
                  }`}
                >
                  {step.number}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= step.number ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mt-5 transition-colors ${
                  currentStep > step.number ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-surface border border-border rounded-lg p-6 md:p-8">
        {currentStep === 1 && (
          <div>
            <CartReview />
            <div className="flex justify-end mt-6">
              <Button variant="primary" onClick={() => setCurrentStep(2)} disabled={items.length === 0}>
                Proceed to Delivery
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <DeliveryStep onAddressSelect={handleAddressSelect} />
            <div className="flex justify-start mt-6">
              <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                Back to Review
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <PaymentStep
              addressId={addressId}
              newAddress={newAddress}
              onSuccess={handlePaymentSuccess}
            />
            <div className="flex justify-start mt-6">
              <Button variant="secondary" onClick={() => setCurrentStep(2)}>
                Back to Delivery
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
