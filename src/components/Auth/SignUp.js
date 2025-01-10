import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData.username, formData.password, formData.role);
      alert(response.message);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center">Signup</Typography>
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
          Signup
        </Button>
      </Box>
    </Paper>
  );
};

export default Signup;
