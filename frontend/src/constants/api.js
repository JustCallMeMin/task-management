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
		TWO_FACTOR: {
			GENERATE: "/auth/2fa/generate",
			VERIFY: "/auth/2fa/verify",
			BACKUP_CODES: {
				GENERATE: "/auth/2fa/backup-codes",
				VERIFY: "/auth/2fa/backup-codes/verify",
			},
		},
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
