const mongoose = require('mongoose');

const BulkPricingSchema = new mongoose.Schema({
  minQuantity: {
    type: Number,
    required: true
  },
  maxQuantity: {
    type: Number
  },
  pricePerUnit: {
    type: Number,
    required: true
  }
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a base price']
  },
  materials: [{
    name: {
      type: String,
      required: true
    },
    priceModifier: {
      type: Number,
      default: 0
    }
  }],
  sizes: [{
    name: {
      type: String,
      required: true
    },
    priceModifier: {
      type: Number,
      default: 0
    }
  }],
  bulkPricing: [BulkPricingSchema],
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  customizationOptions: {
    logoUpload: {
      type: Boolean,
      default: true
    },
    customText: {
      type: Boolean,
      default: true
    },
    maxLogoSize: {
      type: Number,
      default: 5 // MB
    }
  },
  productionTime: {
    min: {
      type: Number,
      default: 3 // days
    },
    max: {
      type: Number,
      default: 7 // days
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from name
ProductSchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

// Calculate price based on quantity, material, size
ProductSchema.methods.calculatePrice = function(quantity, materialIndex, sizeIndex) {
  let price = this.basePrice;
  
  // Add material modifier
  if (materialIndex !== undefined && this.materials[materialIndex]) {
    price += this.materials[materialIndex].priceModifier;
  }
  
  // Add size modifier
  if (sizeIndex !== undefined && this.sizes[sizeIndex]) {
    price += this.sizes[sizeIndex].priceModifier;
  }
  
  // Apply bulk pricing
  let finalPricePerUnit = price;
  for (const bulk of this.bulkPricing) {
    if (quantity >= bulk.minQuantity && (!bulk.maxQuantity || quantity <= bulk.maxQuantity)) {
      finalPricePerUnit = bulk.pricePerUnit;
      break;
    }
  }
  
  return {
    unitPrice: finalPricePerUnit,
    totalPrice: finalPricePerUnit * quantity
  };
};

module.exports = mongoose.model('Product', ProductSchema);