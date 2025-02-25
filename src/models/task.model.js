const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./project.model");
const User = require("./user.model");

const Task = sequelize.define("Task", {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["Thấp", "Vừa", "Cao", "Khẩn cấp"]],
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["Cần làm", "Đang làm", "Hoàn thành", "Đã huỷ"]],
        },
    },
    projectId: { type: DataTypes.UUID, allowNull: true, references: { model: Project, key: "projectId" } },
    assignedUserId: { type: DataTypes.UUID, references: { model: User, key: "userId" } },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "tasks",
    timestamps: true,
});

module.exports = Task;
