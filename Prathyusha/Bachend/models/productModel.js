const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: { type: String ,
    enum: ["men's clothing", "jewelery", "electronics", "women's clothing"],
    required: true },

  bookmarked: {
    type: Boolean,
    default: false // Initialize as not bookmarked
  },
  features: [{
    title: { type: String, required: true },
    value: { type: String, required: true }
}]
});

module.exports = mongoose.model('Product', productSchema);
