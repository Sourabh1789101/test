import { useState } from "react";
import { Plus, Edit, Trash2, Truck } from "lucide-react";

const shippingZones = [
  { id: 1, name: "United States", countries: ["United States"], methods: 3 },
  { id: 2, name: "Europe", countries: ["UK", "Germany", "France", "+12 more"], methods: 2 },
  { id: 3, name: "Rest of World", countries: ["All other countries"], methods: 1 },
];

const shippingMethods = [
  { id: 1, zone: "United States", name: "Standard Shipping", rate: "Free", delivery: "5-7 business days" },
  { id: 2, zone: "United States", name: "Express Shipping", rate: "$15.00", delivery: "2-3 business days" },
  { id: 3, zone: "United States", name: "Next Day", rate: "$25.00", delivery: "1 business day" },
  { id: 4, zone: "Europe", name: "Standard Shipping", rate: "$10.00", delivery: "7-14 business days" },
  { id: 5, zone: "Europe", name: "Express Shipping", rate: "$30.00", delivery: "3-5 business days" },
];

export function Shipping() {
  const [activeTab, setActiveTab] = useState("zones");

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Shipping</h2>
          <p className="text-gray-600 mt-1">Manage shipping zones, rates, and delivery options</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-4">
            {["zones", "methods"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "zones" ? "Shipping Zones" : "Shipping Methods"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "zones" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Define geographical zones for shipping</p>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Zone
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Zone Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Countries/Regions</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Methods</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shippingZones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{zone.name}</td>
                      <td className="px-6 py-4 text-gray-600">{zone.countries.join(", ")}</td>
                      <td className="px-6 py-4 text-gray-600">{zone.methods} methods</td>
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
        )}

        {activeTab === "methods" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Configure shipping methods and rates</p>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Method
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Zone</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Method Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Delivery Time</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shippingMethods.map((method) => (
                    <tr key={method.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600">{method.zone}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{method.name}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{method.rate}</td>
                      <td className="px-6 py-4 text-gray-600">{method.delivery}</td>
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
        )}
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Weight Unit</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>kg (kilograms)</option>
              <option>lb (pounds)</option>
              <option>oz (ounces)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Dimension Unit</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>cm (centimeters)</option>
              <option>in (inches)</option>
              <option>m (meters)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
              <span className="text-sm text-gray-700">Calculate shipping at checkout</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Require signature on delivery</span>
            </label>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Carrier Integrations</h4>
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-900">USPS</span>
                <button className="text-xs text-blue-600 hover:text-blue-700">Connect</button>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-900">FedEx</span>
                <button className="text-xs text-blue-600 hover:text-blue-700">Connect</button>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-900">UPS</span>
                <button className="text-xs text-blue-600 hover:text-blue-700">Connect</button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
