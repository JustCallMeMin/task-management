import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Auth components
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import RegisterSuccess from "../components/auth/RegisterSuccess";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";

// Protected components
import Dashboard from "../components/dashboard/Dashboard";
import Profile from "../components/profile/Profile";
import Settings from "../components/settings/Settings";

// Layout components
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";

const AppRoutes = () => {
	const { currentUser } = useAuth();

	return (
		<Routes>
			{/* Public Routes */}
			<Route element={<AuthLayout />}>
				<Route
					path="/login"
					element={currentUser ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/register"
					element={currentUser ? <Navigate to="/" /> : <Register />}
				/>
				<Route path="/register-success" element={<RegisterSuccess />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Route>

			{/* Protected Routes */}
			<Route
				element={
					<RequireAuth>
						<Layout />
					</RequireAuth>
				}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/settings" element={<Settings />} />
			</Route>
		</Routes>
	);
};

// Wrapper component để kiểm tra authentication
const RequireAuth = ({ children }) => {
	const { currentUser } = useAuth();
	return currentUser ? children : <Navigate to="/login" />;
};

export default AppRoutes;
