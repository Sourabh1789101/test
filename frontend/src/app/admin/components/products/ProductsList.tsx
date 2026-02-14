import { useState } from "react";
import { Search, Filter, Plus, Edit, Copy, Archive, Trash2, MoreVertical, Download, Package2 } from "lucide-react";
import { Link } from "react-router";

const productsData = [
  { 
    id: 1, 
    image: "🎧", 
    name: "Wireless Headphones", 
    sku: "WH-001", 
    slug: "wireless-headphones",
    category: "Electronics", 
    brand: "TechAudio",
    price: 89.99, 
    salePrice: null,
    stock: 145, 
    status: "Active",
    onSale: false
  },
  { 
    id: 2, 
    image: "⌚", 
    name: "Smart Watch", 
    sku: "SW-002", 
    slug: "smart-watch",
    category: "Electronics", 
    brand: "SmartTech",
    price: 199.99, 
    salePrice: 179.99,
    stock: 89, 
    status: "Active",
    onSale: true
  },
  { 
    id: 3, 
    image: "💻", 
    name: "Laptop Stand", 
    sku: "LS-003", 
    slug: "laptop-stand",
    category: "Accessories", 
    brand: "WorkPro",
    price: 49.99, 
    salePrice: null,
    stock: 234, 
    status: "Active",
    onSale: false
  },
  { 
    id: 4, 
    image: "🔌", 
    name: "USB-C Cable", 
    sku: "UC-004", 
    slug: "usb-c-cable",
    category: "Accessories", 
    brand: "ConnectPlus",
    price: 19.99, 
    salePrice: 14.99,
    stock: 456, 
    status: "Active",
    onSale: true
  },
  { 
    id: 5, 
    image: "📱", 
    name: "Phone Case", 
    sku: "PC-005", 
    slug: "phone-case",
    category: "Accessories", 
    brand: "ProtectX",
    price: 29.99, 
    salePrice: null,
    stock: 12, 
    status: "Low Stock",
    onSale: false
  },
];

export function ProductsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [onSaleFilter, setOnSaleFilter] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const categories = ["All", "Electronics", "Accessories"];
  const brands = ["All", "TechAudio", "SmartTech", "WorkPro", "ConnectPlus", "ProtectX"];
  const priceRanges = ["All", "Under $50", "$50-$100", "$100-$200", "Over $200"];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesOnSale = !onSaleFilter || product.onSale;
    
    let matchesPrice = true;
    if (priceRange === "Under $50") matchesPrice = product.price < 50;
    else if (priceRange === "$50-$100") matchesPrice = product.price >= 50 && product.price < 100;
    else if (priceRange === "$100-$200") matchesPrice = product.price >= 100 && product.price < 200;
    else if (priceRange === "Over $200") matchesPrice = product.price >= 200;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesOnSale;
  });

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full">
      {/* Main Area */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Products</h2>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
          </div>
          <Link 
            to="/products/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>

              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox"
                  checked={onSaleFilter}
                  onChange={(e) => setOnSaleFilter(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">On Sale Only</span>
              </label>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-blue-900 font-medium">{selectedProducts.length} products selected</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm">
                Change Category
              </button>
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm">
                Set Sale Price
              </button>
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm">
                Update Stock
              </button>
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm">
                Export Selected
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input 
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU / Slug</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{product.sku}</p>
                      <p className="text-xs text-gray-500">/{product.slug}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{product.category}</td>
                    <td className="px-4 py-4">
                      {product.onSale ? (
                        <div>
                          <p className="font-medium text-gray-900">${product.salePrice}</p>
                          <p className="text-xs text-gray-500 line-through">${product.price}</p>
                        </div>
                      ) : (
                        <p className="font-medium text-gray-900">${product.price}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="number"
                          defaultValue={product.stock}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <button className="text-blue-600 hover:text-blue-700 text-xs">Update</button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link 
                          to={`/products/${product.id}/edit`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Archive className="w-4 h-4 text-gray-600" />
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
      </div>

      {/* Right Rail - Quick Stats */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Package2 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 font-medium">Total Products</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">456</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-900 font-medium mb-2">Active</p>
            <p className="text-2xl font-bold text-green-900">423</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-900 font-medium mb-2">Low Stock</p>
            <p className="text-2xl font-bold text-orange-900">12</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-medium mb-2">On Sale</p>
            <p className="text-2xl font-bold text-purple-900">45</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Electronics</span>
              <span className="font-medium text-gray-900">234</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Accessories</span>
              <span className="font-medium text-gray-900">189</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Clothing</span>
              <span className="font-medium text-gray-900">33</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}