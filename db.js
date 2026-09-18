const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Correct URL-encoded Connection String
    const atlasURI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagarkwz@cluster0.njjkys0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(atlasURI, {
      dbName: 'ecommerce_db' // Specific database define kiya hai
    });
    
    console.log('MongoDB Atlas Connected Live!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;