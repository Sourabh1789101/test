import { useState } from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, materialIcons } from '../data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const materialPrices: Record<string, number> = {
  aluminum: 1.5,
  pvc: 1.0,
  acrylic: 2.0,
  vinyl: 0.8,
};

const sizePrices: Record<string, number> = {
  'Small': 1.0,
  'Medium': 2.5,
  'Large': 4.5,
  'X-Large': 7.0,
};

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);
  const [quantity, setQuantity] = useState(10);

  const basePrice = 15.99;
  const materialMultiplier = materialPrices[selectedMaterial] || 1;
  const sizeMultiplier = sizePrices[selectedSize] || 1;
  const unitPrice = basePrice * materialMultiplier * sizeMultiplier;
  const subtotal = unitPrice * quantity;

  // Bulk discounts
  const bulkDiscount = quantity >= 100 ? 0.2 : quantity >= 50 ? 0.15 : quantity >= 20 ? 0.1 : 0;
  const discountAmount = subtotal * bulkDiscount;
  const totalPrice = subtotal - discountAmount;

  const handleAddToCart = () => {
    // Here you would typically add to cart state/context
    alert(`Added ${quantity} x ${product.name} to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">{product.name}</h2>
            <p className="text-muted-foreground">Product Code: {product.code}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left Column - Preview */}
          <div>
            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            {/* Material Selection */}
            <div>
              <label className="block text-lg font-bold text-primary mb-3">
                Select Material
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.materials.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMaterial === material
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{materialIcons[material]}</div>
                    <div className="text-xs text-muted-foreground capitalize">{material}</div>
                    <div className="text-sm font-bold text-primary mt-1">
                      {materialMultiplier === 1 ? 'Standard' : `${materialMultiplier}x`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-lg font-bold text-primary mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSize === size.name
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold">{size.name}</div>
                    <div className="text-xs text-muted-foreground">{size.dimensions}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-bold text-primary mb-3">
                Bulk Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 10))}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center text-2xl font-bold py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={() => setQuantity(quantity + 10)}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {bulkDiscount > 0 && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-700 font-medium text-sm">
                    🎉 Bulk Discount: {(bulkDiscount * 100).toFixed(0)}% Off (Save ${discountAmount.toFixed(2)})
                  </p>
                </div>
              )}
            </div>

            {/* Live Price Calculator */}
            <div className="bg-primary text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Live Price Calculator</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Unit Price:</span>
                  <span>${unitPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Quantity:</span>
                  <span>{quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-300">
                    <span>Bulk Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg transition-colors font-bold text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
