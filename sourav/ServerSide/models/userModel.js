const mongoose = require('mongoose');
const { Schema } = mongoose
const Userschema = new Schema({
    email:{type:String, required:true},
    password: {type: String, required: true},
    name:{type:String, required:true},
    gender:{type:String, required:true},
    wishlist:{type:Array}
})

//This model will be use by the name: Users
module.exports= mongoose.model('Users', Userschema);