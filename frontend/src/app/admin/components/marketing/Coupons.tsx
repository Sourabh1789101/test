import { useState } from "react";
import { Plus, Edit, Trash2, Copy, Percent } from "lucide-react";

const couponsData = [
  { id: 1, code: "SUMMER25", type: "Percentage", value: "25%", minOrder: "$50", usage: 45, limit: 100, expiry: "Aug 31, 2026", status: "Active" },
  { id: 2, code: "FREESHIP", type: "Free Shipping", value: "-", minOrder: "$0", usage: 128, limit: null, expiry: "Dec 31, 2026", status: "Active" },
  { id: 3, code: "SAVE10", type: "Fixed Amount", value: "$10", minOrder: "$30", usage: 67, limit: 200, expiry: "Sep 15, 2026", status: "Active" },
  { id: 4, code: "WELCOME", type: "Percentage", value: "15%", minOrder: "$0", usage: 234, limit: null, expiry: "-", status: "Active" },
];

export function Coupons() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Coupons</h2>
            <p className="text-gray-600 mt-1">Create and manage discount codes</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Code</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Min. Order</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Usage</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Expiry</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {couponsData.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {coupon.code}
                        </code>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Copy className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{coupon.type}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{coupon.value}</td>
                    <td className="px-6 py-4 text-gray-600">{coupon.minOrder}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {coupon.limit ? `${coupon.usage} / ${coupon.limit}` : coupon.usage}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{coupon.expiry}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {coupon.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Coupon Form */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Coupon</h3>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                    <input 
                      type="text" 
                      placeholder="SAVE20"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                      <option>Free Shipping</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                    <input 
                      type="number" 
                      placeholder="20"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
                    <input 
                      type="number" 
                      placeholder="50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                    <input 
                      type="number" 
                      placeholder="100 (leave empty for unlimited)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input 
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Coupon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Coupon Statistics</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 font-medium">Active Coupons</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">12</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-900 font-medium mb-2">Total Usage</p>
            <p className="text-2xl font-bold text-green-900">474</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-medium mb-2">Total Discount Given</p>
            <p className="text-2xl font-bold text-purple-900">$3,456</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Quick Tips</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Use memorable, easy-to-type codes</p>
            <p>• Set expiry dates to create urgency</p>
            <p>• Limit usage to prevent abuse</p>
            <p>• Track performance to optimize</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
