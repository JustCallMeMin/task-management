import React, { useState } from "react";
import {
	Container,
	Paper,
	Typography,
	Switch,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Divider,
	Alert,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const Settings = () => {
	const { currentUser, updateSettings } = useAuth();
	const [settings, setSettings] = useState({
		emailNotifications: currentUser?.settings?.emailNotifications || false,
		twoFactorAuth: currentUser?.settings?.twoFactorAuth || false,
		darkMode: currentUser?.settings?.darkMode || false,
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = async (setting) => {
		try {
			setError("");
			setSuccess("");
			const newValue = !settings[setting];

			await updateSettings({
				...settings,
				[setting]: newValue,
			});

			setSettings((prev) => ({
				...prev,
				[setting]: newValue,
			}));

			setSuccess("Cài đặt đã được cập nhật");
		} catch (err) {
			setError(err.message || "Có lỗi xảy ra khi cập nhật cài đặt");
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
				<Typography
					variant="h4"
					sx={{ color: "#0079bf", fontWeight: 600, mb: 4 }}>
					Cài đặt
				</Typography>

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

				<List>
					<ListItem>
						<ListItemText
							primary="Thông báo qua email"
							secondary="Nhận thông báo về các cập nhật quan trọng qua email"
						/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								checked={settings.emailNotifications}
								onChange={() => handleChange("emailNotifications")}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#0079bf",
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#0079bf",
									},
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Xác thực 2 yếu tố"
							secondary="Bảo mật tài khoản bằng xác thực 2 yếu tố"
						/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								checked={settings.twoFactorAuth}
								onChange={() => handleChange("twoFactorAuth")}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#0079bf",
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#0079bf",
									},
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Chế độ tối"
							secondary="Thay đổi giao diện sang chế độ tối"
						/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								checked={settings.darkMode}
								onChange={() => handleChange("darkMode")}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#0079bf",
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#0079bf",
									},
								}}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Paper>
		</Container>
	);
};

export default Settings;
