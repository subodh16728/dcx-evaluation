const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
  tittle: { type: String },
  description: { type: String },
  discount: { type: Number },
  startDate: { type: String },
  endDate:{type: String}
  
});

module.exports = mongoose.model("Offer", offerSchema);
