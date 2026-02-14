/**
 * Seed categories and sample products for the store. Run after seedUsers: node scripts/seedCategoriesAndProducts.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Ecommerce';

const categoriesSeed = [
  { name: 'Mandatory Signs', slug: 'safety', order: 1, icon: 'ShieldAlert', color: 'text-red-500' },
  { name: 'Prohibition Signs', slug: 'directional', order: 2, icon: 'Navigation', color: 'text-blue-500' },
  { name: 'Hazard Signs', slug: 'hazard', order: 3, icon: 'AlertTriangle', color: 'text-orange-500' },
  { name: 'Banner Signs', slug: 'outdoor', order: 4, icon: 'TreePine', color: 'text-green-600' },
  { name: 'Door Signs', slug: 'restroom', order: 5, icon: 'Users', color: 'text-pink-500' },
];

async function seed() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('Connected to MongoDB.');

  const existing = await Category.countDocuments();
  if (existing > 0) {
    console.log('Categories already exist. Skip seed.');
    await mongoose.disconnect();
    process.exit(0);
  }

  const categories = await Category.insertMany(categoriesSeed);
  console.log('Seeded', categories.length, 'categories.');

  const productCount = await Product.countDocuments();
  if (productCount > 0) {
    console.log('Products already exist. Skip product seed.');
    await mongoose.disconnect();
    process.exit(0);
  }

  const products = [
    { name: 'Emergency Exit Sign', sku: 'SAF-001', category: 'Mandatory Signs', price: 12.99, priceMin: 12.99, priceMax: 24.99, description: 'Standard emergency exit sign.' },
    { name: 'First Aid Station', sku: 'SAF-002', category: 'Mandatory Signs', price: 14.99, description: 'First aid location sign.' },
    { name: 'Exit Arrow Left', sku: 'DIR-001', category: 'Prohibition Signs', price: 9.99, description: 'Directional exit arrow.' },
    { name: 'No Smoking', sku: 'HAZ-001', category: 'Hazard Signs', price: 11.99, description: 'No smoking area sign.' },
    { name: 'Welcome Banner', sku: 'OUT-001', category: 'Banner Signs', price: 29.99, description: 'Outdoor welcome banner.' },
    { name: 'Restroom Sign', sku: 'RES-001', category: 'Door Signs', price: 8.99, description: 'Restroom door sign.' },
  ];

  await Product.insertMany(products);
  console.log('Seeded', products.length, 'products.');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
