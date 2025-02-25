const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Task = require("./task.model");
const User = require("./user.model");

const Comment = sequelize.define("Comment", {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: { type: DataTypes.UUID, allowNull: false, references: { model: Task, key: "taskId" } },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "userId" } },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [3, 1000],
        },
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "comments",
    timestamps: true,
});

module.exports = Comment;
