const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"], // ✅ Required validator
    minlength: [3, "Name should be at least 3 characters long"], // ✅ Min length validator
  },
  email: {
    type: String,
    required: [true, "Please enter your email"], // ✅ Required
    unique: true, // ✅ Duplicate allow nahi hoga
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // ✅ Regex validator
  },
  password: {
    type: String,
    required: [true, "Please enter your password"], // ✅ Required
    minlength: [6, "Password must be at least 6 characters"], // ✅ Min length
    select: false, // DB se fetch karte waqt password dikhna nahi chahiye
  },
  role: {
    type: String,
    enum: ["user", "admin"], // ✅ Sirf yehi values allowed
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Password ko save karne se pehle hash karna
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password compare karne ke liye method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT token generate karne ke liye method

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
