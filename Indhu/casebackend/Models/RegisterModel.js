const mongoose = require("mongoose");

const RegistarionSchema=mongoose.Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,},
    password:{type:String,required:true,maxlength:12,minlength:8},
    confirmpassword:{type:String,required:true,maxlength:12,minlength:8}

},{ timestamps: true })
// RegistarionSchema.plugin(uniqueValidator);
 
// module.exports = mongoose.model("Register", RegistarionSchema);
const usermodel=mongoose.model("Register", RegistarionSchema);
module.exports=usermodel;