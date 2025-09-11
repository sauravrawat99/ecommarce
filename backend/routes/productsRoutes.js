const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { authentication, authrole } = require("../middleware/auth"); // ✅ import auth middleware

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getAdminProducts,
} = require("../controller/productsController");

router.post(
  "/products",
  authentication,
  authrole("admin"),
  upload.array("images", 5),
  createProduct
);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.put(
  "/products/:id",
  authentication,
  authrole("admin"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/products/:id",
  authentication,
  authrole("admin"),
  deleteProduct
);

// ✅ User Routes
router.get("/my-products", authentication, getMyProducts);

// ✅ Admin Routes
router.get(
  "/admin/products",
  authentication,
  authrole("admin"),
  getAdminProducts
);
module.exports = router;
