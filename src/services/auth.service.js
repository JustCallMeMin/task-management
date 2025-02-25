const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const UserRole = require("../models/user_role.model");
const transporter = require("../config/mail");
require("dotenv").config();

class AuthService {
    static async register(userData) {
        console.log("Dữ liệu nhận được tại service:", userData);
        if (!userData?.email || !userData?.password || !userData?.fullName) {
            throw new Error("Họ tên, email và mật khẩu là bắt buộc.");
        }
        const { fullName, email, phone, password } = userData;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error("Email đã được sử dụng.");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, phone, password: hashedPassword });

        // Gán quyền mặc định là "User"
        const defaultRole = await Role.findOne({ where: { roleName: "User" } });
        if (defaultRole) {
            await UserRole.create({ userId: user.userId, roleId: defaultRole.roleId });
        }

        return user;
    }

    static async login(email, password) {
        if (!email || !password) {
            throw new Error("Email và mật khẩu là bắt buộc.");
        }
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: "Roles", through: { attributes: [] } }]
        });
        if (!user) throw new Error("Tài khoản không tồn tại.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Mật khẩu không chính xác.");

        const roles = user.Roles.map(role => role.roleName);

        const token = jwt.sign(
            { userId: user.userId, roles },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { userId: user.userId, roles },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { token, refreshToken, user };
    }

    static async validateToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const foundUser = await User.findByPk(decoded.userId, {
                include: [{ model: Role, as: "Roles", through: { attributes: [] } }]
            });
            if (!foundUser) throw new Error("Người dùng không tồn tại hoặc đã bị xóa.");

            const roles = foundUser.Roles.map(role => role.roleName);
            return { userId: foundUser.userId, roles, token, message: "Token hợp lệ." };
        } catch (error) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn.");
        }
    }

    static async forgotPassword(email) {
        if (!email) throw new Error("Email là bắt buộc.");
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("Email không tồn tại.");

        function generateResetCode() {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Mã 6 số
        }

        const resetToken = generateResetCode();
        await user.update({ resetToken, resetTokenExpiry: new Date(Date.now() + 3600000) });

        await transporter.sendMail({
            to: user.email,
            subject: "Đặt lại mật khẩu",
            text: `Mã xác thực để đặt lại mật khẩu của bạn là: ${resetToken}`,
        });
    }

    static async resetPassword(resetCode, newPassword) {
        if (!resetCode || !newPassword) throw new Error("Mã xác thực và mật khẩu mới là bắt buộc.");

        const user = await User.findOne({
            where: { resetToken: resetCode, resetTokenExpiry: { [Op.gt]: new Date() } }
        });

        if (!user) throw new Error("Mã xác thực không hợp lệ hoặc đã hết hạn.");

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
    }

    static async logout(user) {
        return { message: "Đăng xuất thành công." };
    }
}

module.exports = AuthService;