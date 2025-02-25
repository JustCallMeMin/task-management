const TaskService = require("../services/task.service");

class TaskController {
    static async createTask(req, res) {
        try {
            const task = await TaskService.createTask(req.user.id, req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const updatedTask = await TaskService.updateTask(taskId, req.user.id, req.body);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            await TaskService.deleteTask(taskId, req.user.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks(req.user.id);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getTaskById(req, res) {
        try {
            const { taskId } = req.params;
            const task = await TaskService.getTaskById(taskId, req.user.id);
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TaskController;
