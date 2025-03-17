const { ROLE } = require("../constants/enums");
const mongoose = require("mongoose");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const UserRole = require("../models/user_role.model");
const Permission = require("../models/permission.model");
const RolePermission = require("../models/role_permission.model");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Danh sách permissions
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

	// ✅ QUẢN LÝ 2FA
	{ permissionName: "Manage 2FA" },
];

// Mapping quyền cho từng role
const rolePermissionsMap = {
	Admin: [
		"Manage Users",
		"Reset Passwords",
		"Update Profile",
		"Create Project",
		"Edit Project",
		"Delete Project",
		"Manage Project Members",
		"Create Personal Task",
		"Create Project Task",
		"Assign Task",
		"Edit Task",
		"Delete Task",
		"Change Task Status",
		"View Reports",
		"Generate Reports",
		"Manage System Settings",
		"Manage 2FA",
	],
	Manager: [
		"Update Profile",
		"Create Project",
		"Edit Project",
		"Manage Project Members",
		"Create Personal Task",
		"Create Project Task",
		"Assign Task",
		"Edit Task",
		"Delete Task",
		"Change Task Status",
		"View Reports",
	],
	User: ["Update Profile", "Create Personal Task", "Change Task Status"],
};

// Hàm gán permissions cho role
const assignPermissionsToRole = async (roleName, permissionNames) => {
	const role = await Role.findOne({ roleName });
	if (!role) {
		console.error(`❌ Không tìm thấy role: ${roleName}`);
		return;
	}

	const permissions = await Permission.find({
		permissionName: { $in: permissionNames },
	});

	const rolePermissions = permissions.map((permission) => ({
		roleId: role._id,
		permissionId: permission._id,
	}));

	await RolePermission.insertMany(rolePermissions);
	console.log(`✅ Đã gán ${permissions.length} quyền cho role ${roleName}`);
};

// Hàm khởi tạo permissions và role permissions
const initializePermissions = async () => {
	try {
		// Kiểm tra xem đã có permissions chưa
		const existingPermissions = await Permission.find();
		if (existingPermissions.length === 0) {
			// Tạo permissions
			await Permission.insertMany(permissions);
			console.log("✅ Đã tạo permissions thành công!");
		}

		// Kiểm tra và tạo role permissions
		const existingRolePermissions = await RolePermission.find();
		if (existingRolePermissions.length === 0) {
			// Gán permissions cho từng role
			for (const [roleName, permissionNames] of Object.entries(
				rolePermissionsMap
			)) {
				await assignPermissionsToRole(roleName, permissionNames);
			}
			console.log("✅ Đã gán permissions cho các role thành công!");
		}
	} catch (error) {
		console.error("❌ Lỗi khi khởi tạo permissions:", error);
	}
};

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`📦 MongoDB đã kết nối: ${conn.connection.host}`);

		// Khởi tạo roles
		await initializeRoles();

		// Khởi tạo permissions và role permissions
		await initializePermissions();

		// Khởi tạo admin account
		await initializeAdmin();
	} catch (error) {
		console.error(`❌ Lỗi: ${error.message}`);
		process.exit(1);
	}
};

// 🔹 Khởi tạo Roles nếu chưa có
const initializeRoles = async () => {
	try {
		const existingRoles = await Role.find({}, "roleName");
		const existingRoleNames = existingRoles.map((r) => r.roleName);

		const rolesToInsert = Object.values(ROLE).filter(
			(role) => !existingRoleNames.includes(role)
		);

		if (rolesToInsert.length > 0) {
			await Role.insertMany(rolesToInsert.map((roleName) => ({ roleName })));
			console.log("✅ Đã tạo các roles còn thiếu:", rolesToInsert);
		} else {
			console.log("✅ Tất cả roles đã tồn tại.");
		}
	} catch (error) {
		console.error("❌ Lỗi khi khởi tạo Roles:", error);
	}
};

// 🔹 Khởi tạo tài khoản Admin
const initializeAdmin = async () => {
	try {
		// Kiểm tra xem đã có admin chưa
		const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
		if (adminExists) {
			console.log("✅ Tài khoản admin đã tồn tại.");
			return;
		}

		// Tạo admin user
		const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
		const adminUser = await User.create({
			fullName: "System Admin",
			email: process.env.ADMIN_EMAIL,
			phone: process.env.ADMIN_PHONE,
			password: hashedPassword,
			isVerified: true,
			isBlocked: false,
		});

		// Gán role ADMIN
		const adminRole = await Role.findOne({ roleName: ROLE.ADMIN });
		if (adminRole) {
			await UserRole.create({
				userId: adminUser._id,
				roleId: adminRole._id,
			});
			console.log("✅ Đã tạo tài khoản admin và gán quyền thành công.");
		}
	} catch (error) {
		console.error("❌ Lỗi khi khởi tạo Admin:", error);
	}
};

module.exports = { connectDB };
