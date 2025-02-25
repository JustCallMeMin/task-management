const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Role = sequelize.define("Role", {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "roles",
    timestamps: false,
    indexes: [],
});

module.exports = Role;