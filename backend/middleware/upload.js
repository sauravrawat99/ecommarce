const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage engine setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads/"; // Relative to backend folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Auto create folder if not exists
    }
    cb(null, uploadPath); // Files will save in backend/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique name with timestamp
  },
});

// File filter -> sirf images allow
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|avif/; // ✅ AVIF included
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png, webp, avif)")); // Clear error message
  }
};

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

module.exports = upload;
