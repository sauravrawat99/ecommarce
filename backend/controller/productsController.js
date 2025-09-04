const Product = require("../models/productModel");

// Middleware custom error handling bar bar try catch na likna pade isliye banaya hai
const AsyncError = require("../middleware/asyncError");

// Middleware custom error handling banana utils me class bana kar costome error ayega

const ErrorHandler = require("../utils/errorHandling");

// ✅ Create Product (with multiple images)
const createProduct = AsyncError(async (req, res, next) => {
  const { name, price, description, category, brand, stock } = req.body;

  if (!name || !price || !description) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const images = req.files.map((file) => ({
    url: `/uploads/${file.filename}`,
  }));

  const product = new Product({
    name,
    price,
    description,
    category,
    brand,
    stock,
    images,
  });

  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// ✅ Get All Products
const getProducts = AsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

// ✅ Get Single Product by ID
const getProductById = AsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// ✅ Update Product
const updateProduct = AsyncError(async (req, res, next) => {
  const updates = req.body;

  if (req.files && req.files.length > 0) {
    updates.images = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
    }));
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, message: "Product updated", product });
});

// ✅ Delete Product
const deleteProduct = AsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, message: "Product deleted" });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
