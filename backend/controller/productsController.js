const Product = require("../models/productModel");
const AsyncError = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandling");
const ApiFeatures = require("../utils/apiFeachers"); // yaha add karna hai
const mongoose = require("mongoose");

// ✅ Create Product (with multiple images)
// ✅ Create Product (user/admin dono bana sakte hain, auth required)
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
    user: req.user._id, // ✅ product create karne wale ka user id
  });

  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// ✅ User → Get Own Products
const getMyProducts = AsyncError(async (req, res, next) => {
  const products = await Product.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ✅ Admin → Get All Products with user details
const getAdminProducts = AsyncError(async (req, res, next) => {
  const products = await Product.find().populate("user", "name email role");

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ✅ Get All Products (with Search, Filter, Pagination)
const getAllProducts = AsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});

// ✅ Get Single Product by ID
const getProductById = AsyncError(async (req, res, next) => {
  const { id } = req.params;

  // ✅ check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product ID format", 400));
  }

  const product = await Product.findById(id);

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
  getAllProducts, // 👈 simple getProducts ko replace karke ye add karna hai
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getAdminProducts,
};
