const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
});

module.exports = model('Url', urlSchema);