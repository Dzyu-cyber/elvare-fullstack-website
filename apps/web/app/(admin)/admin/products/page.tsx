'use client';

import { Plus, Search, Filter, Download } from 'lucide-react';
import { ProductsTable } from '@/components/admin/ProductsTable';
import Link from 'next/link';

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-text-primary">Products</h1>
          <p className="text-text-secondary mt-1">Manage your product catalog, inventory, and pricing.</p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-primary text-bg font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 shadow-glow-green hover:shadow-none">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name, SKU, or ID..."
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
            <option>Sort: Newest</option>
            <option>Sort: Price Low-High</option>
            <option>Sort: Price High-Low</option>
            <option>Sort: Most Popular</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
