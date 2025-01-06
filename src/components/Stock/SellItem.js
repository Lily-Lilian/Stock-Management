import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { sellItem } from "../../api";

const SellItem = () => {
  const [formData, setFormData] = useState({ item_name: "", quantity_to_sell: 0 });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sellItem(formData.item_name, Number(formData.quantity_to_sell));
      setMessage(response.notification || response.message);
      setFormData({ item_name: "", quantity_to_sell: 0 });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center">
        Sell Item
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Item Name"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity to Sell"
          name="quantity_to_sell"
          type="number"
          value={formData.quantity_to_sell}
          onChange={handleChange}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Sell Item
        </Button>
      </Box>
    </Paper>
  );
};

export default SellItem;
