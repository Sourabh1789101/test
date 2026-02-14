import { useState } from "react";
import { Store, DollarSign, CreditCard, Key, Users, Bell, Globe } from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("store");

  const tabs = [
    { id: "store", label: "Store Info", icon: Store },
    { id: "tax", label: "Tax Settings", icon: DollarSign },
    { id: "payment", label: "Payment Keys", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
    { id: "roles", label: "Roles & Permissions", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "general", label: "General", icon: Globe },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Configure your store settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === "store" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Store Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input 
                  type="text" 
                  defaultValue="My Ecommerce Store"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                <textarea 
                  rows={3}
                  defaultValue="Your one-stop shop for quality products"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="store@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    defaultValue="+1 234-567-8900"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  rows={3}
                  placeholder="123 Main Street, City, State, ZIP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === "tax" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Tax Settings</h3>
              
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                  <span className="text-sm font-medium text-gray-700">Enable tax calculation</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Rate (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="8.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Display</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Included in price</option>
                  <option>Added at checkout</option>
                  <option>Show both</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tax by Region</h4>
                <div className="space-y-3">
                  {[
                    { region: "United States", rate: "8.5%" },
                    { region: "Europe (VAT)", rate: "20%" },
                    { region: "Canada (GST)", rate: "5%" },
                  ].map((item) => (
                    <div key={item.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{item.region}</span>
                      <span className="font-medium text-gray-900">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Payment Gateway Keys</h3>
              <p className="text-sm text-gray-600">Configure your payment processor credentials. Keys are encrypted and stored securely.</p>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Stripe</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publishable Key</label>
                    <input 
                      type="text" 
                      placeholder="pk_live_..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                    <input 
                      type="password" 
                      placeholder="sk_live_..." 
                      defaultValue="••••••••••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">PayPal</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                    <input 
                      type="text" 
                      placeholder="Your PayPal Client ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
                    <input 
                      type="password" 
                      placeholder="Your PayPal Client Secret"
                      defaultValue="••••••••••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">API Keys</h3>
              <p className="text-sm text-gray-600">Manage API keys for integrations and external access.</p>

              <div className="space-y-3">
                {[
                  { name: "Production API Key", key: "sk_prod_••••••••••••4321", created: "Jan 15, 2026" },
                  { name: "Development API Key", key: "sk_dev_••••••••••••8765", created: "Dec 20, 2025" },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
                    </div>
                    <code className="text-sm text-gray-600 font-mono">{item.key}</code>
                    <p className="text-xs text-gray-500 mt-2">Created {item.created}</p>
                  </div>
                ))}
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate New API Key
              </button>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Roles & Permissions</h3>
              
              <div className="space-y-4">
                {[
                  { role: "Administrator", users: 2, permissions: "Full access to all features" },
                  { role: "Manager", users: 5, permissions: "Manage products, orders, and customers" },
                  { role: "Support", users: 8, permissions: "View orders and customer information" },
                  { role: "Content Editor", users: 3, permissions: "Edit content and media only" },
                ].map((item) => (
                  <div key={item.role} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.role}</h4>
                        <p className="text-sm text-gray-600">{item.permissions}</p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                    </div>
                    <p className="text-xs text-gray-500">{item.users} users assigned</p>
                  </div>
                ))}
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create New Role
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
                  <div className="space-y-2">
                    {[
                      "New orders",
                      "Low stock alerts",
                      "Customer messages",
                      "Weekly sales report",
                      "Monthly analytics summary",
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
                  <div className="space-y-2">
                    {[
                      "New orders",
                      "Payment received",
                      "Shipping updates",
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC-6 (Central)</option>
                    <option>UTC-7 (Mountain)</option>
                    <option>UTC-8 (Pacific)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Settings Help</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>• Store information appears in customer emails and invoices</p>
          <p>• Payment keys are encrypted and never exposed in the admin</p>
          <p>• API keys allow third-party integrations</p>
          <p>• Configure user roles to control access levels</p>
          <p>• Tax settings apply automatically at checkout</p>
        </div>
      </aside>
    </div>
  );
}
