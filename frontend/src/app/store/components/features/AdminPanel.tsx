import { useState } from 'react';
import { categories } from './CategorySidebar';
import { ArrowLeft, Upload, Download, DollarSign, Package, Grid3x3 } from 'lucide-react';
import { Link } from 'react-router';

export function AdminPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState('');

  const handleBulkPriceUpdate = () => {
    if (!selectedCategory || !priceAdjustment) return;
    alert(`Would update all products in ${selectedCategory} by ${priceAdjustment}%`);
  };

  const handleCSVExport = () => {
    if (!selectedCategory) return;
    alert(`Exporting ${selectedCategory} products to CSV...`);
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      alert(`Importing CSV file: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
            <p className="text-muted-foreground">Bulk management for 13 categories and 400+ products</p>
          </div>
        </div>

        {/* Global Category Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-primary mb-6">Global Category Manager</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCategory === category.id
                      ? 'border-accent bg-accent/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <span className="font-bold text-sm">{category.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{category.count}</div>
                  <div className="text-xs text-muted-foreground">products</div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory && (
          <>
            {/* Mass Material/Size Editor */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">
                Mass Editor - {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Bulk Price Adjustment */}
                <div className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Bulk Price Adjustment
                  </h3>
                  <div className="space-y-3">
                    <select
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select action...</option>
                      <option value="increase">Increase prices</option>
                      <option value="decrease">Decrease prices</option>
                      <option value="set">Set fixed price</option>
                    </select>

                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Percentage or amount"
                        value={priceAdjustment}
                        onChange={(e) => setPriceAdjustment(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg">
                        %
                      </span>
                    </div>

                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="all">Apply to all materials</option>
                      <option value="aluminum">Aluminum only</option>
                      <option value="pvc">PVC only</option>
                      <option value="acrylic">Acrylic only</option>
                      <option value="vinyl">Vinyl only</option>
                    </select>

                    <button
                      onClick={handleBulkPriceUpdate}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors font-bold"
                    >
                      Apply to All Products
                    </button>
                  </div>
                </div>

                {/* Bulk Material Management */}
                <div className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Bulk Material Management
                  </h3>
                  <div className="space-y-3">
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select material to add...</option>
                      <option value="aluminum">Add Aluminum</option>
                      <option value="pvc">Add PVC</option>
                      <option value="acrylic">Add Acrylic</option>
                      <option value="vinyl">Add Vinyl</option>
                      <option value="reflective">Add Reflective Vinyl</option>
                    </select>

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-bold">
                      Add to All Products
                    </button>

                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select material to remove...</option>
                      <option value="aluminum">Remove Aluminum</option>
                      <option value="pvc">Remove PVC</option>
                      <option value="acrylic">Remove Acrylic</option>
                      <option value="vinyl">Remove Vinyl</option>
                    </select>

                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-bold">
                      Remove from All Products
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk CSV Upload/Download */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Bulk CSV Import/Export</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Export */}
                <div className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export Category Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Download all products in this category as a CSV file. Edit in Excel and re-import.
                  </p>
                  <button
                    onClick={handleCSVExport}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Category CSV
                  </button>
                </div>

                {/* Import */}
                <div className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Import Category Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file to bulk update products. Changes will be applied to all matching products.
                  </p>
                  <label className="block">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVImport}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label
                      htmlFor="csv-upload"
                      className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Category CSV
                    </label>
                  </label>
                </div>
              </div>
            </div>

            {/* Visual Grid Management */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Grid3x3 className="w-6 h-6" />
                Visual Grid Management
              </h2>
              <p className="text-muted-foreground mb-6">
                Drag and drop products to reorder them. Most popular items should appear at the top.
              </p>

              <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <Grid3x3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Drag & Drop interface for reordering products
                </p>
                <Link
                  to={`/category/${selectedCategory}`}
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors font-bold"
                >
                  Go to Category to Reorder
                </Link>
              </div>
            </div>
          </>
        )}

        {!selectedCategory && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Select a category above to manage products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
