const mongoose = require('mongoose');
//const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Schema } = mongoose

const Productschema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: {
        type: String,
        enum: ["men's clothing", "jewelery", "electronics", "women's clothing"],
        required: true
    },
    features: [{
        title: { type: String, required: true },
        value: { type: String, required: true }
    }]

});

//Productschema.plugin(mongoose_fuzzy_searching, { fields: ['ProductName', 'category'] });
//This model will be use by the name: Products
module.exports = mongoose.model('Products', Productschema)