const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [],
    transaction_id: {
      type: String,
      required: true
    },
    amount: { type: Number, required: true },
    address: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Processing",

      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved", "Returning", "Refunded","Request Return"]
=======
    
    },
    user: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order
