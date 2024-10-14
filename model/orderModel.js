const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    foodItems: [
      {
        dishName: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "Cash on Delivery"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;