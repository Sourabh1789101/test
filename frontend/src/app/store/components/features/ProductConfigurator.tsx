import { useState } from 'react';
import { Upload, Check } from 'lucide-react';
import { Link } from 'react-router';

const materials = [
  { id: 'aluminum', name: 'Aluminum (Heavy Duty)', price: 24.99 },
  { id: 'pvc', name: 'PVC (Standard)', price: 14.99 },
  { id: 'acrylic', name: 'Acrylic (Premium)', price: 34.99 },
];

const sizes = [
  { id: 'small', name: 'Small (12x12)', multiplier: 1 },
  { id: 'medium', name: 'Medium (24x24)', multiplier: 2.5 },
  { id: 'large', name: 'Large (36x48)', multiplier: 4.5 },
];

export function ProductConfigurator() {
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(50);
  const [logoUploaded, setLogoUploaded] = useState(false);

  const material = materials.find((m) => m.id === selectedMaterial);
  const size = sizes.find((s) => s.id === selectedSize);
  const basePrice = material ? material.price * (size?.multiplier || 1) : 0;
  const totalPrice = basePrice * quantity;
  
  // Calculate bulk savings
  const bulkDiscount = quantity >= 100 ? 0.15 : quantity >= 50 ? 0.1 : 0;
  const discountAmount = totalPrice * bulkDiscount;
  const finalPrice = totalPrice - discountAmount;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoUploaded(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Product Configurator
          </h1>
          <p className="text-muted-foreground">
            Customize your bulk signage order with live preview
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-primary mb-6">Live Preview</h2>
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Sign Background */}
              <div 
                className={`w-4/5 h-4/5 rounded-lg shadow-2xl flex flex-col items-center justify-center relative ${
                  selectedMaterial === 'aluminum' ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                  selectedMaterial === 'pvc' ? 'bg-gradient-to-br from-white to-gray-100' :
                  'bg-gradient-to-br from-blue-50 to-blue-100'
                }`}
              >
                {/* Logo Preview Area */}
                {logoUploaded ? (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-primary text-4xl font-bold">LOGO</span>
                    </div>
                    <div className="bg-primary/90 text-white px-6 py-3 rounded text-sm">
                      YOUR COMPANY NAME
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Upload className="w-16 h-16 mx-auto mb-4" />
                    <p>Upload logo to preview</p>
                  </div>
                )}
              </div>

              {/* Material Label */}
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-sm">
                {material?.name.split(' ')[0]}
              </div>

              {/* Size Label */}
              <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded text-sm">
                {size?.name}
              </div>
            </div>

            {/* Material Sample Images */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded border-2 border-gray-300 mb-2"></div>
                <p className="text-xs text-muted-foreground">aluminum</p>
              </div>
              <div className="text-center">
                <div className="h-16 bg-gradient-to-br from-white to-gray-100 rounded border-2 border-gray-300 mb-2"></div>
                <p className="text-xs text-muted-foreground">PVC</p>
              </div>
              <div className="text-center">
                <div className="h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded border-2 border-gray-300 mb-2"></div>
                <p className="text-xs text-muted-foreground">Acrylic</p>
              </div>
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <label className="block text-lg font-bold text-primary mb-4">
                Upload Company Logo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/png,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all"
                >
                  {logoUploaded ? (
                    <div className="text-center">
                      <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">Logo Uploaded</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-700 font-medium">
                        Drag & Drop or Click to Upload
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG or SVG (Max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Material Picker */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <label className="block text-lg font-bold text-primary mb-4">
                Select Material
              </label>
              <div className="space-y-3">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      selectedMaterial === mat.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMaterial === mat.id
                            ? 'border-accent'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMaterial === mat.id && (
                          <div className="w-3 h-3 rounded-full bg-accent"></div>
                        )}
                      </div>
                      <span className="font-medium">{mat.name}</span>
                    </div>
                    <span className="text-primary font-bold">
                      ${mat.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <label className="block text-lg font-bold text-primary mb-4">
                Select Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <label className="block text-lg font-bold text-primary mb-4">
                Bulk Quantity
              </label>
              <input
                type="number"
                min="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-xl"
              />
              {bulkDiscount > 0 && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-700 font-medium text-sm">
                    🎉 Bulk Savings: {(bulkDiscount * 100).toFixed(0)}% Off
                    (Save ${discountAmount.toFixed(2)})
                  </p>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-primary text-white rounded-lg shadow-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-300">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-3 flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg transition-colors font-bold text-lg flex items-center justify-center gap-2"
              >
                Place Bulk Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
