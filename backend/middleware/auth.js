const asyncError = require("./asyncError");
const ErrorHandler = require("../utils/errorHandling");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authentication = asyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User find karo aur req me attach karo
    req.user = await User.findById(decoded.id);

    next(); // ✅ token valid → next middleware/controller
  } catch (error) {
    return next(new ErrorHandler("Token is invalid or expired", 401));
  }
});

exports.authrole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
