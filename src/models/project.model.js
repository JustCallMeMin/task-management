const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Project = sequelize.define("Project", {
    projectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ownerId: {  // 🔥 Thêm ownerId làm khóa ngoại từ User
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
            isAfterStartDate(value) {
                if (this.startDate && value < this.startDate) {
                    throw new Error("Ngày kết thúc phải sau ngày bắt đầu");
                }
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["Chờ", "Đang làm", "Hoàn thành", "Đã huỷ"]],
        },
    },
    isPersonal: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "projects",
    timestamps: true,
});

module.exports = Project;

