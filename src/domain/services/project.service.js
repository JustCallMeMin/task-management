const Project = require("../models/project.model");
const User = require("../models/user.model");
const ProjectUser = require("../models/project_user.model");
const Task = require("../models/task.model");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const { Op } = require("sequelize");
class ProjectService {
    // Tạo Personal Project khi User chưa có dự án cá nhân
    static async createPersonalProject(userId) {
        let project = await Project.findOne({ where: { ownerId: userId, isPersonal: true } });

        if (!project) {
            project = await Project.create({
                ownerId: userId,
                name: "Personal Project",
                isPersonal: true,
                status: "Chờ",
            });
        }

        return project;
    }

    // Tạo Organization Project
    static async createOrganizationProject(userId, projectData) {
        const { name, description, startDate, endDate, members } = projectData;

        // ✅ Kiểm tra User có quyền "Create Project" hay không
        const user = await User.findByPk(userId, {
            include: [{ model: Role, as: "Roles", include: [{ model: Permission, as: "Permissions" }] }]
        });

        if (!user) throw new Error("Người dùng không tồn tại.");

        const userPermissions = user.Roles.flatMap(role => role.Permissions.map(perm => perm.permissionName));
        if (!userPermissions.includes("Create Project")) {
            throw new Error("Bạn không có quyền tạo dự án.");
        }

        // ✅ Kiểm tra dữ liệu hợp lệ
        if (!name) throw new Error("Tên dự án là bắt buộc.");

        // ✅ Tạo dự án
        const project = await Project.create({
            ownerId: userId,
            name,
            description,
            startDate,
            endDate,
            isPersonal: false,
            status: "Chờ",
        });

        // ✅ Thêm chủ sở hữu vào ProjectUser với vai trò "Owner"
        await ProjectUser.create({
            projectId: project.projectId,
            userId: userId,
            role: "Owner"
        });

        // ✅ Thêm thành viên vào dự án (nếu có)
        if (members && members.length > 0) {
            for (const memberId of members) {
                await ProjectUser.create({
                    projectId: project.projectId,
                    userId: memberId,
                    role: "Member"
                });
            }
        }

        return project;
    }

    // Thêm thành viên vào Organization Project
    static async addMembers(projectId, members) {
        const project = await Project.findByPk(projectId);
        if (!project) throw new Error("Dự án không tồn tại.");

        for (const memberId of members) {
            const memberExists = await User.findByPk(memberId);
            if (!memberExists) throw new Error(`Thành viên với ID ${memberId} không tồn tại.`);

            // Kiểm tra nếu thành viên đã có trong dự án
            const existingMember = await ProjectUser.findOne({ where: { projectId, userId: memberId } });
            if (existingMember) continue; // Bỏ qua nếu đã tồn tại

            await ProjectUser.create({ projectId, userId: memberId, role: "Member" });
        }

        return { message: "Đã thêm thành viên vào dự án." };
    }

    // Xóa thành viên khỏi Organization Project
    static async removeMembers(projectId, userIds) {
        const project = await Project.findByPk(projectId);
        if (!project) throw new Error("Dự án không tồn tại.");

        // Tìm tất cả thành viên có trong danh sách userIds
        const members = await ProjectUser.findAll({
            where: { projectId, userId: userIds }
        });

        if (members.length === 0) {
            throw new Error("Không tìm thấy thành viên nào để xóa.");
        }

        // Kiểm tra nếu danh sách chứa Owner (không thể xóa Owner)
        const owners = members.filter(member => member.role === "Owner");
        if (owners.length > 0) {
            throw new Error("Không thể xóa chủ sở hữu dự án.");
        }

        // Xóa tất cả thành viên hợp lệ
        await ProjectUser.destroy({ where: { projectId, userId: userIds } });

        return { message: `Đã xóa ${members.length} thành viên khỏi dự án.` };
    }

    // Lấy danh sách tất cả các dự án mà User tham gia (bao gồm Personal & Organization Project)
    static async getAllProjects(userId) {
        // Kiểm tra User có tồn tại không
        const user = await User.findByPk(userId);
        if (!user) throw new Error("Người dùng không tồn tại.");

        // Lấy danh sách tất cả các dự án mà User là thành viên hoặc chủ sở hữu
        return await Project.findAll({
            include: [
                {
                    model: ProjectUser,
                    as: "Members",
                    include: [
                        {
                            model: User,
                            as: "User", // Lấy thông tin User từ ProjectUser
                            attributes: ["userId", "fullName", "email"]
                        }
                    ]
                },
                {
                    model: User,
                    as: "Owner",
                    attributes: ["userId", "fullName", "email"]
                }
            ],
            where: {
                [Op.or]: [
                    { ownerId: userId }, // Chủ sở hữu
                    { '$Members.userId$': userId } // Thành viên
                ]
            }
        });
    }
    // Cập nhật Organization Project (chỉ Manager và Admin)
    static async updateOrganizationProject(projectId, projectData) {
        const project = await Project.findByPk(projectId);
        if (!project) throw new Error("Dự án không tồn tại.");

        const { name, description, startDate, endDate, status } = projectData;

        // Kiểm tra dữ liệu hợp lệ trước khi cập nhật
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
        }

        // Cập nhật dự án
        await project.update({
            name: name || project.name,
            description: description || project.description,
            startDate: startDate || project.startDate,
            endDate: endDate || project.endDate,
            status: status || project.status,
        });

        return project;
    }

    // Xóa Project (chỉ Admin và chỉ khi không có Task đang thực hiện)
    static async deleteProjects(projectIds) {
        const projects = await Project.findAll({
            where: { projectId: projectIds }
        });

        if (projects.length === 0) {
            throw new Error("Không tìm thấy dự án nào để xóa.");
        }

        // Kiểm tra nếu còn Task chưa hoàn thành trong các dự án
        const tasks = await Task.findAll({
            where: {
                projectId: projectIds,
                status: "Chờ"
            }
        });

        if (tasks.length > 0) {
            throw new Error("Không thể xóa các dự án khi còn Task đang thực hiện.");
        }

        // Xóa tất cả dự án hợp lệ
        await Project.destroy({ where: { projectId: projectIds } });

        return { message: `Đã xóa ${projects.length} dự án khỏi hệ thống.` };
    }

    static async getProjectById(projectId) {
        return await Project.findByPk(projectId, {
            include: [
                {
                    model: User,
                    as: "Owner",
                    attributes: ["userId", "fullName", "email"]
                },
                {
                    model: ProjectUser,
                    as: "Members",
                    include: [
                        {
                            model: User,
                            as: "User",
                            attributes: ["userId", "fullName", "email"]
                        }
                    ]
                }
            ]
        });
    }

}

module.exports = ProjectService;