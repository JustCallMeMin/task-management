export const API_URL = "http://localhost:5001/api";

export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		REFRESH_TOKEN: "/auth/refresh-token",
		VERIFY_EMAIL: "/auth/verify-email",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",
	},
	USER: {
		PROFILE: "/users/profile",
		UPDATE: "/users/profile",
		CHANGE_PASSWORD: "/users/password",
	},
	TASKS: {
		LIST: "/tasks",
		DETAIL: (id) => `/tasks/${id}`,
	},
	PROJECTS: {
		LIST: "/projects",
		DETAIL: (id) => `/projects/${id}`,
		MEMBERS: {
			ADD: (id) => `/projects/${id}/members`,
			REMOVE: (id, userId) => `/projects/${id}/members/${userId}`,
		},
	},
};

export const SUCCESS_MESSAGES = {
	LOGIN: "Đăng nhập thành công!",
	REGISTER: "Đăng ký thành công! Vui lòng kiểm tra email.",
	LOGOUT: "Đăng xuất thành công!",
	PASSWORD_RESET: "Đặt lại mật khẩu thành công!",
	PASSWORD_RESET_LINK: "Link đặt lại mật khẩu đã được gửi đến email của bạn.",
	PROFILE_UPDATE: "Cập nhật thông tin thành công!",
	EMAIL_VERIFY: "Xác thực email thành công!",
	TWO_FACTOR_ENABLE: "Bật xác thực 2 lớp thành công!",
	TWO_FACTOR_DISABLE: "Tắt xác thực 2 lớp thành công!",
};

export const ERROR_MESSAGES = {
	LOGIN: {
		INVALID_CREDENTIALS: "Email hoặc mật khẩu không chính xác",
		ACCOUNT_NOT_VERIFIED: "Tài khoản chưa được kích hoạt",
		ACCOUNT_BLOCKED: "Tài khoản đã bị khóa",
		SESSION_EXPIRED: "Phiên đăng nhập đã hết hạn",
	},
	AUTH: {
		INVALID_TOKEN: "Token không hợp lệ hoặc đã hết hạn",
		UNAUTHORIZED: "Vui lòng đăng nhập",
		FORBIDDEN: "Không có quyền truy cập",
	},
	PASSWORD: {
		INVALID_OTP: "Mã OTP không hợp lệ hoặc đã hết hạn",
		RESET_SUCCESS: "Đặt lại mật khẩu thành công",
	},
	REGISTER_FAILED: "Đăng ký thất bại. Vui lòng thử lại.",
	EMAIL_EXISTS: "Email đã được sử dụng.",
	SERVER_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau.",
	NETWORK_ERROR: "Không thể kết nối đến máy chủ.",
	REQUIRES_2FA: "Yêu cầu xác thực 2 lớp.",
	INVALID_2FA: "Mã xác thực không chính xác.",
	PASSWORD_MISMATCH: "Mật khẩu xác nhận không khớp.",
	WEAK_PASSWORD: "Mật khẩu không đủ mạnh.",
};

export const TASK_STATUS = {
	TODO: "TODO",
	IN_PROGRESS: "IN_PROGRESS",
	REVIEW: "REVIEW",
	DONE: "DONE",
};

export const TASK_PRIORITY = {
	LOW: "LOW",
	MEDIUM: "MEDIUM",
	HIGH: "HIGH",
	URGENT: "URGENT",
};

export const USER_ROLE = {
	ADMIN: "ADMIN",
	USER: "USER",
};

export const MESSAGES = {
	SUCCESS: {
		LOGIN: "Đăng nhập thành công!",
		REGISTER: "Đăng ký thành công! Vui lòng kiểm tra email.",
		LOGOUT: "Đăng xuất thành công!",
		UPDATE_PROFILE: "Cập nhật thông tin thành công!",
	},
	ERROR: {
		LOGIN: "Đăng nhập thất bại. Vui lòng kiểm tra lại.",
		REGISTER: "Đăng ký thất bại. Vui lòng thử lại.",
		NETWORK: "Không thể kết nối đến máy chủ.",
		SERVER: "Có lỗi xảy ra. Vui lòng thử lại sau.",
		UNAUTHORIZED: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
	},
};
