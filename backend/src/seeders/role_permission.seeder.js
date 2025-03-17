const mongoose = require("mongoose");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const RolePermission = require("../models/role_permission.model");
require("dotenv").config();

const assignPermissionsToRole = async (roleName, permissionNames) => {
	const role = await Role.findOne({ roleName });
	if (!role) {
		console.error(`❌ Không tìm thấy role: ${roleName}`);
		return;
	}

	const permissions = await Permission.find({
		permissionName: { $in: permissionNames },
	});

	// Tạo các bản ghi role_permission
	const rolePermissions = permissions.map((permission) => ({
		roleId: role._id,
		permissionId: permission._id,
	}));

	await RolePermission.insertMany(rolePermissions);
	console.log(`✅ Đã gán ${permissions.length} quyền cho role ${roleName}`);
};

(async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("📦 Đã kết nối đến MongoDB.");

		// Xóa tất cả role_permissions cũ
		await RolePermission.deleteMany({});
		console.log("🗑️ Đã xóa role_permissions cũ.");

		// Gán quyền cho Admin
		await assignPermissionsToRole("Admin", [
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
		]);

		// Gán quyền cho Manager
		await assignPermissionsToRole("Manager", [
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
		]);

		// Gán quyền cho User
		await assignPermissionsToRole("User", [
			"Update Profile",
			"Create Personal Task",
			"Change Task Status",
		]);

		console.log("✅ Seed dữ liệu RolePermission thành công!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Lỗi khi seed RolePermission:", error);
		process.exit(1);
	}
})();
