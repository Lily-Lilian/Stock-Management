import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Link, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(""); // Clear previous errors
    
    try {
      const response = await login(formData.username, formData.password);
      
      // First check if response exists
      if (!response) {
        throw new Error("No response from server");
      }
  
      // Handle error response
      if (response.status === "error") {
        setError(response.message || "Invalid credentials");
        return; // Stop execution here
      }
  
      // Only proceed if status is explicitly "success"
      if (response.status === "success") {
        setUser({
          role: response.role,
          username: response.username,
        });
        navigate(response.role === "admin" ? "/admin" : "/officer");
      } else {
        // Handle unexpected status
        setError("Unexpected response from server");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
