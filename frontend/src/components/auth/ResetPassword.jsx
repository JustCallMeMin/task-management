import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Alert,
	Paper,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Lock, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const ResetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { resetPassword } = useAuth();
	const email = location.state?.email;

	const [formData, setFormData] = useState({
		otp: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState({
		newPassword: false,
		confirmPassword: false,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	if (!email) {
		return (
			<Container component="main" maxWidth="xs">
				<Alert severity="error" sx={{ mt: 4 }}>
					Vui lòng thực hiện quy trình quên mật khẩu từ đầu.
				</Alert>
			</Container>
		);
	}

	const handleClickShowPassword = (field) => {
		setShowPassword((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		if (formData.newPassword !== formData.confirmPassword) {
			return setError("Mật khẩu xác nhận không khớp");
		}

		if (formData.newPassword.length < 6) {
			return setError("Mật khẩu phải có ít nhất 6 ký tự");
		}

		setLoading(true);

		try {
			await resetPassword(email, formData.otp, formData.newPassword);
			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (err) {
			setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				py: 3,
			}}>
			<Container component="main" maxWidth="xs">
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						borderRadius: 2,
						bgcolor: "rgba(255, 255, 255, 0.95)",
					}}>
					<Typography
						component="h1"
						variant="h4"
						sx={{
							fontWeight: 600,
							color: "#0079bf",
							mb: 1,
						}}>
						Đặt lại mật khẩu
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
						Nhập mã OTP và mật khẩu mới của bạn
					</Typography>

					{error && (
						<Alert severity="error" sx={{ width: "100%", mb: 2 }}>
							{error}
						</Alert>
					)}

					{success && (
						<Alert severity="success" sx={{ width: "100%", mb: 2 }}>
							Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng
							nhập...
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<TextField
							margin="normal"
							required
							fullWidth
							name="otp"
							label="Mã OTP"
							type="text"
							id="otp"
							value={formData.otp}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Key sx={{ color: "#0079bf" }} />
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#0079bf",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#0079bf",
									},
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#0079bf",
								},
							}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="newPassword"
							label="Mật khẩu mới"
							type={showPassword.newPassword ? "text" : "password"}
							id="newPassword"
							value={formData.newPassword}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock sx={{ color: "#0079bf" }} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => handleClickShowPassword("newPassword")}
											edge="end">
											{showPassword.newPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#0079bf",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#0079bf",
									},
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#0079bf",
								},
							}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							label="Xác nhận mật khẩu mới"
							type={showPassword.confirmPassword ? "text" : "password"}
							id="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock sx={{ color: "#0079bf" }} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => handleClickShowPassword("confirmPassword")}
											edge="end">
											{showPassword.confirmPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#0079bf",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#0079bf",
									},
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#0079bf",
								},
							}}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={loading || success}
							sx={{
								mt: 3,
								mb: 2,
								py: 1.5,
								bgcolor: "#0079bf",
								"&:hover": {
									bgcolor: "#026aa7",
								},
								borderRadius: 1,
								textTransform: "none",
								fontSize: "1rem",
							}}>
							{loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
						</Button>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default ResetPassword;
