import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData.username, formData.password, formData.role);
      setMessage(response.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setError(error.message);
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
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="primary">{message}</Typography>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            margin="normal"
            helperText="Choose 'admin' or 'Stock-officer'"
          />
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
