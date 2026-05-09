"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, MapPin, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/account", label: "Overview", icon: User },
  { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/account/profile", label: "Profile", icon: Settings },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[70vh]">
      <h1 className="text-3xl font-bold font-display mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-surface-2 text-primary border border-border"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-text-muted")} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 bg-surface border border-border rounded-lg p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
