// utils/sendToken.js
const sendToken = (user, res, options = {}) => {
  const token = user.getJwtToken();

  const {
    statusCode = 200,
    message = "Success",
    extraData = {},
    setCookie = false,
  } = options;

  // Agar cookie bhi chahiye
  if (setCookie) {
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 din
    };
    res.cookie("token", token, cookieOptions);
  }

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
    ...extraData, // agar extra fields bhejni ho
  });
};

module.exports = sendToken;
