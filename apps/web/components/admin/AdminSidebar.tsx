'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { href: '/admin/products', icon: ShoppingBag, label: 'Products' },
  { href: '/admin/orders', icon: ClipboardList, label: 'Orders' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0 z-30">
      {/* Logo Area */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-bold text-text-primary italic">VÉRDE</span>
          <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full">ADMIN</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary shadow-glow-green" 
                  : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-muted")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-top border-border">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface-2 hover:text-text-primary cursor-pointer transition-colors duration-200">
          <Settings className="w-5 h-5 text-text-muted" />
          <span className="text-sm font-medium">Settings</span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 cursor-pointer transition-colors duration-200 mt-1">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
}
