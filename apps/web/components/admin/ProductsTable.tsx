'use client';

import { Edit, MoreVertical, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    id: '1',
    name: 'Silk Emerald Dress',
    category: 'Dresses',
    price: 120.00,
    stock: 15,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&q=80',
  },
  {
    id: '2',
    name: 'Classic White T-Shirt',
    category: 'Tops',
    price: 25.00,
    stock: 50,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1521572267360-ed0358269987?w=100&q=80',
  },
  {
    id: '3',
    name: 'Leather Boots',
    category: 'Shoes',
    price: 150.00,
    stock: 5,
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=100&q=80',
  },
  {
    id: '4',
    name: 'Gold Necklace',
    category: 'Accessories',
    price: 45.00,
    stock: 20,
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80',
  },
];

export function ProductsTable() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs uppercase text-text-muted bg-surface-2 border-b border-border">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-2 border border-border">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary hover:text-primary cursor-pointer transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-text-muted">ID: #PROD-{product.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 font-mono font-medium text-text-primary">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className={product.stock < 10 ? "text-danger font-bold" : ""}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Published' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-text-muted/10 text-text-muted'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
