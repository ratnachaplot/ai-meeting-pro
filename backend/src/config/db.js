const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error but DON'T exit — let server keep running
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Full error:', error);
    // Don't call process.exit(1) here
  }
};

module.exports = connectDB;