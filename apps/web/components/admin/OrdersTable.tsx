'use client';

import { Eye, MoreVertical, Check, X, Clock } from 'lucide-react';

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2026-05-09',
    total: 120.00,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2026-05-08',
    total: 85.00,
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    date: '2026-05-07',
    total: 240.00,
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    date: '2026-05-06',
    total: 50.00,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
  },
];

const statusStyles = {
  Pending: 'bg-warning/10 text-warning',
  Processing: 'bg-primary/10 text-primary',
  Delivered: 'bg-success/10 text-success',
  Cancelled: 'bg-danger/10 text-danger',
};

const paymentStyles = {
  Paid: 'bg-primary/10 text-primary',
  Pending: 'bg-warning/10 text-warning',
  Failed: 'bg-danger/10 text-danger',
};

export function OrdersTable() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs uppercase text-text-muted bg-surface-2 border-b border-border">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-text-primary">
                  #{order.id}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-text-primary">{order.customer}</p>
                    <p className="text-xs text-text-muted">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-muted">
                  {order.date}
                </td>
                <td className="px-6 py-4 font-mono font-medium text-text-primary">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${paymentStyles[order.paymentStatus as keyof typeof paymentStyles]}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.orderStatus as keyof typeof statusStyles]}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <select 
                      className="bg-surface-2 border border-border rounded-md px-2 py-1 text-xs text-text-secondary focus:outline-none focus:border-primary"
                      defaultValue={order.orderStatus}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

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
