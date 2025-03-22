// API Configuration
export const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_2FA: '/auth/verify-2fa',
    GOOGLE: '/auth/google',
    GITHUB: '/auth/github'
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    TASKS: '/dashboard/tasks',
    PROJECTS: '/dashboard/projects'
  }
};

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email'
};

// Message Types
export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại sau',
  UNAUTHORIZED: 'Vui lòng đăng nhập để tiếp tục',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại',
  SERVER_ERROR: 'Lỗi máy chủ',
  CONNECTION_ERROR: 'Không thể kết nối đến máy chủ',
  REQUIRED_FIELD: 'Trường này là bắt buộc',
  INVALID_EMAIL: 'Email không hợp lệ',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORDS_NOT_MATCH: 'Mật khẩu không khớp'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  PASSWORD_RESET_SUCCESS: 'Đặt lại mật khẩu thành công',
  PROFILE_UPDATE_SUCCESS: 'Cập nhật thông tin thành công',
  EMAIL_VERIFY_SUCCESS: 'Xác thực email thành công'
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20
}; 