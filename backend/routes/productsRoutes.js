const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createProduct,
  getAllProducts, 
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController");

// Routes
router.post("/products", upload.array("images", 5), createProduct); // multiple image upload
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
