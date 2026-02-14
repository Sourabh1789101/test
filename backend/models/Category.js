import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    icon: { type: String, default: 'Package' },
    color: { type: String, default: 'text-primary' },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
