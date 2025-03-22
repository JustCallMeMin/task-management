import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <Box className="main-layout">
      <Sidebar />
      <Header />
      <Box className="main-content">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout; 