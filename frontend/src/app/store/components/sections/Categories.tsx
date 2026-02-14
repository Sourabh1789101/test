import { Package, Wrench, Cpu, Truck, Building2, Factory } from 'lucide-react';

const categories = [
  {
    icon: Package,
    name: 'Office Supplies',
    itemCount: '45K+ items',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Wrench,
    name: 'Industrial Tools',
    itemCount: '32K+ items',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Cpu,
    name: 'Technology',
    itemCount: '28K+ items',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    itemCount: '38K+ items',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Building2,
    name: 'Construction',
    itemCount: '41K+ items',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Truck,
    name: 'Logistics',
    itemCount: '22K+ items',
    color: 'bg-indigo-100 text-indigo-600'
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">Find exactly what your business needs</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-center group"
              >
                <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.itemCount}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
