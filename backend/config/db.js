import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Load environment variables directly in this file
dotenv.config();

const connectDB = async () => {
  try {
    // 2. Read the URI inside the function to ensure it's loaded
    // If MONGO_URI is missing, it will log a clear error instead of trying localhost
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If the error is undefined URI, give a hint
    if (!process.env.MONGO_URI) {
        console.error("HINT: Make sure your .env file exists in the backend folder and contains MONGO_URI");
    }
    process.exit(1);
  }
};

export default connectDB;