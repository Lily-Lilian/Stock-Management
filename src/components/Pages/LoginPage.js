import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.username, formData.password);
      setUser(response);
      navigate(response.role === "admin" ? "/admin" : "/officer");
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
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Login
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
