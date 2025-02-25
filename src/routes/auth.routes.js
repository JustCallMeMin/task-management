const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { loginLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

// Đăng ký tài khoản
router.post("/register", AuthController.register);

// Đăng nhập (có giới hạn số lần thử)
router.post("/login", loginLimiter, AuthController.login);

// Đặt lại mật khẩu
router.post("/reset-password", AuthController.resetPassword);

// Kiểm tra xác thực
router.get("/me", authenticate, AuthController.getMe);

// Yêu cầu reset password
router.post("/forgot-password", AuthController.forgotPassword);

// Đặt lại mật khẩu sau khi nhận email
router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
