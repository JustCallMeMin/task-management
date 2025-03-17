import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Alert,
	Paper,
	Grid,
	InputAdornment,
	IconButton,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Email,
	Lock,
	Person,
	Phone,
} from "@mui/icons-material";
import http from "../../services/http";

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();

	const validatePhone = (phone) => {
		const phoneRegex = /^[0-9]{10}$/;
		return phoneRegex.test(phone);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (formData.password !== formData.confirmPassword) {
			setError("Mật khẩu không khớp");
			setLoading(false);
			return;
		}

		if (formData.password.length < 8) {
			setError("Mật khẩu phải có ít nhất 8 ký tự");
			setLoading(false);
			return;
		}

		if (!formData.phone) {
			setError("Vui lòng nhập số điện thoại");
			setLoading(false);
			return;
		}

		if (!validatePhone(formData.phone)) {
			setError("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số");
			setLoading(false);
			return;
		}

		const registerData = {
			fullName: `${formData.firstName} ${formData.lastName}`,
			email: formData.email,
			phone: formData.phone,
			password: formData.password,
		};

		console.log("Sending register data:", registerData);

		try {
			await http.post("/auth/register", registerData);
			navigate("/register-success", { state: { email: formData.email } });
		} catch (err) {
			console.error("Register error:", err);
			setError(err.message || "Có lỗi xảy ra khi đăng ký");
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				background: "linear-gradient(135deg, #0079bf 0%, #5067c5 100%)",
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
							}}>
							Tạo tài khoản mới
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Bắt đầu quản lý công việc của bạn một cách hiệu quả
						</Typography>
					</Box>

					{error && (
						<Alert
							severity="error"
							sx={{
								width: "100%",
								mb: 2,
								borderRadius: 1,
							}}>
							{error}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="firstName"
									label="Tên"
									name="firstName"
									autoComplete="given-name"
									value={formData.firstName}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Person sx={{ color: "#0079bf" }} />
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
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Họ"
									name="lastName"
									autoComplete="family-name"
									value={formData.lastName}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Person sx={{ color: "#0079bf" }} />
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email"
									name="email"
									autoComplete="email"
									value={formData.email}
									onChange={handleChange}
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="phone"
									label="Số điện thoại"
									name="phone"
									autoComplete="tel"
									value={formData.phone}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Phone sx={{ color: "#0079bf" }} />
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Mật khẩu"
									type={showPassword ? "text" : "password"}
									id="password"
									autoComplete="new-password"
									value={formData.password}
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
													onClick={() => setShowPassword(!showPassword)}
													edge="end">
													{showPassword ? <VisibilityOff /> : <Visibility />}
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirmPassword"
									label="Xác nhận mật khẩu"
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									autoComplete="new-password"
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
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}
													edge="end">
													{showConfirmPassword ? (
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
							</Grid>
						</Grid>
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
								"&:hover": {
									bgcolor: "#026aa7",
								},
								borderRadius: 1,
								textTransform: "none",
								fontSize: "1rem",
							}}>
							{loading ? "Đang đăng ký..." : "Đăng ký"}
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
									Đã có tài khoản? Đăng nhập
								</Typography>
							</Link>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default Register;
