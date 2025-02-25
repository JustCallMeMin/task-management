// src/controllers/auth.controller.js
const AuthService = require("../services/auth.service");

class AuthController {
    static async getMe(req, res) {
        try {
            console.log("📌 Dữ liệu nhận trong /me:", req.user); // ✅ Kiểm tra log
            if (!req.user) {
                return res.status(401).json({ error: "Không tìm thấy thông tin người dùng." });
            }

            res.status(200).json({
                userId: req.user.id,
                roles: req.user.roles,
                message: "Lấy thông tin người dùng thành công."
            });
        } catch (error) {
            console.error("❌ Lỗi trong getMe:", error);
            res.status(500).json({ error: "Lỗi máy chủ." });
        }
    }

    static async forgotPassword(req, res) {
        try {
            if (!req.body?.email) {
                return res.status(400).json({ error: 'Email là bắt buộc' });
            }
            const { email } = req.body;
            await AuthService.forgotPassword(email);
            res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { resetCode, newPassword } = req.body;
            await AuthService.resetPassword(resetCode, newPassword);
            res.status(200).json({ message: "Mật khẩu đã được cập nhật" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            await AuthService.logout(req.user);
            res.status(200).json({ message: 'Đăng xuất thành công' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async register(req, res) {
        console.log("📌 Hàm register() đã được gọi!");
        try {
            console.log("Header nhận được:", req.headers); // ✅ Kiểm tra headers
            console.log("Body nhận được tại controller:", req.body); // ✅ Kiểm tra dữ liệu

            if (!req.body?.fullName || !req.body?.email || !req.body?.password) {
                return res.status(400).json({ error: "Họ tên, email và mật khẩu là bắt buộc" });
            }

            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            if (!req.body?.email || !req.body?.password) {
                return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
            }
            const { email, password } = req.body;
            const { token, refreshToken, user } = await AuthService.login(email, password);
            res.status(200).json({ token, refreshToken, user });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;