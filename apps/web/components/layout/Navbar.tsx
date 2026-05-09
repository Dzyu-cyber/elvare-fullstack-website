"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { data: session } = useSession();
  const { itemCount } = useCartStore();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold italic text-text-primary tracking-tighter">
            ELVARÉ
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            <button className="text-text-secondary hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-text-secondary hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button 
              className="text-text-secondary hover:text-primary transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-bg text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            {session ? (
              <div className="relative group">
                <button className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm hidden md:inline">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                  <Link href="/account" className="block px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]">
                    Account
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]">
                    Orders
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="text-text-secondary hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-text-secondary hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks} 
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
}
