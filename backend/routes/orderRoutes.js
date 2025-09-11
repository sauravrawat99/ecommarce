const express = require("express");
const router = express.Router();
const { authentication, authrole } = require("../middleware/auth");

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

// User
router.post("/order/new", authentication, newOrder);
router.get("/order/:id", authentication, getSingleOrder);
router.get("/orders/me", authentication, myOrders);

// Admin
router.get("/admin/orders", authentication, authrole("admin"), getAllOrders);
router.put("/admin/order/:id", authentication, authrole("admin"), updateOrder);
router.delete("/admin/order/:id", authentication, authrole("admin"), deleteOrder);

module.exports = router;
