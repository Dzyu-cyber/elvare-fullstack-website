'use client';

import { Search, Filter, Download } from 'lucide-react';
import { OrdersTable } from '@/components/admin/OrdersTable';

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-text-primary">Orders</h1>
          <p className="text-text-secondary mt-1">Manage customer orders, fulfillment, and returns.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders by ID, customer name, or email..."
            className="w-full bg-surface-2 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button className="flex items-center space-x-2 bg-surface-2 border border-border px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-surface-2 border border-border px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <select className="bg-surface-2 border border-border px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary transition-colors focus:outline-none">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
}
