const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./project.model");

const Report = sequelize.define("Report", {
    reportId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    summary: DataTypes.TEXT,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    data: DataTypes.TEXT,
}, {
    tableName: "reports",
    timestamps: true,
    indexes: [],
});

module.exports = Report;
