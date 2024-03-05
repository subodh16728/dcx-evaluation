const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: { type: String },
  productImageUrl: { type: String },
  productDiscription: { type: String },
  productPrice: { type: Number },
  productCategory: { type: Array },
});

module.exports = mongoose.model("Product", productSchema);
