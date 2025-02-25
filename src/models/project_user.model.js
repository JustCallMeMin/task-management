const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./project.model");
const User = require("./user.model");

const ProjectUser = sequelize.define("ProjectUser", {
    projectUserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    projectId: { type: DataTypes.UUID, allowNull: false, references: { model: Project, key: "projectId" } },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "userId" } },
    role: { type: DataTypes.STRING, allowNull: false }, // Owner, Manager, Member
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "project_users",
    timestamps: true,
});

module.exports = ProjectUser;
