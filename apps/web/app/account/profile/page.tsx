"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [pwdLoading, setPwdLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const { register: registerPwd, handleSubmit: handleSubmitPwd, formState: { errors: errorsPwd }, reset: resetPwd } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, data, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPwdLoading(true);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        password: data.newPassword,
        currentPassword: data.currentPassword,
      }, {
        withCredentials: true,
      });
      toast.success("Password updated successfully!");
      resetPwd();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setPwdLoading(false);
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
        <p className="text-text-secondary text-sm">Update your personal information and password.</p>
      </div>

      {/* Profile Info Form */}
      <div className="border border-border p-6 rounded-md bg-surface-2">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Full Name</label>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Email Address</label>
            <Input {...register("email")} placeholder="your.email@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="border border-border p-6 rounded-md bg-surface-2">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form onSubmit={handleSubmitPwd(onPasswordSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Current Password</label>
            <Input {...registerPwd("currentPassword")} type="password" placeholder="••••••••" />
            {errorsPwd.currentPassword && <p className="text-red-500 text-xs mt-1">{errorsPwd.currentPassword.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">New Password</label>
            <Input {...registerPwd("newPassword")} type="password" placeholder="••••••••" />
            {errorsPwd.newPassword && <p className="text-red-500 text-xs mt-1">{errorsPwd.newPassword.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">Confirm New Password</label>
            <Input {...registerPwd("confirmPassword")} type="password" placeholder="••••••••" />
            {errorsPwd.confirmPassword && <p className="text-red-500 text-xs mt-1">{errorsPwd.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" disabled={pwdLoading}>
              {pwdLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
