import axios from "axios";

const API_URL = "http://localhost:5001/api";

const http = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// Request interceptor
http.interceptors.request.use(
	(config) => {
		console.log("Request URL:", config.url);

		// Danh sách các routes không cần token
		const publicRoutes = [
			"/auth/login",
			"/auth/register",
			"/auth/verify-email",
			"/auth/resend-activation",
			"/auth/forgot-password",
			"/auth/reset-password",
			"/auth/google",
			"/auth/google/callback",
			"/auth/github",
			"/auth/github/callback",
		];

		// Kiểm tra nếu URL hiện tại thuộc public routes
		const isPublicRoute = publicRoutes.some((route) =>
			config.url.includes(route)
		);

		if (!isPublicRoute) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} else {
			// Đảm bảo xóa header Authorization cho public routes
			delete config.headers.Authorization;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
http.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.error("HTTP Error:", {
			config: error.config,
			response: error.response,
			message: error.message,
		});

		if (error.response) {
			// Server trả về response với status code nằm ngoài 2xx
			const message =
				error.response.data?.error ||
				error.response.data?.message ||
				"Lỗi từ server";
			throw new Error(message);
		} else if (error.request) {
			// Request được gửi nhưng không nhận được response
			throw new Error("Không thể kết nối đến server");
		} else {
			// Có lỗi khi thiết lập request
			throw new Error("Lỗi khi gửi request");
		}
	}
);

export default http;
