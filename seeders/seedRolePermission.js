const db = require("../src/models");

(async () => {
    await db.RolePermission.bulkCreate([
        // 🔹 Gán quyền cho Admin
        { roleId: 1, permissionId: 4 }, // Create Project
        { roleId: 1, permissionId: 5 }, // Edit Project
        { roleId: 1, permissionId: 6 }, // Delete Project
        { roleId: 1, permissionId: 7 }, // Manage Project Members
        { roleId: 1, permissionId: 9 }, // Create Project Task
        { roleId: 1, permissionId: 10 }, // Assign Task
        { roleId: 1, permissionId: 11 }, // Edit Task

        // 🔹 Gán quyền cho Manager
        { roleId: 2, permissionId: 4 }, // Create Project
        { roleId: 2, permissionId: 5 }, // Edit Project
        { roleId: 1, permissionId: 6 }, // Delete Project
        { roleId: 2, permissionId: 7 }, // Manage Project Members
        { roleId: 2, permissionId: 9 }, // Create Project Task
        { roleId: 2, permissionId: 10 }, // Assign Task
        { roleId: 2, permissionId: 11 }, // Edit Task
        { roleId: 2, permissionId: 14 }, // View Reports

        // 🔹 Gán quyền cho User
        { roleId: 3, permissionId: 3 }, // Update Profile
        { roleId: 3, permissionId: 8 }, // Create Personal Task
        { roleId: 3, permissionId: 13 } // Change Task Status
    ]);

    console.log("✅ Seed dữ liệu RolePermission thành công!");
    process.exit();
})();
