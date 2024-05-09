const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://blogapp:test001@blog-cluster.kddxqzn.mongodb.net/?retryWrites=true&w=majority&appName=blog-cluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
