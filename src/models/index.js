const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");

// Import Models
const User = require("./user.model");
const Project = require("./project.model");
const Task = require("./task.model");
const Comment = require("./comment.model");
const Attachment = require("./attachment.model");
const Schedule = require("./schedule.model");
const Report = require("./report.model");
const Notification = require("./notification.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const UserRole = require("./user_role.model");
const RolePermission = require("./role_permission.model");
const ProjectUser = require("./project_user.model");

// ---------------------
// Thiết lập Quan Hệ (Relationships)
// ---------------------

// **1. User liên kết với Task**
User.hasMany(Task, { foreignKey: "assignedUserId" });
Task.belongsTo(User, { foreignKey: "assignedUserId" });

// **2. Project liên kết với Task**
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// **3. Task liên kết với Comment**
Task.hasMany(Comment, { foreignKey: "taskId" });
Comment.belongsTo(Task, { foreignKey: "taskId" });

// **4. User có thể viết nhiều Comment**
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// **5. Task liên kết với Attachment**
Task.hasMany(Attachment, { foreignKey: "taskId" });
Attachment.belongsTo(Task, { foreignKey: "taskId" });

// **6. Task liên kết với Schedule**
Task.hasOne(Schedule, { foreignKey: "taskId" });
Schedule.belongsTo(Task, { foreignKey: "taskId" });

// **7. Project liên kết với Report**
Project.hasMany(Report, { foreignKey: "projectId" });
Report.belongsTo(Project, { foreignKey: "projectId" });

// **8. User nhận Notification**
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

// **9. Many-to-Many: Project có nhiều User**
Project.hasMany(ProjectUser, { foreignKey: "projectId", as: "Members" });
ProjectUser.belongsTo(Project, { foreignKey: "projectId", as: "Project" });

// **10. Many-to-Many: User tham gia nhiều Project**
User.hasMany(ProjectUser, { foreignKey: "userId", as: "UserProjects" });
ProjectUser.belongsTo(User, { foreignKey: "userId", as: "User" });

// **11. Many-to-Many: User có nhiều Role**
User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", otherKey: "roleId", as: "Roles" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId", otherKey: "userId", as: "Users" });

// **12. Many-to-Many: Role có nhiều Permission**
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "Permissions" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "Roles" });

// **13. User có thể tạo nhiều Project**
User.hasMany(Project, { foreignKey: "ownerId", as: "PersonalProjects" });
Project.belongsTo(User, { foreignKey: "ownerId", as: "Owner" });

// ---------------------
// Xuất Models & Sequelize
// ---------------------
const db = {
    sequelize,
    Sequelize, // Export Sequelize nếu cần dùng ở file khác
    User,
    Project,
    Task,
    Comment,
    Attachment,
    Schedule,
    Report,
    Notification,
    Role,
    Permission,
    UserRole,
    RolePermission,
};

module.exports = db;