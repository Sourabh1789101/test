import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Link } from 'react-router';

const steps = [
  {
    id: 1,
    name: 'Order Placed',
    description: 'Order confirmed and payment processed',
    icon: CheckCircle,
    completed: true,
    date: 'Feb 10, 2026',
  },
  {
    id: 2,
    name: 'In Production',
    description: 'Your custom signs are being manufactured',
    icon: Package,
    completed: true,
    date: 'Feb 11, 2026',
  },
  {
    id: 3,
    name: 'Out for Delivery',
    description: 'Package shipped and in transit',
    icon: Truck,
    completed: false,
    date: 'Expected: Feb 13, 2026',
  },
  {
    id: 4,
    name: 'Delivered',
    description: 'Order successfully delivered',
    icon: Home,
    completed: false,
    date: 'Expected: Feb 14, 2026',
  },
];

export function OrderTracking() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Order #ORD-2026-5847 • Placed on Feb 10, 2026
          </p>
        </div>

        {/* Current Status Card */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">In Production</h2>
              <p className="text-white/90">
                Your order is currently being manufactured
              </p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Estimated Delivery:</span>
              <span className="font-bold text-lg">Feb 14, 2026</span>
            </div>
          </div>
        </div>

        {/* Order Progress Stepper */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
          <h3 className="text-xl font-bold text-primary mb-8">Order Progress</h3>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-6">
                    {/* Icon and Line */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          step.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-1 h-16 mt-2 transition-all ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-primary">
                          {step.name}
                        </h4>
                        {step.completed && (
                          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-primary mb-6">Order Details</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Product Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">Custom Safety Sign</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium">Aluminum (Heavy Duty)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium">Medium (24x24)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">50 units</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Shipping Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Ship to:</p>
                  <p className="font-medium">Acme Corporation</p>
                  <p className="text-muted-foreground">123 Business Blvd</p>
                  <p className="text-muted-foreground">New York, NY 10001</p>
                </div>
                <div className="pt-2">
                  <p className="text-muted-foreground">Tracking Number:</p>
                  <p className="font-mono font-medium text-primary">
                    1Z999AA10123456784
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/configurator"
            className="flex-1 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors text-center"
          >
            Place Another Order
          </Link>
        </div>
      </div>
    </div>
  );
}
