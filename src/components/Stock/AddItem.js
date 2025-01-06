import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { addItem } from "../../api";

const AddItem = () => {
  const [formData, setFormData] = useState({ name: "", quantity: 0 });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(formData.name, Number(formData.quantity));
      setMessage(response.message);
      setFormData({ name: "", quantity: 0 });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center">
        Add Item
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
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
      </Box>
    </Paper>
  );
};

export default AddItem;
