const mongoose = require("mongoose");
const Permission = require("../models/permission.model");
require("dotenv").config();

const permissions = [
	// ✅ QUẢN LÝ NGƯỜI DÙNG (AUTHENTICATION)
	{ permissionName: "Manage Users" }, // Quản lý người dùng (Admin)
	{ permissionName: "Reset Passwords" }, // Reset mật khẩu người dùng
	{ permissionName: "Update Profile" }, // Cập nhật thông tin cá nhân

	// ✅ QUẢN LÝ DỰ ÁN (PROJECT MANAGEMENT)
	{ permissionName: "Create Project" }, // Tạo dự án mới (Manager/Admin)
	{ permissionName: "Edit Project" }, // Chỉnh sửa thông tin dự án
	{ permissionName: "Delete Project" }, // Xóa dự án (Admin)
	{ permissionName: "Manage Project Members" }, // Quản lý thành viên dự án

	// ✅ QUẢN LÝ CÔNG VIỆC (TASK MANAGEMENT)
	{ permissionName: "Create Personal Task" }, // Tạo task cá nhân (User)
	{ permissionName: "Create Project Task" }, // Tạo task trong dự án (Manager/Admin)
	{ permissionName: "Assign Task" }, // Giao task cho thành viên
	{ permissionName: "Edit Task" }, // Chỉnh sửa task
	{ permissionName: "Delete Task" }, // Xóa task (Admin/Manager)
	{ permissionName: "Change Task Status" }, // Cập nhật trạng thái task

	// ✅ QUẢN LÝ BÁO CÁO & THỐNG KÊ
	{ permissionName: "View Reports" }, // Xem báo cáo công việc (Manager/Admin)
	{ permissionName: "Generate Reports" }, // Tạo báo cáo (Admin)

	// ✅ QUẢN LÝ HỆ THỐNG
	{ permissionName: "Manage System Settings" }, // Cấu hình hệ thống (Admin)
];

(async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("📦 Đã kết nối đến MongoDB.");

		// Xóa tất cả permissions cũ
		await Permission.deleteMany({});
		console.log("🗑️ Đã xóa permissions cũ.");

		// Thêm permissions mới
		await Permission.insertMany(permissions);
		console.log("✅ Seed dữ liệu Permission thành công!");

		process.exit(0);
	} catch (error) {
		console.error("❌ Lỗi khi seed Permission:", error);
		process.exit(1);
	}
})();
