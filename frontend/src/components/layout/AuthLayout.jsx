import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AuthLayout = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				background: "linear-gradient(135deg, #0079bf 0%, #5067c5 100%)",
			}}>
			<Outlet />
		</Box>
	);
};

export default AuthLayout;
