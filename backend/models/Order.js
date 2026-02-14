import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  sku: String,
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, default: '' },
    email: { type: String, default: '' },
    items: [orderItemSchema],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'New', enum: ['New', 'Paid', 'Shipped', 'Refunded', 'Cancelled'] },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
