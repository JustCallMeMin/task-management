const express = require("express");
const ProjectController = require("../controllers/project.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// 🚀 Hệ thống tự động tạo Personal Project khi User đăng ký (Không cần endpoint)

// 🔹 Tạo Organization Project (chỉ Manager & Admin được phép tạo)
router.post(
    "/organization",
    authenticate,
    authorize(["Create Project"]),
    ProjectController.createOrganizationProject
);

// 🔹 Cập nhật Project (Manager có thể chỉnh sửa dự án của mình, Admin chỉnh sửa tất cả)
router.put(
    "/:projectId",
    authenticate,
    authorize(["Edit Project"]),
    ProjectController.updateProject
);

// 🔹 Xóa Project (chỉ Admin được phép xóa, nếu không có Task đang thực hiện)
router.delete(
    "/:projectId",
    authenticate,
    authorize(["Delete Project"]),
    ProjectController.deleteProject
);

// 🔹 Lấy danh sách Project của User (bao gồm Personal & Organization Project)
router.get("/", authenticate, ProjectController.getAllProjects);

// 🔹 Lấy thông tin chi tiết Project
router.get("/:projectId", authenticate, ProjectController.getProjectById);

// 🔹 Thêm thành viên vào Organization Project (chỉ Manager & Admin)
router.post(
    "/:projectId/members",
    authenticate,
    authorize(["Manage Project Members"]),
    ProjectController.addMembers
);

// 🔹 Xóa thành viên khỏi Organization Project (chỉ Manager & Admin)
// router.delete(
//     "/:projectId/members/:userId",
//     authenticate,
//     authorize(["Manage Project Members"]),
//     ProjectController.removeMember
// );

module.exports = router;