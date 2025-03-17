import {
	useState,
	useEffect,
	useCallback,
	createContext,
	useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../features/auth/services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const initAuth = () => {
			const currentUser = authService.getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	const login = useCallback(async (email, password) => {
		try {
			const response = await authService.login(email, password);
			setUser(response.user);
			return response;
		} catch (error) {
			throw error;
		}
	}, []);

	const register = useCallback(async (userData) => {
		try {
			const response = await authService.register(userData);
			return response;
		} catch (error) {
			throw error;
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await authService.logout();
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	}, [navigate]);

	const verify2FA = useCallback(async (token) => {
		try {
			const response = await authService.verify2FA(token);
			if (response.user) {
				setUser(response.user);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}, []);

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		verify2FA,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
