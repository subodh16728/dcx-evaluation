const mongoose = require('mongoose');
const Registeruser=require('../Models/RegisterModel');
const Product=require('../Models/TableModel');
const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Registeruser,
    required: true
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true
  }]
});
 
module.exports = mongoose.model('Bookmark', bookmarkSchema);