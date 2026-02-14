import { useState } from 'react';
import { useParams } from 'react-router';
import { generateProducts, Product, materialIcons } from '../data/products';
import { categories } from './CategorySidebar';
import { ProductDetailModal } from './ProductDetailModal';
import { Filter, Grid3x3, List } from 'lucide-react';

export function CategoryView() {
  const { categoryId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterMaterial, setFilterMaterial] = useState<string>('all');

  const category = categories.find((c) => c.id === categoryId);
  const products = generateProducts(categoryId || 'safety', category?.count || 30);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial =
      filterMaterial === 'all' || product.materials.includes(filterMaterial as any);
    return matchesSearch && matchesMaterial;
  });

  if (!category) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-primary">Category not found</h2>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="flex-1 bg-gray-50">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${category.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">{category.name}</h1>
              <p className="text-muted-foreground">{filteredProducts.length} signs available</p>
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterMaterial}
                onChange={(e) => setFilterMaterial(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Materials</option>
                <option value="aluminum">Aluminum</option>
                <option value="pvc">PVC</option>
                <option value="acrylic">Acrylic</option>
                <option value="vinyl">Vinyl</option>
              </select>
            </div>

            <div className="flex items-center gap-1 border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-8">
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 overflow-hidden group"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {product.code}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-primary mb-2 line-clamp-2">{product.name}</h3>

        {/* Material Badges */}
        <div className="flex gap-1 mb-3 flex-wrap">
          {product.materials.map((material) => (
            <span
              key={material}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-300"
            >
              {materialIcons[material]}
            </span>
          ))}
        </div>

        {/* Price Range */}
        <div className="text-sm text-muted-foreground mb-3">
          Starts from <span className="text-primary font-bold">${product.priceRange.min}</span> - $
          {product.priceRange.max}
        </div>

        <button className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg transition-colors text-sm font-medium">
          Configure & Order
        </button>
      </div>
    </div>
  );
}

function ProductListItem({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 p-4 flex gap-4 group"
    >
      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-primary text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.code}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Starts from</div>
            <div className="text-lg font-bold text-primary">${product.priceRange.min}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {product.materials.map((material) => (
              <span
                key={material}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-300"
              >
                {materialIcons[material]}
              </span>
            ))}
          </div>
          <button className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium">
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}
