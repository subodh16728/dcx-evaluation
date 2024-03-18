const mongoose = require("mongoose");

const RegistarionSchema=mongoose.Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    age:{type:Number},
    gender:{type:String}

    

},{ timestamps: true })

const usermodel=mongoose.model("Register", RegistarionSchema);
module.exports=usermodel;