import { useState } from "react";
import { Search, UserPlus, Mail, Phone, Tag } from "lucide-react";

const customersData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234-567-8901", orders: 12, ltv: 1234.56, joined: "Jan 2025", tags: ["VIP", "Subscriber"] },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234-567-8902", orders: 8, ltv: 987.32, joined: "Dec 2024", tags: ["Subscriber"] },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 234-567-8903", orders: 15, ltv: 2456.78, joined: "Nov 2024", tags: ["VIP"] },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "+1 234-567-8904", orders: 5, ltv: 567.89, joined: "Jan 2026", tags: [] },
];

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customer = selectedCustomer ? customersData.find(c => c.id === selectedCustomer) : null;

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Customers</h2>
            <p className="text-gray-600 mt-1">{filteredCustomers.length} customers</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            Add Customer
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Lifetime Value</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Tags</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCustomer(customer.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{customer.orders}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${customer.ltv.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {customer.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{customer.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Rail - Customer Detail */}
      <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        {customer ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-medium">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-500">Customer since {customer.joined}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">Total Orders</p>
                    <p className="text-xl font-bold text-blue-900">{customer.orders}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-900">Lifetime Value</p>
                    <p className="text-xl font-bold text-green-900">${customer.ltv.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tags & Segments</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {customer.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Tag className="w-4 h-4" />
                  Add Tag
                </button>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order History</h4>
                <div className="space-y-2">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">#3210</span>
                      <span className="text-sm font-medium text-gray-900">$89.99</span>
                    </div>
                    <p className="text-xs text-gray-500">Feb 7, 2026</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">#3195</span>
                      <span className="text-sm font-medium text-gray-900">$145.50</span>
                    </div>
                    <p className="text-xs text-gray-500">Jan 28, 2026</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                <textarea 
                  rows={4}
                  placeholder="Add notes about this customer..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Select a customer to view details</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
