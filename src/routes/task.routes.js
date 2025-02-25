const express = require("express");
const TaskController = require("../controllers/task.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Tạo công việc
router.post("/", authenticate, TaskController.createTask);

// Cập nhật công việc
router.put("/:taskId", authenticate, TaskController.updateTask);

// Xóa công việc
router.delete("/:taskId", authenticate, TaskController.deleteTask);

// Lấy danh sách công việc
router.get("/", authenticate, TaskController.getAllTasks);

// Lấy chi tiết công việc
router.get("/:taskId", authenticate, TaskController.getTaskById);

module.exports = router;
