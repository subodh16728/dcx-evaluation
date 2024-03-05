const mongoose = require('mongoose');
//const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Schema } = mongoose

const Productschema = new Schema({
    ProductName:{type: String, required:true, maxLength:50},
    category:{type: String, required:true},
    price:{type: String, required:true},
    seller:{type: String, required:true},
    description:{type: String, required:true}
});
//Productschema.plugin(mongoose_fuzzy_searching, { fields: ['ProductName', 'category'] });
//This model will be use by the name: Products
module.exports = mongoose.model('Products', Productschema)