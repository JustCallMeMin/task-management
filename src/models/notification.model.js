const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");

const Notification = sequelize.define("Notification", {
    notificationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "userId" } },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 500],
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["Giao việc", "Cập nhật việc", "Comment", "Deadline"]],
        },
    },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    sentChannel: {
        type: DataTypes.STRING,
        validate: {
            isIn: [["Realtime", "Email", "Push"]],
        },
    },
}, {
    tableName: "notifications",
    timestamps: true,
});

module.exports = Notification;
