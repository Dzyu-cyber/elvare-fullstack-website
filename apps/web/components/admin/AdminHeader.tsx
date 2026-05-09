'use client';

import { Bell, Search, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function AdminHeader() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-surface border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-64">
        <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-surface-2 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-3 border-l border-border pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-text-primary">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-text-muted capitalize">{user?.role || 'Administrator'}</p>
          </div>
          <div className="w-9 h-9 bg-surface-2 border border-border rounded-full flex items-center justify-center text-primary font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </header>
  );
}
