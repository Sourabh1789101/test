const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['material', 'supply', 'finished_product'],
    required: true
  },
  unit: {
    type: String,
    enum: ['sq_ft', 'sheets', 'rolls', 'pieces', 'liters', 'kg'],
    required: true
  },
  currentStock: {
    type: Number,
    default: 0,
    min: 0
  },
  minimumStock: {
    type: Number,
    default: 10,
    min: 0
  },
  reorderPoint: {
    type: Number,
    default: 20
  },
  costPerUnit: {
    type: Number,
    default: 0
  },
  supplier: {
    name: String,
    contactEmail: String,
    contactPhone: String
  },
  lastRestocked: Date,
  lastUsed: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  location: String,
  notes: String
}, {
  timestamps: true
});

// Check if stock is low
inventorySchema.methods.isLowStock = function() {
  return this.currentStock <= this.minimumStock;
};

// Check if needs reorder
inventorySchema.methods.needsReorder = function() {
  return this.currentStock <= this.reorderPoint;
};

// Deduct stock
inventorySchema.methods.deductStock = function(quantity) {
  if (this.currentStock < quantity) {
    throw new Error('Insufficient stock');
  }
  this.currentStock -= quantity;
  this.lastUsed = new Date();
  return this.save();
};

// Add stock
inventorySchema.methods.addStock = function(quantity) {
  this.currentStock += quantity;
  this.lastRestocked = new Date();
  return this.save();
};

module.exports = mongoose.model('Inventory', inventorySchema);
