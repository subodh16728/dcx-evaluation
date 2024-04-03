const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');

const OffersSchema=mongoose.Schema({
    Title:{type:String},
    Description:{type:String},
    Discount:{type:Number},
    StartDate:{type:String},
    EndDate:{type:String},
    Availability:{type:String},
    RedemptionMethod:{type:String}
},{timestamps: true})


module.exports=mongoose.model("Offers",OffersSchema);