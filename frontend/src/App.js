import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import theme from "./utils/theme";
import AppRoutes from "./routes";

// App component
const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}>
				<AuthProvider>
					<AppRoutes />
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
};

export default App;
