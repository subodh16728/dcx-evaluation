const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String ,require: true},
  description: { type: String ,require: true},
  price: { type: Number ,require: true },
  category: { type: String ,
    required: true },
    features: [{
      title: { type: String, required: true },
      value: { type: String, required: true }
  }]
 
});

module.exports = mongoose.model("Product", productSchema);
