const db = require("../src/models");

(async () => {
    await db.Permission.bulkCreate([
        // ✅ QUẢN LÝ NGƯỜI DÙNG (AUTHENTICATION)
        { permissionId: 1, permissionName: "Manage Users" },  // Quản lý người dùng (Admin)
        { permissionId: 2, permissionName: "Reset Passwords" },  // Reset mật khẩu người dùng
        { permissionId: 3, permissionName: "Update Profile" },  // Cập nhật thông tin cá nhân

        // ✅ QUẢN LÝ DỰ ÁN (PROJECT MANAGEMENT)
        { permissionId: 4, permissionName: "Create Project" },  // Tạo dự án mới (Manager/Admin)
        { permissionId: 5, permissionName: "Edit Project" },  // Chỉnh sửa thông tin dự án
        { permissionId: 6, permissionName: "Delete Project" },  // Xóa dự án (Admin)
        { permissionId: 7, permissionName: "Manage Project Members" },  // Quản lý thành viên dự án

        // ✅ QUẢN LÝ CÔNG VIỆC (TASK MANAGEMENT)
        { permissionId: 8, permissionName: "Create Personal Task" },  // Tạo task cá nhân (User)
        { permissionId: 9, permissionName: "Create Project Task" },  // Tạo task trong dự án (Manager/Admin)
        { permissionId: 10, permissionName: "Assign Task" },  // Giao task cho thành viên
        { permissionId: 11, permissionName: "Edit Task" },  // Chỉnh sửa task
        { permissionId: 12, permissionName: "Delete Task" },  // Xóa task (Admin/Manager)
        { permissionId: 13, permissionName: "Change Task Status" },  // Cập nhật trạng thái task

        // ✅ QUẢN LÝ BÁO CÁO & THỐNG KÊ
        { permissionId: 14, permissionName: "View Reports" },  // Xem báo cáo công việc (Manager/Admin)
        { permissionId: 15, permissionName: "Generate Reports" },  // Tạo báo cáo (Admin)

        // ✅ QUẢN LÝ HỆ THỐNG
        { permissionId: 16, permissionName: "Manage System Settings" }  // Cấu hình hệ thống (Admin)
    ]);

    console.log("✅ Seed dữ liệu Permission thành công!");
    process.exit();
})();
