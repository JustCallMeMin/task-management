import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import http from "../../services/http";

const RegisterSuccess = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const email = location.state?.email;
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Kiểm tra thông báo từ query params
		const verifyMessage = searchParams.get("message");
		const verifyError = searchParams.get("error");

		if (verifyMessage) {
			// Chuyển hướng về trang đăng nhập với thông báo thành công
			navigate("/login", {
				state: { message: verifyMessage },
				replace: true,
			});
		} else if (verifyError) {
			setMessage({
				type: "error",
				text: verifyError,
			});
		}
	}, [searchParams, navigate]);

	const handleResendEmail = async () => {
		if (!email) {
			setMessage({
				type: "error",
				text: "Không tìm thấy email. Vui lòng đăng ký lại.",
			});
			return;
		}

		try {
			setLoading(true);
			await http.post("/auth/resend-activation", { email });
			setMessage({
				type: "success",
				text: "Email kích hoạt đã được gửi lại. Vui lòng kiểm tra hộp thư của bạn.",
			});
		} catch (error) {
			setMessage({
				type: "error",
				text: error.message || "Có lỗi xảy ra khi gửi lại email",
			});
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
				background: "linear-gradient(135deg, #0079bf 0%, #5067c5 100%)",
				py: 3,
			}}>
			<Container component="main" maxWidth="sm">
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
					<MailOutline
						sx={{
							fontSize: 64,
							color: "#0079bf",
							mb: 2,
						}}
					/>
					<Typography
						component="h1"
						variant="h4"
						sx={{
							fontWeight: 600,
							color: "#0079bf",
							mb: 2,
							textAlign: "center",
						}}>
						Đăng ký thành công!
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							mb: 2,
							textAlign: "center",
						}}>
						Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn.
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							textAlign: "center",
							mb: 3,
						}}>
						Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết xác nhận để hoàn
						tất quá trình đăng ký.
					</Typography>

					{message && (
						<Typography
							variant="body2"
							sx={{
								color: message.type === "success" ? "#4caf50" : "#f44336",
								mb: 2,
								textAlign: "center",
							}}>
							{message.text}
						</Typography>
					)}

					<Button
						variant="contained"
						onClick={handleResendEmail}
						disabled={loading}
						sx={{
							mt: 2,
							bgcolor: "#0079bf",
							"&:hover": {
								bgcolor: "#026aa7",
							},
							borderRadius: 1,
							textTransform: "none",
							fontSize: "1rem",
							px: 4,
							py: 1,
						}}>
						{loading ? "Đang gửi..." : "Gửi lại email kích hoạt"}
					</Button>

					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							mt: 3,
							textAlign: "center",
							fontStyle: "italic",
						}}>
						Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc
						nhấn nút gửi lại phía trên.
					</Typography>
				</Paper>
			</Container>
		</Box>
	);
};

export default RegisterSuccess;
