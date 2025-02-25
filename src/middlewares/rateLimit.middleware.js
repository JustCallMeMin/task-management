const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5,
    message: "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau 15 phút",
    headers: true,
});

module.exports = { loginLimiter };
