const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Client = sequelize.define("Client", {
    clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    contactInfo: DataTypes.TEXT,
}, {
    tableName: "clients",
    timestamps: true,
    indexes: [],
});

module.exports = Client;
