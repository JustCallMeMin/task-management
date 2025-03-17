const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class TokenService {
	static generateAuthTokens(user) {
		const accessToken = jwt.sign(
			{
				userId: user._id,
				roles: user.roles,
				userName: user.fullName,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		const refreshToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: "7d" }
		);

		return { accessToken, refreshToken };
	}

	static generateOTP() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	static generateToken() {
		return crypto.randomBytes(32).toString("hex");
	}

	static hashToken(token) {
		return crypto.createHash("sha256").update(token).digest("hex");
	}

	static verifyToken(token, secret) {
		try {
			return jwt.verify(token, secret);
		} catch (error) {
			throw new Error("Token không hợp lệ hoặc đã hết hạn");
		}
	}
}

module.exports = TokenService;
