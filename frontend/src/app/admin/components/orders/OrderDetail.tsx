import { Link, useParams } from "react-router";
import { ArrowLeft, Package, Mail, Printer, RefreshCw } from "lucide-react";

export function OrderDetail() {
  const { id } = useParams();

  const orderItems = [
    { name: "Wireless Headphones", sku: "WH-001", qty: 1, price: 89.99 },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <Link to="/orders" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Order #{id}</h2>
              <p className="text-gray-600 mt-1">Placed on Feb 7, 2026 at 10:30 AM</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Mail className="w-4 h-4" />
                Email Customer
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.sku} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      🎧
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$89.99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>$89.99</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                  <p className="text-gray-600">John Doe</p>
                  <p className="text-gray-600">john@example.com</p>
                  <p className="text-gray-600">+1 234-567-8901</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <p className="text-gray-600">123 Main Street</p>
                  <p className="text-gray-600">Apt 4B</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600">United States</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium text-gray-900">Visa •••• 4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium text-gray-900">txn_1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Paid
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Notes</h3>
              <textarea 
                rows={4}
                placeholder="Add internal notes about this order..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Note
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="relative pl-6 border-l-2 border-blue-200 pb-4">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                <p className="text-sm font-medium text-gray-900">Order Placed</p>
                <p className="text-xs text-gray-500">Feb 7, 2026 10:30 AM</p>
              </div>
              <div className="relative pl-6 border-l-2 border-blue-200 pb-4">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-green-600"></div>
                <p className="text-sm font-medium text-gray-900">Payment Received</p>
                <p className="text-xs text-gray-500">Feb 7, 2026 10:31 AM</p>
              </div>
              <div className="relative pl-6 border-l-2 border-gray-200 pb-4">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <h4 className="font-medium text-gray-900">Actions</h4>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Package className="w-4 h-4" />
                Mark as Shipped
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                Issue Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
