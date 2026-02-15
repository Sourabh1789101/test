const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: String,
    designation: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    sameAsBilling: {
      type: Boolean,
      default: true
    }
  },
  taxId: String,
  creditLimit: {
    type: Number,
    default: 0
  },
  paymentTerms: {
    type: String,
    enum: ['net_15', 'net_30', 'net_60', 'prepaid'],
    default: 'net_30'
  },
  discountLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 50
  },
  notes: String,
  isActive: {
    type: Boolean,
    default: true
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  lastOrderDate: Date
}, {
  timestamps: true
});

// Update stats after order
clientSchema.methods.updateStats = function(orderTotal) {
  this.totalOrders += 1;
  this.totalSpent += orderTotal;
  this.lastOrderDate = new Date();
  return this.save();
};

module.exports = mongoose.model('Client', clientSchema);