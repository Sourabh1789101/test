const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (!process.env.MONGO_URI) {
      console.error("HINT: Make sure your .env file exists in the backend folder and contains MONGO_URI");
    }
    process.exit(1);
  }
};

module.exports = connectDB;