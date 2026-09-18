const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Apni Atlas connection string yahan check karein
    await mongoose.connect('YOUR_MONGODB_ATLAS_URL_HERE');
    console.log('MongoDB Atlas Connected Live!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;