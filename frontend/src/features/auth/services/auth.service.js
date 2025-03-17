import { BaseApiService } from "../../../services/api.service";
import { API_ENDPOINTS } from "../../../utils/constants";

class AuthService extends BaseApiService {
	constructor() {
		super(API_ENDPOINTS.AUTH.REGISTER.replace("/register", ""));
	}

	async login(email, password) {
		const response = await this.post("/login", { email, password });
		if (response.token) {
			localStorage.setItem("token", response.token);
			localStorage.setItem("refreshToken", response.refreshToken);
			localStorage.setItem("user", JSON.stringify(response.user));
		}
		return response;
	}

	async register(userData) {
		return this.post("/register", userData);
	}

	async logout() {
		try {
			await this.post("/logout");
		} finally {
			localStorage.clear();
		}
	}

	async verifyEmail(token) {
		return this.post("/verify", { token });
	}

	async forgotPassword(email) {
		return this.post("/forgot-password", { email });
	}

	async resetPassword(resetCode, newPassword) {
		return this.post("/reset-password", { resetCode, newPassword });
	}

	getCurrentUser() {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	}

	isAuthenticated() {
		return !!localStorage.getItem("token");
	}

	async refreshToken() {
		try {
			const response = await this.post("/refresh");
			if (response.token) {
				localStorage.setItem("token", response.token);
			}
			return response;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async generate2FA() {
		try {
			return await this.get("/generate2FA");
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async verify2FA(token) {
		try {
			return await this.post("/verify2FA", { token });
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async verifySecurityCode(code) {
		try {
			return await this.post("/verifySecurityCode", { code });
		} catch (error) {
			throw this.handleError(error);
		}
	}

	handleError(error) {
		if (error.response) {
			return new Error(error.response.data.message || "Lỗi máy chủ");
		}
		if (error.request) {
			return new Error("Không thể kết nối đến máy chủ");
		}
		return new Error("Đã xảy ra lỗi");
	}
}

export const authService = new AuthService();
