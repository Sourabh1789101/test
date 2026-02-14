import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true }, // Changed from 'code' to 'sku' for admin consistency
    category: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    priceRange: {
      min: { type: Number },
      max: { type: Number }
    },
    imageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    materials: [{ type: String, enum: ['aluminum', 'pvc', 'acrylic', 'vinyl'] }],
    sizes: [{ 
      name: { type: String }, 
      dimensions: { type: String } 
    }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);