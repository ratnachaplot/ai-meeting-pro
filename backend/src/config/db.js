const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Opens the connection to MongoDB Atlas
    // process.env.MONGO_URI reads from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;