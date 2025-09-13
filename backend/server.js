const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./db");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser"); // ✅ ye missing hai
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");  

// Routes
const Products = require("./routes/productsRoutes");
const User = require("./routes/userRoutes");

// Load env
dotenv.config({ path: "backend/.env" });

const app = express();

// ✅ CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // tumhara frontend URL
    credentials: true, // cookies/jwt ke liye zaroori
  })
);

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser()); // ✅ add cookie parser before routes
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", Products);
app.use("/api/v1", User);
app.use("/api/v1", orderRoutes);

// Error Handler (always last middleware)
app.use(errorMiddleware);

// DB Connect
dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
