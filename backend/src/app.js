require("dotenv").config(); // Load biến môi trường từ file .env

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { initWebSocket } = require("./config/websocket");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000; // Đổi port mặc định thành 5000

// Middleware setup - Đặt lên đầu tiên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Helmet configuration
app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: "cross-origin" },
		referrerPolicy: { policy: "strict-origin-when-cross-origin" },
	})
);

// CORS configuration - Đặt sau các middleware cơ bản
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"X-Requested-With",
			"Accept",
			"Origin",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Methods",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Credentials",
		],
		exposedHeaders: ["Content-Range", "X-Content-Range", "New-Token"],
		preflightContinue: true,
		optionsSuccessStatus: 204,
	})
);

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

// Khởi động WebSocket
initWebSocket(server);

// Khởi động server
server.listen(PORT, () => {
	console.log(`✅ Server đang chạy trên cổng ${PORT}`);
});

// Export cả app và server để dùng trong index.js
module.exports = { app, server };
