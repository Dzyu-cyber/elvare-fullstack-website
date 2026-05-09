import { DollarSign, ShoppingBag, Package, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$24,500"
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
          description="from last month"
        />
        <StatsCard
          title="Orders Today"
          value="45"
          icon={ShoppingBag}
          trend={{ value: "5%", positive: true }}
          description="vs average"
        />
        <StatsCard
          title="Total Products"
          value="120"
          icon={Package}
          description="20 out of stock"
        />
        <StatsCard
          title="Active Users"
          value="1,240"
          icon={Users}
          trend={{ value: "2.4%", positive: false }}
          description="vs last week"
        />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">Recent Orders</h2>
            <button className="text-primary text-sm font-medium hover:text-primary-dark transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text-secondary">
              <thead className="text-xs uppercase text-text-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#ORD-001", customer: "John Doe", total: "$120.00", status: "Paid" },
                  { id: "#ORD-002", customer: "Jane Smith", total: "$85.00", status: "Pending" },
                  { id: "#ORD-003", customer: "Bob Johnson", total: "$240.00", status: "Failed" },
                  { id: "#ORD-004", customer: "Alice Brown", total: "$50.00", status: "Paid" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-4 font-mono text-text-primary">{order.id}</td>
                    <td className="px-4 py-4">{order.customer}</td>
                    <td className="px-4 py-4 font-mono">{order.total}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Paid" ? "bg-primary/10 text-primary" :
                        order.status === "Pending" ? "bg-warning/10 text-warning" :
                        "bg-danger/10 text-danger"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">Low Stock Alerts</h2>
            <button className="text-primary text-sm font-medium hover:text-primary-dark transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Silk Emerald Dress", stock: 2, image: "👗" },
              { name: "Classic White T-Shirt", stock: 5, image: "👕" },
              { name: "Leather Boots", stock: 1, image: "🥾" },
              { name: "Gold Necklace", stock: 3, image: "📿" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface-2 rounded-lg border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-bg rounded-md flex items-center justify-center text-xl">
                    {item.image}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <p className="text-xs text-text-muted">ID: #PROD-{i+100}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium text-danger">{item.stock} left</p>
                  <button className="text-xs text-primary hover:text-primary-dark transition-colors mt-1">
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
