import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Alert,
	Paper,
	InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const { forgotPassword } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		setLoading(true);

		try {
			await forgotPassword(email);
			setSuccess(true);
			// Chuyển hướng đến trang reset password sau 2 giây
			setTimeout(() => {
				navigate("/reset-password", { state: { email } });
			}, 2000);
		} catch (err) {
			setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
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
						Quên mật khẩu?
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
						Nhập email của bạn để nhận mã xác thực
					</Typography>

					{error && (
						<Alert severity="error" sx={{ width: "100%", mb: 2 }}>
							{error}
						</Alert>
					)}

					{success && (
						<Alert severity="success" sx={{ width: "100%", mb: 2 }}>
							Chúng tôi đã gửi mã xác thực đến email của bạn. Đang chuyển
							hướng...
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email sx={{ color: "#0079bf" }} />
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
							{loading ? "Đang gửi..." : "Gửi mã xác thực"}
						</Button>
						<Box sx={{ textAlign: "center" }}>
							<Link
								to="/login"
								style={{
									textDecoration: "none",
								}}>
								<Typography
									variant="body2"
									sx={{
										color: "#0079bf",
										"&:hover": {
											color: "#026aa7",
										},
									}}>
									Quay lại đăng nhập
								</Typography>
							</Link>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default ForgotPassword;
