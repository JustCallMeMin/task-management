import axios from "axios";
import { API_URL, API_ENDPOINTS } from "../utils/constants";

class AuthService {
	// Đăng ký tài khoản mới
	async register(userData) {
		try {
			const response = await axios.post(
				`${API_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
				userData
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Đăng nhập
	async login(email, password) {
		try {
			const response = await axios.post(
				`${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
				{ email, password }
			);
			if (response.accessToken) {
				localStorage.setItem("token", response.accessToken);
				localStorage.setItem("refreshToken", response.refreshToken);
				localStorage.setItem("user", JSON.stringify(response.user));
			}
			return response;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Đăng xuất
	async logout() {
		try {
			await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.LOGOUT}`);
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("user");
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Refresh token
	async refreshToken() {
		try {
			const response = await axios.post(
				`${API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`
			);
			if (response.data.token) {
				localStorage.setItem("token", response.data.token);
			}
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Tạo mã 2FA
	async generate2FA() {
		try {
			const response = await axios.get(
				`${API_URL}${API_ENDPOINTS.TWO_FACTOR.GENERATE}`
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Xác thực mã 2FA
	async verify2FA(token) {
		try {
			const response = await axios.post(
				`${API_URL}${API_ENDPOINTS.TWO_FACTOR.VERIFY}`,
				{ token }
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Xác thực mã bảo mật
	async verifySecurityCode(code) {
		try {
			const response = await axios.post(
				`${API_URL}${API_ENDPOINTS.TWO_FACTOR.BACKUP_CODES.VERIFY}`,
				{ code }
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	// Lấy thông tin người dùng hiện tại
	getCurrentUser() {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	}

	// Kiểm tra token có hợp lệ không
	isAuthenticated() {
		const token = localStorage.getItem("token");
		return !!token;
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

const authService = new AuthService();
export default authService;
