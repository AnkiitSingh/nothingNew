var mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    quantity: {
      type: String,
      maxlength: 10,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
