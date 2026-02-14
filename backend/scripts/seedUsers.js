import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Ecommerce';

const seed = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`\n*** SEED SCRIPT CONNECTED TO: ${conn.connection.host} ***`);
    console.log(`*** DATABASE NAME: ${conn.connection.name} ***\n`);

    if (conn.connection.host === 'localhost' || conn.connection.host === '127.0.0.1') {
      console.warn("WARNING: You are seeding to LOCALHOST. If your server uses MongoDB Atlas, this data will NOT be visible to the app.\n");
    }
    
    // Clear existing users to avoid duplicates
    await User.deleteMany({});

    const users = [
      { loginId: 'superadmin', password: 'admin123', role: 'superadmin', active: true },
      { loginId: 'employee1', password: 'user123', role: 'employee', companyName: 'PrintMaster', active: true },
    ];

    // Use save() to trigger the pre-save hook in User.js for correct hashing
    for (const user of users) {
      await new User(user).save();
    }

    console.log('Seeded: superadmin (admin123) and employee1 (user123).');

    // SELF-VERIFICATION
    const admin = await User.findOne({ loginId: 'superadmin' });
    const isMatch = await admin.matchPassword('admin123');
    console.log(`\n[VERIFICATION] Does 'admin123' match superadmin? ${isMatch ? 'YES ✅' : 'NO ❌'}`);

    process.exit();
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seed();