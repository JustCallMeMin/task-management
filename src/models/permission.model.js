const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Permission = sequelize.define("Permission", {
    permissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "permissions",
    timestamps: false,
    indexes: [],
});

module.exports = Permission;