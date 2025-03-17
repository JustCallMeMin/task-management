import axios from "axios";
import { API_URL } from "../utils/constants";

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Nếu lỗi 401 và chưa thử refresh token
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post(`${API_URL}/auth/refresh-token`, {
					refreshToken,
				});

				const { token } = response.data;
				localStorage.setItem("token", token);

				// Thử lại request ban đầu với token mới
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				// Nếu refresh token thất bại, đăng xuất user
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");
				window.location.href = "/login";
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
