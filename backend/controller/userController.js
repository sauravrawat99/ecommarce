const AsyncError = require("../middleware/asyncError");
const User = require("../models/userModel");

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
  res.status(201).json({ message: "User created successfully", user });
});
