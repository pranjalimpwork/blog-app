const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const MONGO_URL=process.env.MONGO_URL


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
