import React, { useState } from "react";
import {
	Box,
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	Avatar,
	Grid,
	Alert,
	InputAdornment,
} from "@mui/material";
import { Person, Email, Phone, Lock } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
	const { currentUser, updateProfile } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [formData, setFormData] = useState({
		fullName: currentUser?.fullName || "",
		email: currentUser?.email || "",
		phone: currentUser?.phone || "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

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
		setSuccess("");
		setLoading(true);

		try {
			if (
				formData.newPassword &&
				formData.newPassword !== formData.confirmPassword
			) {
				throw new Error("Mật khẩu mới không khớp");
			}

			await updateProfile({
				fullName: formData.fullName,
				phone: formData.phone,
				currentPassword: formData.currentPassword,
				newPassword: formData.newPassword,
			});

			setSuccess("Cập nhật thông tin thành công");
			setFormData((prev) => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}));
		} catch (err) {
			setError(err.message || "Có lỗi xảy ra khi cập nhật thông tin");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mb: 4,
					}}>
					<Avatar
						sx={{
							width: 100,
							height: 100,
							bgcolor: "#0079bf",
							fontSize: "2.5rem",
							mb: 2,
						}}>
						{currentUser?.fullName?.charAt(0)?.toUpperCase()}
					</Avatar>
					<Typography variant="h4" sx={{ color: "#0079bf", fontWeight: 600 }}>
						Thông tin cá nhân
					</Typography>
				</Box>

				{error && (
					<Alert severity="error" sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				{success && (
					<Alert severity="success" sx={{ mb: 3 }}>
						{success}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Họ và tên"
								name="fullName"
								value={formData.fullName}
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
								fullWidth
								label="Email"
								name="email"
								value={formData.email}
								disabled
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Email sx={{ color: "#0079bf" }} />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Số điện thoại"
								name="phone"
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
							<Typography variant="h6" sx={{ color: "#0079bf", mb: 2, mt: 2 }}>
								Đổi mật khẩu
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Mật khẩu hiện tại"
								name="currentPassword"
								type="password"
								value={formData.currentPassword}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock sx={{ color: "#0079bf" }} />
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
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Mật khẩu mới"
								name="newPassword"
								type="password"
								value={formData.newPassword}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock sx={{ color: "#0079bf" }} />
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
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Xác nhận mật khẩu mới"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock sx={{ color: "#0079bf" }} />
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
							mt: 4,
							py: 1.5,
							bgcolor: "#0079bf",
							"&:hover": {
								bgcolor: "#026aa7",
							},
							borderRadius: 1,
							textTransform: "none",
							fontSize: "1rem",
						}}>
						{loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default Profile;
