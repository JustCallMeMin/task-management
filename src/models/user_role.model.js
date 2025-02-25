const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");
const Role = require("./role.model");

const UserRole = sequelize.define("UserRole", {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "userId",
        },
        primaryKey: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "roleId",
        },
        primaryKey: true,
    },
}, {
    tableName: "user_roles",
    timestamps: false,
    indexes:[],
});

module.exports = UserRole;
