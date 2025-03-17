import React, { useEffect } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { fadeIn } from "../../styles/animations";

const OAuthButtons = () => {
  // Log biến môi trường khi component được tải
  useEffect(() => {
    console.log("Environment variables:");
    console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);
  }, []);

  const handleGoogleLogin = () => {
    // Sử dụng URL backend từ biến môi trường hoặc mặc định nếu không có
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api';
    console.log("Redirecting to Google OAuth:", `${backendUrl}/auth/google`);
    window.location.href = `${backendUrl}/auth/google`;
  };

  const handleGithubLogin = () => {
    // Sử dụng URL backend từ biến môi trường hoặc mặc định nếu không có
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api';
    console.log("Redirecting to GitHub OAuth:", `${backendUrl}/auth/github`);
    window.location.href = `${backendUrl}/auth/github`;
  };

  return (
    <Box 
      sx={{ 
        mt: 3, 
        mb: 2,
        opacity: 0,
        animation: `${fadeIn} 0.6s ease-out forwards`,
        animationDelay: "0.7s"
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mx: 2 }}
        >
          Hoặc đăng nhập với
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{ 
          mb: 2,
          py: 1.5,
          borderColor: '#DB4437',
          color: '#DB4437',
          '&:hover': {
            borderColor: '#DB4437',
            backgroundColor: 'rgba(219, 68, 55, 0.04)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease',
          textTransform: 'none',
          fontSize: '1rem',
          borderRadius: 1,
        }}
      >
        Đăng nhập với Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GitHubIcon />}
        onClick={handleGithubLogin}
        sx={{ 
          py: 1.5,
          borderColor: '#333',
          color: '#333',
          '&:hover': {
            borderColor: '#333',
            backgroundColor: 'rgba(51, 51, 51, 0.04)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease',
          textTransform: 'none',
          fontSize: '1rem',
          borderRadius: 1,
        }}
      >
        Đăng nhập với GitHub
      </Button>
    </Box>
  );
};

export default OAuthButtons; 