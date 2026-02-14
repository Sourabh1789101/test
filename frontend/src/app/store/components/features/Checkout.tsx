import { useState } from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

export function Checkout() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your order #ORD-2026-{Math.floor(Math.random() * 10000)} has been confirmed.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/tracking"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Track Order
              </Link>
              <Link
                to="/"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Review your order and complete purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-primary mb-6">
                Shipping Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corporation"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Business Blvd"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="New York"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-primary mb-6">
                Payment Method
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border-2 border-accent bg-accent/5 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="w-5 h-5 text-accent"
                  />
                  <div>
                    <div className="font-medium">Net 30 Terms</div>
                    <div className="text-sm text-muted-foreground">
                      Pay within 30 days of delivery
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 text-accent"
                  />
                  <div>
                    <div className="font-medium">Purchase Order</div>
                    <div className="text-sm text-muted-foreground">
                      Submit PO for approval
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 text-accent"
                  />
                  <div>
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-muted-foreground">
                      Immediate payment
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-10 h-10 text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium">Custom Safety Sign</div>
                    <div className="text-sm text-muted-foreground">
                      Aluminum • Medium (24x24)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: 50
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">$3,123.75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bulk Discount (10%):</span>
                  <span className="font-medium text-green-600">-$312.38</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="font-medium">$252.91</span>
                </div>
              </div>

              {/* Shipping Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700">
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">Free & Fast Shipping</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Delivery in 3-5 business days
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>Total:</span>
                  <span>$3,064.28</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg transition-colors font-bold text-lg"
              >
                Place Bulk Order
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our terms of service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
