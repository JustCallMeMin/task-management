const ProjectService = require("../services/project.service");
const { successResponse, errorResponse, formatProjectsResponse, formatProjectResponse} = require("../utils/response");

class ProjectController {
    static async createOrganizationProject(req, res) {
        try {
            const project = await ProjectService.createOrganizationProject(req.user.id, req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addMembers(req, res) {
        try {
            const { projectId } = req.params;
            const { members } = req.body;
            const result = await ProjectService.addMembers(projectId, members);
            return successResponse(res, result, "Thành viên đã được thêm vào dự án.");
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    static async removeMembers(req, res) {
        try {
            const { projectId } = req.params;
            const { userIds } = req.body; // Nhận danh sách userIds từ body

            if (!Array.isArray(userIds) || userIds.length === 0) {
                return errorResponse(res, "Danh sách userIds không hợp lệ.");
            }

            const result = await ProjectService.removeMembers(projectId, userIds);
            return successResponse(res, result, "Thành viên đã được xóa khỏi dự án.");
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    static async updateProject(req, res) {
        try {
            const { projectId } = req.params;
            const project = await ProjectService.updateOrganizationProject(projectId, req.body);
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteProjects(req, res) {
        try {
            const { projectIds } = req.body; // Lấy danh sách projectIds từ body

            if (!Array.isArray(projectIds) || projectIds.length === 0) {
                return errorResponse(res, "Danh sách projectIds không hợp lệ.");
            }

            const result = await ProjectService.deleteProjects(projectIds);
            return successResponse(res, result, "Dự án đã được xóa thành công.");
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    static async getAllProjects(req, res) {
        try {
            const projects = await ProjectService.getAllProjects(req.user.id);
            return successResponse(res, formatProjectsResponse(projects), "Danh sách dự án của bạn");
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    static async getProjectById(req, res) {
        try {
            const { projectId } = req.params;
            const project = await ProjectService.getProjectById(projectId);
            if (!project) {
                return errorResponse(res, "Dự án không tồn tại.", 404);
            }
            return successResponse(res, formatProjectResponse(project), "Lấy thông tin dự án thành công.");
        } catch (error) {
            console.error("Lỗi trong getProjectById:", error);
            return errorResponse(res, "Lỗi máy chủ.", 500);
        }
    }
}

module.exports = ProjectController;