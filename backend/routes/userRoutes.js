const express = require("express");
const router = express.Router();
const { authentication, authrole } = require("../middleware/auth"); // ✅ import auth middleware

const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} = require("../controller/userController");
const validateUser = require("../middleware/userValidate");
const loginValidate = require("../middleware/loginValidate");

router.post("/register", validateUser, createUser);
router.post("/login", loginValidate, login);
router.get("/logout", logout);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// GET user profile
router.get("/me", authentication, getUserDetails);

router.put("/password/update", authentication, updatePassword);
router.put("/me/update", authentication, updateProfile);

// Admin routes
router.get("/admin/users", authentication, authrole("admin"), getAllUsers);
router.get("/admin/user/:id", authentication, authrole("admin"), getUserById);
router.delete("/admin/user/:id", authentication, authrole("admin"), deleteUser);
router.put("/admin/user/:id/role", authentication, authrole("admin"), updateUserRole);

module.exports = router;
