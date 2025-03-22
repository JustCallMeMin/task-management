const Task = require('../models/task.model');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

const getDashboardStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get tasks stats
    const tasksStats = await Task.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: startOfYear }
        }
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "Done"] }, 1, 0]
            }
          },
          newTasks: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", lastWeek] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Get projects stats
    const projectsStats = await Project.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: startOfYear }
        }
      },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          completedProjects: {
            $sum: {
              $cond: [{ $eq: ["$status", "Done"] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Get monthly task completion stats
    const monthlyStats = await Task.aggregate([
      {
        $match: {
          userId: userId,
          status: "Done",
          createdAt: { $gte: startOfYear }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$completedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          count: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    // Fill in missing months with 0 counts
    const filledMonthlyStats = Array.from({ length: 12 }, (_, i) => {
      const existingStat = monthlyStats.find(stat => stat.month === i + 1);
      return {
        month: i + 1,
        count: existingStat ? existingStat.count : 0
      };
    });

    // Get recent tasks
    const recentTasks = await Task.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "project"
        }
      },
      {
        $unwind: {
          path: "$project",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          title: 1,
          status: 1,
          dueDate: 1,
          projectName: "$project.name"
        }
      }
    ]);

    // Prepare response
    const stats = {
      tasksCompleted: tasksStats[0]?.completedTasks || 0,
      newTasks: tasksStats[0]?.newTasks || 0,
      projectsDone: projectsStats[0]?.completedProjects || 0
    };

    res.json({
      stats,
      monthlyStats: filledMonthlyStats,
      recentTasks
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard statistics',
      error: error.message 
    });
  }
};

module.exports = {
  getDashboardStats
}; 