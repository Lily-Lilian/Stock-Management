import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../api";

const AddItem = () => {
  const [formData, setFormData] = useState({ name: "", quantity: 0 });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // For Snackbar
  const navigate = useNavigate(); // To navigate back to the stock list or dashboard

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(formData.name, Number(formData.quantity));
      setMessage(response.message);
      setSuccess(true); // Show Snackbar for success
      setFormData({ name: "", quantity: 0 });
    } catch (error) {
      setMessage(error.message);
      setSuccess(false); // Show Snackbar for error
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add Item
      </Typography>
      {message && (
        <Typography
          color={success ? "primary" : "error"}
          align="center"
          sx={{ marginBottom: 2 }}
        >
          {message}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Item
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Box>
      {/* Snackbar for success or error messages */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setMessage("")}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddItem;
