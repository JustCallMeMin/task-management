const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Task = require("./task.model");

const Attachment = sequelize.define("Attachment", {
    attachmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: { type: DataTypes.UUID, allowNull: false, references: { model: Task, key: "taskId" } },
    filePath: { type: DataTypes.STRING, allowNull: false },
    uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "attachments",
    timestamps: true,
});

module.exports = Attachment;
