export const ROUTES = {
	AUTH: {
		LOGIN: "/login",
		REGISTER: "/register",
		REGISTER_SUCCESS: "/register-success",
		FORGOT_PASSWORD: "/forgot-password",
		RESET_PASSWORD: "/reset-password",
		VERIFY_EMAIL: "/verify-email",
	},
	DASHBOARD: "/",
	PROFILE: "/profile",
	SETTINGS: "/settings",
	TASKS: {
		LIST: "/tasks",
		CREATE: "/tasks/create",
		DETAIL: (id) => `/tasks/${id}`,
		EDIT: (id) => `/tasks/${id}/edit`,
	},
	PROJECTS: {
		LIST: "/projects",
		CREATE: "/projects/create",
		DETAIL: (id) => `/projects/${id}`,
		EDIT: (id) => `/projects/${id}/edit`,
	},
};
