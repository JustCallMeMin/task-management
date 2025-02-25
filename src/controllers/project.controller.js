const ProjectService = require("../services/project.service");
const { successResponse, errorResponse, formatProjectsResponse } = require("../utils/response");

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
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
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

    static async deleteProject(req, res) {
        try {
            const { projectId } = req.params;
            const result = await ProjectService.deleteProject(projectId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ProjectController;