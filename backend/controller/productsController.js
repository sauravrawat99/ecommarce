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
// Backend: getAllProducts
// Backend: getAllProducts (example with MongoDB)
const getAllProducts = async (req, res) => {
  const { page = 1, limit = 8, keyword, category, price, sort } = req.query;
  const query = {};
  console.log("Received query params:", req.query);

  if (keyword) query.name = { $regex: keyword, $options: "i" };
  if (category) {
    query.category = { $regex: new RegExp(`^${category.toLowerCase()}$`, "i") }; // Case-insensitive
    console.log("Applying category filter:", query.category);
  }
  if (price) {
    query.price = {};
    if (price.gte) query.price.$gte = Number(price.gte);
    if (price.lte) query.price.$lte = Number(price.lte);
  }

  const sortOptions = {};
  if (sort) {
    if (sort === "price" || sort === "-price")
      sortOptions.price = sort === "price" ? 1 : -1;
    else if (sort === "name" || sort === "-name")
      sortOptions.name = sort === "name" ? 1 : -1;
  }

  try {
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const productsCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(productsCount / limit);

    console.log(
      "Query executed:",
      query,
      "Sort:",
      sortOptions,
      "Products count:",
      products.length
    );
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage: Number(limit),
      currentPage: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
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

const createProductReview = AsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body || {};

  if (!rating || !comment || !productId) {
    return next(
      new ErrorHandler("Rating, comment, and productId are required", 400)
    );
  }

  // ✅ validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID format", 400));
  }

  // ✅ check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // ✅ check if user already reviewed
  const existingReview = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (existingReview) {
    // update review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // add new review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // ✅ recalculate average rating
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: existingReview
      ? "Review updated successfully"
      : "Review added successfully",
  });
});

const getProductReviews = AsyncError(async (req, res, next) => {
  const { id } = req.params;

  // ✅ check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product ID format", 400));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    ratings: product.ratings,
    count: product.reviews.length,
    reviews: product.reviews,
    message: product.reviews.length === 0 ? "No reviews yet" : undefined,
  });
});

const deleteReview = AsyncError(async (req, res, next) => {
  const { productId, reviewId } = req.query;

  // 1. Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID format", 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // 2. Filter reviews
  const review = product.reviews.find((rev) => rev._id.toString() === reviewId);

  console.log(
    "All review IDs:",
    product.reviews.map((r) => r._id.toString())
  );
  console.log("Review ID from query:", reviewId);
  console.log("Matched review:", review);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // ✅ Normal user sirf apna hi review delete kar sake
  if (
    req.user.role !== "admin" &&
    review.user.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to delete this review", 403));
  }

  product.reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== reviewId
  );

  product.numOfReviews = product.reviews.length;

  product.ratings =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts, // 👈 simple getProducts ko replace karke ye add karna hai
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getAdminProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
};
