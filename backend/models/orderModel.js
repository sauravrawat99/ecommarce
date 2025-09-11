const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
      phoneNo: { type: Number, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: { type: String }, // Razorpay/Stripe paymentId
      orderId: { type: String }, // Razorpay/Stripe orderId
      signature: { type: String }, // Razorpay signature verify
      status: { type: String }, // "created", "paid", "failed"
      method: { type: String }, // "card", "upi", "netbanking"
      email: { type: String }, // payer email
    },
    paidAt: { type: Date },
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing", // Processing -> Shipped -> Delivered
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
