require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Client = require('../models/Client');
const Inventory = require('../models/Inventory');

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing data (optional - comment out to keep existing data)
    // await User.deleteMany({});
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // await Client.deleteMany({});
    // await Inventory.deleteMany({});

    // Create Superadmin
    const superadminExists = await User.findOne({ email: 'admin@printmaster.com' });
    if (!superadminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Super Admin',
        email: 'admin@printmaster.com',
        password: hashedPassword,
        role: 'superadmin'
      });
      console.log('✅ Superadmin created: admin@printmaster.com / admin123');
    } else {
      console.log('ℹ️  Superadmin already exists');
    }

    // Create Employee
    const employeeExists = await User.findOne({ email: 'employee@printmaster.com' });
    if (!employeeExists) {
      const hashedPassword = await bcrypt.hash('employee123', 10);
      await User.create({
        name: 'John Employee',
        email: 'employee@printmaster.com',
        password: hashedPassword,
        role: 'employee'
      });
      console.log('✅ Employee created: employee@printmaster.com / employee123');
    } else {
      console.log('ℹ️  Employee already exists');
    }

    // Create Categories
    const categoriesData = [
      { name: 'Safety Signs', description: 'Workplace safety and warning signs', displayOrder: 1 },
      { name: 'Hazard Signs', description: 'Hazard identification and danger signs', displayOrder: 2 },
      { name: 'Office Signs', description: 'Professional office and corporate signage', displayOrder: 3 },
      { name: 'Warehouse Signs', description: 'Warehouse and industrial signage', displayOrder: 4 },
      { name: 'Custom Signs', description: 'Fully customizable signage solutions', displayOrder: 5 }
    ];

    for (const catData of categoriesData) {
      const exists = await Category.findOne({ name: catData.name });
      if (!exists) {
        await Category.create(catData);
        console.log(`✅ Category created: ${catData.name}`);
      }
    }

    // Get category IDs
    const safetyCategory = await Category.findOne({ name: 'Safety Signs' });
    const hazardCategory = await Category.findOne({ name: 'Hazard Signs' });
    const officeCategory = await Category.findOne({ name: 'Office Signs' });
    const warehouseCategory = await Category.findOne({ name: 'Warehouse Signs' });

    // Create Products
    const productsData = [
      {
        name: 'Caution Wet Floor Sign',
        sku: 'SFT-001',
        category: safetyCategory?._id,
        description: 'High-visibility wet floor warning sign suitable for indoor use. Made from durable materials.',
        shortDescription: 'Wet floor warning sign',
        basePrice: 15.99,
        materials: [
          { name: 'PVC', priceModifier: 0 },
          { name: 'Aluminum', priceModifier: 10 },
          { name: 'Acrylic', priceModifier: 15 }
        ],
        sizes: [
          { name: 'Small (12"x12")', width: 12, height: 12, priceModifier: 0 },
          { name: 'Medium (18"x18")', width: 18, height: 18, priceModifier: 5 },
          { name: 'Large (24"x24")', width: 24, height: 24, priceModifier: 10 }
        ],
        bulkPricing: [
          { minQuantity: 10, maxQuantity: 49, discountPercent: 5 },
          { minQuantity: 50, maxQuantity: 99, discountPercent: 10 },
          { minQuantity: 100, discountPercent: 15 }
        ]
      },
      {
        name: 'Fire Exit Sign',
        sku: 'SFT-002',
        category: safetyCategory?._id,
        description: 'Glow-in-the-dark fire exit signage with directional arrow. Compliant with safety regulations.',
        shortDescription: 'Glow-in-the-dark fire exit sign',
        basePrice: 24.99,
        materials: [
          { name: 'PVC', priceModifier: 0 },
          { name: 'Aluminum', priceModifier: 12 },
          { name: 'Photoluminescent', priceModifier: 20 }
        ],
        sizes: [
          { name: 'Standard (8"x12")', width: 8, height: 12, priceModifier: 0 },
          { name: 'Large (12"x18")', width: 12, height: 18, priceModifier: 8 }
        ],
        bulkPricing: [
          { minQuantity: 5, maxQuantity: 19, discountPercent: 5 },
          { minQuantity: 20, maxQuantity: 49, discountPercent: 10 },
          { minQuantity: 50, discountPercent: 15 }
        ]
      },
      {
        name: 'Danger High Voltage',
        sku: 'HZD-001',
        category: hazardCategory?._id,
        description: 'High voltage danger warning sign. Essential for electrical areas and substations.',
        shortDescription: 'High voltage danger sign',
        basePrice: 18.99,
        materials: [
          { name: 'Aluminum', priceModifier: 0 },
          { name: 'Vinyl', priceModifier: -5 },
          { name: 'Plastic', priceModifier: -3 }
        ],
        sizes: [
          { name: 'Small (10"x7")', width: 10, height: 7, priceModifier: 0 },
          { name: 'Medium (14"x10")', width: 14, height: 10, priceModifier: 5 },
          { name: 'Large (20"x14")', width: 20, height: 14, priceModifier: 12 }
        ],
        bulkPricing: [
          { minQuantity: 10, maxQuantity: 49, discountPercent: 8 },
          { minQuantity: 50, discountPercent: 15 }
        ]
      },
      {
        name: 'Executive Nameplate',
        sku: 'OFC-001',
        category: officeCategory?._id,
        description: 'Premium executive desk nameplate with custom engraving. Professional appearance for any office.',
        shortDescription: 'Custom executive nameplate',
        basePrice: 34.99,
        materials: [
          { name: 'Wood', priceModifier: 0 },
          { name: 'Acrylic', priceModifier: 8 },
          { name: 'Metal', priceModifier: 15 }
        ],
        sizes: [
          { name: 'Standard (2"x8")', width: 2, height: 8, priceModifier: 0 },
          { name: 'Executive (2"x10")', width: 2, height: 10, priceModifier: 5 }
        ],
        bulkPricing: [
          { minQuantity: 5, maxQuantity: 19, discountPercent: 10 },
          { minQuantity: 20, discountPercent: 20 }
        ],
        allowLogoUpload: true
      },
      {
        name: 'Forklift Traffic Sign',
        sku: 'WRH-001',
        category: warehouseCategory?._id,
        description: 'Heavy-duty forklift traffic warning sign. Designed for warehouse environments.',
        shortDescription: 'Forklift traffic warning',
        basePrice: 29.99,
        materials: [
          { name: 'Aluminum', priceModifier: 0 },
          { name: 'PVC', priceModifier: -8 },
          { name: 'Steel', priceModifier: 15 }
        ],
        sizes: [
          { name: 'Standard (18"x18")', width: 18, height: 18, priceModifier: 0 },
          { name: 'Large (24"x24")', width: 24, height: 24, priceModifier: 10 }
        ],
        bulkPricing: [
          { minQuantity: 5, maxQuantity: 24, discountPercent: 5 },
          { minQuantity: 25, maxQuantity: 99, discountPercent: 12 },
          { minQuantity: 100, discountPercent: 20 }
        ]
      }
    ];

    for (const prodData of productsData) {
      if (prodData.category) {
        const exists = await Product.findOne({ sku: prodData.sku });
        if (!exists) {
          await Product.create(prodData);
          console.log(`✅ Product created: ${prodData.name}`);
        }
      }
    }

    // Create Inventory Items
    const inventoryData = [
      { name: 'Aluminum Sheets', type: 'material', unit: 'sheets', currentStock: 50, minimumStock: 20, reorderPoint: 30, costPerUnit: 45.00 },
      { name: 'PVC Boards', type: 'material', unit: 'sheets', currentStock: 100, minimumStock: 30, reorderPoint: 50, costPerUnit: 25.00 },
      { name: 'Acrylic Sheets', type: 'material', unit: 'sheets', currentStock: 35, minimumStock: 15, reorderPoint: 25, costPerUnit: 55.00 },
      { name: 'Vinyl Roll (48")', type: 'material', unit: 'rolls', currentStock: 12, minimumStock: 5, reorderPoint: 8, costPerUnit: 120.00 },
      { name: 'Printing Ink - Black', type: 'supply', unit: 'liters', currentStock: 20, minimumStock: 10, reorderPoint: 15, costPerUnit: 35.00 },
      { name: 'Printing Ink - Colors', type: 'supply', unit: 'liters', currentStock: 15, minimumStock: 8, reorderPoint: 12, costPerUnit: 40.00 },
      { name: 'Mounting Hardware Kit', type: 'supply', unit: 'pieces', currentStock: 200, minimumStock: 50, reorderPoint: 100, costPerUnit: 5.00 }
    ];

    for (const invData of inventoryData) {
      const exists = await Inventory.findOne({ name: invData.name });
      if (!exists) {
        await Inventory.create(invData);
        console.log(`✅ Inventory item created: ${invData.name}`);
      }
    }

    // Create Sample Clients
    const clientsData = [
      {
        companyName: 'TechCorp Industries',
        contactPerson: { name: 'Sarah Johnson', email: 'sarah@techcorp.com', phone: '555-0101', designation: 'Procurement Manager' },
        billingAddress: { street: '123 Tech Blvd', city: 'San Jose', state: 'CA', zipCode: '95101', country: 'USA' },
        paymentTerms: 'net_30',
        discountLevel: 10
      },
      {
        companyName: 'Global Logistics Co',
        contactPerson: { name: 'Mike Chen', email: 'mike@globallogistics.com', phone: '555-0202', designation: 'Operations Director' },
        billingAddress: { street: '456 Shipping Lane', city: 'Los Angeles', state: 'CA', zipCode: '90001', country: 'USA' },
        paymentTerms: 'net_15',
        discountLevel: 5
      },
      {
        companyName: 'SafetyFirst Manufacturing',
        contactPerson: { name: 'Emily Davis', email: 'emily@safetyfirst.com', phone: '555-0303', designation: 'Safety Officer' },
        billingAddress: { street: '789 Industrial Park', city: 'Detroit', state: 'MI', zipCode: '48201', country: 'USA' },
        paymentTerms: 'net_30',
        discountLevel: 8
      }
    ];

    for (const clientData of clientsData) {
      const exists = await Client.findOne({ 'contactPerson.email': clientData.contactPerson.email });
      if (!exists) {
        await Client.create(clientData);
        console.log(`✅ Client created: ${clientData.companyName}`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Default Login Credentials:');
    console.log('   Superadmin: admin@printmaster.com / admin123');
    console.log('   Employee: employee@printmaster.com / employee123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();