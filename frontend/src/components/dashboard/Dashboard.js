import React from "react";
import {
	Grid,
	Paper,
	Typography,
	Box,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Divider,
} from "@mui/material";
import {
	Task as TaskIcon,
	CheckCircle as CheckCircleIcon,
	Pending as PendingIcon,
	Warning as WarningIcon,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
	const { user } = useAuth();

	// Mock data - sau này sẽ được thay thế bằng dữ liệu thực từ API
	const stats = {
		totalTasks: 12,
		completedTasks: 8,
		pendingTasks: 3,
		overdueTasks: 1,
	};

	const recentTasks = [
		{
			id: 1,
			title: "Hoàn thành báo cáo",
			status: "completed",
			dueDate: "2024-03-20",
		},
		{ id: 2, title: "Họp dự án", status: "pending", dueDate: "2024-03-21" },
		{ id: 3, title: "Review code", status: "overdue", dueDate: "2024-03-19" },
	];

	const StatCard = ({ title, value, icon, color }) => (
		<Card>
			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<Box sx={{ color, mr: 2 }}>{icon}</Box>
					<Typography variant="h6" component="div">
						{title}
					</Typography>
				</Box>
				<Typography variant="h4" component="div">
					{value}
				</Typography>
			</CardContent>
		</Card>
	);

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Xin chào, {user?.fullName}!
			</Typography>

			<Grid container spacing={3}>
				{/* Thống kê */}
				<Grid item xs={12} md={3}>
					<StatCard
						title="Tổng công việc"
						value={stats.totalTasks}
						icon={<TaskIcon fontSize="large" />}
						color="primary.main"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<StatCard
						title="Đã hoàn thành"
						value={stats.completedTasks}
						icon={<CheckCircleIcon fontSize="large" />}
						color="success.main"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<StatCard
						title="Đang chờ"
						value={stats.pendingTasks}
						icon={<PendingIcon fontSize="large" />}
						color="warning.main"
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<StatCard
						title="Quá hạn"
						value={stats.overdueTasks}
						icon={<WarningIcon fontSize="large" />}
						color="error.main"
					/>
				</Grid>

				{/* Công việc gần đây */}
				<Grid item xs={12}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="h6" gutterBottom>
							Công việc gần đây
						</Typography>
						<List>
							{recentTasks.map((task, index) => (
								<React.Fragment key={task.id}>
									<ListItem>
										<ListItemIcon>
											{task.status === "completed" && (
												<CheckCircleIcon color="success" />
											)}
											{task.status === "pending" && (
												<PendingIcon color="warning" />
											)}
											{task.status === "overdue" && (
												<WarningIcon color="error" />
											)}
										</ListItemIcon>
										<ListItemText
											primary={task.title}
											secondary={`Hạn: ${task.dueDate}`}
										/>
									</ListItem>
									{index < recentTasks.length - 1 && <Divider />}
								</React.Fragment>
							))}
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
