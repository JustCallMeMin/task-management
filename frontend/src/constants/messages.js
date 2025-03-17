export const MESSAGES = {
	SUCCESS: {
		LOGIN: "Đăng nhập thành công!",
		REGISTER: "Đăng ký thành công! Vui lòng kiểm tra email.",
		LOGOUT: "Đăng xuất thành công!",
		PASSWORD_RESET: "Đặt lại mật khẩu thành công!",
		PASSWORD_RESET_LINK: "Link đặt lại mật khẩu đã được gửi đến email của bạn.",
		PROFILE_UPDATE: "Cập nhật thông tin thành công!",
		EMAIL_VERIFY: "Xác thực email thành công!",
		TWO_FACTOR_ENABLE: "Bật xác thực 2 lớp thành công!",
		TWO_FACTOR_DISABLE: "Tắt xác thực 2 lớp thành công!",
	},
	ERROR: {
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
			MISMATCH: "Mật khẩu xác nhận không khớp",
			WEAK: "Mật khẩu không đủ mạnh",
		},
		REGISTER: "Đăng ký thất bại. Vui lòng thử lại.",
		EMAIL_EXISTS: "Email đã được sử dụng.",
		SERVER: "Có lỗi xảy ra. Vui lòng thử lại sau.",
		NETWORK: "Không thể kết nối đến máy chủ.",
		TWO_FACTOR: {
			REQUIRED: "Yêu cầu xác thực 2 lớp",
			INVALID: "Mã xác thực không chính xác",
		},
	},
};
