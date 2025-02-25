const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Task = require("./task.model");

const Schedule = sequelize.define("Schedule", {
    scheduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: { type: DataTypes.UUID, allowNull: false, references: { model: Task, key: "taskId" } },
    assignedDate: DataTypes.DATEONLY,
    completedDate: DataTypes.DATEONLY,
}, {
    tableName: "schedules",
    timestamps: true,
});

module.exports = Schedule;
