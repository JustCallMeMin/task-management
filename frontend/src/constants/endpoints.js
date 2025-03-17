export const API_URL = "http://localhost:5001/api";

export const API_ENDPOINTS = {
	AUTH: {
		REGISTER: "/auth/register",
		LOGIN: "/auth/login",
		LOGOUT: "/auth/logout",
		REFRESH_TOKEN: "/auth/refresh-token",
		VERIFY_EMAIL: "/auth/verify",
		FORGOT_PASSWORD: "/auth/password/forgot",
		RESET_PASSWORD: "/auth/password/reset",
	},
	TWO_FACTOR: {
		GENERATE: "/two-factor/generate",
		VERIFY: "/two-factor/verify",
		DISABLE: "/two-factor/disable",
		BACKUP_CODES: {
			GENERATE: "/two-factor/backup-codes/generate",
			VERIFY: "/two-factor/backup-codes/verify",
		},
	},
	USER: {
		PROFILE: "/users/profile",
		UPDATE_PROFILE: "/users/profile",
		CHANGE_PASSWORD: "/users/password",
	},
	TASK: {
		BASE: "/tasks",
		CREATE: "/tasks",
		UPDATE: "/tasks/:id",
		DELETE: "/tasks/:id",
		GET_ALL: "/tasks",
		GET_BY_ID: "/tasks/:id",
	},
	PROJECT: {
		BASE: "/projects",
		CREATE: "/projects",
		UPDATE: "/projects/:id",
		DELETE: "/projects/:id",
		GET_ALL: "/projects",
		GET_BY_ID: "/projects/:id",
		MEMBERS: {
			ADD: "/projects/:id/members",
			REMOVE: "/projects/:id/members/:userId",
			UPDATE_ROLE: "/projects/:id/members/:userId/role",
		},
	},
	GROUP: {
		BASE: "/groups",
		CREATE: "/groups",
		UPDATE: "/groups/:id",
		DELETE: "/groups/:id",
		GET_ALL: "/groups",
		GET_BY_ID: "/groups/:id",
		MEMBERS: {
			ADD: "/groups/:id/members",
			REMOVE: "/groups/:id/members/:userId",
			UPDATE_ROLE: "/groups/:id/members/:userId/role",
		},
	},
};
