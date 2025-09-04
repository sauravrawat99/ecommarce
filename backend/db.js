// Mongoose ko import kar rahe hai (MongoDB ke sath connect karne ke liye)
const mongoose = require("mongoose");
// ================= MongoDB Connection =================
const dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // (Recommended option for MongoDB driver)
      useUnifiedTopology: true, // (Recommended option for MongoDB driver)
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ DB Error: ", err));
};

module.exports = dbconnect;
