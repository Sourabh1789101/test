import { useState } from "react";
import { Search, Filter, Download, Eye } from "lucide-react";
import { Link } from "react-router";

const ordersData = [
  { id: "3210", customer: "John Doe", email: "john@example.com", items: 2, total: 89.99, date: "Feb 7, 2026 10:30 AM", status: "Paid" },
  { id: "3209", customer: "Jane Smith", email: "jane@example.com", items: 1, total: 199.99, date: "Feb 7, 2026 09:15 AM", status: "New" },
  { id: "3208", customer: "Mike Johnson", email: "mike@example.com", items: 3, total: 149.97, date: "Feb 6, 2026 04:45 PM", status: "Shipped" },
  { id: "3207", customer: "Sarah Williams", email: "sarah@example.com", items: 1, total: 19.99, date: "Feb 6, 2026 02:20 PM", status: "Paid" },
  { id: "3206", customer: "Tom Brown", email: "tom@example.com", items: 2, total: 59.98, date: "Feb 5, 2026 11:30 AM", status: "Refunded" },
];

export function OrdersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "New", "Paid", "Shipped", "Refunded"];

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.includes(searchQuery) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">{filteredOrders.length} orders</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link to={`/orders/${order.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.items}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        order.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        to={`/orders/${order.id}`}
                        className="flex items-center justify-end gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Statistics</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium">New Orders</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">24</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-900 font-medium">Paid</p>
            <p className="text-2xl font-bold text-green-900 mt-1">142</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-900 font-medium">Shipped</p>
            <p className="text-2xl font-bold text-orange-900 mt-1">89</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">$45,231</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
