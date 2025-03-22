import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { defaultChartData, defaultChartOptions } from '../utils/chartConfig';

// Lazy load the Line component
const Line = React.lazy(() => import('react-chartjs-2').then(module => ({ default: module.Line })));

const StatsCard = ({ icon, title, value, trend, trendLabel, chartData = defaultChartData }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h4" ml={1}>
          {value}
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {title}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="body2"
          color={trend >= 0 ? 'success.main' : 'error.main'}
        >
          {trend >= 0 ? '+' : ''}{trend}% {trendLabel}
        </Typography>
        <Box width="100px" height="40px">
          <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#f5f5f5' }}></div>}>
            <Line data={chartData} options={defaultChartOptions} redraw={false} />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(StatsCard); 