const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
      products: [],
      transaction_id: {
          type:String,
          required:true
      },
      amount: { type: Number, required:true },
      address: String,
      status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
      },
      user: {
        type: String,
        required:true
      }
    },
    { timestamps: true }
  );
  
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order
  