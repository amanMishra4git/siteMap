// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const uri = 'mongodb+srv://amanm3033:BaUQQewpIjy0jWpa@cluster0.4ibjvcc.mongodb.net/test';
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('MongoDB connected!');
//   } catch (error) {
//     console.log('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://amanm3033:BaUQQewpIjy0jWpa@cluster0.4ibjvcc.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;