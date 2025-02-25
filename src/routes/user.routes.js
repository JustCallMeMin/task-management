const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Lấy danh sách User (chỉ Admin mới có quyền)
router.get("/", authenticate, authorize(["Admin"]), UserController.getAllUsers);

// Gán vai trò cho User (chỉ Admin mới có quyền)
router.post("/assign-role", authenticate, authorize(["Admin"]), UserController.assignRole);

module.exports = router;
