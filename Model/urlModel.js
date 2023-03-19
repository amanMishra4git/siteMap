// const mongoose = require('mongoose');

// const urlSchema = new mongoose.Schema({
//   url: String,
// });

// const UrlModel = mongoose.model('Url', urlSchema);

// module.exports = UrlModel;

const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
});

module.exports = model('Url', urlSchema);