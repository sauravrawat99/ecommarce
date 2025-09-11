const AsyncError = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandling");
const User = require("../models/userModel");
const sendToken = require("../utils/setCookies");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncError = require("../middleware/asyncError");

//register

exports.createUser = AsyncError(async (req, res, next) => {
  const { name, email, password } = req.body || {}; // agar req.body undefined ho, {} use hoga

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  sendToken(user, res, {
    statusCode: 200,
    message: "Welcome back!",
    extraData: { role: user.role }, // ✅ extra response field
  });
});

// login

exports.login = AsyncError(async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  //  email ke basis par user dhundho aur password ko bhi fetch karo
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //  entered password compare karo
  const passwordIsMatched = await user.comparePassword(password);

  if (!passwordIsMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //  JWT token generate karo
  sendToken(user, res, {
    statusCode: 200,
    message: "User login successfully",
    setCookie: true, // ✅ token cookie me bhi set hoga
  });
});

// logout

exports.logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // turant expire ho jaye
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// forgot password

exports.forgotPassword = AsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Reset token generate

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset link is: \n\n ${resetUrl} \n\nIf you did not request this, please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password request send",
      message,
    });

    res.status(200).json({
      success: true,
      massage: `password email send to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// reset
exports.resetPassword = AsyncError(async (req, res, next) => {
  const crypto = require("crypto");

  // Token ko hash karo
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // User dhundo
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Password update karo
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Auto login after reset
  const token = user.getJwtToken();
  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

exports.getUserDetails = AsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = asyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check old password
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  // Check confirm
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Length check
  if (newPassword.length < 6) {
    return next(
      new ErrorHandler("Password must be at least 6 characters long", 400)
    );
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Send new token
  sendToken(user, res, {
    statusCode: 200,
    message: "Password updated successfully",
    setCookie: true,
  });
});

// Update Profile (only logged-in user)
exports.updateProfile = asyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (name) user.name = name;
  if (email) user.email = email;

  if (req.body.password) {
    return next(new ErrorHandler("Password do not changed", 400));
  }

  // Avatar update ka code bhi yahi aa sakta hai (cloudinary/multer use karke)

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// get all users
exports.getAllUsers = asyncError(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserById = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = asyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.updateUserRole = asyncError(async (req, res, next) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});
