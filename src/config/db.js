const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load biến môi trường

// Khởi tạo Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Tắt log query nếu không cần
    }
);

// Export đối tượng sequelize
module.exports = { sequelize };
