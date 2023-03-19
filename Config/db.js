const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://amanm3033:BaUQQewpIjy0jWpa@cluster0.4ibjvcc.mongodb.net/test';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected!');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;