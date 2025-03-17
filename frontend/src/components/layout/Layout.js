import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Avatar,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Dashboard as DashboardIcon,
	Task as TaskIcon,
	Group as GroupIcon,
	Settings as SettingsIcon,
	ExitToApp as LogoutIcon,
	Person as PersonIcon,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const drawerWidth = 240;

const Layout = ({ children }) => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const menuItems = [
		{ text: "Dashboard", icon: <DashboardIcon />, path: "/" },
		{ text: "Công việc", icon: <TaskIcon />, path: "/tasks" },
		{ text: "Nhóm", icon: <GroupIcon />, path: "/groups" },
		{ text: "Cài đặt", icon: <SettingsIcon />, path: "/settings" },
	];

	const drawer = (
		<div>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					Task Management
				</Typography>
			</Toolbar>
			<List>
				{menuItems.map((item) => (
					<ListItem button key={item.text} onClick={() => navigate(item.path)}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						{menuItems.find((item) => item.path === window.location.pathname)
							?.text || "Dashboard"}
					</Typography>
					<IconButton onClick={handleMenu} size="small" sx={{ ml: 2 }}>
						<Avatar sx={{ width: 32, height: 32 }}>
							{user?.fullName?.charAt(0)}
						</Avatar>
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={() => navigate("/profile")}>
							<ListItemIcon>
								<PersonIcon fontSize="small" />
							</ListItemIcon>
							Hồ sơ
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<LogoutIcon fontSize="small" />
							</ListItemIcon>
							Đăng xuất
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
