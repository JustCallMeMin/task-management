import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
	CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { fadeIn, scaleIn } from "../../styles/animations";
import OAuthButtons from "./OAuthButtons";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Kiểm tra thông báo từ state
		const message = location.state?.message;
		if (message) {
			setSuccess(message);
			// Xóa state để tránh hiển thị lại khi refresh
			navigate(location.pathname, { replace: true });
		}
	}, [location, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await login(formData.email, formData.password);

			if (response.requiresTwoFactor) {
				navigate("/two-factor");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
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
				justifyContent: "center",
				background: "linear-gradient(135deg, #0079bf 0%, #5067c5 100%)",
				backgroundSize: "400% 400%",
				animation: "gradient 15s ease infinite",
				"@keyframes gradient": {
					"0%": {
						backgroundPosition: "0% 50%",
					},
					"50%": {
						backgroundPosition: "100% 50%",
					},
					"100%": {
						backgroundPosition: "0% 50%",
					},
				},
			}}>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					animation: `${fadeIn} 0.6s ease-out`,
				}}>
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						borderRadius: 2,
						bgcolor: "rgba(255, 255, 255, 0.95)",
						backdropFilter: "blur(10px)",
						animation: `${scaleIn} 0.5s ease-out`,
						transition: "transform 0.2s ease",
						"&:hover": {
							transform: "translateY(-5px)",
						},
					}}>
					<Box
						sx={{
							mb: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<Typography
							component="h1"
							variant="h4"
							sx={{
								fontWeight: 600,
								color: "#0079bf",
								mb: 1,
								opacity: 0,
								animation: `${fadeIn} 0.6s ease-out forwards`,
								animationDelay: "0.2s",
							}}>
							Welcome back!
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{
								opacity: 0,
								animation: `${fadeIn} 0.6s ease-out forwards`,
								animationDelay: "0.3s",
							}}>
							Đăng nhập để tiếp tục công việc của bạn
						</Typography>
					</Box>

					{success && (
						<Alert severity="success" sx={{ width: "100%", mb: 2 }}>
							{success}
						</Alert>
					)}

					{error && (
						<Alert severity="error" sx={{ width: "100%", mb: 2 }}>
							{error}
						</Alert>
					)}

					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							width: "100%",
							"& .MuiTextField-root": {
								opacity: 0,
								animation: `${fadeIn} 0.6s ease-out forwards`,
							},
							"& .MuiTextField-root:nth-of-type(1)": {
								animationDelay: "0.4s",
							},
							"& .MuiTextField-root:nth-of-type(2)": {
								animationDelay: "0.5s",
							},
						}}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email sx={{ color: "#0079bf" }} />
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									transition: "transform 0.2s ease",
									"&:hover": {
										transform: "translateX(5px)",
									},
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
							name="password"
							label="Mật khẩu"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock sx={{ color: "#0079bf" }} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									transition: "transform 0.2s ease",
									"&:hover": {
										transform: "translateX(5px)",
									},
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
							disabled={loading}
							sx={{
								mt: 3,
								mb: 2,
								py: 1.5,
								bgcolor: "#0079bf",
								opacity: 0,
								animation: `${fadeIn} 0.6s ease-out forwards`,
								animationDelay: "0.6s",
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "#026aa7",
									transform: "translateY(-2px)",
								},
								"&:active": {
									transform: "translateY(0)",
								},
								borderRadius: 1,
								textTransform: "none",
								fontSize: "1rem",
							}}>
							{loading ? <CircularProgress size={24} /> : "Đăng nhập"}
						</Button>

						<OAuthButtons />

						<Box
							sx={{
								textAlign: "center",
								"& a": {
									opacity: 0,
									animation: `${fadeIn} 0.6s ease-out forwards`,
								},
								"& a:nth-of-type(1)": {
									animationDelay: "0.7s",
								},
								"& a:nth-of-type(2)": {
									animationDelay: "0.8s",
								},
							}}>
							<Link
								to="/register"
								style={{
									textDecoration: "none",
									display: "block",
									marginBottom: "8px",
								}}>
								<Typography
									variant="body2"
									sx={{
										color: "#0079bf",
										transition: "all 0.2s ease",
										"&:hover": {
											color: "#026aa7",
											transform: "translateX(5px)",
										},
									}}>
									Chưa có tài khoản? Đăng ký ngay
								</Typography>
							</Link>
							<Link
								to="/forgot-password"
								style={{
									textDecoration: "none",
								}}>
								<Typography
									variant="body2"
									sx={{
										color: "#0079bf",
										transition: "all 0.2s ease",
										"&:hover": {
											color: "#026aa7",
											transform: "translateX(5px)",
										},
									}}>
									Quên mật khẩu?
								</Typography>
							</Link>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default Login;
