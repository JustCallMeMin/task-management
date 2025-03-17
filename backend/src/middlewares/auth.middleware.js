const TokenService = require("../services/token.service");
const UserRepository = require("../domain/repositories/user.repository");
const RefreshTokenRepository = require("../domain/repositories/refresh_token.repository");
require("dotenv").config();

// Debug log
console.log(
	"JWT_SECRET in middleware:",
	process.env.JWT_SECRET ? "Đã có" : "Chưa có"
);
console.log(
	"JWT_REFRESH_SECRET in middleware:",
	process.env.JWT_REFRESH_SECRET ? "Đã có" : "Chưa có"
);

const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "Vui lòng đăng nhập" });
		}

		const decoded = TokenService.verifyToken(token, process.env.JWT_SECRET);
		if (!decoded.userId) {
			return res.status(401).json({ message: "Token không hợp lệ" });
		}

		// Kiểm tra user có tồn tại và không bị khóa
		const user = await UserRepository.findById(decoded.userId);
		if (!user || user.isBlocked) {
			return res
				.status(401)
				.json({ message: "Tài khoản không hợp lệ hoặc đã bị khóa" });
		}

		// Gán thông tin user vào request
		req.user = {
			id: user._id,
			roles: decoded.roles || [],
			permissions: decoded.permissions || [],
			userName: user.fullName,
		};

		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			const refreshToken = req.cookies.refreshToken;
			if (!refreshToken) {
				return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
			}

			try {
				const { accessToken, refreshToken: newRefreshToken } =
					await TokenService.refreshToken(refreshToken);

				// Cập nhật token trong response
				res.setHeader("New-Token", accessToken);
				res.cookie("refreshToken", newRefreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
					maxAge: 7 * 24 * 60 * 60 * 1000,
				});

				// Verify lại token mới
				const decoded = TokenService.verifyToken(
					accessToken,
					process.env.JWT_SECRET
				);
				req.user = {
					id: decoded.userId,
					roles: decoded.roles || [],
					permissions: decoded.permissions || [],
					userName: decoded.userName,
				};

				next();
			} catch (refreshError) {
				return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
			}
		} else {
			return res.status(403).json({ message: "Không có quyền truy cập" });
		}
	}
};

const authorize = (requiredPermissions) => {
	return (req, res, next) => {
		if (!req.user || !req.user.permissions) {
			return res.status(403).json({ message: "Không có quyền truy cập" });
		}

		const hasRequiredPermissions = requiredPermissions.every((permission) =>
			req.user.permissions.includes(permission)
		);

		if (!hasRequiredPermissions) {
			return res
				.status(403)
				.json({ message: "Không có quyền thực hiện hành động này" });
		}

		next();
	};
};

module.exports = { authenticate, authorize };
