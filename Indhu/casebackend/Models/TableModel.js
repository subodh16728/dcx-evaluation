const mongoose=require("mongoose");
const TableSchema=mongoose.Schema({
    pname:{type:String,required:true},
    pdescription:{type:String,required:true},
    pprice:{type:Number,required:true}
})
module.exports=mongoose.model("tabledata",TableSchema);