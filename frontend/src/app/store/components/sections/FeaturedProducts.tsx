import { Star, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: 'Professional Office Desk Set',
    category: 'Office Furniture',
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1558478551-be297c7bb253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzdXBwbGllcyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2Nzg3NzczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Best Seller',
    moq: '10 units'
  },
  {
    id: 2,
    name: 'Industrial Power Tools Kit',
    category: 'Tools & Equipment',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2Nzk0NDg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Hot Deal',
    moq: '5 units'
  },
  {
    id: 3,
    name: 'Enterprise Laptop Bundle',
    category: 'Technology',
    price: 8999,
    originalPrice: 10499,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1614081989290-bcdba07cd9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGV2aWNlc3xlbnwxfHx8fDE3Njc4NzM4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Bulk Pricing',
    moq: '20 units'
  },
  {
    id: 4,
    name: 'Safety Equipment Package',
    category: 'Safety & PPE',
    price: 599,
    originalPrice: 799,
    rating: 4.6,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1684695749267-233af13276d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2Nzk3ODA1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'New Arrival',
    moq: '50 units'
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Top picks for businesses this month</p>
          </div>
          <button className="hidden sm:block text-blue-600 hover:text-blue-700">
            View All Products →
          </button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="relative">
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10">
                    {product.badge}
                  </div>
                )}
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                <h3 className="text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews})</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-gray-900">${product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">MOQ: {product.moq}</div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
