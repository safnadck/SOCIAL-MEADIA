import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      
      // Check if username exists in the response
      if (response.data && response.data.username) {
        // Save JWT token and username to localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('username', response.data.username);  
      } else {
        console.error('Username not found in response');
        setError('Failed to retrieve username');
      }
  
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      setError('Invalid credentials');
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {error && <Typography color="error">{error}</Typography>}
          
          {/* Email input field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state
          />
          
          {/* Password input field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state
          />
          
          {/* Login button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account? <a href="/register">Register here</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
