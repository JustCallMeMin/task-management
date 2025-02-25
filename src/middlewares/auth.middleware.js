const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const UserRole = require("../models/user_role.model");
const RolePermission = require("../models/role_permission.model");
const Permission = require("../models/permission.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập. Vui lòng đăng nhập!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("📌 Token decoded:", decoded); // ✅ Kiểm tra giá trị

        if (!decoded.userId) {
            return res.status(401).json({ message: "Token không hợp lệ!" });
        }

        const user = await User.findOne({
            where: { userId: decoded.userId },
            include: [{ model: Role, as: "Roles" }]
        });

        if (!user) {
            return res.status(401).json({ message: "Tài khoản không tồn tại hoặc đã bị xóa!" });
        }

        // Lấy danh sách tên vai trò từ user
        const roleNames = user.Roles.map(role => role.roleName);
        console.log("✅ Vai trò của User:", roleNames);

        req.user = {
            id: user.userId,
            roles: roleNames
        };

        console.log("📌 Dữ liệu user gán vào req.user:", req.user); // ✅ Kiểm tra giá trị
        next();
    } catch (error) {
        console.log("❌ Lỗi xác thực:", error);
        return res.status(403).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn!" });
    }
};

const authorize = (permissions) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.roles) {
                return res.status(403).json({ message: "Forbidden: Bạn không có quyền truy cập!" });
            }

            // ✅ Tìm Role của User và lấy Permission từ Role
            const userRoles = await Role.findAll({
                where: { roleName: req.user.roles },
                include: [{ model: Permission, as: "Permissions" }]
            });

            // ✅ Trích xuất danh sách quyền từ Role
            const permissionNames = userRoles.flatMap(role => role.Permissions.map(perm => perm.permissionName));

            console.log("✅ Danh sách quyền của User:", permissionNames); // Debug log

            if (!permissions.some((perm) => permissionNames.includes(perm))) {
                return res.status(403).json({ message: "Forbidden: Bạn không có quyền truy cập!" });
            }
            next();
        } catch (error) {
            console.log("❌ Lỗi phân quyền:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
module.exports = { authenticate, authorize };
