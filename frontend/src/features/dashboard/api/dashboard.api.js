import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api';

// Mock data for development
const mockData = {
  stats: {
    tasksCompleted: 150,
    newTasks: 45,
    projectsDone: 12
  },
  monthlyStats: [
    { month: 1, count: 45 },
    { month: 2, count: 52 },
    { month: 3, count: 48 },
    { month: 4, count: 65 },
    { month: 5, count: 58 },
    { month: 6, count: 72 },
    { month: 7, count: 68 },
    { month: 8, count: 75 },
    { month: 9, count: 80 },
    { month: 10, count: 85 },
    { month: 11, count: 78 },
    { month: 12, count: 90 }
  ],
  recentTasks: [
    {
      id: 1,
      title: 'Design System Update',
      status: 'In Progress',
      dueDate: '2024-03-25'
    },
    {
      id: 2,
      title: 'API Integration',
      status: 'Done',
      dueDate: '2024-03-20'
    },
    {
      id: 3,
      title: 'User Testing',
      status: 'To Do',
      dueDate: '2024-03-30'
    }
  ]
};

export const getDashboardStats = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Remove token and let PrivateRoute handle the redirect
      localStorage.removeItem('token');
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      if (error.response.status === 401 || error.response.status === 403) {
        // Remove token and let PrivateRoute handle the redirect
        localStorage.removeItem('token');
        throw new Error('Your session has expired. Please login again.');
      }
      throw new Error(error.response.data.message || 'Failed to fetch dashboard data');
    } else if (error.request) {
      // Request was made but no response
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw error;
    }
  }
}; 