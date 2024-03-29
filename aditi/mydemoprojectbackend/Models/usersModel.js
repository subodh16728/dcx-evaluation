const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist:{type: Array}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
