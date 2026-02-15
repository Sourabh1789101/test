const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@printmaster.com',
      password: 'admin123',
      role: 'superadmin',
      phone: '9876543210'
    });

    console.log('Admin created:', admin);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();