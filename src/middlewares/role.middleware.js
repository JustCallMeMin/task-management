/**
 * Middleware kiểm tra quyền hạn của người dùng
 */
module.exports = (roles) => {
    return (req, res, next) => {
        console.log("🔹 Kiểm tra quyền truy cập:");
        console.log("   👉 Vai trò yêu cầu:", roles);
        console.log("   👉 Vai trò hiện tại của User:", req.user ? req.user.role : "Không có user");

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Không có quyền truy cập!" });
        }
        next();
    };
};
