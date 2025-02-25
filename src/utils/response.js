module.exports = {
    successResponse: (res, data, message = "Thành công", statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    },
    errorResponse: (res, error, statusCode = 400) => {
        return res.status(statusCode).json({
            success: false,
            error: error.message || error
        });
    },
    formatUserResponse: (user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles
    }),
    formatAuthResponse: (user, token) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles,
        token,
        message: "Đăng nhập thành công."
    }),
    formatTaskResponse: (task) => ({
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        assignedUser: task.AssignedUser ? {
            userId: task.AssignedUser.userId,
            fullName: task.AssignedUser.fullName,
            email: task.AssignedUser.email
        } : null,
        projectId: task.projectId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
    }),
    formatProjectsResponse: (projects) => {
        return projects.map(project => ({
            projectId: project.projectId,
            name: project.name,
            description: project.description,
            owner: {
                userId: project.Owner ? project.Owner.userId : null,
                fullName: project.Owner ? project.Owner.fullName : "Không xác định",
                email: project.Owner ? project.Owner.email : "Không xác định"
            },
            isPersonal: project.isPersonal,
            status: project.status,
            members: project.Members ? project.Members.map(member => ({
                userId: member.User ? member.User.userId : null,
                fullName: member.User ? member.User.fullName : "Không xác định",
                email: member.User ? member.User.email : "Không xác định",
                role: member.role
            })) : []
        }));
    },
    formatProjectResponse: (project) => ({
        projectId: project.projectId,
        name: project.name,
        description: project.description,
        owner: {
            userId: project.Owner ? project.Owner.userId : null,
            fullName: project.Owner ? project.Owner.fullName : "Không xác định",
            email: project.Owner ? project.Owner.email : "Không xác định"
        },
        isPersonal: project.isPersonal,
        status: project.status,
        members: project.Members ? project.Members.map(member => ({
            userId: member.User ? member.User.userId : null,
            fullName: member.User ? member.User.fullName : "Không xác định",
            email: member.User ? member.User.email : "Không xác định",
            role: member.role
        })) : []
    })
};