const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const asyncError = require("../middleware/asyncError"); // ✅ async handler (consistent naming)
const ErrorHandler = require("../utils/errorHandling"); // ✅ custom error handler

// ✅ Create new order (User)
exports.newOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // 📝 Order create karte waqt user ki id bhi save ho rahi hai
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id, // logged in user ka reference
  });

  res.status(201).json({ success: true, order });
});

// ✅ Get single order (Admin + Owner)
exports.getSingleOrder = asyncError(async (req, res, next) => {
  // 📝 populate se user ke name aur email bhi aa jayenge
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  console.log(order);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  res.status(200).json({ success: true, order });
});

// ✅ Get my orders (User)
exports.myOrders = asyncError(async (req, res, next) => {
  // 📝 current user ke saare orders fetch
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ success: true, orders });
});

// ✅ Get all orders (Admin)
exports.getAllOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find();

  // 📝 total revenue calculate karna
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({ success: true, totalAmount, orders });
});

// ✅ Update order status (Admin)
exports.updateOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order already delivered", 400));
  }

  // 📝 Stock update karna for each product
  for (const o of order.orderItems) {
    const product = await Product.findById(o.product);

    if (!product) {
      return next(new ErrorHandler(`Product not found: ${o.product}`, 404));
    }

    product.stock -= o.quantity;

    if (product.stock < 0) {
      return next(
        new ErrorHandler(`Product ${product.name} is out of stock`, 400)
      );
    }

    await product.save({ validateBeforeSave: false });
  }

  // 📝 Order status update
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, message: "Order updated successfully" });
});

// ✅ Delete order (Admin)
exports.deleteOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  await order.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});
