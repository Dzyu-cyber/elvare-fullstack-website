"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  line1: z.string().min(5, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  country: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface Address extends AddressFormData {
  id: string;
}

export default function AddressesPage() {
  const [showForm, setShowForm] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
  const queryClient = useQueryClient();

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

  React.useEffect(() => {
    if (editingAddress) {
      reset(editingAddress);
      setShowForm(true);
    } else {
      reset({
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: "",
      });
    }
  }, [editingAddress, reset]);

  const createMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/addresses`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success("Address added successfully!");
      setShowForm(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      if (!editingAddress) return;
      return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/addresses/${editingAddress.id}`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success("Address updated successfully!");
      setShowForm(false);
      setEditingAddress(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/addresses/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success("Address deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  });

  const onSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Saved Addresses</h2>
          <p className="text-text-secondary text-sm">Manage your delivery addresses.</p>
        </div>
        {!showForm && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-text-muted text-sm">Loading addresses...</div>
      ) : (
        <div className="space-y-6">
          {/* Address List */}
          {!showForm && addresses && addresses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-border p-4 rounded-md bg-surface-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{addr.name}</span>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      {addr.line1}, {addr.line2 && `${addr.line2}, `}{addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-sm text-text-muted mt-1">{addr.phone}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(addr)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(addr.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showForm && (!addresses || addresses.length === 0) && (
            <div className="border border-border border-dashed p-12 rounded-md text-center flex flex-col items-center justify-center space-y-4">
              <MapPin className="h-12 w-12 text-text-muted" />
              <h3 className="text-lg font-medium">No saved addresses</h3>
              <p className="text-text-secondary text-sm max-w-sm">
                You haven't saved any addresses yet. Add one to make checkout faster.
              </p>
              <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Address
              </Button>
            </div>
          )}

          {/* Form */}
          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-border p-6 rounded-md bg-surface-2">
              <h3 className="text-lg font-medium mb-4">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              
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
                <Button type="button" variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingAddress ? "Update Address" : "Save Address"}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
