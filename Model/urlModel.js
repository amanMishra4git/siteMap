const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: String,
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = UrlModel;