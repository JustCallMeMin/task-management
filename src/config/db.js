const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load biến môi trường

// Kiểm tra giá trị biến môi trường
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASS ? "HIDDEN" : "MISSING");
// console.log("DB_HOST:", process.env.DB_HOST);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Tắt log query nếu không cần
    }
);

module.exports = { sequelize };
