const TASK_PRIORITY = Object.freeze({
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    URGENT: "Urgent",
});

const TASK_STATUS = Object.freeze({
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
});

const PROJECT_STATUS = Object.freeze({
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
});

const PROJECT_ROLE = Object.freeze({
    OWNER: "Owner",
    MANAGER: "Manager",
    MEMBER: "Member",
});

const NOTIFICATION_TYPE = Object.freeze({
    TASK_ASSIGNMENT: "Task Assignment",
    TASK_UPDATE: "Task Update",
    COMMENT: "Comment",
    DEADLINE_REMINDER: "Deadline Reminder",
});

module.exports = { TASK_PRIORITY, TASK_STATUS, PROJECT_STATUS, PROJECT_ROLE, NOTIFICATION_TYPE };