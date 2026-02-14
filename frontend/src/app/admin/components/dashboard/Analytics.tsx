import { TrendingUp, DollarSign, ShoppingCart, Users, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { date: "Feb 1", revenue: 4200, orders: 45 },
  { date: "Feb 2", revenue: 3800, orders: 38 },
  { date: "Feb 3", revenue: 5100, orders: 52 },
  { date: "Feb 4", revenue: 4600, orders: 41 },
  { date: "Feb 5", revenue: 5800, orders: 58 },
  { date: "Feb 6", revenue: 5200, orders: 49 },
  { date: "Feb 7", revenue: 6500, orders: 61 },
];

const categoryData = [
  { name: "Electronics", value: 4500, color: "#3b82f6" },
  { name: "Accessories", value: 3200, color: "#10b981" },
  { name: "Clothing", value: 2800, color: "#f59e0b" },
  { name: "Home", value: 1900, color: "#8b5cf6" },
];

const topProducts = [
  { name: "Wireless Headphones", revenue: 15678, orders: 234 },
  { name: "Smart Watch", revenue: 12890, orders: 187 },
  { name: "Laptop Stand", revenue: 9456, orders: 156 },
  { name: "USB-C Cable", revenue: 7345, orders: 298 },
  { name: "Phone Case", revenue: 5876, orders: 145 },
];

const auditLogs = [
  { id: 1, action: "Product Updated", user: "Admin User", item: "Wireless Headphones", time: "2 hours ago" },
  { id: 2, action: "Order Shipped", user: "Admin User", item: "Order #3210", time: "3 hours ago" },
  { id: 3, action: "Coupon Created", user: "Admin User", item: "SUMMER25", time: "5 hours ago" },
  { id: 4, action: "Customer Added", user: "Admin User", item: "John Doe", time: "1 day ago" },
];

export function Analytics() {
  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Analytics & Logs</h2>
          <p className="text-gray-600 mt-1">Performance metrics and activity tracking</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Revenue (7d)</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">$35,200</p>
            <p className="text-xs text-green-600 mt-1">+12.3% vs last week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Orders (7d)</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">344</p>
            <p className="text-xs text-green-600 mt-1">+8.7% vs last week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Page Views (7d)</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">12,458</p>
            <p className="text-xs text-green-600 mt-1">+15.2% vs last week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3.2%</p>
            <p className="text-xs text-green-600 mt-1">+0.4% vs last week</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue & Orders (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products by Revenue</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Orders</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.orders}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(product.revenue / 20000) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Admin Activity</h3>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600">
                    {log.item} • by {log.user}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Insights</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">Average Order Value</p>
            <p className="text-2xl font-bold text-blue-900">$102.33</p>
            <p className="text-xs text-blue-700 mt-1">+$8.45 from last week</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-900 font-medium mb-2">Customer Lifetime Value</p>
            <p className="text-2xl font-bold text-green-900">$456.78</p>
            <p className="text-xs text-green-700 mt-1">Average per customer</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-medium mb-2">Repeat Purchase Rate</p>
            <p className="text-2xl font-bold text-purple-900">34.5%</p>
            <p className="text-xs text-purple-700 mt-1">+2.3% improvement</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-900 font-medium mb-2">Cart Abandonment</p>
            <p className="text-2xl font-bold text-orange-900">68.2%</p>
            <p className="text-xs text-orange-700 mt-1">Industry avg: 70%</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Export Options</h4>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              Export CSV Report
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              Export PDF Report
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              Schedule Email Report
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
