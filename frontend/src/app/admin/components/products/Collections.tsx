import { useState } from "react";
import { Plus, Edit, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";

const collectionsData = [
  { id: 1, name: "Featured Products", products: 12, icon: "⭐", order: 1, status: "Active" },
  { id: 2, name: "New Arrivals", products: 8, icon: "🆕", order: 2, status: "Active" },
  { id: 3, name: "Best Sellers", products: 15, icon: "🔥", order: 3, status: "Active" },
  { id: 4, name: "Summer Sale", products: 25, icon: "☀️", order: 4, status: "Active" },
];

export function Collections() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Collections</h2>
            <p className="text-gray-600 mt-1">Organize products into themed collections</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Collection
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Icon</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Collection Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Products</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {collectionsData.map((collection) => (
                  <tr key={collection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {collection.icon}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{collection.name}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{collection.products} products</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {collection.status}
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

        {/* Featured Products Configuration */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Homepage Featured Collection</h3>
          <p className="text-gray-600 mb-4">Select which collection to display on the homepage</p>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Featured Products</option>
            <option>New Arrivals</option>
            <option>Best Sellers</option>
            <option>Summer Sale</option>
          </select>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Mobile Scroller Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Icon</label>
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Label</label>
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Collection Tips</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>• Drag to reorder collections for homepage display</p>
          <p>• Use icons to make collections visually appealing</p>
          <p>• Featured collections appear on the main landing page</p>
          <p>• Collections can be filtered by category or tags</p>
        </div>
      </aside>
    </div>
  );
}
