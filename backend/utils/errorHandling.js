const error = require("../middleware/error");
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Stack trace capture karne ke liye
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
