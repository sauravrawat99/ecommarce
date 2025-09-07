const express = require("express");
const router = express.Router();

const { createUser } = require("../controller/userController"); // ✅ correct spelling
const validateUser = require("../middleware/userValidetior");       // ✅ correct spelling

router.post("/register", validateUser, createUser);

module.exports = router;
