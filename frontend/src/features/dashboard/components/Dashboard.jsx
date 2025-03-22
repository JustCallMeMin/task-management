import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Alert } from '@mui/material';
import {
  CheckCircle as TaskIcon,
  AddCircle as NewTaskIcon,
  DoneAll as ProjectIcon,
} from '@mui/icons-material';
import StatsCard from './StatsCard';
import TaskChart from './TaskChart';
import TaskList from './TaskList';
import Schedule from './Schedule';
import Messages from './Messages';
import { getDashboardStats } from '../api/dashboard.api';
import { defaultChartData } from '../utils/chartConfig';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardStats();
        
        if (!data) {
          throw new Error('No data received from server');
        }

        setStats(data.stats || { tasksCompleted: 0, newTasks: 0, projectsDone: 0 });
        
        // Process monthly stats for chart
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const chartData = {
          labels: (data.monthlyStats || []).map(stat => months[stat.month - 1]),
          datasets: [
            {
              label: 'Tasks Completed',
              data: (data.monthlyStats || []).map(stat => stat.count),
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        };
        setChartData(chartData);
        setTasks(data.recentTasks || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message || 'Failed to load dashboard data. Please try again later.');
        // Set default values on error
        setStats({ tasksCompleted: 0, newTasks: 0, projectsDone: 0 });
        setChartData({
          labels: [],
          datasets: [{
            label: 'Tasks Completed',
            data: [],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            borderWidth: 2,
          }]
        });
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handlePeriodChange = (period) => {
    // Handle period change for chart
    console.log('Period changed:', period);
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  const tasksCompletedChartData = {
    ...defaultChartData,
    datasets: [{
      ...defaultChartData.datasets[0],
      borderColor: '#1a73e8',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
    }]
  };

  const newTasksChartData = {
    ...defaultChartData,
    datasets: [{
      ...defaultChartData.datasets[0],
      borderColor: '#00b0ff',
      backgroundColor: 'rgba(0, 176, 255, 0.1)',
    }]
  };

  const projectsDoneChartData = {
    ...defaultChartData,
    datasets: [{
      ...defaultChartData.datasets[0],
      borderColor: '#00c853',
      backgroundColor: 'rgba(0, 200, 83, 0.1)',
    }]
  };

  return (
    <Box p={3}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={<TaskIcon color="primary" />}
            title="Task Completed"
            value={stats?.tasksCompleted || 0}
            trend={10}
            trendLabel="from last week"
            chartData={tasksCompletedChartData}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={<NewTaskIcon color="info" />}
            title="New Task"
            value={stats?.newTasks || 0}
            trend={10}
            trendLabel="from last week"
            chartData={newTasksChartData}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={<ProjectIcon color="success" />}
            title="Project Done"
            value={stats?.projectsDone || 0}
            trend={8}
            trendLabel="from last week"
            chartData={projectsDoneChartData}
          />
        </Grid>

        {/* Main Content Grid */}
        <Grid item xs={12} lg={8}>
          {/* Task Chart */}
          <Grid item xs={12} mb={3}>
            <TaskChart data={chartData} onPeriodChange={handlePeriodChange} />
          </Grid>

          {/* Task List */}
          <Grid item xs={12}>
            <TaskList tasks={tasks} loading={loading} />
          </Grid>
        </Grid>

        {/* Right Sidebar Grid */}
        <Grid item xs={12} lg={4}>
          {/* Schedule Component */}
          <Grid item xs={12} mb={3}>
            <Schedule />
          </Grid>

          {/* Messages Component */}
          <Grid item xs={12}>
            <Messages />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 