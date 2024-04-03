const mongoose=require("mongoose");
const TableSchema=mongoose.Schema({
    name: { type: String ,require: true},
    description: { type: String ,require: true},
    price: { type: Number ,require: true },
    category: { type: String ,
      enum: ["men's clothing", "jewelery", "electronics", "women's clothing"],
      required: true },
      features: [{
        title: { type: String, required: true },
        value: { type: String, required: true }
    }]
   
  })
module.exports=mongoose.model("product",TableSchema);

