import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../features/auth/services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Kiểm tra người dùng đã đăng nhập khi khởi động app
		const initAuth = () => {
			const currentUser = authService.getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	const login = async (email, password) => {
		try {
			const response = await authService.login(email, password);
			setUser(response.user);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const register = async (userData) => {
		try {
			const response = await authService.register(userData);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
			setUser(null);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const verify2FA = async (token) => {
		try {
			const response = await authService.verify2FA(token);
			if (response.user) {
				setUser(response.user);
			}
			return response;
		} catch (error) {
			throw error;
		}
	};

	const forgotPassword = async (email) => {
		try {
			const response = await authService.forgotPassword(email);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const resetPassword = async (resetCode, newPassword) => {
		try {
			const response = await authService.resetPassword(resetCode, newPassword);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		verify2FA,
		forgotPassword,
		resetPassword,
		isAuthenticated: !!user,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
