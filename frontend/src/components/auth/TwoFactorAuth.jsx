import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { QRCodeSVG } from "qrcode.react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Alert,
	Paper,
	CircularProgress,
} from "@mui/material";
import { fadeIn, scaleIn } from "../../styles/animations";

const TwoFactorAuth = () => {
	const [token, setToken] = useState("");
	const [qrCode, setQrCode] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);

	const { verify2FA } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const generateQR = async () => {
			try {
				// Giả sử bạn có API endpoint để lấy QR code
				// const response = await authService.generate2FA();
				// setQrCode(response.qrCode);
				setQrCode(
					"otpauth://totp/TaskApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=TaskApp"
				);
			} catch (err) {
				setError("Không thể tạo mã QR. Vui lòng thử lại.");
			} finally {
				setInitialLoading(false);
			}
		};

		generateQR();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await verify2FA(token);
			navigate("/dashboard");
		} catch (err) {
			setError(err.message || "Mã xác thực không đúng. Vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	};

	if (initialLoading) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "linear-gradient(135deg, #0079bf 0%, #5067c5 100%)",
				}}>
				<CircularProgress sx={{ color: "white" }} />
			</Box>
		);
	}

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
						Xác thực hai yếu tố
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						align="center"
						sx={{
							mb: 3,
							opacity: 0,
							animation: `${fadeIn} 0.6s ease-out forwards`,
							animationDelay: "0.3s",
						}}>
						Quét mã QR bằng ứng dụng xác thực hoặc nhập mã xác thực để tiếp tục
					</Typography>

					{error && (
						<Alert
							severity="error"
							sx={{
								width: "100%",
								mb: 2,
								borderRadius: 1,
								animation: `${scaleIn} 0.3s ease-out`,
							}}>
							{error}
						</Alert>
					)}

					<Box
						sx={{
							mb: 3,
							p: 2,
							border: "1px solid #e0e0e0",
							borderRadius: 1,
							bgcolor: "#fff",
							opacity: 0,
							animation: `${fadeIn} 0.6s ease-out forwards`,
							animationDelay: "0.4s",
						}}>
						<QRCodeSVG
							value={qrCode}
							size={200}
							level="H"
							includeMargin={true}
						/>
					</Box>

					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							width: "100%",
							opacity: 0,
							animation: `${fadeIn} 0.6s ease-out forwards`,
							animationDelay: "0.5s",
						}}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="token"
							label="Nhập mã xác thực"
							name="token"
							autoComplete="off"
							value={token}
							onChange={(e) => setToken(e.target.value)}
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
							{loading ? "Đang xác thực..." : "Xác thực"}
						</Button>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default TwoFactorAuth;
