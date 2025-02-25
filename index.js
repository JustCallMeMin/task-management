const { app, server } = require('./src/app');
const { sequelize } = require('./src/models');
const { initWebSocket } = require('./src/config/websocket');

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3001;

// Kiểm tra kết nối database trước khi khởi động server
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected successfully.');
        server.listen(PORT, () => {
            console.log(`🚀 API Server running on port ${PORT}`);
        });

        initWebSocket(WS_PORT);
    })
    .catch(err => {
        console.error('❌ Database connection error:', err);
    });

sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Database synchronized (Code-First).");
    })
    .catch((err) => {
        console.error("❌ Error syncing database:", err);
    });
