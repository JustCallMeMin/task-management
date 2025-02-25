const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Role = require("./role.model");
const Permission = require("./permission.model");

const RolePermission = sequelize.define("RolePermission", {
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "roleId",
        },
        primaryKey: true,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: "permissionId",
        },
        primaryKey: true,
    },
}, {
    tableName: "role_permissions",
    timestamps: false,
    indexes: [],
});

module.exports = RolePermission;
