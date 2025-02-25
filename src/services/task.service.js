const Task = require("../models/task.model");
const Project = require("../models/project.model");
const ProjectService = require("./project.service");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

class TaskService {
    static async createTask(userId, taskData) {
        const { title, description, dueDate, priority, projectId, assignedUserId } = taskData;

        // Kiểm tra quyền của user
        const user = await User.findByPk(userId, { include: [{ model: Role, as: "Roles" }] });
        if (!user) throw new Error("Người dùng không tồn tại.");

        const roles = user.Roles.map(role => role.roleName);
        if (!roles.length) throw new Error("Người dùng chưa được phân quyền, vui lòng liên hệ quản trị viên.");

        // Nếu không có projectId, gọi ProjectService để lấy hoặc tạo Personal Project
        let project = projectId ? await Project.findByPk(projectId) : await ProjectService.createPersonalProject(userId);
        if (!project) throw new Error("Dự án không tồn tại.");

        // Kiểm tra quyền tạo task trong project
        if (project.isPersonal && userId !== project.ownerId) {
            throw new Error("Bạn không có quyền tạo Task trong Personal Project của người khác.");
        }
        if (!project.isPersonal && !roles.includes("Admin") && !roles.includes("Manager")) {
            throw new Error("Bạn không có quyền tạo Task trong dự án này.");
        }

        // Nếu có assignedUserId, kiểm tra xem user đó có trong hệ thống không
        if (assignedUserId) {
            const assignedUser = await User.findByPk(assignedUserId);
            if (!assignedUser) throw new Error("Người được giao task không tồn tại trong hệ thống.");
        }

        return await Task.create({
            title,
            description,
            dueDate,
            priority,
            projectId: project.projectId,
            assignedUserId: assignedUserId || userId,
            status: "Cần làm"
        });
    }

    static async updateTask(taskId, userId, taskData) {
        const task = await Task.findByPk(taskId);
        if (!task) throw new Error("Task không tồn tại.");

        if (task.assignedUserId !== userId) {
            throw new Error("Bạn không có quyền chỉnh sửa task này.");
        }

        await task.update(taskData);
        return task;
    }

    static async deleteTask(taskId, userId) {
        const task = await Task.findByPk(taskId);
        if (!task) throw new Error("Task không tồn tại.");

        if (task.assignedUserId !== userId) {
            throw new Error("Bạn không có quyền xóa task này.");
        }

        await task.destroy();
    }

    static async getAllTasks(userId) {
        return await Task.findAll({ where: { assignedUserId: userId } });
    }

    static async getTaskById(taskId, userId) {
        const task = await Task.findOne({ where: { id: taskId, assignedUserId: userId } });
        if (!task) throw new Error("Task không tồn tại hoặc bạn không có quyền truy cập.");
        return task;
    }
}

module.exports = TaskService;
