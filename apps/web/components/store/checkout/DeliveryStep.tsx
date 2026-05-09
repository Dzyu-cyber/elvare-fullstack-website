"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MapPin, Plus } from "lucide-react";

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  line1: z.string().min(5, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  country: z.string().default("India"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
}

interface DeliveryStepProps {
  onAddressSelect: (addressId: string | null, newAddress?: AddressFormData) => void;
}

export function DeliveryStep({ onAddressSelect }: DeliveryStepProps) {
  const [selectedAddressId, setSelectedAddressId] = React.useState<string | null>(null);
  const [showNewForm, setShowNewForm] = React.useState(false);

  const { data: addresses, isLoading } = useQuery<Address[]>({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/addresses`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "India",
    }
  });

  const onSubmit = (data: AddressFormData) => {
    onAddressSelect(null, data);
  };

  React.useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId && !showNewForm) {
      setSelectedAddressId(addresses[0].id);
      onAddressSelect(addresses[0].id);
    }
  }, [addresses, selectedAddressId, showNewForm, onAddressSelect]);

  const handleSelectSaved = (id: string) => {
    setSelectedAddressId(id);
    setShowNewForm(false);
    onAddressSelect(id);
  };

  const handleShowNew = () => {
    setSelectedAddressId(null);
    setShowNewForm(true);
    reset();
    onAddressSelect(null);
  };

  if (isLoading) {
    return <div className="py-6">Loading addresses...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

      {/* Saved Addresses */}
      {addresses && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-4 rounded-md cursor-pointer transition-colors ${
                selectedAddressId === addr.id
                  ? 'border-primary bg-surface-2'
                  : 'border-border hover:border-text-muted'
              }`}
              onClick={() => handleSelectSaved(addr.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <MapPin className={`h-4 w-4 ${selectedAddressId === addr.id ? 'text-primary' : 'text-text-muted'}`} />
                  <span className="font-medium">{addr.name}</span>
                </div>
                {selectedAddressId === addr.id && (
                  <span className="text-xs bg-primary text-bg px-2 py-0.5 rounded-full font-medium">Selected</span>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-2">{addr.line1}, {addr.line2 && `${addr.line2}, `}{addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-sm text-text-muted mt-1">{addr.phone}</p>
            </div>
          ))}
          <div
            className={`border border-dashed p-4 rounded-md cursor-pointer flex flex-col items-center justify-center text-center hover:border-primary transition-colors ${
              showNewForm ? 'border-primary bg-surface-2' : 'border-border'
            }`}
            onClick={handleShowNew}
          >
            <Plus className={`h-6 w-6 mb-2 ${showNewForm ? 'text-primary' : 'text-text-muted'}`} />
            <span className="text-sm font-medium">Add New Address</span>
          </div>
        </div>
      )}

      {/* New Address Form */}
      {(showNewForm || !addresses || addresses.length === 0) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-border p-6 rounded-md bg-surface">
          <h3 className="text-lg font-medium mb-4">Add New Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Full Name</label>
              <Input {...register("name")} placeholder="John Doe" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Phone Number</label>
              <Input {...register("phone")} placeholder="9876543210" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Address Line 1</label>
            <Input {...register("line1")} placeholder="House No, Street Name" />
            {errors.line1 && <p className="text-red-500 text-xs mt-1">{errors.line1.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Address Line 2 (Optional)</label>
            <Input {...register("line2")} placeholder="Apartment, Suite, Unit, etc." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">City</label>
              <Input {...register("city")} placeholder="City" />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">State</label>
              <Input {...register("state")} placeholder="State" />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Pincode</label>
              <Input {...register("pincode")} placeholder="110001" />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Country</label>
            <Input {...register("country")} disabled />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {addresses && addresses.length > 0 && (
              <Button type="button" variant="secondary" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="primary">
              Use This Address
            </Button>
          </div>
        </form>
      )}

      {selectedAddressId && (
        <div className="flex justify-end mt-6">
          <Button variant="primary" onClick={() => onAddressSelect(selectedAddressId)}>
            Continue to Payment
          </Button>
        </div>
      )}
    </div>
  );
}
