const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        description: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        bookmarked: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("products", productSchema);