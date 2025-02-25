require('dotenv').config(); // Load biến môi trường từ file .env

const express = require('express');
const http = require("http");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const notificationRoutes = require('./routes/notification.routes');
const { initWebSocket } = require("./config/websocket");

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                connectSrc: ["'self'", "ws://localhost:3001"],
            },
        },
    })
);

app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/api/notifications', notificationRoutes);

// Export cả app và server để dùng trong index.js
module.exports = { app, server };
