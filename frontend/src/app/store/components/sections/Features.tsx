import { Shield, Truck, CreditCard, Headphones, Award, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-level security with multiple payment options for your convenience'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Reliable shipping with tracking on all orders. Free delivery on orders over $5,000'
  },
  {
    icon: CreditCard,
    title: 'Flexible Terms',
    description: 'Net 30/60/90 payment terms available for qualified businesses'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: '24/7 customer service with dedicated account managers for enterprise clients'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'All products certified and backed by our satisfaction guarantee'
  },
  {
    icon: Zap,
    title: 'Quick Reordering',
    description: 'Save time with one-click reordering and automated inventory management'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Why Choose TradeHub</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide everything your business needs for seamless procurement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
